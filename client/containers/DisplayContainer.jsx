import React from 'react';
import { isPropertySignature } from 'typescript';
import Display from '../components/Display';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DisplayContainer = (props) => {
  const nav = useNavigate()

    const loadMovies = async () => {
      let results = await axios.get('/api/getAllMovies')
      const resArr = [];
      results = await results.data
      const sortedRes = await results.sort((a , b)=> b.elo - a.elo)
      for (let i = 0; i < sortedRes.length; i++) {
        resArr.push(<div key = {i} classname = 'movieItem'>{i+1}.{await sortedRes[i].title}</div>);
      }
      console.log(resArr)
      return resArr
    }

  const [movieList, updateMovieList] = useState([<div>Placeholder</div>]) 
  console.log("in display container")
  
  useEffect(async ()=>{
    const result = await loadMovies()
    console.log(results, 'here')
    updateMovieList(await result)
  },[])
  
  console.log(movieList)
    return (
      <div id="displayContainer">
        <div>here</div>
        <Display movieList={movieList}/>
      </div>
    );
};

export default DisplayContainer;