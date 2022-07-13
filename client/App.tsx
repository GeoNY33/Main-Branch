import React, { useContext, createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './stylesheets/styles.css';
import MainPageContainer from './containers/MainPageContainer';
import Login from './components/Login';
import SignUp from './components/SignUp';
import DisplayContainer from "./containers/DisplayContainer";

const App = (props:any) => {
  //    <Link to="/main">button</Link>
  return (
    <div>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/main' element={<MainPageContainer/>}/>
        <Route path='/display' element={<DisplayContainer/>}/>
      </Routes>
    </div>
  )   
 }

export default App;