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

interface Elo {
  id: number,
  elo: number
}
const options = {method : 'GET', headers: {'Content-Type': 'application/json'}};

const MovieCardsContainer =  (props:any) => {
  const getMovie:Function = async () => {
    try{
      const rawRes = await fetch('/api/getRandomMovie', options);
      const res:Promise<movieInfo> = await rawRes.json();
      return await res;
    } catch(err) {console.error("Error requesting new movie: ", err)};
  };
  
  const updateElo:Function = async (value:Elo) => {
    try{
      const rawRes = await fetch("api/updateElo", {method : 'Post', body : JSON.stringify(value), headers: {'Content-Type': 'application/json'}});
      const res:Promise<Elo> = await rawRes.json();
    } catch(err:any) {console.error("Error updating elo: ", err)};
  }

  let [newMovie, setNewMovie]: [movieInfo, Function] = useState({
    genre: '',
    image: '',
    title: '',
    elo: 0,
    _id: 0
  });
  let [nextMovie, setNextMovie]: [movieInfo, Function] = useState({
    genre: '',
    image: '',
    title: '',
    elo: 0,
    _id: 0
  });  
  let [oldMovie, setOldMovie]: [movieInfo, Function] = useState({
    genre: '',
    image: '',
    title: '',
    elo: 0,
    _id: 0
  });

  useEffect(() => {
    const initMovies:CallableFunction = async () => {
    const newMovHolder:movieInfo = await getMovie();
    let oldMovHolder:movieInfo = await getMovie();
    if (newMovHolder._id === oldMovHolder._id){
      oldMovHolder = await getMovie();
    };
    setNewMovie(await newMovHolder);
    setOldMovie(await oldMovHolder);
    let nextMovHolder:movieInfo = await getMovie();
    if (nextMovHolder._id === newMovHolder._id || nextMovHolder._id === oldMovHolder._id){
      nextMovHolder = await getMovie();
    }
    setNextMovie(await nextMovHolder)
    };
    initMovies();
  }, []);

  useEffect(() => {
    const updateNextMovie = async () => {
    let nextMovHolder:movieInfo = await getMovie();
<<<<<<< HEAD
    if (nextMovHolder._id === oldMovie._id || nextMovHolder._id === newMovie._id){
=======
    while(nextMovHolder._id === oldMovie._id || nextMovHolder._id === newMovie._id){
>>>>>>> dev-branch
      nextMovHolder = await getMovie();
    }
    setNextMovie(await nextMovHolder)
  };
<<<<<<< HEAD
    updateNextMovie()
=======
  updateNextMovie();
>>>>>>> dev-branch
  }, [newMovie]);

  // NOTE: possibly try to load image behind image on left 
  // helper that checks which image was clicked, then assigns movie on right side as winner and loads 
  // new movie on left side by updating state of newMovie. Also changes both elo scores

  const imgClickHelper = async (id: any) =>{   
    // Selecting winner and loser based off click
    const winnerInfo:movieInfo = (id.target.id === 'imgleft') ? newMovie : oldMovie;
    const loserInfo:movieInfo = (id.target.id !== 'imgleft') ? newMovie : oldMovie;
    const winNewValue:movieInfo = Object.assign({}, winnerInfo);
    // Calculation for updated ELO
    let K = 32;
    let eloWin1  = 10 ** (winNewValue.elo / 400);
    let eloLose1 =  10 ** (loserInfo.elo / 400);
    let eloWin2 = eloWin1 / (eloWin1 + eloLose1);
    let eloLose2 = eloLose1 / (eloWin1  + eloLose1);
    let newWinElo = winNewValue.elo + K * (1 - eloWin2);
    let newLoseElo = loserInfo.elo + K * (0 - eloLose2);
    // Update winner info, add new movie, update database 
    winNewValue.elo = newWinElo;
    setNewMovie(nextMovie);
    setOldMovie(winNewValue);
    updateElo({id : winNewValue._id, elo : newWinElo});
    updateElo({id : loserInfo._id, elo : newLoseElo});
  };
  // helper for movie skip button 
  const exitClickHelper = async (id: any) => {
    const notClickedInfo:movieInfo = (id.target.id === 'exitright') ? newMovie : oldMovie;
    const newValue:movieInfo = Object.assign({}, notClickedInfo)

    setNewMovie(nextMovie)
    setOldMovie(newValue)
  }

  return (
    <div id="movieCardsContainer">
      <div id="header1"> Main-Branch </div> 
      <MovieCard side={'left'} title={newMovie.title} genre={newMovie.genre}
      image={newMovie.image} elo={newMovie.elo} id={newMovie._id} 
      imgHelper={imgClickHelper} exitHelper={exitClickHelper}/>
      <MovieCard side={'right'} title={oldMovie.title} genre={oldMovie.genre} 
      image={oldMovie.image} elo={oldMovie.elo} id={oldMovie._id} 
      imgHelper={imgClickHelper} exitHelper={exitClickHelper}/>
    </div>
  );
};

export default MovieCardsContainer;