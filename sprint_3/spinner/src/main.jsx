import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from './App'
import './index.css'
import { AppContextProvider } from './context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>   
    <AppContextProvider> 
        <App />
      </AppContextProvider>
    <ToastContainer />
  </React.StrictMode>,
)
