import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import axios from "axios";
import Navbar from "./navbar";
import "./Doctor-view.css";

const DoctorView = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Initialize navigate

  const [doctor, setDoctor] = useState(null);
  const [booking, setBooking] = useState({ date: "", time: "" });
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view doctor details.");
      return;
    }

    axios
      .get(`http://localhost:3000/users/find_doctor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDoctor(response.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch doctor:", err);
        setError("Failed to load doctor details. Please try again.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!booking.date || !booking.time) {
      setError("Please select both date and time.");
      setConfirmation("");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to book an appointment.");
      return;
    }

    axios
      .post(
        "http://localhost:3000/users/bookAppointment",
        { doctorId: id, date: booking.date, time: booking.time },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setConfirmation(
          `Appointment booked with ${doctor.name} on ${booking.date} at ${booking.time}`
        );
        setError("");
        setBooking({ date: "", time: "" });

        // ✅ Redirect after short delay (optional)
        setTimeout(() => {
          navigate("/BookingHistory"); // Replace with your actual route
        }, 1500);
      })
      .catch((err) => {
        console.error("Booking error:", err);
        setError("Failed to book the appointment. Please try again.");
        setConfirmation("");
      });
  };

  if (!doctor) {
    return <div>Loading doctor details...</div>;
  }

  return (
    <div>
      <Navbar></Navbar>
    <div className="doctor-view-container">
      <h1>Doctor Details</h1>
      <div className="doctor-card">
        <img src={`http://localhost:3000/${doctor.image}`} alt={doctor.name} />
        <div className="info">
          <p><strong>Name:</strong> {doctor.name}</p>
          <p><strong>Department:</strong> {doctor.department}</p>
          <p><strong>Experience:</strong> {doctor.experience} years</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <h2>Book an Appointment</h2>

        {error && <p className="error">{error}</p>}

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={booking.date}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          required
        />

        <label>Time</label>
        <input
          type="time"
          name="time"
          value={booking.time}
          onChange={handleChange}
          required
        />

        <button type="submit">Book Appointment</button>
      </form>

      {confirmation && <p className="confirmation">{confirmation}</p>}
    </div>
    </div>
  );
};

export default DoctorView;
