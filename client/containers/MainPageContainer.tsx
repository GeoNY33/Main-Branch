import React from 'react';
import { isPropertySignature } from 'typescript';
import MovieCardsContainer from './MovieCardsContainer';
import { useNavigate } from 'react-router-dom';

const MainPageContainer = (props:any) => {
  const nav = useNavigate();

    return (
      <div id="MainPage">
        <MovieCardsContainer/>
        <button onClick={() => nav('/display')}>See Results</button>
      </div>
    );
};

export default MainPageContainer;