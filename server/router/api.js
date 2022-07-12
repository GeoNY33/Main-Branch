const express = require('express');
const controllers = require('../controllers/controllers');

const router = express.Router();

//do not use lol
router.get('/insertAllMovies', controllers.insertAllMovies, (req, res) => {
  res.status(200).json(res.locals.movies);
})

//get random movie
router.get('/getRandomMovie', controllers.getRandomMovie, (req, res) => {
  res.status(200).json(res.locals.movie);
})

//submit change in ELO on selection

//fetch all movies to display ranking

//create new user
router.post('/newUser', controllers.newUser, (req, res) => {
  res.status(200).json(res.locals.userinfo)
})

//verify existing user
  //start session




module.exports = router;