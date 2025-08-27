import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseHome from "./Screens/BaseHome/BaseHome.jsx";
import Admin from "./Screens/AdminPage/Admin.jsx";
import AdminMovieSection from "./Components/AdminComponents/AdminMovieSection/AdminMovieSection.jsx";
import AdminUserSection from "./Components/AdminComponents/AdminUserSection/AdminUserSection.jsx";
import ContactUs from "./Components/ContactUs/ContactUs.jsx";
import Genres from "./Screens/Genres/Genres.jsx";
import Register from "./Components/Register/Register.jsx";
import { Review } from "./Screens/reviewpage/Review.jsx";
import Login from "./Components/Login/Login.jsx";
import Logout from "./Components/Logout/Logout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseHome />} path="/" />
        <Route element={<Register />} path="/Register" />
        <Route element={<Login />} path="/Login" />
        <Route element={<Admin />} path="/admin" />
        <Route element={<Login />} path="/login" />
        <Route element={<Logout />} path="/logout" />
        <Route element={<AdminMovieSection />} path="/admin/movies" />
        <Route element={<AdminUserSection />} path="/admin/users" />
        <Route element={<ContactUs />} path="/contactus" />
        <Route element={<Genres />} path="/genres/:genre" />
        <Route element={<Review />} path="/review" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
