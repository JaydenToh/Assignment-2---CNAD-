require("dotenv").config();
const express = require("express");
const cron = require("node-cron");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const nodemailer = require("nodemailer");

const loginController = require("./controllers/loginController");
const { validateUser, schemas } = require("./middlewares/validateUser");

app.post(
  "/signup",
  validateUser(schemas.register),
  loginController.registerUser
);
app.post("/login", validateUser(schemas.login), loginController.login);

app.get("/users/:id/details", userController.getAllById);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);
app.get("/users/email", userController.getEmailById);
app.get("/users/username", userController.getUsernameById);
app.get("/users/contact-number", userController.getContactNumberById);
app.get("/users/:userID/role", userController.getRoleById);
