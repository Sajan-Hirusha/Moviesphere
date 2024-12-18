import React, { useState } from 'react';
import Footer from "../Footer/Footer.jsx";
import AdminNavBar from "../AdminComponents/AdminNavBar/AdminNavBar.jsx";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        inquiry: '',
        contactNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <div className="bg-dark text-light min-vh-100 ">
            {/*<AdminNavBar/>*/}
            <div className="container mb-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <h1 className="text-center mb-4" style={{ color: '#f5c518' }}>
                            Contact Us
                        </h1>
                        <p className="text-center mb-4" style={{ color: '#f5c518' }}>
                            We'd love to hear from you. Please fill out the form below:
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="formName" className="form-label" style={{ color: '#f5c518' }}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-light border-warning"
                                    id="formName"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formEmail" className="form-label" style={{ color: '#f5c518' }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control bg-dark text-light border-warning"
                                    id="formEmail"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formInquiry" className="form-label" style={{ color: '#f5c518' }}>
                                    Inquiry
                                </label>
                                <textarea
                                    className="form-control bg-dark text-light border-warning"
                                    id="formInquiry"
                                    rows="3"
                                    placeholder="Enter your inquiry"
                                    name="inquiry"
                                    value={formData.inquiry}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formContactNumber" className="form-label" style={{ color: '#f5c518' }}>
                                    Contact Number
                                </label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-light border-warning"
                                    id="formContactNumber"
                                    placeholder="Enter your contact number"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                />
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
