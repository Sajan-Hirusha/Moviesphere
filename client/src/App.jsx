import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BaseHome from "./Screens/BaseHome/BaseHome.jsx";
import AdminHeadSection from "./Components/AdminComponents/AdminHeadSection/AdminHeadSection.jsx";
import Admin from "./Screens/AdminPage/Admin.jsx";
import AdminMovieSection from "./Components/AdminComponents/AdminMovieSection/AdminMovieSection.jsx";
import AdminUserSection from "./Components/AdminComponents/AdminUserSection/AdminUserSection.jsx";
import ContactUs from "./Components/ContactUs/ContactUs.jsx";
import Genres from './Screens/Genres/Genres.jsx';
import Register from "./Components/Register/Register.jsx";
import { Review } from './Screens/reviewpage/Review.jsx';

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route element={<BaseHome/>} path='/'/> 
              <Route element={<Register/>} path='/Register'/>
              <Route element={<Admin/>} path='/admin'/>
              <Route element={<Register/>} path='/Register'/>
              <Route element={<AdminMovieSection/>} path='/admin/movies'/>
              <Route element={<AdminUserSection/>} path='/admin/users'/>
              <Route element={<ContactUs/>} path='/contactus'/>
              {/*<Route element={<Genres/>} path='/genres/Horror'/>*/}
              <Route element={<Genres />} path="/genres/:genre" />
              {/*<Route element={<Genres/>} path='/genres/Comedy'/>*/}
              {/*<Route element={<Genres/>} path='/genres/Thriller'/>*/}
              <Route element={<Review/>} path = '/review'/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
