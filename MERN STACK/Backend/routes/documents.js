const express = require("express");
const {
  createDocument,
  getDocument,
  getDocuments,
} = require("../controllers/documentController");

const router = express.Router();

// GET all documents
router.get("/", getDocuments);

// GET a single document
router.get("/:id", getDocument);

// POST a new document
router.post("/", createDocument);

// DELETE a document
router.delete("/:id", (req, res) => {
  res.json({ msg: "DELETE a new document" });
});

// PATCH/UPDATE a document
router.patch("/:id", (req, res) => {
  res.json({ msg: "UPDATE a new document" });
});

module.exports = router;
