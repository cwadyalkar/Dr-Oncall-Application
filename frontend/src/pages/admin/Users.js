import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import moment from "moment"
import axios from "axios";
import { Table } from "antd";

const Users = () => {
  const [users, setusers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get("/api/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setusers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);


  const columns = [
    {
    title : "Name",
    dataIndex :'name'
    },
    {
    title : "Email",
    dataIndex :'email'
    },
    {
    title : "Created At",
    dataIndex :'createdAt',
    render : (text,record) =>moment(record.createdAt).format("DD-MM-YYYY")
    },
    {
    title : "Doctors",
    dataIndex :'isDoctor',
    render : (text,record) =>(
      <span>
        {record.isDoctor ? "Yes" : "No"}
      </span>
    )
    },
    {
    title : "Actions",
    dataIndex :'actions',
    render : (text,record) => (
      <div className="d-flex">
        <button className="btn btn-danger">
          Block
        </button>
      </div>
    )
    },
  ]
  return (
    <Layout>
      <h1 className="card-title">Users List</h1>
      <hr />
      <Table columns={columns} dataSource={users}/>
    </Layout>
  );
};

export default Users;
