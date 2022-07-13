import React, { useState } from 'react';
import axios from 'axios';

function Display() {
    const array = [];
    axios.get('/api/getAllMovies')
      .then(function (data) {
        console.log(data);
        for (let i = 0; data.length; i++) {
          array.push(data[i]);
        }
      })
    .catch(function (error) {
      console.log(error);
    });
    array.sort((a, b) => b.elo - a.elo);
    const ranking = [];
    for (let i = 0; i < array.length; i++) {
        ranking.push(<div key = {i} classname = 'movieItem'>{i+1}.{array[i].title}</div>);
    }
    return (
        <div className='movieContainer'>
            {ranking}
        </div>
    );
}

export default Display;