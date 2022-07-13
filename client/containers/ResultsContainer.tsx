import React from 'react';
import { isPropertySignature } from 'typescript';
import Display from '../components/Display';

const DisplayContainer = (props : Object) => {
    return (
      <div>
        <Display/>
      </div>
    );
};

export default DisplayContainer;