// Load Express
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(bodyParser.json());

// Load Mongoose model
const Question = require("./Question"); // Assuming your model is in a file called Question.js

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

// Define routes
app.get('/', (req, res) => {
  res.send("This is the mainpoint");
})

app.post("/question", (req, res) => {
    const newQuestion = {
      question: req.body.question,
    };
  
    // Check for duplicate question
    Question.findOne({ question: newQuestion.question })
      .then((existingQuestion) => {
        if (existingQuestion) {
          res.status(409).send("Question already exists.");
        } else {
          const question = new Question(newQuestion);
          question.save().then(() => {
            console.log("Question Added!");
            res.send("Question added successfully!");
          }).catch((err) => {
            console.error(err);
            res.status(500).send("Error adding question.");
          });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error checking for duplicate question.");
      });
  });

app.get("/questions", (req, res) => {
    Question.find().then((questions) => {
        console.log(questions);
    })
})

// Start the server
app.listen(3000, () => {
  console.log("Up and running!");
})