import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import Dashboard from "./Pages/Dashboard";
import Services from "./Pages/Services";
import Authentication from "./Pages/Authentication";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
     <Route path='/' element={<Home/>}></Route>
     <Route path='/home' element={<><Home/></>}></Route>
     <Route path='/about' element={<><AboutUs/></>}></Route>
     <Route path='/contact' element={<><Contact/></>}></Route>
     <Route path='/services' element={<><Services/></>}></Route>
     <Route path='/dashboard' element={<><Dashboard/></>}></Route>
     <Route path='/authentication' element={<><Authentication/></>}></Route>
     <Route path='*' element={<><PageNotFound/></>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
