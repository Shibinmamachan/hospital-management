const express = require('express');
const router = express.Router();

const username = 'admin';
const password = 'admin123';

router.get('/login', (req, res) => {
  res.render('login', { errorMessage: null });
});

router.post('/login', (req, res) => {
  const { username: inputUser, password: inputPass } = req.body;

  if (inputUser === username && inputPass === password) {
    res.render("add-doctor");
  } else {
    res.render('login', { errorMessage: 'Invalid username or password' });
  }
});

module.exports = router;
