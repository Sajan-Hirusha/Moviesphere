import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BaseHome from "./Screens/BaseHome/BaseHome.jsx";
import AdminHeadSection from "./Components/AdminComponents/AdminHeadSection/AdminHeadSection.jsx";
import Admin from "./Screens/AdminPage/Admin.jsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route element={<Admin/>} path='/'/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
