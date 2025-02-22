
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addCouponApi } from '../services/allApis';
import Swal from "sweetalert2";


function AddCoupons({ courseId }) {
  console.log(courseId);




  const [coupon, setCoupon] = useState({
    code: "",
    discountAmount: "",
    expiryDate: "",
  });



  const [token, setToken] = useState("")


  const handleCancel = () => {
    setCoupon({
      code: "",
      discountAmount: "",
      expiryDate: "",
      courseId,
    })
  }


  const handleAdd = async () => {
    const { code, discountAmount, expiryDate } = coupon;

    if (!code || !discountAmount || !expiryDate) {
      Swal.fire({
        title: "Incomplete Form!",
        text: "Please fill out all fields.",
        icon: "info",
        position: "top-center",
        timer: 2500, // Auto close after 2.5s
        showConfirmButton: false,
      });
      return;
    }

    const reqBody = {
      code,
      discountAmount,
      expiryDate,
      courseId,
    };

    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await addCouponApi(reqBody, reqHeader);
        console.log(result);

        if (result.status === 200) {
          Swal.fire({
            title: "Coupon Added!",
            text: `The coupon "${code}" has been added successfully with a ₹${discountAmount} discount.`,
            icon: "success",
            position: "center",
            timer: 3000, // Auto close after 3s
            showConfirmButton: false,
          }).then(() => {
            handleClose(); // Close modal AFTER alert disappears
          });
        } else if (result.status === 406) {
          Swal.fire({
            title: "Error!",
            text: result.response.data,
            icon: "error",
            position: "top-center",
            timer: 3000,
            showConfirmButton: false,
          }).then(() => {
            handleCancel(); // Reset form after alert
          });
        } else {
          Swal.fire({
            title: "Something went wrong!",
            text: "Please try again later.",
            icon: "error",
            position: "top-center",
            timer: 3000,
            showConfirmButton: false,
          }).then(() => {
            handleClose();
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Network Error!",
          text: "Unable to reach the server.",
          icon: "error",
          position: "top-center",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } else {
      Swal.fire({
        title: "Login Required!",
        text: "Please log in to add a coupon.",
        icon: "warning",
        position: "top-center",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])



  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    handleCancel()
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <button style={{ backgroundColor: '#10B981' }} className='btn text-light  p-lg-2 p-1 me-2' onClick={handleShow}>Add Coupon</button>
      <Modal
        show={show}
        onHide={handleClose}
        className={`animate__animated ${show ? "animate__fadeIn" : "animate__fadeOutLeft slow-close"} modal-lg`}
      >
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>Add Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <div className="container">
            <div className="row">
              <div className='mb-3'>
                <input
                  type="text"
                  placeholder='Coupon code'
                  value={coupon.code}
                  onChange={(e) => setCoupon({ ...coupon, code: e.target.value })}
                  className='form-control'
                />
              </div>
              <div className='mb-3'>
                   <input
                                  type="number"
                                  placeholder="discountAmount"
                                  value={coupon.discountAmount}
                                  onChange={(e) => {
                                    let value = e.target.value;
                
                                    // Prevent multiple dots (e.g., "12.34.56")
                                    if (!/^\d*\.?\d*$/.test(value)) {
                                      Swal.fire({
                                        icon: "error",
                                        title: "Invalid Input",
                                        text: "Please enter a valid number!",
                                      });
                                      return;
                                    }
                
                                    // Convert to number
                                    const numericValue = parseFloat(value);
                
                                    // Prevent negative values and zero
                                    if (numericValue < 1) {
                                      Swal.fire({
                                        icon: "warning",
                                        title: "Invalid Price",
                                        text: "Price cannot be less than 1!",
                                      });
                                      return;
                                    }
                
                                    setCoupon({ ...coupon, discountAmount: e.target.value  });
                                  }}
                                  className='form-control'
                                />
              </div>
              <div className='mb-3'>
                <input
                  type="date"
                  placeholder='Expiry Date'
                  value={coupon.expiryDate}
                  onChange={(e) => setCoupon({ ...coupon, expiryDate: e.target.value })}
                  className='form-control'
                />
              </div>


            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button variant="secondary" onClick={handleCancel} className="btn-custom">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd} className="btn-custom">
            Add Coupon
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCoupons;











