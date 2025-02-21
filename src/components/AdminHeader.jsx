import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { loginResponseContext } from "../context/ContextApi";
import Swal from "sweetalert2";

function AdminHeader() {
  const navigate = useNavigate();
  const { setLoginResponse } = useContext(loginResponseContext);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    Swal.fire({
      title: "Logged Out",
      text: "You have been logged out successfully.",
      icon: "success",
      position: "top-center",
      timer: 2500,
      showConfirmButton: false,
    });

    setTimeout(() => {
      setLoginResponse(false);
      navigate("/");
    }, 2600);
  };

  return (
    <>
      <Navbar expand="lg" className="p-3" style={{ backgroundColor: "#213555" }} variant="dark">
        <Container>
          <Navbar.Brand className="fs-4" href="/adminPage">
            Tech<span className="fs-2 text-danger">X</span>
          </Navbar.Brand>

          {/* Toggle Button for Mobile Screens */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav" className="ms-auto">
            <Nav className="ms-auto d-flex flex-column flex-lg-row align-items-lg-center gap-2">
              <Link to="/adminPage" className="nav-link w-100 w-lg-auto">
                <button className="btn text-light custom-blue-btn w-100">Home</button>
              </Link>
              <Link to="/admin/allcoupons" className="nav-link w-100 w-lg-auto">
                <button className="btn text-light custom-blue-btn w-100">Coupons</button>
              </Link>
              <Link to="/userdetails" className="nav-link w-100 w-lg-auto">
                <button className="btn text-light custom-blue-btn w-100">Users</button>
              </Link>
              <button className="btn text-light custom-red-btn w-100 w-lg-auto" onClick={handleLogout}>
                Logout
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminHeader;
