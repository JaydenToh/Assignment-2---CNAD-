const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Microsoft SQL Server Configuration
const dbConfig = {
  user: "your_db_user",
  password: "your_db_password",
  server: "your_server_address",
  database: "ClinicDB",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Connect to SQL Server
sql
  .connect(dbConfig)
  .then(() => console.log("Connected to SQL Server"))
  .catch((err) => console.error("DB Connection Error:", err));

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

// Fetch Available Doctors for a Specific Clinic
app.get("/api/doctors/:clinicId", async (req, res) => {
  try {
    const { clinicId } = req.params;
    const result = await sql.query(
      `SELECT * FROM Doctors WHERE ClinicID = ${clinicId}`
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
    const query = `INSERT INTO Appointments (UserID, ClinicID, DoctorID, AppointmentTime, Type) 
                   VALUES (${userId}, ${clinicId}, ${doctorId}, '${appointmentTime}', '${type}')`;
    await sql.query(query);
    res.json({ message: "Appointment booked successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error booking appointment" });
  }
});

// Fetch User Appointments
app.get("/api/appointments/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await sql.query(
      `SELECT * FROM Appointments WHERE UserID = ${userId}`
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
        user: "your-email@gmail.com",
        pass: "your-password",
      },
    });

    let mailOptions = {
      from: "your-email@gmail.com",
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

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
