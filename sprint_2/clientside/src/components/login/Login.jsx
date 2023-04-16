import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import './login.css';
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData ] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3005/login', {
      username,
      password
    })
    .then( async (response) => {
      const user = response.data.user;

      const message =response.data.message;

      setData(user);

      setMessage(message);

      if (response.status === 201) {
        const userId = user.userId
        const res = await fetch(`http://localhost:3005/carts?userId=${userId}&flag=0`);
        const data = await res.json();
        const book = data ? data.book:[];
        localStorage.setItem("cart", JSON.stringify(book));
        localStorage.setItem("user",JSON.stringify(user) );
        const timer = setTimeout(()=>{navigate("/");}, 1000);
        return 0;
      } 

      // console.log(data)
    })
    .catch((error) => {
      console.error(error);
    });
   
  };
    useEffect(()=>{
      const user = localStorage.getItem("user");

      if (user) navigate("/");
    },[])
    return (
        <div className='container-fluid' >
          <div className="login-page">
                <div className="form">
                  <div className="login">
                    <div className="login-header">
                      <h3>LOGIN</h3>
                      <p>Please enter your credentials to login.</p>
                    </div>
                  </div>
                  <form className="login-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="username" value={username} onChange={handleUsernameChange} required/>
                    <input type="password" placeholder="password"  value={password} onChange={handlePasswordChange}  required/>
                    <button>Login</button>
                    <p></p>
                    <p className="message">{message}</p>

                  </form>
                </div>
              </div>
        </div>
    )
}
export default Login