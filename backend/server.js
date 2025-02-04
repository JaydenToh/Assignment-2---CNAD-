// backend/server.js
const express = require("express");
const app = express();
const port = 5000; // You can choose any available port

app.use(express.json());

// Example API endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running" });
});

// Add more endpoints as needed (e.g., user login, signup, assessment)

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
