const express = require('express');
const { getDocument, updateDocument } = require('../controllers/documentController');

const router = express.Router();

// Route to fetch a document
router.get('/:id', getDocument);

// Route to update a document
router.put('/:id', updateDocument);

module.exports = router;
