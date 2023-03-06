import React, { useState, useEffect } from 'react';
import Card from "./Card";
import axios from "axios";
const Main=()=>{

    const [bookData,setData]=useState([]);

    async function fetchData() {
        try {
          const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=all&orderBy=newest&key=AIzaSyBT6FQFWpyDXaOm2QeA8V_BaHlCIOHRtvg&maxResults=8');
          setData(response.data.items);
        } catch (error) {
          console.log(error);
        }
      }
    
      useEffect(() => {
        fetchData();
      }, []);
    return(
        <>
            <div className="header">
                <div className="row1">
                    
                </div>
                <div className="row2">
                    
                    <img src="./images/bg2.png" alt="" />
                </div>
            </div>

            <div className="container">
              {
                    <Card book={bookData}/>
              }  
            </div>
        </>
    )
}
export default Main;