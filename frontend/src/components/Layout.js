import React, { useState } from "react";
import { Badge, message } from "antd";
import "./Layout.css";
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setcollapsed] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Succesfully");
    navigate("/login");
  };
  // _____________doctor menu____________
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointment",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  // /////////////////////////////////////////////////////////////////////////////

  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
    const roll = user?.isAdmin
    ? "Admin"
    : user?.isDoctor
    ? "Doctor"
    : "User";
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className='sidebar'>
            <div className="logo">
              <h6>Dr-Oncall</h6>
              <h1 className="role">{roll}</h1>
              <hr />
            </div>

            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                    </div>
                  </>
                );
              })}
              <div className='menu-item' onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                {!collapsed && <Link to="/login">Logout</Link>}
              </div>
            </div>
          </div>

          <div className="content">
            <div className="header">
              {collapsed ? (
                <i
                  className="fa-solid fa-bars headers-icon"
                  onClick={() => setcollapsed(false)}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-xmark headers-icon"
                  onClick={() => setcollapsed(true)}
                ></i>
              )}
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>

                <Link className="anchor" to="/profile">
                  {user?.name}
                </Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
