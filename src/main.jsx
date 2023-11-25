import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router';
import { RouterProvider } from 'react-router-dom';
import './assets/css/App.css';
import './assets/css/Main.css';
import './assets/css/Login.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
