import React from 'react';
import Header from '../components/Header';
import AddLectures from '../components/AddLectures';
import Footer from '../components/Footer';
import AdminHeader from '../components/AdminHeader';


function Lectures() {
  return (
    <>
      <AdminHeader />
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-md-3">
            {/* Main content area */}
          </div>
          <div className="col-md-6 my-5">
            {/* Add lectures form */}
            <AddLectures />
          </div>
          <div className="col-md-3">
            {/* Add lectures form */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Lectures;
