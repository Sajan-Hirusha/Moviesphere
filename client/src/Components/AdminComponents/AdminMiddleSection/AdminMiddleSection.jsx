import { useState } from 'react';
import './AdminMiddleSection.css';

function AdminMiddleSection() {
    const [showModal, setShowModal] = useState(false);

    const handleDoneClick = () => {
        setShowModal(true);
    };

    const confirmDoneAction = () => {
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal when Cancel is clicked
    };

    return (
        <div className="adminMiddleSection p-5">
            <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Inquiry</th>
                    <th>Contact Number</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <div className="d-flex align-items-center">
                            <img
                                src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                                alt=""
                                style={{ width: '45px', height: '45px' }}
                                className="rounded-circle"
                            />
                            <div className="ms-3">
                                <p className="fw-bold mb-1">John Doe</p>
                                <p className="text-muted mb-0">john.doe@gmail.com</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p className="fw-normal mb-1">Software engineer</p>
                        <p className="text-muted mb-0">IT department</p>
                    </td>
                    <td>
                        <span className="badge badge-success rounded-pill d-inline">Active</span>
                    </td>
                    <td>Senior</td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-link btn-sm btn-rounded"
                            onClick={handleDoneClick}
                        >
                            Done<span className="ps-1" style={{ color: "white" }}>&#10004;</span>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>

            {/* Confirmation Modal */}
            <div
                className={`modal fade ${showModal ? 'show' : ''}`}
                id="confirmDeleteModal"
                tabIndex="-1"
                aria-labelledby="confirmDoneLabel"
                aria-hidden={!showModal}
                style={{ display: showModal ? 'block' : 'none' , backgroundColor: 'rgba(0, 0, 0, 0.5)',}}
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
                            Are you sure you want to mark this item as done?
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
