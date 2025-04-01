import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Tabs } from "antd"; 
import "./index.scss"; 

const { TabPane } = Tabs;

const Managers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getActiveKey = () => {
    if (location.pathname.includes("/admins/managers/members")) {
      return "1";
    } else if (location.pathname.includes("/admins/managers/customers")) {
      return "2";
    } else {
      return "1";
    }
  };

  const handleTabChange = (key) => {
    if (key === "1") {
      navigate("/admins/managers/members");
    } else if (key === "2") {
      navigate("/admins/managers/customers");
    }
  };

  return (
    <div className="managers-container">      
      <Tabs activeKey={getActiveKey()} onChange={handleTabChange}>
        <TabPane tab="Quản lý thành viên" key="1">
          <Outlet />
        </TabPane>
        <TabPane tab="Quản lý khách hàng" key="2">
          <Outlet />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Managers;
