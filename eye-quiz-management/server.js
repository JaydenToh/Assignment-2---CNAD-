const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {
  createEyeQuizResult,
  fetchAllEyeQuizResults,
  fetchEyeQuizResultById,
} = require("./controllers/eyeQuizController");

const app = express();
const PORT = process.env.PORT || 4050; // Different port to avoid conflict

app.use(cors());
app.use(express.json());

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("Eye Quiz API is running!");
});

// ✅ API Endpoints (Calling Controllers)
app.post("/api/eye-quiz", createEyeQuizResult);
app.get("/api/eye-quiz", fetchAllEyeQuizResults);
app.get("/api/eye-quiz/:id", fetchEyeQuizResultById);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Eye Quiz API running on http://localhost:${PORT}`);
});
