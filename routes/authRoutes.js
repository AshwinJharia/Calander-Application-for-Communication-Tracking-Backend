const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const authenticateJWT = require("../middleware/authMiddleware");

// Register route
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  
  try {
    console.log('at register');
    
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: "Email already exists" });
    
    const newUser = new User({ email, password, role });
    await newUser.save();
    console.log(process.env.JWT_SECRET);
    
    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log(token)
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "90d" });

    res.status(200).json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
});

module.exports = router;




// Protect routes
router.get("/protected", authenticateJWT, (req, res) => {
  res.status(200).json({ message: "Access granted", user: req.user });
});
