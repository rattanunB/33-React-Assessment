import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './component/Home/Home.jsx';
import Owner from './component/Owner/Owner.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "owner",
    element: <Owner/>,
  },

  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>    
     <RouterProvider router={router} />
  </React.StrictMode>,
)
