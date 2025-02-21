import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editCouponApi } from '../services/allApis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { editCouponContext } from '../context/ContextApi';
import Swal from "sweetalert2";




function EditCoupon({ couponData, courseId }) {
  const [editCoupon, setEditCoupon] = useState({
    code: couponData?.code || "",
    discountAmount: couponData?.discountAmount || "",
    expiryDate: couponData?.expiryDate ? couponData.expiryDate.split("T")[0] : "",
  });

  const { setEditCouponResponse } = useContext(editCouponContext)

  const [token, setToken] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const handleCancel = () => {
    setEditCoupon({
      code: couponData?.code || "",
      discountAmount: couponData?.discountAmount || "",
      expiryDate: couponData?.expiryDate ? couponData.expiryDate.split("T")[0] : "",
    });
    setShow(false);
  };

  const handleEdit = async () => {
    const { code, discountAmount, expiryDate } = editCoupon;
    if (!code || !discountAmount || !expiryDate) {
      Swal.fire({
        title: "Please fill out all fields.",
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
      courseId: couponData.courseId || courseId,     };

    if (!token) {
      Swal.fire({
        title: "Please login to continue.",
        icon: "warning",
        position: "top-center",
        timer: 2500, // Auto close after 2.5s
        showConfirmButton: false,
      });
      return;
    }

    try {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
      const id = couponData._id;
      const result = await editCouponApi(id, reqBody, reqHeader);
      console.log(result);

      if (result.status === 200) {
        setEditCouponResponse(result);
        Swal.fire({
          title: "Coupon edited successfully",
          icon: "success",
          position: "center",
          timer: 2500, // Auto close after 2.5s
          showConfirmButton: false,
        }).then(() => {
          setTimeout(() => setShow(false), 2000);
        });
      } else {
        Swal.fire({
          title: result.response?.data || "Something went wrong",
          icon: "error",
          position: "top-center",
          timer: 2500, // Auto close after 2.5s
          showConfirmButton: false,
        });
        handleCancel();
      }
    } catch (error) {
      Swal.fire({
        title: "Error updating coupon",
        icon: "error",
        position: "top-center",
        timer: 2500, // Auto close after 2.5s
        showConfirmButton: false,
      });
    }
  };


  return (
    <>
      <button className='btn btn-warning p-lg-2 p-1 text-light' onClick={() => setShow(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>
      <Modal show={show} onHide={handleCancel} className="animate__animated animate__fadeIn modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className='mb-3'>
              <input
                type="text"
                placeholder='Coupon Code'
                value={editCoupon.code}
                onChange={(e) => setEditCoupon({ ...editCoupon, code: e.target.value })}
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <input
                type="number"
                placeholder='Discount Amount'
                value={editCoupon.discountAmount}
                onChange={(e) => setEditCoupon({ ...editCoupon, discountAmount: e.target.value })}
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <input
                type="date"
                placeholder='Expiry Date'
                value={editCoupon.expiryDate}
                onChange={(e) => setEditCoupon({ ...editCoupon, expiryDate: e.target.value })}
                className='form-control'
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
          <Button variant="primary" onClick={handleEdit}>Edit Coupon</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditCoupon;
