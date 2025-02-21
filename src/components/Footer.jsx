import { faFacebook, faInstagram, faTelegram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Footer() {
  return (
    <footer className="py-5" style={{ backgroundColor: "#213555", color: "#ffffff" }}>
      <div className="container">
        <div className="row text-center text-md-start">

          {/* Brand & Social Media */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h3 className="fw-bold text-light">Tech<span className="text-danger fs-2">X</span></h3>
            <p className="text-secondary">Empowering learning through technology.</p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <FontAwesomeIcon icon={faYoutube} className="fs-3" style={{ color: "#FF0000" }} />   {/* YouTube - Red */}
              <FontAwesomeIcon icon={faInstagram} className="fs-3" style={{ color: "#E1306C" }} />  {/* Instagram - Pinkish */}
              <FontAwesomeIcon icon={faFacebook} className="fs-3" style={{ color: "#1877F2" }} />  {/* Facebook - Blue */}
              <FontAwesomeIcon icon={faTelegram} className="fs-3" style={{ color: "#0088CC" }} />  {/* Telegram - Blue */}
            </div>
          </div>

          {/* Explore Section */}
          <div className="col-md-2">
            <h5 className="text-uppercase fw-bold text-danger">Explore</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Courses</a></li>
              <li><a href="#" className="text-light text-decoration-none">Blog</a></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="col-md-2">
            <h5 className="text-uppercase fw-bold text-danger">Legal</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Terms & Conditions</a></li>
              <li><a href="#" className="text-light text-decoration-none">Privacy Policy</a></li>
              <li><a href="#" className="text-light text-decoration-none">Refund Policy</a></li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="col-md-4">
            <h5 className="text-uppercase fw-bold text-danger">Support</h5>
            <p>Email: <a href="mailto:support@gmail.com" className="text-light">supportTechX@gmail.com</a></p>
            <p>Phone: <span className="text-secondary">+91 3977 098 765</span></p>
          </div>

        </div>

        {/* Divider Line */}
        <hr className="border-secondary my-4" />

        {/* Copyright */}
        <div className="text-center text-secondary">
          <p className="mb-0">&copy; 2025 TechX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
