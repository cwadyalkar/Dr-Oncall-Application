import React from "react";
import Layout from "../../src/components/Layout";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.error);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    }
  };
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading);
      const res = await axios.post(
        "/api/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading);
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.error);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong in Notification");
    }
  };
  return (
    <Layout>
      <h4 className="card-title">Notification Page</h4>
      <hr />
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2 anchor markallread"
              style={{ cursor: "pointer" }}
              onClick={handleMarkAllRead}
            >
              Mark all read
            </h4>
          </div>
          {user?.notification.map((notificationMsg) => (
            <div
              className="card p-2 m-3"
              style={{ cursor: "pointer", padding: "50px" }}
            >
              <div
                className="card-text"
                
              >
                {notificationMsg.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Seen" key={1}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2 anchor markallread"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteAllRead}
            >
              Delete all read
            </h4>
          </div>
          {user?.seenNotification.map((notificationMsg) => (
            <div className="card p-2" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMsg.onClickPath)}
              >
                {notificationMsg.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
