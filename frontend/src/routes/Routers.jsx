import React from "react";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import Notfound from "../pages/NotFound";
import MyAccount from "../Dashboard/user-account/MYAccount.jsx"
import Dashboard from "../Dashboard/doctor-account/Dashboard.jsx"

import { Routes, Route } from "react-router-dom";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/users/profile/me" element={<MyAccount />} />
      <Route path="/doctors/profile/me" element={<Dashboard />} />

      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default Routers;
