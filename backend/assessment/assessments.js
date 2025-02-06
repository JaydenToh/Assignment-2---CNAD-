// Load Express
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(bodyParser.json());
const Question = require("../questions/Question");

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb+srv://ym:Password123@cluster0.sswvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Database is connected!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Call the connectToMongoDB function
connectToMongoDB();

// Define Assessment model
const assessmentSchema = new mongoose.Schema({
  name: String,
  questions: [{ type: String }]
});

const Assessment = mongoose.model("Assessment", assessmentSchema);

// Define routes
app.get('/', (req, res) => {
  res.send("This is the mainpoint");
})

app.post("/assessment", (req, res) => {
  const newAssessment = {
    name: req.body.name,
    questions: req.body.questions,
  };

  const assessment = new Assessment(newAssessment);
  assessment.save().then(() => {
    console.log("Assessment created!");
    res.send("Assessment created successfully!");
  }).catch((err) => {
    console.error(err);
    res.status(500).send("Error creating assessment.");
  });
});

app.get("/assessments", (req, res) => {
  Assessment.find().then((assessments) => {
    console.log(assessments);
    res.send(assessments);
  }).catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving assessments.");
  });
});

app.get("/random-questions", (req, res) => {
    Question.aggregate([
      { $sample: { size: 5 } }
    ]).then((questions) => {
      res.send(questions);
    }).catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving random questions.");
    });
  });

app.post('/submit-survey', (req, res) => {
  const answers = req.body;
  // Store the answers in your database
  // ...
  res.json({ message: 'Survey submitted successfully' });
});

app.get('/quiz', (req, res) => {
  res.sendFile(__dirname + '/quiz.html');
});

// Start the server on port 3001
app.listen(3001, () => {
  console.log("Up and running on port 3001!");
})