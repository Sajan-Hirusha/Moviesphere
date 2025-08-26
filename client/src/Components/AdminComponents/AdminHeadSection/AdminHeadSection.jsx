import "./AdminHeadSection.css";
import userIcon from "../../../assets/Images/userIcon.png";
import movieIcon from "../../../assets/Images/movieIcon.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { urlPattern1 } from "../../../../env.jsx";

function AdminHeadSection() {
  const urlPattern = urlPattern1;

  const [movieCount, setMovieCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetchMovieCount();
    fetchUserCount();
  }, []);

  const fetchMovieCount = async () => {
    try {
      const response = await axios.get(`${urlPattern}/api/movies/count/`);
      setMovieCount(response.data.total_movies);
    } catch (error) {
      console.error(
        "Error fetching movie count:",
        error.response?.data || error.message,
      );
    }
  };

  const fetchUserCount = async () => {
    try {
      const response = await axios.get(`${urlPattern}/api/users/count/`);
      setUserCount(response.data.total_users);
    } catch (error) {
      console.error(
        "Error fetching user count:",
        error.response?.data || error.message,
      );
    }
  };
  return (
    <div className="adminHeadSection">
      <div className="row mainHead gap-4">
        <div className="left col-8 row gap-2">
          <div className="totalMovie col-5 bgImage">
            {" "}
            <p>Total Movies = {movieCount}</p>
          </div>
          <div className="totalUser col-5 bgImage">
            <p>Total Users = {userCount}</p>
          </div>
        </div>
        <div className="right col-4">
          <button>
            {" "}
            <Link to="/admin/movies" style={{ color: "black" }}>
              Movie Section
            </Link>
            <img className="ms-5" src={movieIcon} alt="plusSign" />
          </button>
          <button>
            <Link to="/admin/users" style={{ color: "black" }}>
              User Section
            </Link>
            <img className="ms-5" src={userIcon} alt="plusSign" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default AdminHeadSection;
