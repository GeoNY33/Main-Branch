import React, {useEffect, useState} from 'react';
import { isPropertySignature, ObjectType, setConstantValue } from 'typescript';
type MovieCardProps = {
  side: string,
  genre: string,
  image: string,
  title: string,
  elo: number,
  id: number | string,  
  helper: Function | null
};

const MovieCard = (props : MovieCardProps) => {
  const {side} = props
  return (
    <div id={props.side}>
      <button className="exitBtn" id={`btn${props.side}`} >X</button>
      {props.title}
      <img className="movieImg" src={props.image} id={`img${props.side}`} onClick={(id) => props.helper(id)}></img>
      {props.elo}
    </div>
  );
};

export default MovieCard;