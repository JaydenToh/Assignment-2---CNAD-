const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Login = require("../user-management/models/Login");

// Register a new user
async function registerUser(req, res) {
  const { userName, email, password, contactNumber } = req.body;

  try {
    const existingUser = await Login.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const role = email.includes("@admin.com") ? "admin" : "user";

    const newUser = await Login.createUser(
      userName,
      email,
      hashedPassword,
      contactNumber,
      role
    );
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Error during registration:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

// User login
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await Login.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: user.userID,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ token, userId: user.userID, userName: user.userName });
  } catch (err) {
    console.error("Error during login:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

module.exports = { registerUser, login };
