require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const bodyParser = require("body-parser");

// Controllers
const loginController = require("../controllers/loginController");
const userController = require("../controllers/userController");
const { validateUser, schemas } = require("./middlewares/validateUser");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
sql
  .connect(require("./dbConfig"))
  .then(() => console.log("✅ Connected to SQL Server"))
  .catch((err) => console.error("❌ Database connection error:", err));

/* -------------------- AUTHENTICATION ROUTES -------------------- */
app.post(
  "/signup",
  validateUser(schemas.register),
  loginController.registerUser
);
app.post("/login", validateUser(schemas.login), loginController.login);

/* -------------------- USER MANAGEMENT ROUTES -------------------- */
app.get("/users/:id/details", userController.getAllById);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);
app.get("/users/email", userController.getEmailById);
app.get("/users/username", userController.getUsernameById);
app.get("/users/contact-number", userController.getContactNumberById);
app.get("/users/:userID/role", userController.getRoleById);

/* -------------------- SERVER START -------------------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
