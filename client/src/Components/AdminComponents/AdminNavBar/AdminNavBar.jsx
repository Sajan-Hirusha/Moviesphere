import logo from "../../../assets/Images/siteLogo.png";
import settings from "../../../assets/Images/settings.png";
import { Link } from "react-router-dom";
function AdminNavBar() {
  return (
    <div className="adminNavBar mb-5">
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars text-white"></i>
          </button>

          <div
            className="collapse navbar-collapse ms-4"
            id="navbarSupportedContent"
          >
            <img
              style={{ width: "30px", height: "30px" }}
              src={settings}
              alt="settings"
            />
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link text-white" href="/admin">
                  Dashboard
                </a>
              </li>
              <li className="nav-item ms-2">
                <a className="nav-link text-white" href="/admin/movies">
                  Movie Section
                </a>
              </li>
              <li className="nav-item ms-2">
                <a className="nav-link text-white" href="/admin/users">
                  User Section
                </a>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center">
            <Link className="mx-4 text-white" to="/logout">
              Logout
            </Link>
            <Link className="navbar-brand mt-2 mt-lg-0" to="/admin">
              <img
                src={logo}
                alt="Logo"
                loading="lazy"
                style={{ width: "110px", height: "40px" }}
              />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminNavBar;
