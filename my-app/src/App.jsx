import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get('https://fakestoreapi.com/products?limit=10');
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container">
      <div className="row">
        {data.map(item => (
            <div className="col-md-3 h-100 py-3" key={item.id}>
              <div className="card">
                <img className="card-img-top img-fluid" src={item.image} alt={`Product ${item.id}`} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}.</p>
                  <p className="card-text">Price: $ <span className="price">{item.price}</span> </p>
                  <a className="btn btn-primary buy">Buy Now</a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );




  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
