const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    playername:String,
    imgUrl:String,
  },
  {
    timestamps:true,
  }
);

const userSchema = new Schema(
  {
    // name:String,
    // email:String,
    // players:[playerSchema],
    playername:String,
    imgUrl:String,
    // googleId:String
  },
  {
    timestamps:true
  }
)

module.exports = mongoose.model('User', userSchema);
