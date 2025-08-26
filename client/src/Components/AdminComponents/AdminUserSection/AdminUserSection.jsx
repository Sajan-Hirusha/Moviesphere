import "./UserSection.css";
import deleteIcon from "../../../assets/Images/deleteIcon.png";
import editIcon from "../../../assets/Images/editIcon.png";
import AdminNavBar from "../AdminNavBar/AdminNavBar.jsx";
import Footer from "../../Footer/Footer.jsx";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { urlPattern1 } from "../../../../env.jsx";
import CircleSpinner from "../../CircleSpinner/CircleSpinner.jsx";
import { useNavigate } from "react-router-dom";

function AdminUserSection() {
  const urlPattern = urlPattern1;
  const editUserModalRef = useRef(null);
  const [UserToDelete, setUserToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [user, setUser] = useState({});
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [userCount, setUserCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const userType = sessionStorage.getItem("userType");
    if (!userId) {
      navigate("/login");
    } else if (userId) {
      console.log(userType);
      if (userType === "user") {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "file" ? e.target.files[0] : e.target.value.trim();
    setInputs((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleDeleteUser = (userId) => {
    setUserToDelete(userId);
  };

  const handleShowEditModal = (modalRef, recipient, id) => {
    const selectedUser = users.find((user) => user.id === id);
    setUser(selectedUser);
    console.log(user.fName);
    const modalElement = modalRef.current;
    if (modalElement) {
      const modalTitle = modalElement.querySelector(".modal-title");
      modalTitle.textContent = `${recipient}`;
    }
  };
  const confirmDeleteUser = async () => {
    try {
      await axios.delete(`${urlPattern}/api/users/${UserToDelete}/`);
      alert("User deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting User:", error);
      alert("Failed to delete the User. Please try again.");
    }
    setUserToDelete(null);
  };

  useEffect(() => {
    fetchUserCount();
    axios
      .get(`${urlPattern}/api/users?page=${currentPage}`)
      .then((response) => {
        const data = response.data;
        setUsers(data);
        setHasNextPage(data.next !== null);
        setHasPrevPage(data.previous !== null);
      })
      .catch((error) => {
        console.log("Error loading users:", error.message);
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

  const handleEditFormSubmit = (event, url, method) => {
    console.log(inputs);
    console.log("Form is being submitted!");
    event.preventDefault();
    updateDatabase(url, method);
  };

  const updateDatabase = async (url, method) => {
    setLoading(true);

    const formData = new FormData();
    for (const key in inputs) {
      formData.append(key, inputs[key]);
    }

    try {
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await axios({
        method: method,
        url: `${urlPattern}${url}`,
        data: method === "GET" || method === "DELETE" ? null : formData,
        headers:
          method === "GET" || method === "DELETE"
            ? {}
            : {
                "Content-Type": "multipart/form-data",
              },
      });
      setLoading(false);
      if (response.data.success) {
        window.location.reload();
        alert(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error adding User:", error);
      alert("Failed to add User. Please try again.");
    }
  };

  const fetchUserCount = async () => {
    try {
      const response = await axios.get(`${urlPattern}/api/users/count/`);
      setUserCount(response.data.total_users);
    } catch (error) {
      console.error(
        "Error fetching user count:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const searchUser = async (userName, type) => {
    let urlTypePattern = "";
    if (type === "email") {
      urlTypePattern = "search-by-email";
    } else if (type === "name") {
      urlTypePattern = "search-by-name";
    }
    axios
      .get(`${urlPattern}/api/users/${urlTypePattern}/${userName}/`)
      .then((response) => {
        const userData = response.data.data[0];
        setSearchUsers(Array.isArray(userData) ? userData : [userData]);
        console.log(searchUsers);
      })
      .catch((error) => {
        alert("No users Found");
        console.log(error.message);
      });
  };

  return (
    <div className="adminUserSection">
      {loading && <CircleSpinner />}
      <AdminNavBar />
      <div className="row userSection mx-0">
        <div className="left col-12 mx-auto">
          <div className="totalUser bgImage">
            <p className="ms-5">Total Users {userCount}</p>
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
                <h1 className="modal-title fs-5" id="editUserLabel">
                  Edit User
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form
                  className="row g-3"
                  onSubmit={(event) =>
                    handleEditFormSubmit(
                      event,
                      `/api/users/${user.id}/`,
                      "PATCH",
                    )
                  }
                >
                  <div className="col-md-6">
                    <label htmlFor="id" className="form-label">
                      Movie Id
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      required
                      disabled
                      value={user.id !== undefined ? user.id : ""}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="fName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fName"
                      required
                      name="fName"
                      value={
                        inputs.fName !== undefined
                          ? inputs.fName
                          : user?.fName || ""
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lName"
                      required
                      name="lName"
                      value={
                        inputs.lName !== undefined
                          ? inputs.lName
                          : user?.lName || ""
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="userEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="userEmail"
                      required
                      name="email"
                      value={
                        inputs.email !== undefined
                          ? inputs.email
                          : user?.email || ""
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      name="phone_number"
                      required
                      value={
                        inputs.phone_number !== undefined
                          ? inputs.phone_number
                          : user?.phone_number || ""
                      }
                      onChange={handleChange}
                    />
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

      {/* Search Field */}
      <div className="row">
        <div className="input-group searchUser mt-4 col-3">
          <div className="form-outline">
            <input
              id="search-focus"
              type="search"
              className="form-control"
              name="searchUser"
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="search-focus">
              Search By Email
            </label>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => searchUser(inputs.searchUser, "email")}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="input-group searchUser mt-4 col-3">
          <div className="form-outline">
            <input
              id="search-focus"
              type="search"
              className="form-control"
              name="searchUser"
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="search-focus">
              Search By Name
            </label>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => searchUser(inputs.searchUser, "name")}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      {/* User Table */}
      <table className="table align-middle mb-5 bg-white">
        <thead className="bg-light">
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(searchUsers) && searchUsers.length > 0 ? (
            searchUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">
                        {user.fName + " " + user.lName}
                      </p>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-link btn-sm btn-rounded "
                    data-bs-toggle="modal"
                    data-bs-target="#editUserFormModal"
                    onClick={() =>
                      handleShowEditModal(
                        editUserModalRef,
                        "Edit User Details",
                        user.id,
                      )
                    }
                  >
                    <img
                      src={editIcon}
                      alt="editIcon"
                      style={{ width: "25px", height: "25px" }}
                    />
                  </button>
                  <button
                    className="btn btn-link text-danger"
                    onClick={() => handleDeleteUser(user.id)}
                    data-bs-toggle="modal"
                    data-bs-target="#confirmDeleteModal"
                  >
                    <img
                      src={deleteIcon}
                      alt="deleteIcon"
                      style={{ width: "25px", height: "25px" }}
                    />
                  </button>
                </td>
              </tr>
            ))
          ) : Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">
                        {user.fName + " " + user.lName}
                      </p>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-link btn-sm btn-rounded ps-4"
                    data-bs-toggle="modal"
                    data-bs-target="#editUserFormModal"
                    onClick={() =>
                      handleShowEditModal(
                        editUserModalRef,
                        "Edit User Details",
                        user.id,
                      )
                    }
                  >
                    <img
                      src={editIcon}
                      alt="editIcon"
                      style={{ width: "25px", height: "25px" }}
                    />
                  </button>
                  <button
                    className="btn btn-link text-danger"
                    onClick={() => handleDeleteUser(user.id)}
                    data-bs-toggle="modal"
                    data-bs-target="#confirmDeleteModal"
                  >
                    <img
                      src={deleteIcon}
                      alt="deleteIcon"
                      style={{ width: "25px", height: "25px" }}
                    />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Users found.</td>
            </tr>
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
              <h5 className="modal-title" id="confirmDeleteLabel">
                Confirm Deletion
              </h5>
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
      <Footer />
    </div>
  );
}

export default AdminUserSection;
