import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import AdminHeader from "../components/AdminHeader";
import { deleteUserApi, getAllUsersApi } from "../services/allApis";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Footer from "../components/Footer";
import { removeUserContext } from "../context/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "animate.css";

function Users() {
  const [token, setToken] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { removeUserResponse, setRemoveUserResponse } = useContext(removeUserContext);

  const getAllUsers = async () => {
    if (!token) return;

    const reqHeader = {
      "Content-Type": "multipart/form-data",
      'Authorization': `Bearer ${token}`,
    };

    try {
      const result = await getAllUsersApi(reqHeader);
      setUsersData(result.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!token) return;

    const reqHeader = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    const result = await deleteUserApi(id, reqHeader);
    if (result.status === 200) {
      Swal.fire({
        title: "User Deleted",
        text: "User deleted successfully.",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });

      setUsersData(usersData.filter((user) => user._id !== id)); // Update UI after delete
      setRemoveUserResponse(result);
    }
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [token, removeUserResponse]);

  return (
    <>
      <AdminHeader />
      <div className="container my-5">
        {/* Table Header */}
        <h3 className="text-center fw-semibold mb-4 animate__animated animate__fadeInDown" style={{ color: "#1e2a47" }}>
          <i className="bi bi-people-fill"></i> Users Data
        </h3>

        {/* Loader */}
        {loading ? (
          <div className="text-center my-5 animate__animated animate__fadeIn">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            {usersData?.length > 0 ? (
              <div className="table-responsive animate__animated animate__fadeIn">
                <Table striped bordered hover responsive="md" className="text-center align-middle shadow-sm">
                  <thead className="table-dark text-white sticky-top">
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Enrolled Courses</th>
                      <th>Total Paid (₹)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData.map((user, index) => (
                      <tr key={user._id} className="animate__animated animate__fadeIn">
                        <td className="fw-bold">{index + 1}</td>
                        <td className="text-wrap">{user.username}</td>
                        <td className="text-wrap">{user.email}</td>
                        <td className="text-wrap">
                          {user.enrolledCourses.length > 0
                            ? user.enrolledCourses.map(course => course.title).join(" , ")
                            : "No Courses"}
                        </td>
                        <td className="fw-bold text-success">₹{user.totalPaid}</td>
                        <td>
                          <button className="btn btn-danger p-2 animate__animated animate__fadeIn" onClick={() => handleDelete(user._id)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <Alert variant="warning" className="text-center animate__animated animate__fadeIn">
                <i className="bi bi-exclamation-circle"></i> No users found!
              </Alert>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Users;
