import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addCourseApi } from '../services/allApis';
import { addCourseContext } from '../context/ContextApi';
import Swal from "sweetalert2";


function AddCourse() {
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    instructor: "",
    price: "",
    skill: "",
    duration: "",
    description: "",
    coverImage: "",
    introVideo: ""
  });

  const { setAddCourseResponse } = useContext(addCourseContext)

  const [animateClass, setAnimateClass] = useState('animate__fadeIn'); // Default animation


  const [previewImage, setPreviewImage] = useState("");
  const [previewVideo, setPreviewVideo] = useState("");
  const [token, setToken] = useState("")
  const [key, setKey] = useState(1)
  // console.log(token);


  // Handle Image Upload
  const handleImage = (e) => {
    setCourseDetails({ ...courseDetails, coverImage: e.target.files[0] });
  };

  useEffect(() => {
    if (courseDetails.coverImage) {
      setPreviewImage(URL.createObjectURL(courseDetails.coverImage));
    }
  }, [courseDetails.coverImage]);

  // Handle Video Upload
  const handleVideo = (e) => {
    setCourseDetails({ ...courseDetails, introVideo: e.target.files[0] });
  };

  useEffect(() => {
    if (courseDetails.introVideo) {
      setPreviewVideo(URL.createObjectURL(courseDetails.introVideo));
    }
  }, [courseDetails.introVideo]);

  const handleCancel = () => {
    setCourseDetails({
      title: "",
      instructor: "",
      price: "",
      skill: "",
      duration: "",
      description: "",
      coverImage: "",
      introVideo: "",
    })
    setPreviewImage("")
    setPreviewVideo("")
    if (key == 1) {
      setKey(0)
    }
    else {
      setKey(1)
    }
  }

  const handleAdd = async () => {
    const { title, instructor, price, skill, duration, description, coverImage, introVideo } = courseDetails;

    if (!title || !instructor || !price || !skill || !duration || !description || !coverImage || !introVideo) {
      Swal.fire({
        title: "Incomplete Form!",
        text: "Please fill out all fields.",
        icon: "info",
        position: "top-center",
        timer: 2500,
        showConfirmButton: false,
      });
      return;
    }

    const reqBody = new FormData();
    reqBody.append("title", title);
    reqBody.append("instructor", instructor);
    reqBody.append("price", price);
    reqBody.append("skill", skill);
    reqBody.append("duration", duration);
    reqBody.append("description", description);
    reqBody.append("coverImage", coverImage);
    reqBody.append("introVideo", introVideo);

    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      };

      try {
        const result = await addCourseApi(reqBody, reqHeader);

        if (result.status === 200) {
          handleClose()
          Swal.fire({
            title: "Success!",
            text: "Course added successfully.",
            icon: "success",
            position: "center",
            timer: 2500,
            showConfirmButton: false,
          })

          setAddCourseResponse(result);
        } else {
          Swal.fire({
            title: result.status === 406 ? "Error!" : "Something went wrong",
            text: result.response?.data || "Please try again.",
            icon: "error",
            position: "top-center",
            timer: 3000,
            showConfirmButton: false,
          }).then(() => handleCancel());
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "An unexpected error occurred.",
          icon: "error",
          position: "top-center",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } else {
      Swal.fire({
        title: "Login Required!",
        text: "Please log in to continue.",
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
  // Function to open modal with fade-in
  const handleShow = () => {
    setAnimateClass('animate__fadeIn'); // Set opening animation
    setShow(true);
  };

  // Function to close modal with fade-out
  const handleClose = () => {
    setAnimateClass('animate__fadeOut'); // Set closing animation
    setTimeout(() => {
      setShow(false); // Hide modal after animation
    }, 500); // Bootstrap modal default animation time
  };

  return (
    <>
      <button onClick={handleShow} className='btn btn-primary p-2' style={{ backgroundColor: '#1e2a47' }}>
        Add Course
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName={`animate__animated ${animateClass}`} // Apply dynamic animation class
        className="modal-lg"
      >
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>Add Course</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <div className="container">
            <div className="row">
              <div className="col-md-6 d-flex justify-content-center align-items-center">
                <label htmlFor="projectimg">
                  <input
                    key={key}
                    type="file"
                    accept="video/*"
                    id="projectimg"
                    className='d-none'
                    onChange={handleVideo} // Handle file change for video
                  />
                  {/* Display default image or video preview */}
                  {previewVideo ? (
                    <video
                      width="100%" controls src={previewVideo} />
                  ) : (
                    <img
                      src="https://via.placeholder.com/500x300?text=Upload+Intro+Video"
                      alt="Upload Video"
                      className='w-100'
                    />
                  )}
                </label>
              </div>
              <div className="col-md-6">
                <div className='mb-3'>
                  <input
                    type="text"
                    placeholder='Title'
                    value={courseDetails.title}
                    onChange={(e) => setCourseDetails({ ...courseDetails, title: e.target.value })}
                    className='form-control'
                  />
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    placeholder='Instructor'
                    value={courseDetails.instructor}
                    onChange={(e) => setCourseDetails({ ...courseDetails, instructor: e.target.value })}
                    className='form-control'
                  />
                </div>
                <div className='mb-3'>
                  <input
                    type="number"
                    placeholder='Price'
                    value={courseDetails.price}
                    onChange={(e) => setCourseDetails({ ...courseDetails, price: e.target.value })}
                    className='form-control'
                  />
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    placeholder='Skill Level'
                    value={courseDetails.skill}
                    onChange={(e) => setCourseDetails({ ...courseDetails, skill: e.target.value })}
                    className='form-control'
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="photo" className="form-label">Upload Photo</label>
                  <input
                    key={key}
                    type="file"
                    id="photo"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImage} // Handle file change for image
                  />
                  {previewImage && <img src={previewImage} alt="Cover Preview" width="100%" />}
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    placeholder='Duration'
                    value={courseDetails.duration}
                    onChange={(e) => setCourseDetails({ ...courseDetails, duration: e.target.value })}
                    className='form-control'
                  />
                </div>
                <div className='mb-3'>
                  <textarea
                    rows={5}
                    placeholder='Description'
                    value={courseDetails.description}
                    onChange={(e) => setCourseDetails({ ...courseDetails, description: e.target.value })}
                    className='form-control'
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button variant="secondary" onClick={handleCancel} className="btn-custom">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd} className="btn-custom">
            Add Course
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCourse;
