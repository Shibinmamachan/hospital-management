var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctorModels')
const mongoose = require('mongoose');

// route for signup
router.post('/signupapi', (req, res) => {
  const { name, address, age, gender, contact_number, email, password, confirmPassword } = req.body;

  // Check if the password and confirm password match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Password and Confirm Password do not match' });
  }

  // Check if any field is empty
  if (!name || !address || !age || !gender || !contact_number || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if the email is already taken
  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ message: 'Email already taken' });
      }
      // Hash the password using bcrypt
      return bcrypt.hash(password, 10);
    })
    .then(hashedPassword => {
      // Create a new user with the hashed password
      const newUser = new User({ 
        name,
        address,
        age,
        gender,
        contact_number,
        email,
        password: hashedPassword 
      });

      // Save the new user
      return newUser.save();
    })
    .then(savedUser => {
      // Respond with success
      res.status(201).json({ message: 'Account created successfully' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});


  


 // for generating  secret key
const crypto = require('crypto');

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};
console.log(generateSecretKey());


// const jwt = require('jsonwebtoken');


// Login API
router.post('/loginapi', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Use secret from .env
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      message: "Login successful",
      token 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


 // for verifying token for protected route


const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET , (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
};
  


//for getting products


router.get('/doctorlisting',verifyToken, (req, res) => {
  Doctor.find()
      .then(data => {
          const serializedData = data.map(doctor => ({
              id: doctor._id,
              name: doctor.name,
              experience: doctor.experience,
              department: doctor.department,
              image:doctor.image
          }));
          res.status(200).json({ data: serializedData });
      })
      .catch(error => {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
      });
});



router.get('/find_doctor/:id',verifyToken, (req, res) => {
  const doctor_id = req.params.id;

  // Convert string to ObjectId
  const objectId = new mongoose.Types.ObjectId(doctor_id);

  Doctor.findOne({ _id: objectId })
    .then(data => {
      if (!data) {
        return res.status(404).json({ message: 'Doctor not found' });
      }


      const serializedData = {
        id: data._id,
        name: data.name,
        experience: data.experience,
        department: data.department,
        image: data.image
      };

      res.status(200).json({ data: serializedData });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});
// POST /api/users/bookAppointment
router.post('/bookAppointment', verifyToken, async (req, res) => {
  const { doctorId, date, time } = req.body;

  if (!doctorId || !date || !time) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Add the appointment to the user's record
    user.appointment.push({
      doctor_id: doctorId,
      date,
      time
    });

    await user.save();

    res.status(200).json({ message: "Appointment booked successfully." });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get('/appointments/history', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('appointment.doctor_id', 'name'); // Populating doctor name

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If there are no appointments
    if (user.appointment.length === 0) {
      return res.status(200).json({ data: [] });
    }

    const appointments = user.appointment.map(appt => {
      const appointmentDate = new Date(appt.date);
      const [hour, minute] = appt.time.split(':'); // Assuming time is in "HH:mm" format
      appointmentDate.setHours(hour, minute);

      return {
        doctorName: appt.doctor_id.name, 
        date: appointmentDate.toISOString().split('T')[0], 
        time: appt.time,
      };
    });

    res.status(200).json({ data: appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error.message); // Log specific error
    res.status(500).json({ message: 'Error fetching appointment history', error: error.message }); // Send more detailed error
  }
});
// Cancel a specific appointment
router.delete('/appointments/:date/:time', verifyToken, async (req, res) => {
  const { date, time } = req.params;

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const originalLength = user.appointment.length;

    // Normalize date format before comparing
    user.appointment = user.appointment.filter((appt) => {
      const apptDate = new Date(appt.date).toISOString().split('T')[0];
      return !(apptDate === date && appt.time === time);
    });

    if (user.appointment.length === originalLength) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    await user.save();
    res.status(200).json({ message: "Appointment cancelled successfully." });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET /users/profile - Get current user's profile
router.get('/users/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;