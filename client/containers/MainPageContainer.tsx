import React from 'react';
import { isPropertySignature } from 'typescript';
import MovieCardsContainer from './MovieCardsContainer';
import DropDownContainer from './DropDownContainer';

const MainPageContainer = (props:any) => {
    return (
      <div id="MainPage">
        <MovieCardsContainer/>
        <DropDownContainer/>
      </div>
    );
};

export default MainPageContainer;