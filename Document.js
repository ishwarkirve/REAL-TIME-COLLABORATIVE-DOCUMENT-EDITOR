const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  content: { type: Array, default: [] },
});

module.exports = mongoose.model('Document', DocumentSchema);
