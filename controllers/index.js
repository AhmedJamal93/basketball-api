const User = require('../models/players');

module.exports = {
  new:newPlayer
}

function newPlayer(req,res){
  res.render('new')
}

// function index(req, res, next) {
//   /**
//    * REQ.QUERY --> comes from the GET request on the submit form VS. req.body Post req.
//    */
//   console.log(req.query);
//
//   // Make the query object to use with Student.find based up
//   // the user has submitted the search form or now
// 
//   /*
//     @param {name} string Conditional --> if no name provided get all the students
//    */
//   const modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
//
//   // Default to sorting by name
//   const sortKey = req.query.sort || 'name';
//
//   Student.find(modelQuery)
//     .sort(sortKey)
//     .exec(function(err, students) {
//       if (err) return next(err);
//
//       // Passing search values, name & sortKey, for use in the EJS
//       res.render('index', {
//         students,
//         user: req.user,
//         name: req.query.name,
//         sortKey
//       });
//     });
// }
