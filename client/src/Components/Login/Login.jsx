import React, { useState } from "react";
import axios from "axios";
import loginBg from "/src/assets/Images/loginbg1.jpg"; // Update with your actual path
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login/', {
            email: email,
            password: password
        });

        console.log('Login successful:', response.data);
        // Do something with the response (store token, redirect, etc.)
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error('Error response:', error.response.data);
            alert('Login failed: ' + error.response.data.error);
        } else if (error.request) {
            // No response was received from the server
            console.error('No response received:', error.request);
            alert('Server not responding. Please try again later.');
        } else {
            // Something else went wrong
            console.error('Error:', error.message);
            alert('An unexpected error occurred.');
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
