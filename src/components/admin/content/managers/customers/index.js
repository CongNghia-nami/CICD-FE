import React, { useCallback, useEffect, useState } from "react";
import { Table, Button } from "antd"; 
import { getAllUser } from "../../../../service/apiService";

const Customers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); 

  const fetchDataCustomers = useCallback(async () => {
    setLoading(true); 
    try {
      const response = await getAllUser();
      setData(response.data);
      console.log("Fetched customer data:", response.data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setLoading(false); 
    }
  }, []);

  useEffect(() => {
    fetchDataCustomers();
  }, [fetchDataCustomers]);

  const columns = [
    {
      title: "Mã Người Dùng",
      dataIndex: "maNguoiDung",
      key: "maNguoiDung", 
    },
    {
      title: "Tên Người Dùng",
      dataIndex: "tenNguoiDung",
      key: "tenNguoiDung", 
    },
    {
      title: "Giới Tính",
      dataIndex: "gioiTinhNguoiDung",
      key: "gioiTinhNguoiDung",
      render: (text) => (text ? "Nam" : "Nữ"), 
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "soDienThoaiNguoiDung",
      key: "soDienThoaiNguoiDung",
    },
    {
      title: "Mô Tả",
      dataIndex: "moTaNguoiDung",
      key: "moTaNguoiDung",
    },
    {
      title: "Hoạt Động",
      dataIndex: "hoatDongNguoiDung",
      key: "hoatDongNguoiDung",
      render: (isActive) => (isActive ? "Hoạt động" : "Không hoạt động"),
    },
  ];

  return (
    <div className="w-full overflow-auto">
      {loading ? (
        <div>Đang tải dữ liệu khách hàng...</div> 
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.maNguoiDung} 
        />
      )}
    </div>
  );
};

export default Customers;