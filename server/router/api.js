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

//fetch all movies to display ranking
router.get('/getAllMovies', controllers.getAllMovies, (req, res) => {
  res.status(200).json(res.locals.movies);
})

//put req, expects movie _id, and updated ELO
router.put('/updateElo', controllers.updateElo, (req, res) => {
  res.status(200).json(res.locals.movie);
})

//auth stuff:

//create new user
router.post('/newUser', controllers.newUser, (req, res) => {
  res.status(200).json(res.locals.userinfo);
})

//verify existing user
  //start session
router.post('/verifyUser', controllers.verifyUser, controllers.setCookie, (req, res) => {
  res.status(200).json({'hi': 'hi'});
})


module.exports = router;