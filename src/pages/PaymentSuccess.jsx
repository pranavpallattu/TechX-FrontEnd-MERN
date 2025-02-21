import React from "react";
import AdminHeader from "../components/AdminHeader";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "animate.css"; // For animations
import Footer from "../components/Footer";

function PaymentSuccess() {
  return (
    <>
      <AdminHeader />
      <div className="d-flex justify-content-center align-items-center vh-100 p-3">
        <Card
          className="shadow-lg text-center p-4 animate__animated animate__fadeInUp"
          style={{ width: "100%", maxWidth: "450px", borderRadius: "15px" }}
        >
          <Card.Body>
            {/* Success Message */}
            <Card.Title className="fw-bold text-primary fs-3">
              Payment Successful
            </Card.Title>
            <Card.Subtitle className="mb-3 text-muted">
              Thank you for your purchase!
            </Card.Subtitle>
            <Card.Text className="text-secondary">
              Keep learning, stay curious, and work hard to achieve your goals. 🚀
              Your enrolled courses are now available in the dashboard.
            </Card.Text>

            {/* Go to Dashboard Button */}
            <Link to="/dashboard">
              <button className="btn btn-info text-light w-100 fw-bold shadow-sm dashboardbtn">
                Go to Dashboard
              </button>
            </Link>
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </>
  );
}

export default PaymentSuccess;
