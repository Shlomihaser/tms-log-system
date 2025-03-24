import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import MainSection from './components/MainSection';
import { Toaster } from 'react-hot-toast';

import './index.css';
import { createBrowserRouter } from 'react-router-dom';
import { AuthenticationContextProvider } from './contexts/AuthenticationContextProvider';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';


const router = createBrowserRouter([
  {
    element: <AuthenticationContextProvider/>,
    children:[
      { path: "/", 
        element: <>
        <Navbar/>
        <MainSection/>
        </>
     },
      { path: "/login", element:<LoginPage/>}
    ]
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster/> {/* Active Toasts */}
  </StrictMode>,
)