const { date } = require('joi');
const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title: { type: String},
  position: { type: Number,default:0},
  date_created: { type: Date, default: Date.now()},
  idBoard: {type:String, require: true}
});

listSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const maxPosition = await this.constructor.findOne({}, 'position').sort({ position: -1 });
      if (maxPosition) {
        const newPosition = maxPosition.position + 1;
        this.position = newPosition;
      } else {
        this.position = 1;
      }
    } catch (err) {
      return next(err);
    }
  }
  next();
});



const List = mongoose.model('List', listSchema);

module.exports = List;