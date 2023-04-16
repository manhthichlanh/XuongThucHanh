import { useState, useContext } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import Layout from './components/Layout';
import Blog from './components/Blog';
import Contact from './components/Contact';
import NoPage from './components/Nopage';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Cart from './components/cart/Cart';
import Logout from './components/Logout';
function App() {

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
        <Route path="blogs" element={<Blog  />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cart" element={<Cart  />} />
        <Route path="cart" element={<Logout  />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
    
  )
}

export default App;
