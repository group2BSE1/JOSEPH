const express = require("express");
const Document = require("../models/documentModel");

const router = express.Router();

// GET all documents
router.get("/", (req, res) => {
  res.json({ msg: "GET all Documents" });
});

// GET a single document
router.get("/:id", (req, res) => {
  res.json({ msg: "GET a single Documents" });
});

// POST a new document
router.post("/", async (req, res) => {
  const { title, description, author, size } = req.body;

  try {
    const document = await Document.create({
      title,
      description,
      author,
      size,
    });
    res.status(200).json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a document
router.delete("/:id", (req, res) => {
  res.json({ msg: "DELETE a new document" });
});

// PATCH/UPDATE a document
router.patch("/:id", (req, res) => {
  res.json({ msg: "UPDATE a new document" });
});

module.exports = router;
