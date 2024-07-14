import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import Dashboard from "./Pages/Dashboard";
import Services from "./Pages/Services";
import Authentication from "./Pages/Authentication";
import PageNotFound from "./Pages/PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { changeLangSate } from "./features/SharedDataSlice/SharedData";
import DoctorsDashboard from "./Pages/Doctors/DoctorsDashboard";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Onboarding from "./Pages/Onboarding";

function App() {
  const lang = useSelector(state => state.afiaCare.langs); // load language translations
  const dispatch = useDispatch()

  // Simulate component loading
  const selectedLangKey = useSelector(state => state.afiaCare.selectedLangKey);
  dispatch(changeLangSate(selectedLangKey));

  return (
    <>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<><Home /></>}></Route>
        <Route path='/about' element={<><AboutUs /></>}></Route>
        <Route path='/contact' element={<><Contact /></>}></Route>
        <Route path='/services' element={<><Services /></>}></Route>
        <Route path='/dashboard' element={<><Dashboard /></>}></Route>
        <Route path='/doctor/dashboard' element={<><DoctorsDashboard /></>}></Route>
        <Route path='/admin/dashboard' element={<><AdminDashboard /></>}></Route>
        <Route path='/auth/onboarding' element={<><Onboarding /></>}></Route>
        <Route path='/authentication' element={<><Authentication /></>}></Route>
        <Route path='*' element={<><PageNotFound /></>}></Route>
      </Routes>
    </>
  );
}

export default App;
