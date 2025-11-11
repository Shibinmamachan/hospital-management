var express = require('express');
 var router = express.Router();
 const path = require('path');
 /* GET home page. */
 router.get('/', function(req, res) {
   res.render('home');
 });

 router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/appoinments', function(req, res) {
  res.render('appoinments');
});

router.get('/doctor-listing', function(req, res) {
  res.render('doctor-listing');
});
 
router.get('/add-doctor', function(req, res) {
  res.render('add-doctor');
});

router.get('/view-doctor', function(req, res) {
  res.render('view-doctor');
});

router.get('/edit-doctor', function(req, res) {
  res.render('edit-doctor');
});

router.get('/patient-listing', function(req, res) {
  res.render('patient-listing');
});

router.get('/patient-history', function(req, res) {
  res.render('patient-history');
});


router.get('/report', function(req, res) {
  res.render('report');
});



// router.get('\views\doctorlist.ejs', function(req, res) {
//   res.render('doctorlist');
// });

 module.exports = router;