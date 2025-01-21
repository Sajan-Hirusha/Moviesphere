import {useEffect, useState} from 'react';
import './AdminMiddleSection.css';
import {urlPattern1} from "../../../../env.jsx";
import axios from "axios";

function AdminMiddleSection() {
    const urlPattern = urlPattern1
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const [inquiries, setInquiries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchInqueries, setSearchInqueries] = useState([]);
    const [inquiryId, setInquiryId] = useState(null);
    const [inputs, setInputs] = useState({});

    const handleDoneClick = (id) => {
        setInquiryId(id);
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === "file" ? e.target.files[0] : e.target.value.trim();
        setInputs((prevValues) => ({...prevValues, [name]: value}));
    };

    const confirmDoneAction = async () => {
        try {
            await axios.delete(`${urlPattern}/api/contacts/${inquiryId}/`);
            alert("Inquiry Marked successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Error deleting Inquiry:", error);
            alert("Failed to Mark the Inquiry. Please try again.");
        }
        setInquiryId(null);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    useEffect(() => {
        axios.get(`${urlPattern}/api/contacts?page=${currentPage}`)
            .then(response => {
                const data = response.data;
                setInquiries(data);
                setHasNextPage(data.next !== null);
                setHasPrevPage(data.previous !== null);
            })
            .catch(error => {
                console.log("Error loading movies:", error.message);
            });
    }, [currentPage]);

    const handleNext = () => {
        if (hasNextPage) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrev = () => {
        if (hasPrevPage) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const searchInquiry = async (userEmail) => {

        axios.get(`${urlPattern}/api/contacts/search-by-email/${userEmail}/`)
            .then(response => {
                const userInqueries = response.data.data[0];
                setSearchInqueries(Array.isArray(userInqueries) ? userInqueries : [userInqueries]);
                console.log(userInqueries);
            })
            .catch(error => {
                alert("No users Found")
                console.log(error.message);
            });
    };


    return (
        <div className="adminMiddleSection p-5">
            {/* User Table */}
            <div className="input-group searchInquiry mt-4 mb-4">
                <div className="form-outline">
                    <input id="search-focus" type="search" className="form-control" name="searchUser"
                           onChange={handleChange}/>
                    <label className="form-label" htmlFor="search-focus">Search By Email</label>
                </div>
                <button type="button" className="btn btn-primary"
                        onClick={() => searchInquiry(inputs.searchUser)}
                >
                    <i className="fas fa-search"></i>
                </button>
            </div>


            <table className="table align-middle mb-5 bg-white">
                <thead className="bg-light">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Inquiry</th>
                    <th>Contact Number</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {(
                    Array.isArray(searchInqueries) && searchInqueries.length > 0 ? (
                        searchInqueries.map((inquiry) => (
                            <tr key={inquiry.id}>
                                <td>{inquiry.id}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <div className="ms-3">
                                            <p className="fw-bold mb-1">{inquiry.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{inquiry.email}</td>
                                <td>{inquiry.inquiry}</td>
                                <td>{inquiry.contact_number}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-link btn-sm btn-rounded"
                                        onClick={handleDoneClick}
                                    >
                                        Done<span className="ps-1" style={{color: "white"}}>&#10004;</span>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (Array.isArray(inquiries) && inquiries.length > 0) ? (
                        inquiries.map((inquiry) => (
                            <tr key={inquiry.id}>
                                <td>{inquiry.id}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <div className="ms-3">
                                            <p className="fw-bold mb-1">{inquiry.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{inquiry.email}</td>
                                <td>{inquiry.inquiry}</td>
                                <td>{inquiry.contact_number}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-link btn-sm btn-rounded"
                                        data-bs-toggle="modal"
                                        data-bs-target="#confirmDoneModal"
                                        onClick={() => handleDoneClick(inquiry.id)}
                                    >
                                        Done<span className="ps-1" style={{color: "white"}}>&#10004;</span>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No Users found.</td>
                        </tr>
                    )
                )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center mt-4 mb-4">
                <button
                    className="btn btn-secondary me-2"
                    disabled={!hasPrevPage}
                    onClick={handlePrev}
                >
                    Previous
                </button>
                <button
                    className="btn btn-primary"
                    disabled={!hasNextPage}
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>

            {/* Confirmation Modal */}
            <div
                className={`modal fade ${showModal ? 'show' : ''}`}
                id="confirmDoneModal"
                tabIndex="-1"
                aria-labelledby="confirmDoneLabel"
                aria-hidden={!showModal}
                style={{display: showModal ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)',}}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirmDoneLabel">Confirm Action</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={handleCloseModal}
                            ></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to mark this inquiry as done?
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={confirmDoneAction}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminMiddleSection;
