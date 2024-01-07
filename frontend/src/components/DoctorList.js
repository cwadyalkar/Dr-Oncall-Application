import React from "react";
import { useNavigate } from "react-router-dom";


const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card m-2 p-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`doctor/book-appointment/${doctor._id}`)}
      >
        <h1 className="card-title">
          Dr. {doctor.firstName} {doctor.lastName}
        </h1>
<hr />
        
          <p>
            <b>Phone Number :</b> {doctor.phone}
          </p>
          <p>
            <b>Specialization :</b> {doctor.specialization}
          </p>
          <p>
            <b>Experience :</b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Visit :</b> {doctor.feesPerCounsultation}
          </p>
          <p>
            <b>Timings :</b> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
        </div>
      
    </>
  );
};

export default DoctorList;
