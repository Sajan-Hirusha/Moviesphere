import './MovieSection.css';
import plusMark from '../../../assets/Images/plus.png';
import deleteIcon from '../../../assets/Images/deleteIcon.png';
import editIcon from '../../../assets/Images/editIcon.png';
import AdminNavBar from "../AdminNavBar/AdminNavBar.jsx";
import Footer from "../../Footer/Footer.jsx";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import CircleSpinner from "../../CircleSpinner/CircleSpinner.jsx";

function AdminMovieSection(props) {
    const urlPattern = "http://127.0.0.1:8000"
    const movieModalRef = useRef(null);
    const editMovieModalRef = useRef(null);
    const categoryModalRef = useRef(null);
    const [enlargedImage, setEnlargedImage] = useState(null);
    const [movieToDelete, setMovieToDelete] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(false);



    const handleShowModal = (modalRef, recipient) => {
        const modalElement = modalRef.current;
        if (modalElement) {
            const modalTitle = modalElement.querySelector('.modal-title');
            modalTitle.textContent = `${recipient}`;
        }
    };

    const closeModal = () => {
        const modalElement = movieModalRef.current;
        if (modalElement) {
            modalElement.classList.remove('show');
            modalElement.style.display = 'none';
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
        }
    };

    const handleImageClick = (imageUrl) => {
        setEnlargedImage(imageUrl);
    };
    const handleDeleteMovie = (movieId) => {
        setMovieToDelete(movieId);
    };
    const confirmDeleteMovie = () => {
        console.log("Movie deleted:", movieToDelete);
        setMovieToDelete(null);
    };

    //api part

    //get category list
    useEffect(() => {
        axios.get(`${urlPattern}/api/categories`)
            .then(response => {
                setCategoryList(response.data.results);
            })
            .catch(error => {
                console.log(error.message);
            });
    }, []);


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === "file" ? e.target.files[0] : e.target.value.trim();
        setInputs((prevValues) => ({...prevValues, [name]: value}));
    };

    const updateDatabase = async (url) => {
        setLoading(true);

        // FormData object to handle text and file inputs
        const formData = new FormData();
        for (const key in inputs) {
            formData.append(key, inputs[key]);
        }

        try {
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            const response = await axios.post(`${urlPattern}${url}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setLoading(false);
            if (response.data.success) {
                closeModal();
                alert(response.data.message);
            }
        } catch (error) {
            setLoading(false);
            console.error("Error adding product:", error);
            alert("Failed to add product. Please try again.");
        }
    };

    const handleFormSubmit = (event, needValidation, url) => {
        event.preventDefault();
        const form = document.querySelector(needValidation);

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
        } else {
            updateDatabase(url);
        }
    };

    //get Movies
    useEffect(() => {
        axios.get(`${urlPattern}/api/movies?page=${currentPage}`)
            .then(response => {
                const data = response.data;
                setMovies(data.results);
                setHasNextPage(data.next !== null);
                setHasPrevPage(data.previous !== null);
            })
            .catch(error => {
                console.log("Error loading movies:", error.message);
            });
    }, [currentPage]);

    // Handle pagination
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

    return (
        <div className="adminMovieSection">
            {loading && <CircleSpinner/>}
            <AdminNavBar/>
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
                        <img className="ms-5" src={plusMark} alt="plusSign"/>
                    </button>
                    <button
                        className="movieAddButton"
                        data-bs-toggle="modal"
                        data-bs-target="#addCategoryModal"
                        onClick={() => handleShowModal(categoryModalRef, "Add Category")}
                    >
                        Add Category
                        <img className="ms-5" src={plusMark} alt="plusSign"/>
                    </button>
                </div>
            </div>

            {/* Add Movie Modal */}
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
                                <form
                                    className="needs-validation1 row g-3"
                                    noValidate
                                    onSubmit={(event) => handleFormSubmit(event, ".needs-validation1", "/api/movies/")}
                                >
                                    <div className="col-md-6">
                                        <label htmlFor="movieName" className="form-label">Movie Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="movieName"
                                            placeholder="Enter movie name"
                                            onChange={handleChange}
                                            required
                                            name="title"
                                        />
                                        <div className="invalid-feedback">Please enter a valid movie name.</div>
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="categoryList" className="form-label">Category</label>
                                        <select className="form-select feildDisabled" id="categoryList" required
                                                name="category" onChange={handleChange}>
                                            <option value="" disabled> select Category</option>
                                            {Array.isArray(categoryList) ? (categoryList.map((category, index) => (
                                                <option key={index}
                                                        value={category.name}>{category.name}</option>
                                            ))) : ""}
                                        </select>
                                        <div className="valid-feedback">
                                            Looks good!
                                        </div>
                                        <div className="invalid-feedback">
                                            Please select a valid Category.
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="movieDescription" className="form-label">Movie
                                            Description</label>
                                        <textarea
                                            className="form-control"
                                            id="movieDescription"
                                            rows="3"
                                            placeholder="Enter movie description"
                                            onChange={handleChange}
                                            required
                                            name="description"
                                        ></textarea>
                                        <div className="invalid-feedback">Please provide a description.</div>
                                    </div>
                                    {[1, 2, 3].map(num => (
                                        <div className="col-md-4" key={`image${num}`}>
                                            <label htmlFor={`image${num}`} className="form-label">Image {num}</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id={`image${num}`}
                                                accept="image/*"
                                                onChange={handleChange}
                                                required
                                                name={`image${num}`}
                                            />
                                            <div className="invalid-feedback">
                                                Please upload a valid image for Image {num}.
                                            </div>
                                        </div>
                                    ))}

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                            Close
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Save Movie
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/*edit movie*/}
            <div className="editMovieFormModal">
                <div
                    className="modal fade"
                    id="editMovieFormModal"
                    tabIndex="-1"
                    aria-labelledby="addMovieLabel"
                    aria-hidden="true"
                    ref={editMovieModalRef}
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
                                <form
                                    className="needs-validation3 row g-3"
                                    noValidate
                                    id="editMovieForm"
                                    onSubmit={(event) => handleFormSubmit(event, ".needs-validation3", "/api/movies/")}
                                >
                                    <div className="col-md-6">
                                        <label htmlFor="movieName" className="form-label">Movie Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="movieName"
                                            placeholder="Enter movie name"
                                            required
                                            onChange={handleChange}
                                        />
                                        <div className="invalid-feedback">Please enter the movie name.</div>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="movieCategory" className="form-label">Movie Category</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="movieCategory"
                                            placeholder="Enter movie category"
                                            required
                                            onChange={handleChange}
                                        />
                                        <div className="invalid-feedback">Please enter the movie category.</div>
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
                                            onChange={handleChange}
                                        ></textarea>
                                        <div className="invalid-feedback">Please enter a movie description.</div>
                                    </div>
                                    {[1, 2, 3].map(num => (
                                        <div className="col-md-4" key={`image${num}`}>
                                            <label htmlFor={`image${num}`} className="form-label">Image {num}</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id={`image${num}`}
                                                accept="image/*"
                                                onChange={handleChange}
                                                required
                                                name={`image${num}`}
                                            />
                                            <div className="invalid-feedback">
                                                Please upload a valid image for Image {num}.
                                            </div>
                                        </div>
                                    ))}
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Save changes
                                        </button>
                                    </div>
                                </form>
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
                                <form
                                    className="row g-3 needs-validation2"
                                    noValidate
                                    onSubmit={(event) => handleFormSubmit(event, ".needs-validation2", "/api/categories/")}
                                >
                                    <div className="col-12">
                                        <label htmlFor="categoryName" className="form-label">Category Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="categoryName"
                                            placeholder="Enter category name"
                                            required
                                            name="name"
                                            onChange={handleChange}
                                        />
                                        <div className="invalid-feedback">
                                            Please enter a category name.
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                            Close
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Save changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Image Enlargement Modal */}
            <div className="imageEnlargeModal">
                <div
                    className="modal fade"
                    id="imageEnlargeModal"
                    tabIndex="-1"
                    aria-labelledby="imageEnlargeLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content shadow-lg border-0 rounded-3">
                            <div className="modal-header border-0">
                                <h1 className="modal-title fs-4 fw-bold" id="imageEnlargeLabel">Enlarged Image</h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body d-flex justify-content-center">
                                {enlargedImage &&
                                    <img src={enlargedImage} alt="Enlarged" className="img-fluid rounded-3 shadow-lg"/>}
                            </div>
                            <div className="modal-footer border-0">
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Search Field */}
            <div className="input-group searchMovie mt-4">
                <div className="form-outline">
                    <input id="search-focus" type="search" className="form-control"/>
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
                {movies.map((movie) => (
                    <tr key={movie.id}>
                        <td>
                            <div className="d-flex align-items-center">
                                <img
                                    src={movie.image1 || "https://via.placeholder.com/60"}
                                    alt="Movie Thumbnail"
                                    style={{width: "60px", height: "25px"}}
                                    onClick={() => handleImageClick(movie.image1)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#imageEnlargeModal"
                                    className="enlargeImage"
                                />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">{movie.title}</p>
                                    <p className="text-muted mb-0">{movie.year}</p>
                                </div>
                            </div>
                        </td>
                        <td>{movie.category}</td>
                        <td>{movie.description}</td>
                        <td>
                            <button
                                type="button"
                                className="btn btn-link btn-sm btn-rounded"
                                data-bs-toggle="modal"
                                data-bs-target="#editMovieFormModal"
                                onClick={() => handleShowModal(editMovieModalRef, "Edit Movie Details")}
                            >
                                <img src={editIcon} alt="editIcon" style={{width: "25px", height: "25px"}}/>
                            </button>
                            <button
                                className="btn btn-link text-danger"
                                onClick={() => handleDeleteMovie(movie.id)}
                                data-bs-toggle="modal"
                                data-bs-target="#confirmDeleteModal"
                            >
                                <img src={deleteIcon} alt="deleteIcon" style={{width: "25px", height: "25px"}}/>
                            </button>
                        </td>
                    </tr>
                ))}
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
                            Are you sure you want to delete this movie?
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
                                onClick={confirmDeleteMovie}
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

export default AdminMovieSection;
