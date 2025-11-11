const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Doctor = require('../models/doctorModels');

// GET /appointments
router.get('/', async (req, res) => {
  try {
    const { query, calendar } = req.query;
    const users = await User.find().populate('appointment.doctor_id');

    let appointments = [];

    users.forEach(user => {
      user.appointment.forEach(app => {
        // Basic filters
        const matchesDate = !calendar || new Date(app.date).toDateString() === new Date(calendar).toDateString();
        const matchesQuery =
          !query ||
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          (app.doctor_id && app.doctor_id.name.toLowerCase().includes(query.toLowerCase()));

        if (matchesDate && matchesQuery) {
          appointments.push({
            patientName: user.name,
            doctorName: app.doctor_id?.name || 'Unknown',
            specialization: app.doctor_id?.department || 'Unknown',
            time: app.time,
            date: app.date.toDateString()
          });
        }
      });
    });

    res.render('appointments', { appointments });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});


module.exports = router;
