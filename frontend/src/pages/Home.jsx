import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Home() {
  let [name,setName] = useState('');
  let [products,setProducts] = useState([]);
  let navigate = useNavigate('');
  useEffect(() => {
    setName(localStorage.getItem('loggedInUser'));
  })
  let handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    window.toastify('Logout Successfully','success');
    setTimeout(()=>{
      navigate('/login')
    },1000)
  }
  const fetchedProducts = async () => {
    try {
      const url = 'https://deploy-mern-app-2.vercel.app/products';
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `${token}`
      };
  
      const response = await axios.get(url, { headers });
      const result = response.data;
      console.log(result); // Log the result or handle it as needed
      setProducts(result);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
    }
  };
  useEffect(()=>{
    fetchedProducts();
  },[])
  console.log("products",products)
  return (
    <div className='flex justify-center items-center h-[100vh]'>
<div>
  
<h1 className='font-semibold text-2xl'>Welcome {name}</h1>
      <button onClick={handleLogout} className='bg-purple-700 rounded-md text-white p-2 '>Logout</button>
      <ul>
        {
            products.map(item => {
              return <li>{item.name} : {item.price}
              </li>
            })
        }
      </ul>
</div>
    </div>
    
  )
}

export default Home