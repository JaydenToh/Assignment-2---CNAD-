const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createReactionTest, fetchAllReactionTests, fetchReactionTestById } = require("./controllers/reactionTestController");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ Root Route
app.get("/", (req, res) => {
    res.send("Reaction Time API is running!");
});

// ✅ API Endpoints (Calling Controllers)
app.post("/api/reaction-tests", createReactionTest);
app.get("/api/reaction-tests", fetchAllReactionTests);
app.get("/api/reaction-tests/:id", fetchReactionTestById);

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
