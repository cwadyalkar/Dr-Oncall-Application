import Layout from "../components/Layout";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Col, Row, Input, TimePicker, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css"
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import moment from "moment";


const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      //i have here also issue with user id
      dispatch(showLoading());
      const res = await axios.post(
        "/api/user/applydoctor",
        { ...values, userId: user._id ,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm")
          ],},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
        dispatch(hideLoading());
      if(res.data.success){
        message.success(res.data.message)
        navigate('/')
      }else{
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
    console.log(values);
  };

  return (
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <hr />
      <Form layout="vertical" onFinish={handleFinish} className="m-4">
        <h4 className="card-title">Personal Details </h4>
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

        <h4 className="card-title">Professional Details</h4>
        <hr />
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
            <Form.Item label="Timing" name="timings" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-warning form-btn" type="submits">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
