import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BaseHome from "./Screens/BaseHome/BaseHome.jsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route element={<BaseHome/>} path='/'/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
