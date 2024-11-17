import React, { useState } from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import { Navigate, Route,Routes } from 'react-router-dom'
import RefreshHandler from './pages/RefreshHandler'

function App() {
  let [isAuthenticated,setIsAuthenticated] = useState(false);
  let PrivateRoute = ({element}) => {
    return isAuthenticated ? element : <Navigate to='/login' />
  }
  return (
    <>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
    <Routes>
      <Route path='/' element={<Navigate to='login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<PrivateRoute element={<Home />} />} />
    </Routes>

    <ToastContainer 
    position="bottom-left"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    >

    </ToastContainer>
    </>
  )
}

export default App