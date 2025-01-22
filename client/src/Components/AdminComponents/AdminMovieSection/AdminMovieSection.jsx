import './MovieSection.css';
import plusMark from '../../../assets/Images/plus.png';
import minusMark from '../../../assets/Images/minusMark.png';
import deleteIcon from '../../../assets/Images/deleteIcon.png';
import editIcon from '../../../assets/Images/editIcon.png';
import AdminNavBar from "../AdminNavBar/AdminNavBar.jsx";
import Footer from "../../Footer/Footer.jsx";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import CircleSpinner from "../../CircleSpinner/CircleSpinner.jsx";
import CategoryModel from "./CategoryModel/CategoryModel.jsx";
import {urlPattern1} from '../../../../env.jsx'

function AdminMovieSection() {
    const urlPattern = urlPattern1
    const movieModalRef = useRef(null);
    const editMovieModalRef = useRef(null);
    const categoryAddModalRef = useRef(null);
    const categoryRemoveModalRef = useRef(null);
    const [enlargedImage, setEnlargedImage] = useState([]);
    const [movieId, setMovieId] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [movies, setMovies] = useState([]);
    const [searchMovies, setSearchMovies] = useState([]);
    const [movie, setMovie] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(false);
    const [movieCount, setMovieCount] = useState(0);

    const handleShowModal = (modalRef, recipient) => {
        const modalElement = modalRef.current;
        if (modalElement) {
            const modalTitle = modalElement.querySelector('.modal-title');
            modalTitle.textContent = `${recipient}`;
        }
    };

    const handleShowEditModal = (modalRef, recipient, id) => {
        const selectedMovie = movies.find((movie) => movie.id === id);
        setMovie(selectedMovie);
        console.log(movie.title)
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

    const handleImageClick = (imageUrl1, imageUrl2, imageUrl3) => {
        setEnlargedImage([imageUrl1, imageUrl2, imageUrl3]);
    };

    const handleDeleteMovie = (movieId) => {
        setMovieId(movieId);
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === "file" ? e.target.files[0] : e.target.value.trim();
        setInputs((prevValues) => ({...prevValues, [name]: value}));
    };

    const handleFormSubmit = (event, needValidation, url, method) => {
        event.preventDefault();
        if (inputs.category === "default" ) {
            alert("Please select a valid category!");
        } else {
            const form = document.querySelector(needValidation);

            if (!form.checkValidity()) {
                form.classList.add("was-validated");
            } else {
                updateDatabase(url, method);
            }
        }
    };

    const handleAddCategoryFormSubmit = (event, needValidation, url, method) => {
        event.preventDefault();
        const form = document.querySelector(needValidation);
        if (!form.checkValidity()) {
            form.classList.add("was-validated");
        }
        updateDatabase(url, method);
    }


    //delete movie
    const confirmDeleteMovie = async () => {
        try {
            await axios.delete(`${urlPattern}/api/movies/${movieId}/`);
            alert("Movie deleted successfully!");
            window.location.href = "/admin/movies";
        } catch (error) {
            console.error("Error deleting Movie:", error);
            alert("Failed to delete the Movie. Please try again.");
        }
        setMovieId(null);
    };

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

    const handleRemoveCategoryFormSubmit = (event, needValidation, url, method) => {
        event.preventDefault();
        const form = document.querySelector(needValidation);
        if (!form.checkValidity()) {
            form.classList.add("was-validated");
        }
        updateDatabase(url, method);
    }

    const handleEditFormSubmit = (event, url, method) => {
        console.log(inputs)
        event.preventDefault();
        updateDatabase(url, method);

    };

    //search movie
    const searchMovie = async (movieName) => {
        axios.get(`${urlPattern}/api/movies/search/${movieName}/`)
            .then(response => {
                const movieData = response.data.data[0];
                setSearchMovies(Array.isArray(movieData) ? movieData : [movieData]);
                console.log(searchMovies);
            })
            .catch(error => {
                alert("No Movies Found")
                console.log(error.message);
            });
    };


    //get category List
    useEffect(() => {
        fetchMovieCount();
        axios.get(`${urlPattern}/api/genres`)
            .then(response => {
                setCategoryList(response.data.results);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error.message);
            });
    }, []);

    //update Database
    const updateDatabase = async (url, method) => {
        setLoading(true);

        const formData = new FormData();
        for (const key in inputs) {
            formData.append(key, inputs[key]);
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
                closeModal();
                alert(response.data.message);
                window.location.reload();
            }
        } catch (error) {
            setLoading(false);
            console.error("Error adding Movie:", error);
            alert("Failed to add Movie. Please try again.");
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

    const fetchMovieCount = async () => {
        try {
            const response = await axios.get(`${urlPattern}/api/movies/count/`);
            setMovieCount(response.data.total_movies);
        } catch (error) {
            console.error('Error fetching movie count:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="adminMovieSection">
            {loading && <CircleSpinner/>}
            <AdminNavBar/>
            <div className="row movieSection gap-4">
                <div className="left col-7">
                    <div className="totalMovie bgImage">
                        <p>Total Movies = {movieCount}</p>
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
                        className="categoryButtons"
                        data-bs-toggle="modal"
                        data-bs-target="#addCategoryModal"
                        onClick={() => handleShowModal(categoryAddModalRef, "Add Category")}
                    >
                        Add Category
                        <img className="ms-5 signButtons" src={plusMark} alt="plusSign"/>
                    </button>
                    <button
                        className="movieAddButton categoryButtons"
                        data-bs-toggle="modal"
                        data-bs-target="#removeCategoryModal"
                        onClick={() => handleShowModal(categoryRemoveModalRef, "Remove Category")}
                    >
                        Remove Category
                        <img className="ms-5 signButtons" src={minusMark} alt="plusSign"/>
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
                                    onSubmit={(event) => handleFormSubmit(event, ".needs-validation1", "/api/movies/", "post")}
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
                                        <select
                                            className="form-select fieldDisabled"
                                            id="categoryList"
                                            required
                                            value={inputs.categoryId || "default"} // Ensure it defaults to "default"
                                            name="categoryId" // Use "categoryId" as the name
                                            onChange={handleChange} // Updates state with the selected value
                                        >
                                            <option value="default" disabled>
                                                Select Category
                                            </option>
                                            {Array.isArray(categoryList) &&
                                                categoryList.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
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
                                    {[1, 2].map(num => (
                                        <div className="col-md-6" key={`image${num}`}>
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
                                    <div className="col-md-12">
                                        <label htmlFor="movieTrailer" className="form-label">Movie Trailer Link</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="movieTrailer"
                                            placeholder="Enter Trailer Link"
                                            onChange={handleChange}
                                            required
                                            name="movieTrailer"
                                        />
                                        <div className="invalid-feedback">Please enter a valid movie Trailer Link.</div>
                                    </div>
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
                                    onSubmit={(event) => handleEditFormSubmit(event, `/api/movies/${movie.id}/`, "patch")}
                                >
                                    <div className="col-md-6">
                                        <label htmlFor="movieName" className="form-label">Movie Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="movieName"
                                            placeholder="Enter movie name"
                                            required
                                            onChange={(e) =>
                                                setInputs((prevState) => ({
                                                    ...prevState,
                                                    title: e.target.value,
                                                }))
                                            }
                                            name="title"
                                            value={inputs.title !== undefined ? inputs.title : movie?.title || ""}

                                        />
                                        <div className="invalid-feedback">Please enter the movie name.</div>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="categoryList" className="form-label">Category</label>
                                        <select
                                            className="form-select feildDisabled"
                                            id="categoryList"
                                            required
                                            name="category"
                                            value={inputs.category !== undefined ? inputs.category : movie?.category || "default"}
                                            onChange={handleChange}
                                        >
                                            <option value="default">Select Category</option>
                                            {Array.isArray(categoryList) &&
                                                categoryList.map((category, index) => (
                                                    <option key={index} value={category.name}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                        </select>
                                        <div className="valid-feedback">Looks good!</div>
                                        <div className="invalid-feedback">Please select a valid Category.</div>
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
                                            name="description"
                                            value={inputs.description !== undefined ? inputs.description : movie?.description || ""}
                                        ></textarea>
                                        <div className="invalid-feedback">Please enter a movie description.</div>
                                    </div>
                                    {[1, 2].map(num => (
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
                                    <div className="col-md-12">
                                        <label htmlFor="movieTrailer" className="form-label">Movie Trailer Link</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="movieTrailer"
                                            placeholder="Enter Trailer Link"
                                            onChange={handleChange}
                                            required
                                            name="movieTrailer"
                                        />
                                        <div className="invalid-feedback">Please enter a valid movie Trailer Link.</div>
                                    </div>
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
            <CategoryModel method="post" handleChange={handleChange}
                           handleCategoryFormSubmit={handleAddCategoryFormSubmit}
                           buttonClass="primary" categoryModalRef={categoryAddModalRef} modelTitle={"Add Category"}
                           id="addCategoryModal" url="/api/genres/"
                           formBody={
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
                           }/>
            <CategoryModel method="delete" handleChange={handleChange}
                           handleCategoryFormSubmit={handleRemoveCategoryFormSubmit}
                           buttonClass="danger" categoryModalRef={categoryRemoveModalRef} modelTitle={"Remove Category"}
                           id="removeCategoryModal" url={`/api/genres/delete-genres/${encodeURIComponent(
                               inputs.category)}/`}
                           formBody={
                               <div className="col-12">
                                   <label htmlFor="categoryList" className="form-label">Category</label>
                                   <select
                                       className="form-select feildDisabled"
                                       id="categoryList"
                                       required
                                       name="category"
                                       value={inputs.category !== undefined ? inputs.category : movie?.category || "default"}
                                       onChange={handleChange}
                                   >
                                       <option value="default">Select Category</option>
                                       {Array.isArray(categoryList) &&
                                           categoryList.map((category, index) => (
                                               <option key={index} value={category.name}>
                                                   {category.name}
                                               </option>
                                           ))}
                                   </select>
                                   <div className="invalid-feedback">
                                       Please enter a category name.
                                   </div>
                               </div>

                           }/>


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
                            <div className="modal-body">
                                {/* Carousel */}
                                <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {/* Image 1 */}
                                        <div className="carousel-item active">
                                            <img src={enlargedImage[0]}
                                                 className="d-block w-100 img-fluid rounded-3 shadow-lg" alt="Image 1"/>
                                        </div>
                                        {/* Image 2 */}
                                        <div className="carousel-item">
                                            <img src={enlargedImage[1]}
                                                 className="d-block w-100 img-fluid rounded-3 shadow-lg" alt="Image 2"/>
                                        </div>
                                        {/* Image 3 */}
                                        <div className="carousel-item">
                                            <img src={enlargedImage[2]}
                                                 className="d-block w-100 img-fluid rounded-3 shadow-lg" alt="Image 3"/>
                                        </div>
                                    </div>
                                    {/* Previous and Next Arrows */}
                                    <button className="carousel-control-prev" type="button"
                                            data-bs-target="#carouselExample" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button"
                                            data-bs-target="#carouselExample" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                            <div className="modal-footer border-0"></div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Search Field */}
            <div className="input-group searchMovie mt-4">
                <div className="form-outline">
                    <input id="search-focus" type="search" className="form-control"
                           name="searchMovie"
                           onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="search-focus">Search</label>
                </div>
                <button type="button" className="btn btn-primary"
                        onClick={() => searchMovie(inputs.searchMovie)}
                >
                    <i className="fas fa-search"></i>
                </button>
            </div>

            {/* Movies Table */}
            <table className="table align-middle mb-5 bg-white">
                <thead className="bg-light">
                <tr>
                    <th>Movie Id</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {(
                    Array.isArray(searchMovies) && searchMovies.length > 0 ? (
                        searchMovies.map((movie) => (
                            <tr key={movie.id}>
                                <td>{movie.id}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={movie.image1 || "https://via.placeholder.com/60"}
                                            alt="Movie Thumbnail"
                                            style={{width: "60px", height: "25px"}}
                                            onClick={() => handleImageClick(movie.image1, movie.image2, movie.image3)}
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
                                        className="btn btn-link btn-sm btn-rounded "
                                        data-bs-toggle="modal"
                                        data-bs-target="#editMovieFormModal"
                                        onClick={() => handleShowEditModal(editMovieModalRef, "Edit Movie Details", movie.id)}
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
                        ))
                    ) : (Array.isArray(movies) && movies.length > 0) ? (
                        movies.map((movie) => (
                            <tr key={movie.id}>
                                <td>{movie.id}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={movie.image1 || "https://via.placeholder.com/60"}
                                            alt="Movie Thumbnail"
                                            style={{width: "60px", height: "25px"}}
                                            onClick={() => handleImageClick(movie.image1, movie.image2, movie.image3)}
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
                                        className="btn btn-link btn-sm btn-rounded ps-4"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editMovieFormModal"
                                        onClick={() => handleShowEditModal(editMovieModalRef, "Edit Movie Details", movie.id)}
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
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No movies found.</td>
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
