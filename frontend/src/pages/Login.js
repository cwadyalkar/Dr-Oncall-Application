import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import "./HomePage.css";
// import { Dispatch } from "redux";
import { showLoading,hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const onfinishHandler = async (values) => {
    try{
      dispatch(showLoading())
       const response = await axios.post("/api/user/login",values)
      window.location.reload()
       dispatch(hideLoading())
       if(response.data.success){
        localStorage.setItem("token",response.data.token)
        message.success('Login Succesfully')
        navigate('/')
        
       }
       else{
        message.error(response.data.message)
       }

    }catch(error){
      dispatch(hideLoading())
      console.log(error)
      message.error("Something Went Wrong")
    }
  };
  return(
  // <>
  //   <div className="form-container">
  //     <Form
  //       layout="vertical"
  //       className="register_form"
  //       onFinish={onfinishHandler}
  //     >
  //       <h1 className="text-center">Login Form</h1>
  //       <Form.Item label="Email" name="email">
  //         <Input type="email" required></Input>
  //       </Form.Item>
  //       <Form.Item label="Password" name="password">
  //         <Input type="password" required></Input>
  //       </Form.Item>
  //       <Link to="/Register" className="m-2">
  //         Not an User? Register
  //       </Link>
  //       <button className="btn btn-primary" type="submit">
  //         Login
  //       </button>
  //     </Form>
  //   </div>
  // </>
  <>
  <div className="authentication">
    <div className="authentication-form card p-3">
      <h1 className="card-title">Welcome Back</h1>
      <Form
        layout="vertical"
        // className="register_form"
        onFinish={onfinishHandler}
      >
        <Form.Item label="Email" name="email">
          <Input type="email" required></Input>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required></Input>
        </Form.Item>
        <Link to="/Register" className="my-2 anchor">
         Click Here To Register
        </Link>
        <button className="primary-button mt-3" type="submit">
          Login
        </button>
      </Form>
    </div>
  </div>
  </>
  );
};


export default Login;