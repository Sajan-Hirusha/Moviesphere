import "./Footer.css";
import logo from "../../assets/Images/siteLogo.png";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    navigate(`/genres/${category}`);
    console.log(category);
  };
  return (
    <div
      className="footer"
      style={{ backgroundColor: "black", color: "white" }}
    >
      <footer className="text-center text-lg-start">
        {/* Social Media Section */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <a href="#" className="me-4 text-reset text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="me-4 text-reset text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="me-4 text-reset text-white">
              <i className="fab fa-google"></i>
            </a>
            <a href="#" className="me-4 text-reset text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="me-4 text-reset text-white">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="me-4 text-reset text-white">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>

        {/* Footer Links Section */}
        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Company name</h6>
                <p>
                  Welcome to MovieSphere, your ultimate destination for the
                  latest movie releases, trailers, and reviews.
                </p>
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "130px", height: "40px" }}
                />
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Genres</h6>
                <p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryChange("Action");
                    }}
                    className="text-reset text-white bg-transparent "
                  >
                    Action
                  </button>
                </p>
                <p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryChange("Drama");
                    }}
                    className="text-reset text-white bg-transparent"
                  >
                    Drama
                  </button>
                </p>
                <p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryChange("Comedy");
                    }}
                    className="text-reset text-white bg-transparent"
                  >
                    Comedy
                  </button>
                </p>
                <p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryChange("Thriller");
                    }}
                    className="text-reset text-white bg-transparent"
                  >
                    Thriller
                  </button>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="/" className="text-reset text-white">
                    Home
                  </a>
                </p>
                <p>
                  <a href="/contactus" className="text-reset text-white">
                    Contact Us
                  </a>
                </p>
                <p>
                  <a href="!#" className="text-reset text-white">
                    Location
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-white">
                    Social Medias
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3"></i> Colombo, WP 10012, LK
                </p>
                <p>
                  <i className="fas fa-envelope me-3"></i> info@moviesphere.com
                </p>
                <p>
                  <i className="fas fa-phone me-3"></i> + 94 234 567 88
                </p>
                <p>
                  <i className="fas fa-print me-3"></i> + 94 234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Copyright Section */}
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        >
          © 2024 Copyright:
          <a
            className="text-reset fw-bold text-white"
            href="https://mdbootstrap.com/"
          >
            {" "}
            UWU
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
