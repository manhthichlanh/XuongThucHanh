import React, {useEffect} from "react";
import BookList from "../booklist/BookList";
import './home.css'
import { useAppContext } from "../../store/context";
function Home() {
    const  { data, setData } = useAppContext();

    const handleClick = () => {
        const total = data + 1;
        setData(total)
      }

    return (
        <>
            <BookList/>
            <button onClick={()=>handleClick()}>Click đi</button>        </>
    )
}
export default Home;