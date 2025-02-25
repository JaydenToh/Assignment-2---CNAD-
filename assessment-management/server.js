// Load Express
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(bodyParser.json());

// Load Mongoose models
const axios = require("axios");

const Assessment = require("./Assessment");
const Submission = require("./Submission");

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://ym:Password123@cluster0.sswvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database is connected!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Call the connectToMongoDB function
connectToMongoDB();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Define routes
app.get("/", (req, res) => {
  res.send("This is the mainpoint");
});

app.post("/assessment", (req, res) => {
  const newAssessment = {
    name: req.body.name,
    questions: req.body.questions,
  };

  const assessment = new Assessment(newAssessment);
  assessment
    .save()
    .then(() => {
      console.log("Assessment created!");
      res.send("Assessment created successfully!");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error creating assessment.");
    });
});

app.get("/assessments", (req, res) => {
  Assessment.find()
    .then((assessments) => {
      console.log(assessments);
      res.send(assessments);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving assessments.");
    });
});

app.get("/random-questions", async (req, res) => {
  try {
    // Call the questions-management service API
    const response = await axios.get(
      "http://questions-management:9000/questions"
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).send("Error retrieving random questions.");
  }
});

app.post("/submit-survey", (req, res) => {
  const { answers, totalScore } = req.body;
  const newSubmission = new Submission({ answers, totalScore });
  newSubmission
    .save()
    .then(() => {
      console.log("Submission saved!");
      res.json({ message: "Survey submitted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error submitting survey.");
    });
});

app.get("/quiz", (req, res) => {
  res.sendFile(__dirname + "/quiz.html");
});

// Start the server on port 3001
app.listen(7000, () => {
  console.log("Up and running on port 3001!");
});
