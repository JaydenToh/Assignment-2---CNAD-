const express = require("express");
const app = express();
const db = require("./db");

app.get('/admins', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Admin');
        res.json(rows);
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

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

app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        res.json({ success: true, result: rows[0].result });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

const PORT = 3000; // Ensure this matches the port in your Docker Compose
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
