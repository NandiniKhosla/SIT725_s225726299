const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  year: { type: Number, required: true },
  cgpa: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Record', recordSchema);
