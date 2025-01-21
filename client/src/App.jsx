import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BaseHome from "./Screens/BaseHome/BaseHome.jsx";
import AdminHeadSection from "./Components/AdminComponents/AdminHeadSection/AdminHeadSection.jsx";
import Admin from "./Screens/AdminPage/Admin.jsx";
import AdminMovieSection from "./Components/AdminComponents/AdminMovieSection/AdminMovieSection.jsx";
import AdminUserSection from "./Components/AdminComponents/AdminUserSection/AdminUserSection.jsx";
import ContactUs from "./Components/ContactUs/ContactUs.jsx";
<<<<<<< HEAD
import Register from "./Components/Register/Register.jsx"; // Import Register component
import Login from "./Components/Login/Login.jsx"; // Import Login component
=======
import Genres from './Screens/Genres/Genres.jsx';

>>>>>>> 7a69a03cc84d3be160eb7f36e211edbebb059987
function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route element={<BaseHome/>} path='/'/> 
              <Route element={<Admin/>} path='/admin'/>
              <Route element={<AdminMovieSection/>} path='/admin/movies'/>
              <Route element={<AdminUserSection/>} path='/admin/users'/>
              <Route element={<ContactUs/>} path='/contactus'/>
              <Route element={<Genres/>} path='/genres/Horror'/>
              <Route element={<Genres/>} path='/genres/Action'/>
              <Route element={<Genres/>} path='/genres/Comedy'/>
              <Route element={<Genres/>} path='/genres/Thriller'/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
