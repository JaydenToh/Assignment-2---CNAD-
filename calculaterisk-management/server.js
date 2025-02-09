// calculaterisk.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

const riskCategories = {
  "High Risk": (score) => score >= 20,
  "Moderate Risk": (score) => score >= 15 && score < 20,
  "Low Risk": (score) => score >= 10 && score < 15,
  "Very Low Risk": (score) => score < 10,
};

app.post("/calculate-risk", (req, res) => {
  try {
    const { totalScore } = req.body;
    console.log("Received total score:", totalScore);
    if (!totalScore) {
      res.status(400).json({ error: "Total score is required" });
      return;
    }
    const riskCategory = Object.keys(riskCategories).find((category) =>
      riskCategories[category](totalScore)
    );
    console.log("Calculated risk category:", riskCategory);
    res.json({ riskCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`Calculator risk service listening on port ${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});
