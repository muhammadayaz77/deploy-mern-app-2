import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({setIsAuthenticated}) {
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      setIsAuthenticated(true);
      if(location.pathname === '/' ||
         location.pathname === '/login' ||
         location.pathname === '/signup' 
      ){
        navigate('/home',{replace : false})
      }
    }
  },[location,navigate,setIsAuthenticated])
  return (
    <>
    </>
  )
}

export default RefreshHandler