import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Import useHistory for navigation
import './LoginPage.css';

const LoginPage = () => {
  const [studentId, setStudentId] = useState('');
  const [managerId, setManagerId] = useState('');
  const [isStudentLogin, setIsStudentLogin] = useState(true);
  const navigate = useNavigate(); // Create a history object for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (isStudentLogin) {
        try {
            // Await the response from axios.get directly
            const response = await axios.get(`http://localhost:8080/student/${studentId}`);
            
            if (response.data === 1) {
              // Redirect to the CarAnimation page on success
              console.log(studentId)
              navigate(`/student_dashboard`,{ state: { studentId } });
            } else {
              // Show alert if manager credentials do not exist
              alert("Student credentials don't exist.");
            }
          } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occurred while logging in.");
          }
    } else {
      try {
        // Await the response from axios.get directly
        const response = await axios.get(`http://localhost:8080/admin/${managerId}`);
        
        if (response.data === 1) {
          // Redirect to the CarAnimation page on success
          navigate('/manager');
        } else {
          // Show alert if manager credentials do not exist
          alert("Manager credentials don't exist.");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred while logging in.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>{isStudentLogin ? 'Student Login' : 'Manager Login'}</h2>
      <form onSubmit={handleLogin}>
        {isStudentLogin ? (
          <div>
            <input
              type="text"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Enter Manager ID"
              value={managerId}
              onChange={(e) => setManagerId(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit">Login</button>
      </form>
      <button onClick={() => setIsStudentLogin(!isStudentLogin)}>
        Switch to {isStudentLogin ? 'Manager' : 'Student'} Login
      </button>
      {isStudentLogin && (
        <div>
          <h4>New Student? Register Here!</h4>
          <button onClick={() => alert("Registration feature coming soon!")}>
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;


//;akdbvjklsadbcv a
//sdcalksdnvjeb
//jkasbdjkvbdqwjkfbk
//fbasdkljbasjkdbjk3rkasd
//
//klasbndjkcbasdjkbz
//fkashdvkh0