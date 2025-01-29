import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactUsNav from "../ContactUs/ContactUsNav.jsx";
import Footer from "../Footer/Footer.jsx";
import './Register.css'
const Register = () => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle the form submission
  // const handleRegister = async (event) => {
  //   event.preventDefault();

  //   console.log("Form Data:", formData); // Log the form data to check if everything is correct

  //   try {
  //     // Send a POST request to the backend
  //     const response = await fetch("http://127.0.0.1:8000/api/register/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         first_name: formData.fName,
  //         last_name: formData.lName,
  //         email: formData.email,
  //         phone_number: formData.phone_number,
  //         password: formData.password,
  //       }),
  //     });

  //     if (response.ok) {
  //       // If registration is successful, navigate to the login page
  //       const data = await response.json();
  //       alert("Registration successful!");
  //       console.log("Success:", data);
  //       navigate("/login");
  //     } else {
  //       // If there is an error, display the error message
  //       const errorData = await response.json();
  //       console.error("Error:", errorData);
  //       alert("Registration failed. Please check the inputs and try again.");
  //     }
  //   } catch (error) {
  //     // Catch network errors and alert the user
  //     console.error("Network Error:", error);
  //     alert("An error occurred. Please try again later.");
  //   }
  // };
  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fName: formData.fName,
          lName: formData.lName,
          email: formData.email,
          phone_number: formData.phone_number,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Registration successful!");
        console.log("Success:", data);
        navigate("/login");  // Redirect to login page after successful registration
      } else {
        const errorData = await response.json();
        alert("Registration failed. Please check the inputs and try again.");
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };



  return (
      <div
          className="register"
          style={{
            minHeight: "100vh",
          }}
      >
        <ContactUsNav/>
        <div
            className="card shadow mx-auto my-5 p-3"
            style={{
              width: "600px",
              backgroundColor: "rgba(57,56,56,0.81)",
              borderRadius: "8px",
              color: "white",
            }}
        >
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Register</h3>
            <form onSubmit={handleRegister}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstname" className="form-label text-white">
                    Firstname
                  </label>
                  <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      name="fName"
                      placeholder="Enter your firstname"
                      value={formData.fName}
                      onChange={handleChange}
                      required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastname" className="form-label text-white">
                    Lastname
                  </label>
                  <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      name="lName"
                      placeholder="Enter your lastname"
                      value={formData.lName}
                      onChange={handleChange}
                      required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label text-white">
                    Email
                  </label>
                  <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="phone" className="form-label text-white">
                    Phone Number
                  </label>
                  <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone_number"
                      placeholder="Enter your phone number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-white">
                  Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
              </div>
              <button
                  type="submit"
                  className="btn w-100"
                  style={{
                    backgroundColor: "#4CAF50", // Green button color
                    color: "white",
                  }}
              >
                Register
              </button>
            </form>
            <p className="text-center mt-3">
              Already have an account?{" "}
              <a href="/login" style={{color: "#4CAF50"}}>
                Login
              </a>
            </p>
          </div>
        </div>

        <Footer/>
      </div>
  );
};

export default Register;
