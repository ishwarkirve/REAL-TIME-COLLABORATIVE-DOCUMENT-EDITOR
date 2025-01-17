const Document = require('../models/Document');

// Fetch a document or create a new one if it doesn't exist
exports.getDocument = async (req, res) => {
  const { id } = req.params;

  try {
    let document = await Document.findById(id);

    if (!document) {
      document = new Document({ _id: id });
      await document.save();
    }

    res.status(200).json(document);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching document' });
  }
};

// Update a document
exports.updateDocument = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const updatedDocument = await Document.findByIdAndUpdate(id, { content }, { new: true });
    res.status(200).json(updatedDocument);
  } catch (err) {
    res.status(500).json({ error: 'Error updating document' });
  }
};
