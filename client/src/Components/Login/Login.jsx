import React, { useState } from "react";
import axios from "axios";
import loginBg from "/src/assets/Images/loginbg1.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log({ email, password }); // Log the payload
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });
      console.log("Login successful:", response.data);
      navigate("/userpanel");
    } catch (error) {
      if (error.response) {
        console.error("Login error:", error.response.data);
        setErrorMessage(error.response.data.error || "Login failed.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };
  

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="card shadow"
        style={{
          width: "400px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderRadius: "8px",
          color: "white",
        }}
      >
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Login</h3>
          <form onSubmit={handleLogin}>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Login
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <a href="/register" style={{ color: "#4CAF50" }}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
