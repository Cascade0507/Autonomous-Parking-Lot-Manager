import './App.css'
import axios from 'axios'
import CarAnimation from './CarAnimation'
import './CarAnimation.css'
import Navbar from './NavBar'
import LoginPage from './LoginPage'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Car from './Car'
import StudentDashboard from './StudentDashboard'



function App() {

  return (
    <Router>
      <div>
      <Navbar/>
      <Routes>
      <Route path='/' exact Component={LoginPage} />
      <Route path='/manager' Component={CarAnimation}/>
      <Route path='/student_dashboard/' element={<StudentDashboard />}/>
      </Routes>
      </div>
    </Router>
  )
}

export default App
