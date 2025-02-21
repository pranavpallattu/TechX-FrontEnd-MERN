import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function Author({ no }) {
  return (
    <>
      <h5 className="text-center mt-5" style={{ color: '#213555' }}>Author</h5>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center p-5">
          <div className="col-md-8 text-center">
            <h2 className="text-center mb-4">I'm Tech<span className="fs-1 text-danger">X</span></h2>
            <p className="fs-5" style={{ textAlign: "center" }}>
              "TechX is a transformative force in online education, founded by a team of forward-thinking educators and technologists committed to revolutionizing digital learning."           </p>
            <Link to={'/blog'}>Read more...</Link>
          </div>
        </div>

        {/* Responsive Cards */}
        <div className="row justify-content-center">
          {[
            { number: "2,000 +", text: "Students Taught" },
            { number: "150K +", text: "Followers" },
            { number: "12 +", text: "Years of Experience" },
            { number: no, text: "Courses" }
          ].map((item, index) => (
            <div key={index} className="col-6 col-sm-6 col-md-4 col-lg-2 mb-3 d-flex justify-content-center">
              <Card className="border-0 p-3 w-100"
                style={{
                  boxShadow: window.innerWidth >= 992 ? "0px 4px 10px rgba(0,0,0,0.15)" : "none",
                  textAlign: "center"
                }}
              >
                <Card.Body>
                  <Card.Text>
                    <h1 style={{ color: 'rgb(21, 94, 149)' }}>{item.number}</h1>
                    <h5 style={{ color: 'rgb(38, 80, 115)' }} className="mt-2">{item.text}</h5>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Author;
