import AdminHeadSection from "../../Components/AdminComponents/AdminHeadSection/AdminHeadSection.jsx";
import AdminMiddleSection from "../../Components/AdminComponents/AdminMiddleSection/AdminMiddleSection.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import AdminNavBar from "../../Components/AdminComponents/AdminNavBar/AdminNavBar.jsx";
import "./Admin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const userType = sessionStorage.getItem("userType");
    if (!userId) {
      navigate("/login");
    } else if (userId) {
      console.log(userType);
      if (userType === "user") {
        navigate("/");
      }
    }
  }, [navigate]);

  return (
    <div className="admin">
      <AdminNavBar />
      <AdminHeadSection />
      <AdminMiddleSection />
      <Footer />
    </div>
  );
}

export default Admin;
