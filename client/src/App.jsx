import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
     <Route path='/' element={<Home/>}></Route>
     <Route path='/home' element={<><Home/></>}></Route>
     <Route path='/about' element={<><AboutUs/></>}></Route>
     <Route path='*' element={<><Home/></>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
