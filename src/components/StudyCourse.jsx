import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../services/serverUrl";
import { deleteLectureApi, getLectureApi } from "../services/allApis";
import "animate.css"; // Ensure Animate.css is included
import Swal from "sweetalert2";
import Header from "./Header";
import Footer from "./Footer";
import AdminHeader from "./AdminHeader";
import { lectureDeleteContext } from "../context/ContextApi";


function StudyCourse() {
  const { courseId } = useParams();
  const [lectures, setLectures] = useState([]);
  const [token, setToken] = useState("");
  const [courseTitle, setCourseTitle] = useState("")

  const role = JSON.parse(sessionStorage.getItem('existingUser'))?.role
  console.log(role);

  const { setLectureDeleteResponse, lectureDeleteResponse } = useContext(lectureDeleteContext)


  // Retrieve token from sessionStorage on component mount
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'))
    }

  }, []);

  // Fetch lectures when token and courseId are available
  useEffect(() => {
    const getLectures = async () => {
      if (!token) return; // Ensure token exists before making API call

      const reqHeader = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      };

      try {
        const result = await getLectureApi(courseId, reqHeader);
        console.log(result);
        setCourseTitle(result.data.course.title)


        setLectures(result.data.lectures); // Update the lectures state
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    };

    getLectures();
  }, [token, courseId, lectureDeleteResponse]);

  const handleDelete = async (id) => {
    console.log(id);

    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };


      console.log(reqHeader);


      const result = await deleteLectureApi(id, reqHeader)
      console.log(id);
      if (result.status == 200) {
        setLectureDeleteResponse(result)
        Swal.fire({
          title: 'Lecture deleted successfully!',
          icon: 'success',
          position: 'center',
          timer: 2500, // Auto close after 2.5 seconds
          showConfirmButton: false,
        });
      }

      console.log(result);
    }



  }

  return (
    <>



      {role == 'admin' ? <AdminHeader /> : <Header />}
      <div className="container my-5">
        {/* Course Title */}
        <div className="text-center mb-4 animate__animated animate__fadeInDown">
          <h2 className="fw-bold text-danger p-3 rounded" style={{ backgroundColor: '#213555' }}>
            Lectures For {courseTitle}        </h2>
        </div>

        {/* Lectures List */}
        {lectures.length > 0 ? (
          <div className="row">
            {lectures.map((lecture) => (
              <div
                key={lecture._id}
                className="col-md-6 col-lg-4 mb-4 animate__animated animate__fadeInUp"
              >
                <div className="card shadow-lg border-0 h-100">
                  <div className="card-body">
                    <h5 className="card-title text-dark fw-bold">
                      {lecture.title}
                    </h5>
                    <p className="card-text text-muted">{lecture.description}</p>
                    <div className="ratio ratio-16x9">
                      <video
                        controls
                        src={lecture.lectureVideo}
                        className="w-100 rounded"
                        onError={(e) =>
                          console.error("Video failed to load:", e.target.src)
                        }
                      />
                    </div>
                    <div className="mt-2" >
                      {role == 'admin' && <button className="btn btn-danger p-2 mt-2" onClick={() => { handleDelete(lecture._id) }}>Delete</button>
                      }
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-5 animate__animated animate__fadeIn">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
              alt="No Lectures"
              className="w-25"
            />
            <p className="text-muted mt-3">No lectures available for this course.</p>
          </div>
        )}
      </div>
      <Footer />
    </>

  );
}

export default StudyCourse;
