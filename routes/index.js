var express = require('express');
var router = express.Router();
const request = require('request');
const fetch = require('node-fetch')
const jsdom = require('jsdom')
const {JSDOM} = jsdom;
const token = process.env.BALL_TOKEN;
const rootURL = 'https://www.fantasybasketballnerd.com/service/players/';
var parser, xmlDoc;
let newPlayer = null;
let playerDetails = [];
let playerInfo_1 = null;
let playerInfo_2 = null;
let picURL = 'https://nba-players.herokuapp.com/players/'

function get_nextSibling(n) {
    var y = n.nextSibling;
    while (y.nodeType != 1) {
        y = y.nextSibling;
    }
    return y;
}
router.get('/', function(req,res, body){
  const playername = req.query.PlayerName;
  fetch("https://www.fantasybasketballnerd.com/service/draft-projections")
  .then(function(resp){
    return resp.text();
  })
  .then(function(data){
    let parser = new JSDOM(`${data}`,{contentType :'text/xml' });

    console.log(playername)
    let playerName = (parser.window.document.querySelectorAll('name'));
    for(let i=0;i<playerName.length;i++){
      if(playerName[i].innerHTML.toLowerCase() === playername){
        console.log(playerName[i].innerHTML)
        newPlayer = playerName[i].innerHTML
        newPlayer_name = newPlayer.split(' ')
        newPlayer_firstName = newPlayer_name[0];
        newPlayer_lastName = newPlayer_name[1];
        console.log(newPlayer_firstName, 'first name')
        console.log(newPlayer_lastName, 'last name')
        picURL = `${picURL}${newPlayer_lastName}/${newPlayer_firstName}`
        console.log(picURL)
        playerDetails.push(newPlayer)
        playerInfo_1 = playerName[i]
      }
    }
    for (let i = 0; i < 13; i++){
      playerInfo_2 = get_nextSibling(playerInfo_1);
      playerInfo_2_text = playerInfo_2.innerHTML
      playerDetails.push(playerInfo_2_text)
      // console.log(playerInfo_2_text)
      playerInfo_1 = playerInfo_2
    }
    res.render('index', {
      playerDetails:playerDetails,
      playerPic:picURL
    })
    console.log(playerDetails)
    picURL = 'https://nba-players.herokuapp.com/players/'
    playerDetails = [];
    return playerName;
  })
})

module.exports = router;
