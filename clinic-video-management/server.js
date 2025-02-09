require("dotenv").config(); // Load .env variables
const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// SQL Server Configuration (Now using Datasphere database)
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE, // ✅ Uses Datasphere from .env
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Connect to SQL Server
sql
  .connect(dbConfig)
  .then(() => console.log("✅ Connected to SQL Server (Datasphere)"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

/* -------------------- CLINIC ENDPOINTS -------------------- */

// Fetch Available Clinics
app.get("/api/clinics", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Clinics");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error fetching clinics" });
  }
});

// Fetch Doctors for a Clinic
app.get("/api/doctors/:clinicId", async (req, res) => {
  try {
    const { clinicId } = req.params;
    const request = new sql.Request();
    request.input("clinicId", sql.Int, clinicId);
    const result = await request.query(
      "SELECT * FROM Doctors WHERE ClinicID = @clinicId"
    );
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error fetching doctors" });
  }
});

/* -------------------- APPOINTMENT ENDPOINTS -------------------- */

// Book an Appointment
app.post("/api/appointments", async (req, res) => {
  try {
    const { userId, clinicId, doctorId, appointmentTime, type } = req.body;
    const request = new sql.Request();
    request.input("userId", sql.Int, userId);
    request.input("clinicId", sql.Int, clinicId);
    request.input("doctorId", sql.Int, doctorId);
    request.input("appointmentTime", sql.NVarChar, appointmentTime);
    request.input("type", sql.NVarChar, type);

    await request.query(`
      INSERT INTO Appointments (UserID, ClinicID, DoctorID, AppointmentTime, Type) 
      VALUES (@userId, @clinicId, @doctorId, @appointmentTime, @type)
    `);
    res.json({ message: "Appointment booked successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error booking appointment" });
  }
});

// Fetch User Appointments
app.get("/api/appointments/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const request = new sql.Request();
    request.input("userId", sql.Int, userId);
    const result = await request.query(
      "SELECT * FROM Appointments WHERE UserID = @userId"
    );
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error fetching appointments" });
  }
});

/* -------------------- REMINDER ENDPOINT -------------------- */

// Send Appointment Reminder (Using Nodemailer)
app.post("/api/appointments/reminders", async (req, res) => {
  try {
    const { email, appointmentTime } = req.body;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Appointment Reminder",
      text: `Reminder: You have an appointment scheduled for ${appointmentTime}.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Reminder sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error sending reminder" });
  }
});

// Verification Key API: Check if the key matches a stored one
app.post("/api/verify-key", async (req, res) => {
  try {
    const { clinicId, verificationKey } = req.body;

    // Replace with your actual column name if different
    const request = new sql.Request();
    request.input("clinicId", sql.Int, clinicId);
    request.input("verificationKey", sql.NVarChar, verificationKey);

    const result = await request.query(`
      SELECT * FROM Appointments 
      WHERE ClinicID = @clinicId AND VerificationKey = @verificationKey
    `);

    if (result.recordset.length > 0) {
      res.json({
        success: true,
        message: "Verification successful!",
        appointment: result.recordset[0],
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid verification key." });
    }
  } catch (error) {
    console.error("Error verifying key:", error);
    res.status(500).json({ error: "Server error while verifying key." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
