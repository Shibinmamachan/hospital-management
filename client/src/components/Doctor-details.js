// src/DoctorDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './doctor-details.css';
import { useNavigate } from 'react-router-dom'; // Add this
import Navbar from './navbar';

const DoctorDetails = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 4;
  const navigate = useNavigate();


  // Fetch doctors from API
  useEffect(() => {
    const token=localStorage.getItem("token")
    axios.get('http://localhost:3000/users/doctorlisting',{
      headers:{
       Authorization: "Token " + token,

      },
    }) // Update base URL/port if different
      .then((response) => {
        console.log("Doctors API Response:", response.data);

        setDoctors(response.data.data); // API returns { data: [...] }
        console.log(response.data.data)
      })
      .catch((err) => {
        console.error('Failed to fetch doctors:', err);
      });
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const startIndex = (currentPage - 1) * doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(startIndex, startIndex + doctorsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <Navbar></Navbar>
    <div className="doctor-page">
      <h1>Our Doctors</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search doctor by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button onClick={() => setCurrentPage(1)}>Search</button>
      </div>

     <div className="doctor-list">
  {currentDoctors.map((doc) => (
    <div
      key={doc.id}
      className="doctor-card"
      onClick={() => navigate(`/doctor/${doc.id}`)}
      style={{ cursor: 'pointer' }}
    >
     <img 
  src={`http://localhost:3000/images/${doc.image}`} 
  alt={doc.name} 
/>


      <div className="doctor-info">
        <h3>{doc.name}</h3>
        <p><strong>Department:</strong> {doc.department}</p>
        <p><strong>Experience:</strong> {doc.experience} years</p>
      </div>
    </div>
  ))}
</div>

      {filteredDoctors.length > doctorsPerPage && (
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
          <span> Page {currentPage} of {totalPages} </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default DoctorDetails;
