import React from 'react';
import { isPropertySignature } from 'typescript';
import Display from '../components/Display';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DisplayContainer = (props:any) => {
  const nav = useNavigate()

    const loadMovies = async () => {
      let results:any = await axios.get('/api/getAllMovies')
      const resArr = [];
      results = await results.data
      const sortedRes = results.sort((a:any , b:any)=> b.elo - a.elo )
      for (let i = 0; i < sortedRes.length; i++) {
        resArr.push(
        <div>
          <img src={sortedRes[i].image}></img>
          <div key = {i} className = 'movieItem'>{i+1}.{await sortedRes[i].title}</div>
        </div> );
      }
      console.log(resArr)
      return resArr
    }

  const [movieList, updateMovieList] = useState([<div>Placeholder</div>]) 
  console.log("in display container")
  
  useEffect(()=>{
    const helper = async() => {
    const result = await loadMovies()
    updateMovieList(await result)
    };
    helper()
  },[])

    return (
      <div id="displayContainer">
        <div>here</div>
        <Display movieList={movieList}/>
      </div>
    );
};

export default DisplayContainer;