const express = require('express');
const db = require('../models/db');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { AsyncDependenciesBlock } = require('webpack');


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
    }

    res.locals.movies = movies;
    return next();
  },
  
  newUser: (req, res, next) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        const query = `INSERT INTO movie_app.users (username, password) VALUES ('${req.body.username}', '${hash}') RETURNING *`;
        db.query(query)
          .then(data => {
            res.locals.userinfo = data.rows[0]
            return next();
          })
      })
  },
  
  getRandomMovie: (req, res, next) => {
    const values = [Math.floor(Math.random() * 182)];
    const query = 'SELECT * FROM movie_app.movies WHERE _id = $1';
    db.query(query, values)
      .then(data => {
        res.locals.movie = data.rows[0];
        return next();
      })
  }
};

module.exports = controllers;