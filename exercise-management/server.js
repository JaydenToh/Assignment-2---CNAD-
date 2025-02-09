const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Different content for each risk level
const exercises = {
  mild: {
    title: "Gentle Stretching & Chair Exercises",
    description:
      "These exercises focus on improving flexibility and reducing joint stiffness.",
    benefits: [
      "Enhances flexibility",
      "Improves circulation",
      "Maintains mobility for daily activities",
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with real video URL
  },
  moderate: {
    title: "Strength Training with Resistance Bands",
    description:
      "Strengthening key muscle groups to improve balance and coordination.",
    benefits: [
      "Enhances muscle support",
      "Improves coordination",
      "Reduces the risk of falls",
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  high: {
    title: "Guided Physiotherapy Routines",
    description:
      "Physiotherapy-led exercises to help regain balance and strength safely.",
    benefits: [
      "Reduces fall risk",
      "Strengthens core and lower body",
      "Improves postural stability",
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
};

// API to get exercise content based on severity
app.get("/api/exercises/:riskLevel", (req, res) => {
  const riskLevel = req.params.riskLevel;
  if (exercises[riskLevel]) {
    res.json(exercises[riskLevel]);
  } else {
    res.status(404).json({ error: "Exercise not found" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
