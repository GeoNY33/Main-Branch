import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function SignUp() {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const handleUsernameInput = (input) => {
        setUsernameInput(input.target.value);
    }
    const handlePasswordInput = (input) => {
        setPasswordInput(input.target.value);
    }
    const createUser = () => {
        console.log(usernameInput, passwordInput);
        axios.post('/api/newUser', {
          username: usernameInput,
          password: passwordInput,
        }).then((res) => {
          console.log(res);
          //window.location.assign('/MainPageContainer');
          nav('/main');
        })
        setUsernameInput('');
        setPasswordInput('');
    }
    let nav = useNavigate();
    return (
      <div className='outerSignUpDiv'>
        <h1>Sign Up</h1>
        <div className='innerSignUpDiv'>
            <input required className="username-input" onChange={handleUsernameInput} value={usernameInput} type="text" placeholder="Username" />
            <input required className="password-input" onChange={handlePasswordInput} value={passwordInput} type="password" placeholder="Password" />
            <button className="signup-btn" onClick={createUser}>Enter</button>
        </div>
      </div>
    );
}

export default SignUp;