import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../services/allApis";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { loginResponseContext } from "../context/ContextApi";
import "animate.css"; // Import Animate.css
import Swal from "sweetalert2";

function Auth({ register }) {
  const navigate = useNavigate();
  const { setLoginResponse } = useContext(loginResponseContext);

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  // Check session storage to prevent going back after logout
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("existingUser")) || null;

    if (user) {
      // Redirect logged-in users away from login/register pages
      navigate(user.role === "admin" ? "/adminPage" : "/", { replace: true });
    }

    // Handle back navigation after logout
    window.onpopstate = () => {
      if (!sessionStorage.getItem("existingUser")) {
        navigate("/pagenotfound", { replace: true });
      }
    };
  }, [navigate]);

  const handleRegister = async () => {
    const { username, email, password } = userDetails;
    if (!username || !email || !password) {
      toast.info("Please fill the form");
    } else {
      const reqBody = { username, email, password };
      try {
        const result = await registerApi(reqBody);
        if (result.status === 200) {
          Swal.fire({
            title: "Registration Successful",
            text: "Your account has been created successfully. Redirecting to login...",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          setUserDetails({ username: "", email: "", password: "" });
          setTimeout(() => navigate("/login"), 2000);
        } else if (result.status === 400) {
          toast.warning("User Already Exists");
          setUserDetails({ username: "", email: "", password: "" });
        }
      } catch (error) {
        toast.error("An error occurred");
        console.error(error);
      }
    }
  };

  const handleLogin = async () => {
    const { email, password, role } = userDetails;
    if (!email || !password || !role) {
      toast.info("Please fill the form");
      return;
    }
    try {
      const reqBody = { email, password, role };
      const result = await loginApi(reqBody);
      if (result.status === 200) {
        const userData = result.data.existingUser;
        setLoginResponse(true);
        sessionStorage.setItem("existingUser", JSON.stringify(userData));
        sessionStorage.setItem("token", result.data.token);
        Swal.fire({
          title: "Login Successful",
          text: `Welcome back ${result.data.existingUser.username}`,
          icon: "success",
          timer: 1900,
          showConfirmButton: false,
        });
        setUserDetails({ username: "", email: "", password: "", role: "" });

        setTimeout(() => {
          navigate(userData.role === "admin" ? "/adminPage" : "/");
        }, 2000);
      } else if (result.status === 403) {
        toast.error("Unauthorized role");
      } else if (result.status === 401) {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };

  return (
    <>
      <div
        className="animate__animated animate__fadeIn"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2E5077",
          padding: "20px",
          margin: "0",
        }}
      >
        <div
          className="animate__animated animate__zoomIn"
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "30px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="text-center">
            <h4 className="animate__animated animate__fadeInDown">
              Tech<span className="fs-3 text-danger">X</span>
            </h4>
            {!register ? (
              <p className="animate__animated animate__fadeIn">
                Sign In to Your Account
              </p>
            ) : (
              <p className="animate__animated animate__fadeIn">
                Sign Up to Your Account
              </p>
            )}
          </div>
          {register && (
            <div className="mb-3 animate__animated animate__fadeIn">
              <input
                type="text"
                placeholder="Username"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, username: e.target.value })
                }
                value={userDetails.username}
                className="form-control"
              />
            </div>
          )}
          <div className="mb-3 animate__animated animate__fadeIn">
            <input
              type="email"
              placeholder="Email ID"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="mb-3 animate__animated animate__fadeIn">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              value={userDetails.password}
              className="form-control"
            />
          </div>
          <div className="mb-4 animate__animated animate__fadeIn">
            {!register && (
              <select
                className="form-control"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, role: e.target.value })
                }
                value={userDetails.role}
                id="role"
                name="role"
                required
              >
                <option value="">Select your role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            )}
          </div>
          {!register ? (
            <button
              className="text-white w-100 btn p-2 mb-2"
              style={{ backgroundColor: "#213555" }}
              onClick={handleLogin}
            >
              Login
            </button>
          ) : (
            <button
              className="text-white w-100 btn p-2 mb-2"
              style={{ backgroundColor: "#213555" }}
              onClick={handleRegister}
            >
              Register
            </button>
          )}

          <div className="text-center mt-3">
            {!register ? (
              <p className="text-muted">
                New to TechX?{" "}
                <Link to="/register" className="text-primary fw-bold">
                  Create an account
                </Link>
              </p>
            ) : (
              <p className="text-muted">
                Already have an account?{" "}
                <Link to="/login" className="text-primary fw-bold">
                  Sign in
                </Link>
              </p>
            )}
          </div>


        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </>
  );
}

export default Auth;
