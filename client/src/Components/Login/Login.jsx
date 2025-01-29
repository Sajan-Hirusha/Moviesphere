import {useState} from "react";
import axios from "axios";
import loginBg from "/src/assets/Images/loginbg1.jpg";
import {useNavigate} from "react-router-dom";
import ContactUsNav from "../ContactUs/ContactUsNav.jsx";
import Footer from "../Footer/Footer.jsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log({email, password}); // Log the payload
            const response = await axios.post("http://127.0.0.1:8000/api/login/", {
                email,
                password,
            });
            console.log("Login successful:", response.data);
            // Store user data in sessionStorage
            sessionStorage.setItem("userId", response.data.user_id);
            sessionStorage.setItem("userEmail", response.data.email);
            sessionStorage.setItem("userType", response.data.role);
            // Log sessionStorage to verify if data is stored correctly
            console.log("SessionStorage data:", {
                userId: sessionStorage.getItem("userId"),
                userEmail: sessionStorage.getItem("userEmail"),
            });
            if (response.data.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }

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
            className="login"
            style={{
                minHeight: "100vh",
                backgroundImage: `url(${loginBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <ContactUsNav/>
            <div
                className="card shadow my-5 mx-auto "
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
                        <a href="/register" style={{color: "#4CAF50"}}>
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Login;
