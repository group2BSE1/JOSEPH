const express = require("express");
const {
  createDocument,
  getDocument,
  getDocuments,
  deleteDocument,
  updateDocument
} = require("../controllers/documentController");

const router = express.Router();

// GET all documents
router.get("/", getDocuments);

// GET a single document
router.get("/:id", getDocument);

// POST a new document
router.post("/", createDocument);

// DELETE a document
router.delete("/:id", deleteDocument);

// PATCH/UPDATE a document
router.patch("/:id",updateDocument);

module.exports = router;
