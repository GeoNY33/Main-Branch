import React, { useState } from 'react';

function SignUp() {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const handleUsernameInput = (input) => {
        setUsernameInput(input.target.value);
    }
    const handlePasswordInput = (input) => {
        setPasswordInput(input.target.value);
    }
    return (
      <div >
        <h1>Sign In</h1>
        <form  method='GET'>
          <label for="username">Username: </label>
          <input type="text" id="username" name="username"></input>
          <br></br>
          <label for="password">Password: </label>
          <input type="text" id="password" name="password"></input>
          <br></br>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
}

export default SignUp;