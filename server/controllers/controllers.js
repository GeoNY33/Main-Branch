const express = require('express');
const db = require('../models/db');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { AsyncDependenciesBlock } = require('webpack');
const { brotliDecompress } = require('zlib');
const { query } = require('express');


const controllers = {
  // never use this again
  insertAllMovies: (req, res, next) => {
    const moviePath = path.join(__dirname, '../../movies.json')
    const movies = JSON.parse(fs.readFileSync(moviePath, 'utf-8'));
    for (let i = 0; i < movies.length; i++){
      const query = `INSERT INTO movie_app.movies (title, image, genre) VALUES ('${movies[i].name}', '${movies[i].image}', '${movies[i].genre[0]}')`;
      db.query(query)
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          return next(err);
        })
    }
    res.locals.movies = movies;
    return next();
  },
  

  newUser: (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      const query = `INSERT INTO movie_app.users (username, password) VALUES ('${req.body.username}', '${hash}') RETURNING *`;
      db.query(query)
        .then(data => {
          res.locals.userinfo = data.rows[0]
          return next();
        })
        .catch(err => {
          return next(err);
        })
    })
  },

  verifyUser: async (req, res, next) => {
    console.log('verifying user')
    const query = 'SELECT * FROM movie_app.users WHERE username = $1';
    const values = [req.body.username];
    const data = await db.query(query, values);
    res.locals.verifyUser = data.rows[0].password

    bcrypt.compare(req.body.password, data.rows[0].password, function(err, result) {
      console.log('res after bcompare', result)
      if (result) {
        res.locals.username = req.body.username;
        return next();
      } else {
        res.status(200).send('user not found');
      }
    });
  },
  
  setCookie: (req, res, next) => {
    res.cookie('currentUser', res.locals.username, {
      secure: true,
      httpOnly: true
    })
    const query = 'INSERT INTO movie_app.sessionInfo (userId, timeEnd, cookieValue) VALUES ($1, $2, $3) RETURNING *';
    const values = [res.locals.username, new Date()];
    db.query(query, values)
      .then(data => {
        console.log('session info: ', data)
        return next();
      })
    return next();
  },


  getRandomMovie: (req, res, next) => {
    const values = [Math.floor(Math.random() * 182)];
    const query = 'SELECT * FROM movie_app.movies WHERE _id = $1';
    db.query(query, values)
      .then(data => {
        res.locals.movie = data.rows[0];
        return next();
      })
      .catch(err => {
        return next(err);
      })
  },


  getAllMovies: (req, res, next) => {
    console.log('cookies', req.cookies.currentUser)
    const query = 'SELECT * FROM movie_app.movies';
    db.query(query)
      .then(data => {
        res.locals.movies = data.rows;
        return next();
      })
      .catch(err => {
        return next(err);
      })
  },


  updateElo: (req, res, next) => {
    const { elo, movieId } = req.body;
    const values = [elo, movieId];
    const query = 'UPDATE movie_app.movies SET elo = $1 WHERE _id = $2 RETURNING *';
    db.query(query, values)
      .then(data => {
        console.log(data)
        res.locals.movie = data.rows[0];
        return next();
      })
      .catch(err => {
        return next(err);
      })
  }
};

module.exports = controllers;