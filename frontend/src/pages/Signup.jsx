import React, { useState } from 'react'
import axios from 'axios';
let url = 'http://localhost:8080';
import { Link, useNavigate } from 'react-router-dom';
function Signup() {
  let navigate = useNavigate();
  let [signupInfo,setSignupInfo] = useState({
    name : '',
    email : '',
    password : ''
  })
  let handleChange = e => {
    let {name,value} = e.target;
    setSignupInfo({
      ...signupInfo,
      [name] : value,
    })
  }
  let handleSignup = e => {
    e.preventDefault();
    let {name,email,password} = signupInfo;
    if(!name || !email || !password){
      return window.toastify('name,email and password are required ','error');
    }
      axios.post(`${url}/auth/signup`,signupInfo)
  .then(function (response) {
    // handle success
    let {message,success} = response.data;
    // const details = error.details[0].message;
    // console.log(error);
    if(success){
      window.toastify(message,"success");
      setTimeout(() => {
        navigate('/login');
      },1000)
    }
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    let details = error.response.data.error.details[0].message;
    window.toastify(details || "Signup failed",'error');
    console.log(details);
  })
  }
    
  return (
    <>
    <div className='flex justify-center items-center h-[100vh]'>
      <div className='border-2 w-[300px] p-4'>
        <h1 className='text-2xl font-semibold mt-4'>Signup</h1>
        <form onSubmit={handleSignup}>
          <p className='text-medium font-semibold mt-2 mb-1'>Name</p>
          <input
          value={signupInfo.name}
          name='name'
          onChange={handleChange}
          type="text" className='w-full' placeholder='Enter Your Name...' />
          <p className='text-medium font-semibold mt-2 mb-1'>Email</p>
          <input
          value={signupInfo.email}
          onChange={handleChange}
          name='email'
          type="email" className='w-full' placeholder='Enter Your Email...' />
          <p className='font-semibold mt-2 mb-1'>Password</p>
          <input
          onChange={handleChange}
          value={signupInfo.password}
          name='password'
          type="password" className='w-full' placeholder='Enter Your Password...' />
          <button className='w-full bg-pink-800 text-white block py-1 text-sm rounded-sm my-3'>Signup</button>
          <p className='text-sm'>Already have account?<Link to='/login' className='text-pink-800 border-b-2 border-pink-800'>Login</Link></p>
        </form>
      </div>
    </div>
    </>
  )
}

export default Signup