// StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const location = useLocation();
    const studentId = location.state?.studentId;
  const [studentDetails, setStudentDetails] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [licenseToClose, setLicenseToClose] = useState('');

  useEffect(() => {
    // Fetch student details when component mounts
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/student_deet/${student_Id}`);
        setStudentDetails(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
        alert('Failed to load student details.');
      }
    };
    fetchStudentDetails();
  }, [student_Id]);

  const handleFetchVehicles = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/student_vehicles/${studentId}`);
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      alert('Failed to load vehicles.');
    }
  };

  const handleFetchReservations = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/get_reserves/${studentId}`);
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      alert('Failed to load reservations.');
    }
  };

  const handleCloseReservation = async () => {
    try {
      await axios.get(`http://localhost:8080/close_reservation/${studentId}/${licenseToClose}`);
      alert(`Reservation for vehicle ${licenseToClose} closed.`);
      setLicenseToClose('');  // Clear input after closing
      handleFetchReservations(); // Refresh reservations
    } catch (error) {
      console.error('Error closing reservation:', error);
      alert('Failed to close reservation.');
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Student Dashboard</h2>
      
      {studentDetails && (
        <div className="student-details">
          <h3>Student Information</h3>
          <ul>
            <li><strong>ID:</strong> {studentDetails.id}</li>
            <li><strong>Name:</strong> {studentDetails.name}</li>
            <li><strong>Email:</strong> {studentDetails.email}</li>
            {/* Add more fields as needed */}
          </ul>
        </div>
      )}

      <div className="dashboard-buttons">
        <button onClick={handleFetchVehicles}>Show Registered Vehicles</button>
        <button onClick={handleFetchReservations}>Show Reservations</button>
        
        <div className="close-reservation">
          <input
            type="text"
            placeholder="Enter License to Close"
            value={licenseToClose}
            onChange={(e) => setLicenseToClose(e.target.value)}
          />
          <button onClick={handleCloseReservation}>Close Reservation</button>
        </div>
      </div>

      <div className="results-container">
        {vehicles.length > 0 && (
          <div className="vehicles-list">
            <h3>Registered Vehicles</h3>
            <ul>
              {vehicles.map((vehicle, index) => (
                <li key={index}>{vehicle}</li>
              ))}
            </ul>
          </div>
        )}

        {reservations.length > 0 && (
          <div className="reservations-list">
            <h3>Reservations</h3>
            <ul>
              {reservations.map((reservation, index) => (
                <li key={index}>{reservation}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
