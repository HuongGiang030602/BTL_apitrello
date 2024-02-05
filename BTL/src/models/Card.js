const { date } = require('joi');
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: { type: String},
  describe: { type: String},
  due_date: { type: Date},
  idList: {type: String},
  member: {type: Array},
  cover: {type: Array},
  attachment: {type: Array}
});


const Card = mongoose.model('Card', cardSchema);

module.exports = Card;