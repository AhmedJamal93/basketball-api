var express = require('express');
var router = express.Router();
const Player = require('../models/index');

const request = require('request');
const fetch = require('node-fetch')
const jsdom = require('jsdom')
const {JSDOM} = jsdom;

const playersCtrl = ('./controllers/index')

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
  res.render('index')
})

router.get('/new',function(req,res){
  res.render('new')
})

router.get('/show', function(req,res){
  let playername = req.query.player
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
    res.render('show', {
      playerDetails:playerDetails,
      playerPic:picURL
    })
    console.log(playerDetails)
    picURL = 'https://nba-players.herokuapp.com/players/'
    playerDetails = [];
    // playername = req.query.PlayerName;
    return playerName;
  })
  // res.render('show')
})

router.get('/myteam', function(req,res){
  Player.find({}, function(err, players) {
    res.render('myteam', { players });
  });
})

router.post('/myteam', function(req,res){
  let player = new Player(req.body);
  // player.name = req.query.player;
  console.log(req.body)
  player.save(function(err){
    if(err){
      console.log('error');
      return;
    }
    res.redirect('/myteam')
  })
})


router.get('/showMy', function(req,res){
  let playername = req.query.player
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
      playerInfo_1 = playerInfo_2
    }
    res.render('showMy', {
      playerDetails:playerDetails,
      playerPic:picURL
    })
    console.log(playerDetails)
    picURL = 'https://nba-players.herokuapp.com/players/'
    playerDetails = [];
    return playerName;
  })
  console.log(req.query.player)
})

router.delete('/showMy/:playername', function(req,res){
  let playerName = req.params.playername.replace('+',' ');
  fetch("https://www.fantasybasketballnerd.com/service/draft-projections")
  .then(function(resp){
    return resp.text();
  })
  .then(function(data){
    let parser = new JSDOM(`${data}`,{contentType :'text/xml' });
    let playerName_ele = (parser.window.document.querySelectorAll('name'));
    for(let i=0;i<playerName_ele.length;i++){
      if(playerName_ele[i].innerHTML.toLowerCase() === playerName){
        let playerName_delete = playerName_ele[i].innerHTML;
        console.log(playerName_delete)
        Player.deleteOne({name: playerName_delete}, function(err, result){
          if(err){
            console.log('error')
          }
          console.log(result)
          // res.deletedCount
          res.redirect('/myteam')
        })
      }
    }
  })



  console.log(playerName)
  //
})

module.exports = router;
