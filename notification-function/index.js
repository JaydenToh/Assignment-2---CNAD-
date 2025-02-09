require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const app = express();
const db = require("./db");
const nodemailer = require("nodemailer");

app.use(express.json()); // Middleware to parse JSON request body

// Endpoint to test MySQL connection
app.get("/", async (req, res) => {
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err.message);
      res.status(500).send("Error connecting to MySQL: " + err.message);
    } else {
      console.log("Connected to MySQL database");
      res.send("Database connection is working!");
    }
  });
});

// Endpoint to retrieve admins from MySQL
app.get("/admins", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Admin");
    res.json(rows);
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// Nodemailer transporter configuration using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Google App Password
  },
});

// Endpoint to send an email
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body; // Accept recipient email, subject, and message from the request body

  const mailOptions = {
    from: `"test" <${process.env.EMAIL_USER}>`, // Sender email
    to: "liewzhanyang@gmail.com", // Recipient email
    subject: "test", // Email subject
    text: "hi ", // Email body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res
      .status(200)
      .send({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ success: false, error: error.message });
  }
});

const PORT = 3000; // Ensure this matches the port in your Docker Compose
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
