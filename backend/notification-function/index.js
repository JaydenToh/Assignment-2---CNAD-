const express = require("express");
const db = require("./db");

const app = express();

app.get("/", (req, res) => {
  db.query("SELECT 1 + 1 AS result", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Database query failed");
    } else {
      res.send(`Database connected! Result: ${results[0].result}`);
    }
  });
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
