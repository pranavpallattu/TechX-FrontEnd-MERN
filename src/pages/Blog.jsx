import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'animate.css';

function Blog() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <img
              src="https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_640.jpg"
              alt="TechX Blog"
              className='rounded w-100 animate__animated animate__fadeIn'
            />
            <h2 className='mt-4 fw-bold text-primary animate__animated animate__fadeInDown'>
              Bridging the Gap in Online Education
            </h2>
          </div>
        </div>

        {/* Blog Content */}
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <p className="text-muted text-center">Empowering learners through industry-relevant education</p>

            <p className=' animate__animated animate__fadeInUp' style={{ textAlign: 'justify' }}>
              The online education landscape faces a unique challenge. Many exceptional teachers excel in delivering textbook knowledge but lack industry experience. Conversely, professionals with extensive practical expertise often struggle to convey their knowledge effectively. <b>TechX</b> bridges this gap by combining the best of both worlds: the depth of industry experience with the clarity and effectiveness of top-notch teaching.
            </p>

            <p className='text-justify animate__animated animate__fadeInUp' style={{ textAlign: 'justify' }}>
              This commitment to excellence ensures that <b>TechX</b> delivers content that is not only informative but transformative. Whether you are a beginner looking to start your programming journey or a professional aiming to refine your skills, TechX has something valuable to offer.
            </p>

            <h4 className='mt-4 text-success animate__animated animate__fadeInLeft'>A Mission Rooted in Impact</h4>
            <p className='text-justify animate__animated animate__fadeInUp' style={{ textAlign: 'justify' }}>
              <b>TechX</b>’s mission goes beyond education; it’s about empowerment. By focusing on project-based learning, the platform helps students build a portfolio that speaks volumes to potential employers. The courses are designed to simulate real-world scenarios, preparing learners to excel in competitive job markets.
            </p>

            <h4 className='mt-4 text-warning animate__animated animate__fadeInRight'>Why Choose TechX?</h4>
            <ul className="list-group list-group-flush animate__animated animate__fadeInUp">
              <li className="list-group-item">📌 <b>Practical Learning:</b> Courses are designed with real-world applications to ensure immediate skill application.</li>
              <li className="list-group-item">📌 <b>Direct Access to Experts:</b> Learn directly from industry professionals with years of experience.</li>
              <li className="list-group-item">📌 <b>Affordable Excellence:</b> TechX believes in making high-quality education accessible to everyone.</li>
              <li className="list-group-item">📌 <b>Comprehensive Curriculum:</b> From foundational programming to advanced concepts, TechX covers it all.</li>
              <li className="list-group-item">📌 <b>Community Impact:</b> TechX is transforming lives and empowering students to achieve their dreams.</li>
            </ul>

            <h6 className='my-5 text-center text-secondary animate__animated animate__fadeInUp'>
              Join <b>TechX</b> today and become a part of a legacy that is shaping the future of online education.
            </h6>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Blog;
