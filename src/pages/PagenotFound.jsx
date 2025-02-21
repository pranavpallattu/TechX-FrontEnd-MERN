import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "animate.css";

function Pagenotfound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };
  return (
    <div className="container-fluid p-5" style={{ minHeight: '100vh' }}>
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-6 text-center animate__animated animate__fadeIn">
          {/* GIF Image with animation */}
          <img
            src="https://media.istockphoto.com/id/1404059706/vector/website-page-not-found-error-404-oops-worried-robot-character-peeking-out-of-outer-space.jpg?s=612x612&w=0&k=20&c=DvPAUof9UsNuNqCJy2Z7ZLLk75qDA3bbLXOOW_50wAk="
            alt="404 Error"
            className="w-75 rounded-circle mb-4"
          />

          {/* Heading and subheading with animation */}
          <h1 className="display-4 text-danger animate__animated animate__zoomIn">
            Looks Like You're Lost
          </h1>
          <h4 className="text-muted mb-4">
            The Page You're Looking for is unavailable
          </h4>

          {/* Button with animation */}
          {/* <Link to="/"> */}
          <button onClick={handleGoHome} className="btn btn-success btn-lg animate__animated animate__pulse animate__infinite mt-3">
            Go Home
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Pagenotfound;
