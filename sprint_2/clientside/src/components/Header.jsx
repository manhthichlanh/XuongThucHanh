import { useState, useEffect , useReducer } from "react";

// import { useContext } from 'react';
// import { StoreContext } from '../store';
import { Link} from 'react-router-dom';
import cart from '../../public/cart.png'
import { useAppContext } from '../store/context';

function Header() {
    const { state, dispatch } = useAppContext();

    let quanlity = state.cartItems.length;

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
    };
    
    useEffect(() => {
        quanlity = state.cartItems.length
    },[state])
   
    return (
        <>
            <nav className="navbar">
                <div className="nav-right">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/blogs">Blogs</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/logout" onClick={handleLogout}>Log out</Link></li>         
                </div>
                <div className="nav-left">
                    <Link to="/cart">
                        <div className="img-zone">
                            <img src={cart} alt="" />
                        </div>
                        <div className="count">
                            {quanlity}
                        </div>
                    </Link>
                </div>
                    
            </nav>
        </>
        
    )
}
export default Header;