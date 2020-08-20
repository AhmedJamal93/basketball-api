const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name:String,
  imgUrl:String
})

module.exports = mongoose.model('Player', playerSchema);
