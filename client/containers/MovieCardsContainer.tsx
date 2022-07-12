import React, {useEffect, useState} from 'react';
import { isForInStatement, isPropertySignature } from 'typescript';
import MovieCard from '../components/MovieCard';

interface newMovie {
  title: string,
  desc: string,
  elo: number,
}
const options = {method : 'GET', headers: {'Content-Type': 'application/json'}};

const MovieCardsContainer =  () => {
  
  const getMovie = async () => {
    try{
      const rawRes = await fetch('backend', options);
      const res = await rawRes.json();
      return await res;
    } catch(err) {console.error("Error requesting new movie: ", err)};
  };
  
  useEffect(() => {getMovie()}, []);
  /*
  const [leftMovie, setMovies] = useState({ 
    title: newMovie.title,
    desc: newMovie.desc,
    elo: newMovie.elo,
  }
  );
  */
  return (
    <div id="movieCardsContainer">
      <div id="header1"> Main-Branch </div> 
      <MovieCard side={'left'}/>
      <MovieCard side={'right'}/>
    </div>
  );
};

export default MovieCardsContainer;