const sql = require("mssql");
const dbConfig = require("../dbConfig");
const poolPromise = new sql.ConnectionPool(dbConfig).connect();

class Login {
  constructor(
    userID,
    userName,
    email,
    password,
    contactNumber,
    preferredLunch,
    role
  ) {
    this.userID = userID;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.contactNumber = contactNumber;
    this.preferredLunch = preferredLunch;
    this.role = role;
  }

  // Fetch user by email
  static async getUserByEmail(email) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("email", sql.VarChar, email)
        .query("SELECT * FROM endUser WHERE email = @email");
      return result.recordset[0];
    } catch (err) {
      console.error("Error during getUserByEmail:", err);
      throw new Error("Database query failed");
    }
  }

  // Create a new user
  static async createUser(
    userName,
    email,
    password,
    contactNumber,
    preferredLunch,
    role
  ) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("userName", sql.VarChar, userName)
        .input("email", sql.VarChar, email)
        .input("password", sql.VarChar, password)
        .input("contactNumber", sql.VarChar, contactNumber)
        .input("preferredLunch", sql.VarChar, preferredLunch || null)
        .input("role", sql.VarChar, role)
        .query(
          `INSERT INTO endUser (userName, email, password, contactNumber, preferredLunch, role)
           VALUES (@userName, @email, @password, @contactNumber, @preferredLunch, @role);
           SELECT SCOPE_IDENTITY() AS userID, userName, email, password, contactNumber, preferredLunch, role
           FROM endUser WHERE userID = SCOPE_IDENTITY();`
        );

      const newUser = result.recordset[0];
      return new Login(
        newUser.userID,
        newUser.userName,
        newUser.email,
        newUser.password,
        newUser.contactNumber,
        newUser.preferredLunch,
        newUser.role.trim()
      );
    } catch (err) {
      console.error("Error during createUser:", err);
      throw new Error("Database insert failed");
    }
  }
}

module.exports = Login;
