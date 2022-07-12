import React from 'react';
import { isPropertySignature } from 'typescript';

type MovieCardProps = {
  side : string
};

const MovieCard = (props : MovieCardProps) => {
  const clickHelper = (event: React.MouseEvent<HTMLImageElement>) =>{
    console.log('image clicked')
  }  
  
  return (
    <div id={props.side}>
      {/*props.title*/}
      <img className="movieImg" src='https://creativereview.imgix.net/content/uploads/2019/12/midsommar_ver2_xxlg.jpg?auto=compress,format&q=60&w=1013&h=' onClick ={clickHelper}></img>
      {/*props.description*/}
      {/*props.score*/}
    </div>
  );
};

export default MovieCard;