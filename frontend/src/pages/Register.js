import React from "react";
import { Form, Input,message  } from "antd";
import "./HomePage.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";


const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onfinishHandler = async(values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post('/api/user/register',values)
      dispatch(hideLoading())
      if(response.data.success){
        message.success('Registeration Succesfully')
        navigate('/login')
      }else{
        message.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("Something Went Wrong")
    }
  };
  return (
    <>
      {/* <div className="form-container">
        <Form
          layout="vertical"
          className="register_form"
          onFinish={onfinishHandler}
        >
          <h1 className="text-center">Register Form</h1>
          <Form.Item label="Name" name="name">
            <Input type="text" required></Input>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required></Input>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required></Input>
          </Form.Item>
          <Link to="/Login" className="m-2">
            Already user login
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div> */}
        <div className="authentication">
    <div className="authentication-form card p-3">
      <h1 className="card-title">Nice To Meet U</h1>
      <Form
        layout="vertical"
        // className="register_form"
        onFinish={onfinishHandler}
      >
        <Form.Item label="Name" name="name">
          <Input type="name" required></Input>
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" required></Input>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required></Input>
        </Form.Item>
        <Link to="/Login" className="my-2 anchor">
         Already an User? Register Now
        </Link>
        <button className="primary-button mt-3" type="submit">
          Register
        </button>
      </Form>
    </div>
  </div>
  </>
  
  );
};

export default Register;
