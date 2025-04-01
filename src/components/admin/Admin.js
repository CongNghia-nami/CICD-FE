
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import "./Admin.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar />
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
