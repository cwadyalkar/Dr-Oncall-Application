import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Col, Row, Input, TimePicker, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";


const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFinish = async (values) => {
    try {
      //i have here also issue with user id
      dispatch(showLoading());
      const res = await axios.post(
        "/api/doctor/updateProfile",
        {
          ...values,
          userId: user._id,
        timings:[
          moment(values.timings[0]).format("HH:mm"),
          moment(values.timings[1]).format("HH:mm")
          
        ]
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
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
    console.log(values);
  };

  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDoctorInfo();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1 className="card-title">Manage Profile</h1>
      <hr />
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-4"
          initialValues={{
            ...doctor,
            ...(doctor && {
              timings:[
                moment(doctor.timings[0],"HH:mm"),
                moment(doctor.timings[1],"HH:mm")
              ]
            })
          
          }}
        >
          <h4>Personal Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="text" placeholder="your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="text" placeholder="your last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone no"
                name="phone"
                required
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="text" placeholder="your phone number " />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="text" placeholder="your email " />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Website"
                name="website"
                required
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="text" placeholder="your website name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="text" placeholder="your address " />
              </Form.Item>
            </Col>
          </Row>

          {/* ///////////////////////////////////////////////////////////////////////////////////////////// */}

          <h4>Professional Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="text" placeholder="your specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="text" placeholder="your experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Consultation Fee"
                name="feesPerCounsultation"
                required
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="text" placeholder="your consultation fee" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Timings" name="timings" required>
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-warning form-btn" type="submit">
                Update
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
