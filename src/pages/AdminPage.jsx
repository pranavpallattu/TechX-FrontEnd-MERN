import React, { useContext, useEffect, useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import AddCourse from '../components/AddCourse';
import EnrolledCourse from '../components/EnrolledCourse';
import { getCourseApi } from '../services/allApis';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { addCourseContext, deleteCourseContext, editCourseContext } from '../context/ContextApi';
import "animate.css"; // Import Animate.css

function AdminPage() {
  const [courseDetails, setCourseDetails] = useState([]);

  const { addCourseResponse } = useContext(addCourseContext);
  const { deleteCourseResponse } = useContext(deleteCourseContext);
  const { editCourseResponse } = useContext(editCourseContext);

  // Fetch course data
  const getCourse = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      try {
        const result = await getCourseApi(reqHeader);
        console.log("API Response:", result.data);
        setCourseDetails(result.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }
  };

  useEffect(() => {
    console.log('Component mounted');
    getCourse();
  }, [addCourseResponse, deleteCourseResponse, editCourseResponse]);

  return (
    <>
      <AdminHeader />

      <div className="container-fluid my-5 p-4">
        {/* Admin Controls Section */}
        <div className="d-flex justify-content-between align-items-center mb-4 animate__animated animate__fadeIn">
          <AddCourse />
          <Link to='/admin/allcoupons'>
            <button className="btn btn-success px-4 py-2" style={{ backgroundColor: '#1e2a47' }}>
              Manage Coupons
            </button>
          </Link>
        </div>

        {/* Courses Display Section */}
        <div className="row g-4 animate__animated animate__fadeIn my-5">
          {courseDetails?.length > 0 ? (
            courseDetails.map((item) => (
              <div className="col-md-6 col-lg-4" key={item._id}>
                <div className="card shadow-lg border-0 rounded-3 animate__animated animate__zoomIn">
                  <EnrolledCourse course={item} />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-5">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
                alt="No Courses"
                className="img-fluid w-25 animate__animated animate__fadeIn"
              />
              <p className="text-muted mt-3 animate__animated animate__fadeIn">No courses available.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdminPage;
