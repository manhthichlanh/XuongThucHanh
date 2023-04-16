import axios from "axios";
import {useState, useEffect} from "react";
import Book from "./Book";
import "./BookList.css";
function BookList() {
    const [bookData,setBook] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3005/books')
        .then(response => {
          setBook(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },[])


    return (
        <div className="container">
            {
              bookData.slice(0, 30).map((book, index) => {
                return (

                    <Book 
                        key={index}
                        bookId={book.bookId}
                        thumbnail={book.thumnail}
                        title={book.title}
                        authors={book.authors}              
                        description={book.description}
                        price={book.price}
                        publishedDay={book.publishedDay}
                     />
                )
              })
            }
        </div>


    )
}
export default BookList;