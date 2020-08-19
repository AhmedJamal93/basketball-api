const Player = require('../models/index');

module.exports = {
  new:newPlayer
}

function newPlayer(req,res){
  res.render('new')
}
