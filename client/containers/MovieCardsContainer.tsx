import React, {useEffect, useState} from 'react';
import { isForInStatement, isPropertySignature } from 'typescript';
import { ProgressPlugin } from 'webpack';
import MovieCard from '../components/MovieCard';

interface movieInfo {
  genre: string,
  image: string,
  title: string,
  elo: number,
  _id: number,
};

const options = {method : 'GET', headers: {'Content-Type': 'application/json'}};

const MovieCardsContainer =  (props:any) => {
  
  const getMovie = async () => {
    try{
      const rawRes = await fetch('/api/getRandomMovie', options);
      const res = await rawRes.json();
      return await res;
    } catch(err) {console.error("Error requesting new movie: ", err)};
  };

  let [newMovie, setNewMovie] = useState({
    genre: '',
    image: '',
    title: '',
    elo: 0,
    _id: 0
  });
  let [oldMovie, setOldMovie] = useState({
    genre: '',
    image: '',
    title: '',
    elo: 0,
    _id: 0
  });

  useEffect(() => {
    const test = async () => {
    const newMovHolder:movieInfo = await getMovie();
    const oldMovHolder:movieInfo = await getMovie();
    setNewMovie(await newMovHolder);
    setOldMovie(await oldMovHolder);
    console.log(await oldMovHolder)
    }
    test()
  }, []);

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
      <MovieCard side={'left'} title={newMovie.title} genre={newMovie.genre} 
      image={newMovie.image} elo={newMovie.elo} id={newMovie._id} setMovie={setNewMovie}/>
      <MovieCard side={'right'} title={oldMovie.title} genre={oldMovie.genre} 
      image={oldMovie.image} elo={oldMovie.elo} id={oldMovie._id} setMovie={setOldMovie}/>
    </div>
  );
};

export default MovieCardsContainer;