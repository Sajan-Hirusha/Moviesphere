import './MovieSection.css';
import plusMark from '../../../assets/Images/plus.png';
import AdminNavBar from "../AdminNavBar/AdminNavBar.jsx";
import Footer from "../../Footer/Footer.jsx";
import { useRef } from "react";

function AdminMovieSection(props) {
    const movieModalRef = useRef(null);
    const categoryModalRef = useRef(null);

    const handleShowModal = (modalRef, recipient) => {
        const modalElement = modalRef.current;
        if (modalElement) {
            const modalTitle = modalElement.querySelector('.modal-title');
            const modalBodyInput = modalElement.querySelector('.modal-body input');
            modalTitle.textContent = `${recipient}`;
            if (modalBodyInput) modalBodyInput.value = recipient;
        }
    };

    return (
        <div className="adminMovieSection">
            <AdminNavBar />
            <div className="row movieSection gap-4">
                <div className="left col-7">
                    <div className="totalMovie bgImage">
                        <p>Total Movies {props.movies}</p>
                    </div>
                </div>
                <div className="right col-4">
                    <button
                        className="movieAddButton"
                        data-bs-toggle="modal"
                        data-bs-target="#addMovieModal"
                        onClick={() => handleShowModal(movieModalRef, "Add Movie")}
                    >
                        Add Movie
                        <img className="ms-5" src={plusMark} alt="plusSign" />
                    </button>
                    <button
                        className="movieAddButton"
                        data-bs-toggle="modal"
                        data-bs-target="#addCategoryModal"
                        onClick={() => handleShowModal(categoryModalRef, "Add Category")}
                    >
                        Add Category
                        <img className="ms-5" src={plusMark} alt="plusSign" />
                    </button>
                </div>
            </div>

            {/* Movie Modal */}
            <div className="addMovieFormModal">
                <div
                    className="modal fade"
                    id="addMovieModal"
                    tabIndex="-1"
                    aria-labelledby="addMovieLabel"
                    aria-hidden="true"
                    ref={movieModalRef}
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="addMovieLabel">Add Movie</h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form className="row g-3">
                                    {/* Movie Form Fields */}
                                    <div className="col-md-6">
                                        <label htmlFor="movieName" className="form-label">Movie Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="movieName"
                                            placeholder="Enter movie name"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="movieCategory" className="form-label">Movie Category</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="movieCategory"
                                            placeholder="Enter movie category"
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="movieDescription" className="form-label">Movie Description</label>
                                        <textarea
                                            className="form-control"
                                            id="movieDescription"
                                            rows="3"
                                            placeholder="Enter movie description"
                                            required
                                        ></textarea>
                                    </div>
                                    {/* Image Fields */}
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

            {/* Category Modal */}
            <div className="addCategoryModal">
                <div
                    className="modal fade"
                    id="addCategoryModal"
                    tabIndex="-1"
                    aria-labelledby="addCategoryLabel"
                    aria-hidden="true"
                    ref={categoryModalRef}
                >
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="addCategoryLabel">Add Category</h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form className="row g-3">
                                    <div className="col-12">
                                        <label htmlFor="categoryName" className="form-label">Category Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="categoryName"
                                            placeholder="Enter category name"
                                            required
                                        />
                                    </div>
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
            <div className="input-group searchMovie mt-4">
                <div className="form-outline">
                    <input id="search-focus" type="search" className="form-control" />
                    <label className="form-label" htmlFor="search-focus">Search</label>
                </div>
                <button type="button" className="btn btn-primary">
                    <i className="fas fa-search"></i>
                </button>
            </div>

            {/* Movies Table */}
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
                    <td>
                        <button type="button" className="btn btn-link btn-sm btn-rounded">
                            Edit<span className="ps-1" style={{color: "blue"}}>&#10004;</span>
                        </button>
                        <button type="button" className="btn btn-link btn-sm btn-rounded">
                            Delete<span className="ps-1" style={{color: "red"}}>&#10004;</span>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <Footer/>
        </div>
    );
}

export default AdminMovieSection;
