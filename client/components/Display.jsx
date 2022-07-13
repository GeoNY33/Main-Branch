import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Display(props) {
    const nav = useNavigate()

    return (
        <div className='movieContainer'>
            <button onClick={()=>{nav('/main')}}>Back to Main</button>
            { props.movieList } 
        </div>
    );
}

export default Display;