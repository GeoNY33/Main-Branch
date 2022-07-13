import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './stylesheets/styles.css';
import MainPageContainer from './containers/MainPageContainer';

const App = (props:any) => {

  return (
    <div>
      <MainPageContainer/>
    </div>
  );
}

export default App;