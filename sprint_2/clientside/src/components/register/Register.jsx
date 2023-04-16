import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './register.css';
function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [data, setData ] = useState("");
  const [message, setMessage] = useState("");
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };
  const handleFirstChange = (event) => {
    setFirstname(event.target.value);
  };
  const handleLastChange = (event) => {
    setLastname(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username,firstname,lastname,email,address,phone,password)
    axios.post('http://localhost:3005/register', {
      username,
      firstname,
      lastname,
      email,
      address,
      phone,
      password
    })
    .then((response) => {
      const user = response.data.user;
      const message = response.data.message
      setData(user);
      setMessage(message)
      if (response.status === 201) {
        const timer = setTimeout(()=>{navigate("/login");}, 1000);
        return 0;
      } 
      // console.log(data)
    })
    .catch((error) => {
      console.error(error);
    });  
    };
    return (
        <>
<div className='container-fluid'>
<div className="register-page">
      <div className="form">
        <div className="register">
          <div className="register-header">
            <h3>REGISTER</h3>
            <p>Please enter your credentials to register.</p>
          </div>
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="username" name="username" onChange={handleUsernameChange} required />
            <input type="text" placeholder="firstname" name="firstname" onChange={handleFirstChange} required />
            <input type="text" placeholder="lastname" name="lastname" onChange={handleLastChange} required />
            <input type="email" placeholder="email" name="email" onChange={handleEmailChange} required />
            <input type="text" placeholder="address" name="address" onChange={handleAddressChange} required />
            <input type="password" placeholder="password" name="password" onChange={handlePasswordChange} required />
            <input type="text" placeholder="phone" name="phone" onChange={handlePhoneChange} required />

          <button>Register</button>
          <p></p>
          <p className="message">{message}</p>

        </form>
      </div>
    </div>
    </div>
        </>
    )
}
export default Register;