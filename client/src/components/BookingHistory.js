import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import "./BookingHistory.css";

const BookingHistory = () => {
  const [pastAppointments, setPastAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in to view your appointment history.");
      return;
    }

    axios
      .get("http://localhost:3000/users/appointments/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const appointments = response.data.data;

        const now = new Date();
        const past = [];
        const upcoming = [];

        appointments.forEach((appt) => {
          const apptDate = new Date(`${appt.date}T${appt.time}`);
          if (apptDate < now) {
            past.push(appt);
          } else {
            upcoming.push(appt);
          }
        });

        setPastAppointments(past);
        setUpcomingAppointments(upcoming);
      })
      .catch((err) => {
        console.error("Error fetching appointment history:", err);
        setError("Failed to load appointments. Please try again.");
      });
  };

  const handleCancelAppointment = (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to cancel appointments.");
      return;
    }

    axios
      .delete(`http://localhost:3000/users/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setUpcomingAppointments((prev) => prev.filter((appt) => appt.id !== id));
        setSuccessMessage("Appointment cancelled successfully.");
      })
      .catch((err) => {
        console.error("Error cancelling appointment:", err);
        setError("Failed to cancel the appointment. Please try again.");
      });
  };

  // ✅ MAKE SURE RETURN IS INSIDE THE FUNCTION
  return (
    <div>
      <Navbar />
      <div className="history-container">
        <h1>Appointment History</h1>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <div className="section">
          <h2>Past Appointments</h2>
          {pastAppointments.length === 0 ? (
            <p>No past appointments found.</p>
          ) : (
            pastAppointments.map((appt, index) => (
              <div key={index} className="appointment-card past">
                <p><strong>Doctor:</strong> {appt.doctorName}</p>
                <p><strong>Date:</strong> {appt.date}</p>
                <p><strong>Time:</strong> {appt.time}</p>
              </div>
            ))
          )}
        </div>

        <div className="section">
          <h2>Upcoming Appointments</h2>
          {upcomingAppointments.length === 0 ? (
            <p>No upcoming appointments scheduled.</p>
          ) : (
            upcomingAppointments.map((appt, index) => (
              <div key={index} className="appointment-card upcoming">
                <p><strong>Doctor:</strong> {appt.doctorName}</p>
                <p><strong>Date:</strong> {appt.date}</p>
                <p><strong>Time:</strong> {appt.time}</p>
                <button
                  className="cancel-button"
                  onClick={() => handleCancelAppointment(appt.id)}
                >
                  Cancel
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
