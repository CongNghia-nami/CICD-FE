import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"; 
import { FormOutlined, AuditOutlined , FileOutlined,
SolutionOutlined, BookOutlined, CalculatorOutlined,
CalendarOutlined, SaveOutlined, HddOutlined  } 
from "@ant-design/icons";
import "./SideBar.scss";
import "./Admin.scss";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true); 
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path) => location.pathname === path;
  const isManagerActive = location.pathname.startsWith("/admins/managers");
  return (
    <div
      className="admin-sidebar"
      style={{ display: "flex", height: "100%", position: "relative" }}
    >
      <Sidebar collapsed={collapsed} className={`sideBar-content ${collapsed ? 'collapsed' : ''}`}>
        <Menu>
          <MenuItem className={`ps-menu-button ${isActive("/admins/class-courses") ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}>
            <Link to="/admins/class-courses" className="nav-link">
              <FormOutlined className="copy-icon" />  {!collapsed && "Lớp học"}
            </Link>
          </MenuItem>
          {/* <MenuItem className={`ps-menu-button ${isActive("/admins/news") ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}>
            <Link to="/admins/news" className="nav-link">
              <FileSearchOutlined className="copy-icon" />  {!collapsed && "Tin tức"}
            </Link>
          </MenuItem> */}
          <MenuItem className={`ps-menu-button ${isActive("/admins/discounts") ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}>
            <Link to="/admins/discounts" className="nav-link">
              <FileOutlined className="copy-icon" />  {!collapsed && "Khuyến mãi"}
            </Link>
          </MenuItem>
          <MenuItem className={`ps-menu-button ${isManagerActive ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}>
            <Link to="/admins/managers/members" className="nav-link">
              <SolutionOutlined className="copy-icon" />  {!collapsed && "Quản lí"}
            </Link>
          </MenuItem>
          <MenuItem className={`ps-menu-button ${isActive("/admins/histories-traning") ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}>
            <Link to="/admins/histories-traning" className="nav-link">
              <AuditOutlined  className="copy-icon" />  {!collapsed && "Lịch sử tập luyện"}
            </Link>
          </MenuItem>
          <MenuItem className={`ps-menu-button ${isActive("/admins/invoice") ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}>
            <Link to="/admins/invoice" className="nav-link">
              <BookOutlined  className="copy-icon" />  {!collapsed && "Hóa đơn"}
            </Link>
          </MenuItem>
          <MenuItem className={`ps-menu-button ${isActive("/admins/pay-monney") ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}>
            <Link to="/admins/pay-monney" className="nav-link">
              <CalculatorOutlined className="copy-icon" />  {!collapsed && "Thanh toán"}
            </Link>
          </MenuItem>
          <MenuItem className={`ps-menu-button ${isActive("/admins/package-courses") ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}>
            <Link to="/admins/package-courses" className="nav-link">
              <CalendarOutlined className="copy-icon" />  {!collapsed && "Gói tập"}
            </Link>
          </MenuItem>
          <MenuItem className={`ps-menu-button ${isActive("/admins/total-revenue") ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}>
            <Link to="/admins/total-revenue" className="nav-link">
              <SaveOutlined  className="copy-icon" />  {!collapsed && "Doanh thu"}
            </Link>
          </MenuItem>
          <MenuItem className={`ps-menu-button ${isActive("/admins/package-sale") ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}>
            <Link to="/admins/package-sale" className="nav-link">
              <HddOutlined   className="copy-icon" />  {!collapsed && "Gói ưu đãi"}
            </Link>
          </MenuItem>
          {/* <MenuItem className={`ps-menu-button ${isActive("/admins/qr-code") ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}>
            <Link to="/admins/qr-code" className="nav-link">
              <SolutionOutlined className="copy-icon" />  {!collapsed && "QR Code"}
            </Link>
          </MenuItem> */}
        </Menu>
      </Sidebar>
      <main className="button-content">
        <div>
          <button
            className="sb-button"
            onClick={() => setCollapsed(!collapsed)} 
          >
            <FontAwesomeIcon
              icon={collapsed ? faCircleChevronRight : faCircleChevronLeft}
              className="fa-solid"
            />
          </button>
        </div>
      </main>
    </div>
  );
};

export default SideBar;
