import {useEffect, useState} from 'react';
import Footer from "../Footer/Footer.jsx";
import axios from "axios";
import CircleSpinner from "../CircleSpinner/CircleSpinner.jsx";
import {urlPattern1} from "../../../env.jsx";
import ContactUsNav from "./ContactUsNav.jsx";
import {useNavigate} from "react-router-dom";

const ContactUs = () => {
    const urlPattern = urlPattern1
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
       setEmail(sessionStorage.getItem("userEmail"));
        if (!userId) {
            alert("Please login.");
            navigate("/login");
        }
    }, [navigate]);

    const handleSubmit = (e,url,method) => {
        e.preventDefault();

        const form = e.target;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            updateDatabase(url,method)
            window.location.reload()
        }

        setValidated(true);
    };


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === "file" ? e.target.files[0] : e.target.value.trim();
        setInputs((prevValues) => ({...prevValues, [name]: value}));
    };

    //update Database
    const updateDatabase = async (url, method) => {
        setLoading(true);

        const formData = new FormData();
        for (const key in inputs) {
            formData.append(key, inputs[key]);
        }
        
        if (email) {
            formData.append("email", email);
        }
        try {
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            const response = await axios({
                method: method,
                url: `${urlPattern}${url}`,
                data: method === 'GET' || method === 'DELETE' ? null : formData,
                headers: method === 'GET' || method === 'DELETE' ? {} : {
                    "Content-Type": "multipart/form-data",
                },
            });
            setLoading(false);
            if (response.data.success) {
                alert(response.data.message);
                window.location.reload();
            }
        } catch (error) {
            setLoading(false);
            console.error("Error adding Movie:", error);
            alert("Failed to add Movie. Please try again.");
        }
    };


    return (
        <div className="bg-black text-light min-vh-100">
            {loading && <CircleSpinner/>}
            <ContactUsNav/>
            <div className="container mt-3 mb-10">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <h1 className="text-center mb-4" style={{color: '#f5c518'}}>
                            Contact Us
                        </h1>
                        <p className="text-center mb-4" style={{color: '#f5c518'}}>
                            We'd love to hear from you. Please fill out the form below:
                        </p>
                        <form noValidate  onSubmit={(event) => handleSubmit(event, "/api/contacts/", "post")}
                              className={validated ? "was-validated" : ""}>

                            <div className="mb-3">
                                <label htmlFor="formName" className="form-label" style={{color: '#f5c518'}}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className={`form-control bg-dark text-light border-warning `}
                                    id="formName"
                                    placeholder="Enter your name"
                                    name="name"
                                    onChange={handleChange}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please enter your name.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formEmail" className="form-label" style={{color: '#f5c518'}}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className={`form-control bg-dark text-light border-warning`}
                                    id="formEmail"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={email}
                                    required
                                    readOnly={true}
                                />
                                <div className="invalid-feedback">
                                    Please enter a valid email.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formInquiry" className="form-label" style={{color: '#f5c518'}}>
                                    Inquiry
                                </label>
                                <textarea
                                    className={`form-control bg-dark text-light border-warning `}
                                    id="formInquiry"
                                    rows="3"
                                    placeholder="Enter your inquiry"
                                    name="inquiry"
                                    onChange={handleChange}
                                    required
                                ></textarea>
                                <div className="invalid-feedback">
                                    Please enter your inquiry.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formContactNumber" className="form-label" style={{color: '#f5c518'}}>
                                    Contact Number
                                </label>
                                <input
                                    type="text"
                                    className={`form-control bg-dark text-light border-warning `}
                                    id="formContactNumber"
                                    placeholder="Enter your contact number"
                                    name="contact_number"
                                    onChange={handleChange}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please enter a valid contact number (only digits).
                                </div>
                            </div>

                            <button type="submit" className="btn btn-warning w-100">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ContactUs;
