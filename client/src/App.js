import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from "./components/Home";
import LoginPage from "./components/login";
import RegisterPage from './components/Register';
import DoctorDetails from './components/Doctor-details';
import DoctorView from './components/Doctor-view';
import Logout from './components/logout';
import BookingHistory from './components/BookingHistory';



function App() {
  return(
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/Register" element={<RegisterPage/>}/>
      <Route path='/Doctor-details' element={<DoctorDetails/>}/>
      <Route path="/doctor/:id" element={<DoctorView />} />
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/BookingHistory" element={<BookingHistory/>}/>
    </Routes>
  </Router>
);
}

export default App;