import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./BookList.css";
import { useAppContext } from '../../store/context';

const Book = ({ bookId, thumbnail,  title, authors, description, price, publishedDay }) => {


  const { state, dispatch } = useAppContext();
  const handleAddToCart = () => {

    const user = localStorage.getItem("user");

    if (user === null) return alert("Bạn vui lòng đăng nhập để thêm vào giỏ hàng!");

    const { userId , username} = JSON.parse(user);
  
      const item = {
        bookId,
        userId,
        thumbnail ,
        title,
        authors,
        description,
        price,
        publishedDay,
        quantity: 1
      }
        dispatch({ type: 'ADD_TO_CART', payload: item });
 
  }

  return (
    <div className='book-item flex flex-column flex-sb'>
    <div className='book-item-img'>
      <img src = {thumbnail} alt = "cover" />
    </div>
    <div className='book-item-info text-center'>
      <Link to = {`/book/${bookId}`} >
        <div className='book-item-info-item title fw-7 fs-18'>
          <span>{title}</span>
        </div>
      </Link>

      <div className='book-item-info-item author fs-15'>
        <span className='text-capitalize fw-7'>Author: </span>
        <span>{authors}</span>
      </div>

      <div className='book-item-info-item edition-count fs-15'>
        <span className='text-capitalize fw-7'>Total Editions: </span>
        <span>{price}</span>
      </div>

      <div className='book-item-info-item publish-year fs-15'>
        <span className='text-capitalize fw-7'>First Publish Year: </span>
        <span>{publishedDay}</span>
      </div>
      <button className='addtoCart' type='button' onClick={handleAddToCart}>Add To Cart </button>
    </div>
  </div>
  );
};

export default Book