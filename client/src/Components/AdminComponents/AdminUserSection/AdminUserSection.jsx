import './UserSection.css';
import deleteIcon from '../../../assets/Images/deleteIcon.png';
import editIcon from '../../../assets/Images/editIcon.png';
import AdminNavBar from "../AdminNavBar/AdminNavBar.jsx";
import Footer from "../../Footer/Footer.jsx";
import {useRef, useState} from "react";

function AdminUserSection(props) {
    const editUserModalRef = useRef(null);
    const [UserToDelete, setUserToDelete] = useState(null);

    const handleShowModal = (modalRef, recipient) => {
        const modalElement = modalRef.current;
        if (modalElement) {
            const modalTitle = modalElement.querySelector('.modal-title');
            const modalBodyInput = modalElement.querySelector('.modal-body input');
            modalTitle.textContent = `${recipient}`;
            if (modalBodyInput) modalBodyInput.value = recipient;
        }
    };
    const handleDeleteUser = (userId) => {
        setUserToDelete(userId);
    };
    const confirmDeleteUser = () => {
        console.log("Movie deleted:", UserToDelete);
        setUserToDelete(null);
    };
    return (
        <div className="adminUserSection">
            <AdminNavBar/>
            <div className="row userSection mx-0">
                <div className="left col-12 mx-auto">
                    <div className="totalUser bgImage">
                        <p className="ms-5">Total Users {props.users}</p>
                    </div>
                </div>
            </div>

            {/*edit User*/}
            <div className="editUserFormModal">
                <div
                    className="modal fade"
                    id="editUserFormModal"
                    tabIndex="-1"
                    aria-labelledby="editUserLabel"
                    aria-hidden="true"
                    ref={editUserModalRef}
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="editUserLabel">Edit User</h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="userName" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="userName"
                                            placeholder="Enter user name"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="userEmail" className="form-label">User Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="userEmail"
                                            placeholder="Enter user Email"
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="movieDescription" className="form-label">Movie
                                            Description</label>
                                        <textarea
                                            className="form-control"
                                            id="movieDescription"
                                            rows="3"
                                            placeholder="Enter movie description"
                                            required
                                        ></textarea>
                                    </div>

                                    {[1, 2, 3].map(num => (
                                        <div className="col-md-4" key={`image${num}`}>
                                            <label htmlFor={`image${num}`} className="form-label">Image {num}</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id={`image${num}`}
                                                accept="image/*"
                                                required={num === 1}
                                            />
                                        </div>
                                    ))}
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary">
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Search Field */}
            <div className="input-group searchUser mt-4">
                <div className="form-outline">
                    <input id="search-focus" type="search" className="form-control"/>
                    <label className="form-label" htmlFor="search-focus">Search</label>
                </div>
                <button type="button" className="btn btn-primary">
                    <i className="fas fa-search"></i>
                </button>
            </div>

            {/* User Table */}
            <table className="table align-middle mb-5 bg-white">
                <thead className="bg-light">
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <div className="d-flex align-items-center">
                            <div className="">
                                <p className="fw-bold mb-1">Suffragette</p>
                                <p className="text-muted mb-0">2015</p>
                            </div>
                        </div>
                    </td>
                    <td>Drama</td>
                    <td>Lorem ipsum dolor sit amet.</td>
                    <td>
                        <button type="button" className="btn btn-link btn-sm btn-rounded"
                                data-bs-toggle="modal"
                                data-bs-target="#editUserFormModal"
                                onClick={() => handleShowModal(editUserModalRef, "Edit User Details")}
                        >
                            <img src={editIcon} alt="editIcon" style={{width: "25px", height: "25px"}}/>
                        </button>
                        <button
                            className="btn btn-link text-danger"
                            onClick={() => handleDeleteUser(1)}
                            data-bs-toggle="modal"
                            data-bs-target="#confirmDeleteModal"
                        >
                            <img src={deleteIcon} alt="deleteIcon" style={{width: "25px", height: "25px"}}/>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>

            {/* Confirmation Modal */}
            <div
                className="modal fade"
                id="confirmDeleteModal"
                tabIndex="-1"
                aria-labelledby="confirmDeleteLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirmDeleteLabel">Confirm Deletion</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this User?
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={confirmDeleteUser}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default AdminUserSection;
