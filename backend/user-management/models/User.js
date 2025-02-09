const sql = require("mssql");
const dbConfig = require("../dbConfig");

class User {
  constructor(userID, userName, email, password, contactNumber, role, age) {
    this.userID = userID;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.contactNumber = contactNumber;
    this.role = role;
    this.age = age;
  }

  static async getAllById(userID) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input("userID", sql.Int, userID)
        .query("SELECT * FROM endUser WHERE userID = @userID");

      if (result.recordset.length === 0) {
        console.error("No user found with this ID:", userID);
        return null;
      }

      return result.recordset[0];
    } catch (error) {
      console.error("Error in getAllById:", error);
      throw new Error("Database query failed");
    }
  }

  static async getRoleById(userID) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input("userID", sql.Int, userID)
        .query("SELECT role FROM endUser WHERE userID = @userID");

      return result.recordset[0]?.role; // Return the role of the user
    } catch (error) {
      console.error("Error in getRoleById:", error);
      throw new Error("Database query failed");
    }
  }

  static async getEmailById(userID) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input("userID", sql.Int, userID)
        .query("SELECT email FROM endUser WHERE userID = @userID");
      return result.recordset[0]?.email;
    } catch (error) {
      console.error("Error in getEmailById:", error);
      throw new Error("Database query failed");
    }
  }

  static async getUsernameById(userID) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input("userID", sql.Int, userID)
        .query("SELECT userName FROM endUser WHERE userID = @userID");
      return result.recordset[0]?.userName;
    } catch (error) {
      console.error("Error in getUsernameById:", error);
      throw new Error("Database query failed");
    }
  }

  static async getContactNumberById(userID) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input("userID", sql.Int, userID)
        .query("SELECT contactNumber FROM endUser WHERE userID = @userID");
      return result.recordset[0]?.contactNumber;
    } catch (error) {
      console.error("Error in getContactNumberById:", error);
      throw new Error("Database query failed");
    }
  }

  static async getLunchById(userID) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input("userID", sql.Int, userID)
        .query("SELECT preferredLunch FROM endUser WHERE userID = @userID");
      return result.recordset[0]?.preferredLunch;
    } catch (error) {
      console.error("Error in getLunchById:", error);
      throw new Error("Database query failed");
    }
  }

  static async createUser(data) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input("userName", sql.VarChar, data.userName)
        .input("email", sql.VarChar, data.email)
        .input("password", sql.VarChar, data.password)
        .input("contactNumber", sql.VarChar, data.contactNumber)
        .input("preferredLunch", sql.VarChar, data.preferredLunch || null)
        .input("role", sql.VarChar, data.role)
        .input("age", sql.Int, data.age || null)
        .input("interest", sql.VarChar, data.interest || null).query(`
<<<<<<< HEAD
          INSERT INTO endUser (userName, email, password, contactNumber, role)
          VALUES (@userName, @email, @password, @contactNumber, @role, @age);
=======
          INSERT INTO endUser (userName, email, password, contactNumber, preferredLunch, role)
          VALUES (@userName, @email, @password, @contactNumber, @preferredLunch, @role, @age, @interest);
>>>>>>> e17c32c094023ce72800f956b50997261aba51d2
          SELECT SCOPE_IDENTITY() AS userID;
        `);
      return result.recordset[0].userID;
    } catch (error) {
      console.error("Error in createUser:", error);
      throw new Error("Database insert failed");
    }
  }

  static async updateUser(userID, newUserData) {
    try {
      const connection = await sql.connect(dbConfig);
      let sqlQuery = `UPDATE dbo.endUser SET userName = @userName`;
      const request = connection.request();
      request.input("userID", sql.Int, userID);
      request.input("userName", sql.VarChar(255), newUserData.userName);

      if (newUserData.contactNumber) {
        sqlQuery += `, contactNumber = @contactNumber`;
        request.input(
          "contactNumber",
          sql.VarChar(20),
          newUserData.contactNumber
        );
      }
      if (newUserData.email) {
        sqlQuery += `, email = @email`;
        request.input("email", sql.VarChar(255), newUserData.email);
      }
      if (newUserData.password) {
        const hashedPassword = await bcrypt.hash(newUserData.password, 10);
        sqlQuery += `, password = @password`;
        request.input("password", sql.VarChar(255), hashedPassword);
      }
      if (newUserData.role) {
        sqlQuery += `, role = @role`;
        request.input("role", sql.VarChar(10), newUserData.role);
      }
      if (newUserData.age) {
        sqlQuery += `, age = @age`;
        request.input("age", sql.Int, newUserData.age);
      }
      sqlQuery += ` WHERE userID = @userID`;

      await request.query(sqlQuery);
      const result = await connection
        .request()
        .input("userID", sql.Int, userID)
        .query(`SELECT * FROM dbo.endUser WHERE userID = @userID`);
      connection.close();

      return result.recordset[0];
    } catch (error) {
      console.error("Error in updateUser:", error);
      throw new Error("Database update failed");
    }
  }

  static async deleteUser(userID) {
    try {
      const pool = await sql.connect(dbConfig);
      await pool
        .request()
        .input("userID", sql.Int, userID)
        .query("DELETE FROM endUser WHERE userID = @userID");
    } catch (error) {
      console.error("Error in deleteUser:", error);
      throw new Error("Database delete failed");
    }
  }
  static async updateSubscriptionStatus(userID, subscribe) {
    try {
      const pool = await sql.connect(dbConfig);

      // Fetch the user's email from the 'endUser' table (assuming the email is stored there)
      const userResult = await pool
        .request()
        .input("userID", sql.Int, userID)
        .query("SELECT email FROM dbo.endUser WHERE userID = @userID");

      if (userResult.recordset.length === 0) {
        throw new Error("User not found");
      }

      const email = userResult.recordset[0].email; // Get the user's email

      // Check if the user exists in the Subscriptions table
      const checkUser = await pool
        .request()
        .input("userID", sql.Int, userID)
        .query(
          "SELECT COUNT(*) AS count FROM dbo.Subscriptions WHERE userID = @userID"
        );

      if (checkUser.recordset[0].count === 0) {
        // If userID does not exist in the Subscriptions table, insert a new record
        await pool
          .request()
          .input("userID", sql.Int, userID)
          .input("subscribe", sql.Bit, subscribe)
          .input("email", sql.NVarChar, email) // Pass the email
          .query(
            "INSERT INTO dbo.Subscriptions (userID, subscribe, email) VALUES (@userID, @subscribe, @email)"
          );

        console.log("New subscription record inserted for userID:", userID);
      } else {
        // If userID exists, update the subscription record
        await pool
          .request()
          .input("userID", sql.Int, userID)
          .input("subscribe", sql.Bit, subscribe)
          .input("email", sql.NVarChar, email) // Pass the email
          .query(
            "UPDATE dbo.Subscriptions SET subscribe = @subscribe, email = @email WHERE userID = @userID"
          );

        console.log("Subscription status updated for userID:", userID);
      }

      return true; // Indicate success
    } catch (error) {
      console.error("Error in updateSubscriptionStatus:", error);
      throw new Error("Database update failed");
    }
  }
}

module.exports = User;
