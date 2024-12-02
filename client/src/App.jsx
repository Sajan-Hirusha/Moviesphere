import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route element={<BaseHome/>} path='/'/>
              <Route element={<AdminBase/>} path='/admin'/>
              <Route element={<AboutUs/>} path='/about'/>
              <Route element={<Shop/>} path='/shop'/>
              <Route element={<AboutUs/>} path='/localMarket'/>
              <Route element={<ContactUs/>} path='/contact'/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
