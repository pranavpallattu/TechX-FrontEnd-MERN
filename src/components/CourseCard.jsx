import React, { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import PaymentButton from '../components/PaymentButton';
import { serverUrl } from '../services/serverUrl';
import { applyCouponApi, getCouponsForCourseApi, getUserDataApi } from '../services/allApis';
import { addPaymentContext } from '../context/ContextApi';
import 'animate.css'; // Import Animate.css
import Swal from "sweetalert2";


function CourseCard({ page, course, loginResponse }) {
  const user = JSON.parse(sessionStorage.getItem("existingUser"));
  const id = user?._id;
  const token = sessionStorage.getItem("token");


  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { paymentResponse } = useContext(addPaymentContext);

  const [discountedPrice, setDiscountedPrice] = useState(course?.price);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState('');

  const isEnrolled = enrolledCourses.includes(course._id);

  const reqHeader = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };

  const getUserData = async () => {
    if (!id) return;
    try {
      const result = await getUserDataApi(id, reqHeader);
      setEnrolledCourses(result.data.enrolledCourses);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (loginResponse) {
      getUserData();
    } else {
      setEnrolledCourses([]); // Reset enrolled courses when logged out
    }
  }, [loginResponse, id, paymentResponse]);


  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await getCouponsForCourseApi(course._id, reqHeader);
        if (response.status === 200) {
          setAvailableCoupons(response.data);
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    if (token) {
      fetchCoupons();
    }
  }, [course._id, token]);

  const applyCoupon = async () => {
    if (!selectedCoupon) {
      Swal.fire({
        title: "Please select a coupon.",
        icon: "info",
        position: "top-center",
        timer: 2500, // Auto close after 2.5s
        showConfirmButton: false,
      });
      return;
    }

    try {
      const response = await applyCouponApi({ courseId: course._id, couponCode: selectedCoupon }, reqHeader);
      if (response.status === 200) {
        setDiscountedPrice(response.data.finalAmount);
        setDiscountAmount(response.data.discountAmount);
        setCouponApplied(true);
        Swal.fire({
          title: "Coupon  applied successfully!",
          icon: "success",
          position: "center",
          timer: 2500, // Auto close after 2.5s
          showConfirmButton: false,
        });
      } else if (response.status === 406) {
        Swal.fire({
          title: "Coupon has expired",
          icon: "warning",
          position: "top-center",
          timer: 2500, // Auto close after 2.5s
          showConfirmButton: false,
        });
      } else if (response.status === 401) {
        Swal.fire({
          title: "Coupon not valid",
          icon: "warning",
          position: "top-center",
          timer: 2500, // Auto close after 2.5s
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: response.data,
          icon: "warning",
          position: "top-center",
          timer: 2500, // Auto close after 2.5s
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      Swal.fire({
        title: "Invalid or expired coupon.",
        icon: "warning",
        position: "top-center",
        timer: 2500, // Auto close after 2.5s
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <Card className='shadow mt-4 animate__animated animate__fadeIn' style={{ width: '100%', borderRadius: "10px", overflow: "hidden" }}>
        {page ? (
          <Card.Img
            height={'300px'}
            variant="top"
            src={course.coverImage}
            style={{ objectFit: "cover" }}
            className="animate__animated animate__fadeIn"
          />
        ) : (
          <video
            controls
            controlsList="nodownload"
            style={{ display: "block", margin: "0 auto", maxWidth: "100%", borderRadius: "10px" }}
            className="animate__animated animate__fadeIn"
            src={course.introVideo}
          ></video>
        )}

        <Card.Body className='my-3'>
          <p className="text-center  animate__animated animate__fadeIn" style={{ color: "#002147", fontSize: "1.6rem" }}>
            {course?.title}

          </p>

          <Card.Text className='my-3' style={{ textAlign: "justify", color: "#555", fontSize: "0.95rem" }}>
            {course?.description.length > 100 ? `${course?.description.slice(0, 100)}...` : course?.description}
          </Card.Text>
          <p className={`fs-5 mb-3 ${loginResponse && isEnrolled ? "invisible" : ""}`}>
            Price: {course.price}
          </p>


          {!page && (
            <div className="mb-3">
              <h6 className="animate__animated animate__fadeIn" style={{ fontWeight: "600", color: "#343a40" }}>
                Tutor: <span style={{ fontWeight: "400" }}>{course?.instructor}</span>
              </h6>
              <h6 className="animate__animated animate__fadeIn" style={{ fontWeight: "600", color: "#343a40" }}>
                Duration: <span style={{ fontWeight: "400" }}>{course?.duration}</span>
              </h6>
              <h6 className="animate__animated animate__fadeIn" style={{ fontWeight: "600", color: "#343a40" }}>
                Skill Level: <span style={{ fontWeight: "400" }}>{course?.skill}</span>
              </h6>
              <h6 className="animate__animated animate__fadeIn" style={{ fontWeight: "600", color: "#343a40" }}>
                Lectures: <span style={{ fontWeight: "400" }}>{course?.lectures?.length}</span>
              </h6>
            </div>
          )}

          {/* Show Price and Coupon Options Only if User is Not Enrolled */}
          {!page && !isEnrolled && (
            <>
              <h3 className="fw-bold mt-3 animate__animated animate__fadeIn">
                <span style={{ color: "#28a745" }}>₹{discountedPrice}</span>
                {couponApplied && <span className="text-danger fs-5"> (-₹{discountAmount} off)</span>}
              </h3>

              {/* Coupon Dropdown */}
              {availableCoupons.length > 0 ? (
                <div className="mb-3 animate__animated animate__fadeIn">
                  <h6 style={{ fontWeight: "600", color: "#343a40" }}>Available Coupons:</h6>
                  <select
                    className="form-select"
                    style={{ border: "1px solid #ced4da", padding: "8px", borderRadius: "5px" }}
                    value={selectedCoupon}
                    onChange={(e) => setSelectedCoupon(e.target.value)}
                  >
                    <option value="">Select a Coupon</option>
                    {availableCoupons.map((coupon, index) => (
                      <option key={index} value={coupon.code}>
                        {coupon.code} - ₹{coupon.discount} off
                      </option>
                    ))}
                  </select>

                  <button onClick={applyCoupon} style={{ backgroundColor: '#28a745' }} className='btn text-light  p-2 mt-2 w-100'>
                    Apply Coupon
                  </button>
                </div>
              ) :
                <h5 style={{ color: '#343a40' }} className='my-3'>No Available Coupons for {course?.title}</h5>
              }

              {/* Payment Button */}
              <PaymentButton
                courseId={course?._id}
                amount={discountedPrice}
              />
            </>
          )}
          {page && (
            <>
              {!loginResponse ? ( // If user is not logged in
                <Link to={'/login'}>
                  <button className="btn login-to-enroll-btn text-light p-2  animate__animated animate__fadeIn">
                    Login to Enroll
                  </button>
                </Link>
              ) : isEnrolled ? ( // If user is logged in and enrolled
                <Link to='/dashboard'>
                  <button className="btn w-100 btn-info p-2 text-light available-btn">
                    Available
                  </button>
                </Link>
              ) : ( // If user is logged in but not enrolled
                <Link to={`/course/${course._id}`}>
                  <button className="btn w-100 enroll-btn text-light p-2">
                    Enroll Now
                  </button>
                </Link>
              )}
            </>
          )}

        </Card.Body>
      </Card>
    </>

  );
}

export default CourseCard;
