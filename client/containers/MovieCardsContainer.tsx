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
    };
    test();
  }, []);

  // helper that checks which image was clicked, then assigns movie on right side as winner and loads 
  // new movie on left side by updating state of newMovie. Also changes both elo scores
  const imgClickHelper = async (id: any) =>{   
    const newMovHolder:Promise<movieInfo> = getMovie();
    const winnerInfo:movieInfo = (id.target.id === 'imgleft') ? newMovie : oldMovie
    const loserInfo:movieInfo = (id.target.id !== 'imgleft') ? newMovie : oldMovie
    
    const newValue:movieInfo = Object.assign({}, winnerInfo);
    newValue.elo += 1
    // update elo w post req for winner
    // 
    // update elo w post for loser
    setNewMovie(await newMovHolder);
    setOldMovie(newValue);
  };

  return (
    <div id="movieCardsContainer">
      <div id="header1"> Main-Branch </div> 
      <MovieCard side={'left'} title={newMovie.title} genre={newMovie.genre}
      image={newMovie.image} elo={newMovie.elo} id={newMovie._id} helper={imgClickHelper}/>
      <MovieCard side={'right'} title={oldMovie.title} genre={oldMovie.genre} 
      image={oldMovie.image} elo={oldMovie.elo} id={oldMovie._id} helper={imgClickHelper}/>
    </div>
  );
};

export default MovieCardsContainer;