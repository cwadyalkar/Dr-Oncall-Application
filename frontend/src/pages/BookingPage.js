import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, TimePicker, message, Row, Col } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [doctor, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const [isAvailaible, setisAvailaible] = useState(false);
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/doctor/getDoctorById",

        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////
  const handleBooking = async () => {
    try {
      setisAvailaible(true);
      if (!date && !time) {
        return alert("Date & time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          date: date,
          userInfo: user,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate('/appointment')
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something Went Wrong");
      console.log(error);
    }
  };

  const handleAvalaibility = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/user/booking-availability",
        {
          doctorId: params.doctorId,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        
        message.success(res.data.message);
        setisAvailaible(true);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Layout>
        <div className="">
          {doctor && (
            <div className="card p-4">
             
       
              <Row gutter={20} className="" align="middle">
                <Col span={8} sm={24} lg={8}>
                <h1 className="page">
                Dr. {doctor.firstName} {doctor.lastName}
              </h1>
                  <h1 className="normal-text">
                    <b>Timings : </b>
                    {doctor.timings && doctor.timings[0]} -{" "}
                    {doctor.timings && doctor.timings[1]}{" "}
                  </h1>
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
                  <div className="d-flex flex-column">
                    <DatePicker
                      className="m-2"
                      format="DD-MM-YYYY"
                      onChange={(value) => {
                        setDate(moment(value).format("DD-MM-YYYY"));
                        setisAvailaible(false);
                      }}
                    />
                    <TimePicker
                      format="HH:mm"
                      className="m-3"
                      onChange={(value) => {
                        setisAvailaible(false);
                        setTime(moment(value).format("HH:mm"));
                      }}
                    />
                    <button
                      className="btn btn-primary mt-2"
                      onClick={handleAvalaibility}
                    >
                      Check Availaibility
                    </button>
                    {!isAvailaible && (
                      <button
                        className="btn btn-dark mt-2"
                        onClick={handleBooking}
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                </Col>
                <Col span={8} sm={24} lg={8}>
                  <img
                    src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/booking-icon.png"
                    alt=""
                    width="100%"
                    height="200"
                  className="mt-3"
                  />
                </Col>
              </Row>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default BookingPage;
