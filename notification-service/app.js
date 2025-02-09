require("dotenv").config();
const express = require("express");
const notificationRoutes = require("./routes/notificationRoutes");
const emailRoutes = require("./routes/emailRoutes");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json()); // Middleware to parse JSON body

app.use("/notifications", notificationRoutes); // Notification routes
app.use("/send-email", emailRoutes); // Email routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
