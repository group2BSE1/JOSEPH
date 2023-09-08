const Document = require("../models/documentModel");
const mongoose = require("mongoose");

// get all documents
const getDocuments = async (req, res) => {
  const documents = await Document.find({}).sort({ createdAt: -1 });
  res.status(200).json(documents);
};

//get a single document
const getDocument = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such document" });
  }
  const document = await Document.findById(id);

  if (!document) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(document);
};

// create a new document
const createDocument = async (req, res) => {
  const { title, description, author, size } = req.body;

  // add doc to db
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
};

// delete a document
const deleteDocument = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such document" });
  }

  const document = await Document.findOneAndDelete({_id: id})

  if (!document) {
    return res.status(400).json({error: "No such document"})
  }

  res.status(200).json(document)
};

//update a document
const updateDocument = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such document" });
  }

  const document = await Document.findOneAndUpdate({_id: id},{
    ...req.body
  })

  if (!document) {
    return res.status(400).json({error: "No such document"})
  }

  res.status(200).json(document)
}

module.exports = {
  getDocuments,
  getDocument,
  createDocument,
  deleteDocument,
  updateDocument 
};
