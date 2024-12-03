const express = require("express");
const Company = require("../models/Company");
const router = express.Router();

// Add new company
router.post("/add", async (req, res) => {
  const { name, location, linkedIn, emails, phoneNumbers, comments, periodicity } = req.body;
  try {
    const newCompany = new Company({ name, location, linkedIn, emails, phoneNumbers, comments, periodicity });
    await newCompany.save();
    res.status(201).json({ message: "Company added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add company" });
  }
});

// Edit company
router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ error: "Failed to update company" });
  }
});

// Delete company
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Company.findByIdAndDelete(id);
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete company" });
  }
});

// Get all companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch companies" });
  }
});

module.exports = router;
