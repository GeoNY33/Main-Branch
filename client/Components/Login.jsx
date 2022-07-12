import React, { useState } from 'react';

function Login() {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const handleUsernameInput = (input) => {
        setUsernameInput(input.target.value);
    }
    const handlePasswordInput = (input) => {
        setPasswordInput(input.target.value);
    }
    const findUser = () => {
        // testing input is working
        console.log(usernameInput, passwordInput);
        // send axios post
        axios.post('http://localhost:3000/users/signin', {
          username: usernameInput,
          password: passwordInput,
        }).then((res) => {
          console.log(res);
          if (res.data === 'User Not Found') {
            // displays error msg if invalid
            document.querySelector('.error-msg').style.display = 'block';
          } else {
            window.location.assign('/home');
          }
        })
        // clear inputs after button click
        setUsernameInput('');
        setPasswordInput('');
    }
    return (
      <div >
        <h1>Sign In</h1>
        <form action="/signin" method='GET'>
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

// function Example() {
//     // Declare a new state variable, which we'll call "count"
//     const [count, setCount] = useState(0);
  
//     return (
//       <div>
//         <p>You clicked {count} times</p>
//         <button onClick={() => setCount(count + 1)}>
//           Click me
//         </button>
//       </div>
//     );
//   }

export default Login;