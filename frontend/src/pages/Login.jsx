import React, { useState } from 'react'
import axios from 'axios';
let url = 'https://deploy-mern-app-2.vercel.app';
import { Link, useNavigate } from 'react-router-dom';
function Login() {
  let navigate = useNavigate();
  let [LoginInfo,setLoginInfo] = useState({
    email : '',
    password : ''
  })
  let handleChange = e => {
    let {name,value} = e.target;
    setLoginInfo({
      ...LoginInfo,
      [name] : value,
    })
  }
  let handleLogin = e => {
    e.preventDefault();
    let {email,password} = LoginInfo;
    if(!email || !password){
      return window.toastify('email and password are required ','error');
    }
      axios.post(`${url}/auth/login`,LoginInfo)
  .then(function (response) {
    // handle success
    let {message,success,name,jwtToken} = response.data;
    // const details = error.details[0].message;
    // console.log(error);
    if(success){
      window.toastify(message,"success");
      localStorage.setItem('token',jwtToken);
      localStorage.setItem('loggedInUser',name);
      setTimeout(() => {
        navigate('/home');
      },1000)
    }
  })
  .catch(function (error) {
    // handle error
    window.toastify("Login failed",'error');
    console.log(error)
  })
  }
    
  return (
    <>
    <div className='flex justify-center items-center h-[100vh]'>
      <div className='border-2 w-[300px] p-4'>
        <h1 className='text-2xl font-semibold mt-4'>Login</h1>
        <form onSubmit={handleLogin}>
          
          <p className='text-medium font-semibold mt-2 mb-1'>Email</p>
          <input
          value={LoginInfo.email}
          onChange={handleChange}
          name='email'
          type="email" className='w-full' placeholder='Enter Your Email...' />
          <p className='font-semibold mt-2 mb-1'>Password</p>
          <input
          onChange={handleChange}
          value={LoginInfo.password}
          name='password'
          type="password" className='w-full' placeholder='Enter Your Password...' />
          <button className='w-full bg-pink-800 text-white block py-1 text-sm rounded-sm my-3'>Login</button>
          <p className='text-sm'>Don't have account?<Link to='/signup' className='text-pink-800 border-b-2 border-pink-800' >Signup</Link></p>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login