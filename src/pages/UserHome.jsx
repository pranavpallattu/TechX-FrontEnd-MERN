import React, { useContext, useEffect, useState } from 'react';
import Author from '../components/Author';
import CourseCard from '../components/CourseCard';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'animate.css';
import { getUserCoursesApi } from '../services/allApis';
import { loginResponseContext } from '../context/ContextApi';

function UserHome() {
  const [allCourses, setAllCourses] = useState([]);

  const { loginResponse } = useContext(loginResponseContext)

  const getUserCourses = async () => {
    try {
      const result = await getUserCoursesApi();
      if (result.status === 200) {
        console.log('Courses fetched successfully:', result.data);
        setAllCourses(result.data); // Update courses state
      } else {
        console.log('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Fetch courses on component mount
  useEffect(() => {
    getUserCourses();
  }, [loginResponse]);

  return (
    <>
      <Header />

      <div className="container-fluid py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="row align-items-center mt-5">
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="text-center text-md-start">
              <h1 className="display-5 fw-bold mb-3 animate__animated animate__bounce" style={{ color: "#213555" }}>
                Learn Code with Ease
                <br /> From Industry Experts
              </h1>
              <p className="fs-5" style={{ color: "#555", textAlign: 'justify' }}>
                Discover why TechX is Kerala's top choice for online education!
                Learn programming in Malayalam through expert-led tutorials and gain
                practical skills to excel in the tech industry.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-center">
              <img
                src="https://t4.ftcdn.net/jpg/03/21/43/07/360_F_321430761_qQi0CU9tzI5w1k1vJgdA02LMtXtsXvJE.jpg"
                alt="Learn Code"
                className="img-fluid rounded shadow"
                style={{ maxWidth: "90%" }}
              />
            </div>
          </div>
        </div>
      </div>

      <Author no={allCourses?.length} />

      <div className='text-center mt-5'>
        <h2 style={{ color: '#213555' }}>Our Courses</h2>
      </div>

      <div className="container-fluid p-4">
        <div className="row">
          {allCourses?.length > 0 ?
            allCourses.map((item) => (
              <div className="col-md-4" key={item._id}>
                <CourseCard loginResponse={loginResponse} course={item} page={true} />
              </div>
            )) :
            <h4>No courses available</h4>
          }
        </div>
      </div>

      <div className='text-center mt-5'>
        <h6 className='mt-3' style={{ color: '#213555' }}>Features</h6>
        <h3 className='mt-4' style={{ color: '#213555' }}>What We Offer</h3>
        <p className='mt-4'>Our courses are structured to help both beginners and experienced developers with practical learning strategies.</p>
      </div>

      {/* What We Offer Section */}
      <div className="container">
        <div className="row">
          {/* First Row */}
          <div className="col-md-6 p-3">
            <div className="border border-2 border-secondary rounded p-4 text-center">
              <img src="https://debugmedia.co/_next/image?url=%2Fimages%2Fhome%2Fwhat-we-offer-1.png&w=640&q=75" alt="Project Based Learning" className=" mb-3" height={'200px'} />
              <h2 className='mb-4' style={{ color: '#213555' }}>Project-Based Learning</h2>
              <p style={{ textAlign: 'justify' }}>Enhance your web development skills with real-world projects. Our courses help you build functional websites and applications while reinforcing core programming skills.</p>
            </div>
          </div>
          <div className="col-md-6 p-3">
            <div className="border border-2 border-secondary rounded p-4 text-center">
              <img src="https://debugmedia.co/_next/image?url=%2Fimages%2Fhome%2Fwhat-we-offer-2.png&w=640&q=75" alt="Software Development" className=" mb-3" height={'200px'} />
              <h2 className='mb-4' style={{ color: '#213555' }}>Mastering Software Development</h2>
              <p style={{ textAlign: 'justify' }}>Advance your software development skills by learning essential programming languages like Python, Java, and JavaScript, along with modern frameworks and tools.</p>
            </div>
          </div>

          {/* Second Row */}
          <div className="col-md-6 p-3">
            <div className="border border-2 border-secondary rounded p-4 text-center">
              <img src="https://debugmedia.co/_next/image?url=%2Fimages%2Fhome%2Fwhat-we-offer-3.png&w=640&q=75" alt="Interview Prep" className="mb-3" height={'200px'} />
              <h2 className='mb-4' style={{ color: '#213555' }}>Interview-Oriented Tasks</h2>
              <p style={{ textAlign: 'justify' }}>Prepare for tech interviews with carefully designed coding challenges, algorithm problems, and system design questions commonly asked by top tech companies.</p>
            </div>
          </div>
          <div className="col-md-6 p-3">
            <div className="border border-2 border-secondary rounded p-4 text-center">
              <img src="https://debugmedia.co/_next/image?url=%2Fimages%2Fhome%2Fwhat-we-offer-4.png&w=640&q=75" alt="Support" className=" mb-3" height={'200px'} />
              <h2 className='mb-4' style={{ color: '#213555' }}>24/7 Student Support</h2>
              <p style={{ textAlign: 'justify' }}>We provide round-the-clock support to help you resolve doubts, fix errors, and get guidance anytime you need it during your learning journey.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          <h4 className='text-center mt-3' style={{ color: '#213555' }}>Frequently Asked Questions</h4>

          <Accordion className='mt-5' defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>What Courses Does TechX Offer?</Accordion.Header>
              <Accordion.Body>
                TechX offers a variety of courses ranging from beginner-friendly coding classes to advanced software development. Topics include web development, Python, Java, React, Node.js, and more.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How can I access TechX courses?</Accordion.Header>
              <Accordion.Body>
                You can access all our courses through our website. Sign up, explore our catalog, and start learning immediately at your own pace.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Do I need prior coding experience?</Accordion.Header>
              <Accordion.Body>
                No! We offer beginner-friendly courses that teach you programming from scratch, as well as advanced courses for experienced developers.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default UserHome;
