const { date } = require('joi');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: { type: String},
  cover: { type: String},
  date_created: { type: Date, default: Date.now()},
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;