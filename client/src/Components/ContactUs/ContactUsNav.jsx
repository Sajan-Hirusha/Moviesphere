import "bootstrap/dist/css/bootstrap.min.css";
import "../Navbar/Navbar.css";
import logo from "../../assets/Images/siteLogo.png";

const ContactUsNav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
            <div className="container-fluid">

                <a className="navbar-brand ms-5" href="/">
                    <img
                        src={logo}
                        alt="logo"
                        className="navbar-logo"
                    />
                </a>

                {/* Toggler for mobile view */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav ms-5">
                        <li className="nav-item">
                            <a className="nav-link active ms-5" aria-current="page" href="/">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white ms-5" href="/contactus">
                                Contact Us
                            </a>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto ">
                        <li className="nav-item mx-5">
                            <a className="nav-link text-white" href="/Register">
                                Login
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default ContactUsNav;
