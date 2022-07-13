import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const nav = useNavigate()
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const handleUsernameInput = (input) => {
        setUsernameInput(input.target.value);
    }
    const handlePasswordInput = (input) => {
        setPasswordInput(input.target.value);
    }
    const findUser = () => {
        console.log(usernameInput, passwordInput);
        axios.post('api/verifyUser', {
          username: usernameInput,
          password: passwordInput,
        }).then((res) => {
          console.log(res);
          nav('/main')
          //window.location.assign('/MainPageContainer');
        })
        setUsernameInput('');
        setPasswordInput('');
    }
    return (
      <div className='innerSignInDiv'>
        <h1>Sign In</h1>
        <div className='innerSignInDiv'>
            <input required className="username-input" onChange={handleUsernameInput} value={usernameInput} type="text" placeholder="Username" />
            <input required className="password-input" onChange={handlePasswordInput} value={passwordInput} type="password" placeholder="Password" />
            <button className="signin-btn" onClick={findUser}>Enter</button>
            <button className="signup-btn" onClick={()=>nav('signup')}>Sign Up</button>
        </div>
      </div>
    );
}

export default Login;