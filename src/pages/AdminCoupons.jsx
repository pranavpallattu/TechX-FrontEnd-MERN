import React, { useContext, useEffect, useState } from "react";
import { deleteCouponApi, getCouponsApi } from "../services/allApis";
import Swal from "sweetalert2";
import "animate.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import EditCoupon from "../components/EditCoupon";
import Footer from "../components/Footer";
import AdminHeader from "../components/AdminHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteCouponContext, editCouponContext } from "../context/ContextApi";

function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [token, setToken] = useState("");

  const { editCouponResponse } = useContext(editCouponContext);
  const { deleteCouponResponse, setDeleteCouponResponse } = useContext(deleteCouponContext);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchCoupons();
    }
  }, [token, editCouponResponse, deleteCouponResponse]);

  const fetchCoupons = async () => {
    if (!token) return;

    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await getCouponsApi(reqHeader);
      if (result.status === 200) {
        setCoupons(result.data);
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to fetch coupons. Please try again later.",
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
      Swal.fire({
        title: "Server Error",
        text: "There was an error fetching coupons. Please try again later.",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const handleDelete = async (id) => {
    if (!token) return;

    const reqHeader = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await deleteCouponApi(id, reqHeader);
      if (result.status === 200) {
        setDeleteCouponResponse(result);
        Swal.fire({
          title: "Deleted!",
          text: "Coupon deleted successfully.",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error deleting coupon:", error);
      Swal.fire({
        title: "Deletion Failed",
        text: "Failed to delete coupon. Please try again.",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="container my-4">
        <Card className="shadow-lg animate__animated animate__fadeIn">
          <Card.Body>
            <h2 className="text-center fw-bold mb-4 animate__animated animate__fadeIn fs-4" style={{ color: "#1e2a47" }}>
              Manage Coupons
            </h2>

            <div className="table-responsive animate__animated animate__fadeIn">
              <Table className="table table-hover table-bordered text-center align-middle">
                <thead className="table-dark">
                  <tr>
                    <th className="p-2">Code</th>
                    <th className="p-2">Course</th>
                    <th className="p-2">Discount</th>
                    <th className="p-2">Expiry Date</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.length > 0 ? (
                    coupons.map((coupon) => (
                      <tr key={coupon._id} className="animate__animated animate__fadeIn">
                        <td className="p-2 text-break">{coupon.code}</td>
                        <td className="p-2 text-break">{coupon.courseId?.title || "N/A"}</td>
                        <td className="fw-bold text-success p-2">₹{coupon.discountAmount}</td>
                        <td className="p-2">{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                        <td className="p-2">
                          <div className="d-flex justify-content-center gap-2">
                            <EditCoupon couponData={coupon} courseId={coupon._id} />
                            <Button
                              variant="danger"
                              className="d-flex align-items-center animate__animated animate__fadeIn"
                              onClick={() => handleDelete(coupon._id)}
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="animate__animated animate__fadeIn">
                      <td colSpan="5" className="text-center text-muted p-3">
                        No coupons available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </div>

      <Footer />
    </>
  );
}

export default AdminCoupons;
