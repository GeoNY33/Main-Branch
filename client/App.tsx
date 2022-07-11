import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './stylesheets/styles.css';


const App = () => {

  const [allMovies, setMovies] = useState([]);

  useEffect(() => {

    const getMovies = async () => {
      const movies: any = [];
      const res = await fetch('../movies.json');
      const data = await res.json();

      data.forEach((movie: any) => {
  
        movies.push(
          <div>
            <h3>{movie.name}</h3>
            <div>{movie.description}</div>
            <div>{movie.genre[0]}</div>
            <img src={movie.image}/>
            <br/>
            <br/>
          </div>
        )
      })
      setMovies(movies);
    }

    getMovies();
  }, []);

  return (
    <div>
      <h1>Movie ELO</h1>
      {allMovies}
    </div>
  );
}

export default App;