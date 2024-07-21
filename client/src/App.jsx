import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import Dashboard from "./Pages/Users/Dashboard";
import Services from "./Pages/Services";
import Authentication from "./Pages/Authentication";
import PageNotFound from "./Pages/PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { changeLangSate } from "./features/SharedDataSlice/SharedData";
import DoctorsDashboard from "./Pages/Doctors/DoctorsDashboard";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Onboarding from "./Pages/Onboarding";
import Consultation from "./Pages/Users/Consultation";
import Emergency from "./Pages/Users/Emergency";
import Donations from "./Pages/Users/Donations";
import Facilities from "./Pages/Users/Facilities";
import MainLoad from "./loads/MainLoad";
import { useEffect } from "react";

function App() {
  const lang = useSelector(state => state.afiaCare.langs); // load language translations
  const dispatch = useDispatch()

  const UserInfo = useSelector(state => state.afiaCare.usersLogin);
  // Simulate component loading
  const selectedLangKey = useSelector(state => state.afiaCare.selectedLangKey);
  dispatch(changeLangSate(selectedLangKey));
  const [load, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    if (UserInfo.access_token && UserInfo.UserInfo) {
      setIsAuthenticated(true);
    }
  }, []);

  const getComponent = (component) => {
    return isAuthenticated ? component : <Authentication />;
  };
  
  return (
    <>
      {load ?
        <MainLoad /> :
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/home' element={<><Home /></>}></Route>
          <Route path='/about' element={<><AboutUs /></>}></Route>
          <Route path='/contact' element={<><Contact /></>}></Route>
          <Route path='/services' element={<><Services /></>}></Route>
          {/* <Route path='/dashboard' element={<>{dash}</>}></Route>
          <Route path='/user/consultations' element={<><Consultation /></>}></Route>
          <Route path='/user/emergency' element={<><Emergency /></>}></Route>
          <Route path='/user/donations' element={<><Donations /></>}></Route>
          <Route path='/facilities' element={<><Facilities /></>}></Route>
          <Route path='/doctor/dashboard' element={<><DoctorsDashboard /></>}></Route>
          <Route path='/admin/dashboard' element={<><AdminDashboard /></>}></Route>
          <Route path='/auth/onboarding' element={<><Onboarding /></>}></Route>
          <Route path='/authentication' element={<>{auth}</>}></Route> */}
          <Route path='/dashboard' element={getComponent(<Dashboard />)} />
          <Route path='/user/consultations' element={getComponent(<Consultation />)} />
          <Route path='/user/emergency' element={getComponent(<Emergency />)} />
          <Route path='/user/donations' element={getComponent(<Donations />)} />
          <Route path='/facilities' element={getComponent(<Facilities />)} />
          <Route path='/doctor/dashboard' element={getComponent(<DoctorsDashboard />)} />
          <Route path='/admin/dashboard' element={getComponent(<AdminDashboard />)} />
          <Route path='/auth/onboarding' element={getComponent(<Onboarding />)} />
          <Route path='/authentication' element={isAuthenticated ? <Dashboard/>:<Authentication />} />
          <Route path='*' element={<><PageNotFound /></>}></Route>
        </Routes>
      }
    </>
  );
}

export default App;
