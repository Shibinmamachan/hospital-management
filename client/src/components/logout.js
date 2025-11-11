import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar"; // ✅ Capitalized import (must match file name)
import "./ClientProfile.css";

const ClientProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view and update your profile.");
      return;
    }

    axios
      .get("http://localhost:3000/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const { name, email, age, contact_number } = response.data;
        setFormData({
          name,
          email,
          age,
          phone: contact_number, // adjust if backend uses contact_number
          password: "",
        });
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        setError("Failed to load profile. Please try again.");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, age, phone, password } = formData;
    if (!name || !email || !age || !phone || !password) {
      setError("Please fill in all fields.");
      setMessage("");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to update your profile.");
      return;
    }

    axios
      .put(
        "http://localhost:3000/users/profile",
        {
          name,
          email,
          age,
          contact_number: phone, // backend expects this field
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setMessage("Profile updated successfully!");
        setFormData({ ...formData, password: "" });
        setError("");
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        setError("Failed to update profile. Please try again.");
        setMessage("");
      });
  };

  return (
    <div>
      <Navbar /> {/* ✅ Self-closing tag */}
      <div className="profile-container">
        <h1>Client Profile</h1>
        <form onSubmit={handleSubmit} className="profile-form">
          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}

          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleChange}
          />

          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ClientProfile;
