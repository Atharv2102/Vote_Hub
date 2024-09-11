import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { Outlet, createBrowserRouter,Route,RouterProvider } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Vote from './Pages/Vote';
import Results from './Pages/Results';
import Benefits from './Pages/Benefits';
import Notfound from './Pages/Notfound';  
import Login from './Pages/Login';
import SignIn from './Pages/SignIn';  
import Candidate from './Components/Candidate';    
const Applayout=()=>{
    return(
        <div>
        <Navbar/>
        <Outlet/>
    </div>
    )
   
}

const appRouter= createBrowserRouter([
    {
        element:<Applayout/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/vote",
                element:<Vote/>
            },
            {
                path:"/results",
                element:<Results/>
            },{
                path:"/benefits",
                element:<Benefits/>
            },
            {
                path:"*",
                element:<Notfound/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/signin",
                element:<SignIn/>
            },
            {
                path:"/candidate",
                element:<Candidate/>
            },
            {
                path:"/candidate/:pinCode",
                element:<Candidate/>
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <RouterProvider router={appRouter} />
    // <App/>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
