import React, {useEffect, useState} from 'react';
import { isPropertySignature, ObjectType, setConstantValue } from 'typescript';
type MovieCardProps = {
  side: string,
  genre: string,
  image: string,
  title: string,
  elo: number,
  id: number | string,  
  imgHelper: Function | null,
  exitHelper: Function | null,
};

const MovieCard = (props : MovieCardProps) => {
  const {side} = props
  return (
    <div id={props.side}>
      <button className="exitBtn" id={`exit${props.side}`} onClick={(id) => props.exitHelper(id)} >X</button>
      {props.title}
      <img className="movieImg" src={props.image} id={`img${props.side}`} onClick={(id) => props.imgHelper(id)}></img>
      {props.elo}
    </div>
  );
};

export default MovieCard;