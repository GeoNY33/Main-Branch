import React from 'react';
import { isPropertySignature } from 'typescript';
import MovieCardsContainer from './MovieCardsContainer';
import DropDownContainer from './DropDownContainer';

const MainPageContainer = (props:any) => {
    return (
      <div id="MainPage">
        <MovieCardsContainer/>
      </div>
    );
};

export default MainPageContainer;