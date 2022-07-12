import React, { useState } from 'react';

function Display() {
    const array = [];
    axios.get('/api/getAllMovies')
    for (let i = 1; i < 6; i++) {
        array.push(<div>{i}</div>);
    }
    return (
        <div>
            {array}
        </div>
    );
}

export default Display;