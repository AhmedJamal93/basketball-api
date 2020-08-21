const User = require('../models/players');

module.exports = {
  new:newPlayer
}

function newPlayer(req,res){
  res.render('new')
}
