import React, {useState} from 'react';
import { isPropertySignature, setConstantValue } from 'typescript';

type MovieCardProps = {
  side: string,
  genre: string,
  image: string,
  title: string,
  elo: number,
  id: number,  
  setMovie: Function
};

const MovieCard = (props : MovieCardProps) => {

  const imageClickHelper = (event: React.MouseEvent<HTMLImageElement>) =>{    
    const newValue = Object.assign({}, props);
    newValue.elo = props.elo + 1
    delete newValue.setMovie 
    props.setMovie(newValue);
  }; 

  return (
    <div id={props.side}>
      <button className="exitBtn" id={`btn${props.side}`} >X</button>
      {props.title}
      <img className="movieImg" src={props.image} onClick={imageClickHelper}></img>
      {props.elo}
    </div>
  );
};

export default MovieCard;