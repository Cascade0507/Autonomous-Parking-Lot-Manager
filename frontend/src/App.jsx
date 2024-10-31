import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import CarAnimation from './CarAnimation'
import './CarAnimation.css'
import Navbar from './NavBar'

function App() {
  // const [count, setCount] = useState(0)
  // const [x,setX] = useState([])

  // const fecthAPI = async () => {
  //   const response = await axios.get('http://localhost:8080/api/users')
  //   setX(response.data.users)
  // };

  // useEffect( () => {
  //   fecthAPI();
  // },[]); 

  return (
    <div className='app'>
      <Navbar/>
      <div className='content'>
        <CarAnimation/>
      </div>
    </div>
  )
}

export default App
