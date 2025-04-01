import React from 'react';
import { Table } from 'antd';

const TableInvoice = ({ data }) => {
  const columns = [
    {
      title: 'Mã Hóa Đơn',
      dataIndex: 'maHoaDon',
      key: 'maHoaDon',
    },
    {
      title: 'Ngày Tạo Hóa Đơn',
      dataIndex: 'ngayTaoHoaDon',
      key: 'ngayTaoHoaDon',
      render: (text) => new Date(text).toLocaleDateString(), 
    },
    {
      title: 'Số Tiền Thanh Toán',
      dataIndex: 'soTienThanhToan',
      key: 'soTienThanhToan',
      render: (text) => `${text.toLocaleString()} VND`,
    },
    {
      title: 'Đăng Ký',
      dataIndex: 'dangkys',
      key: 'dangkys',
      render: (dangkys) => (
        <ul>
          {dangkys.map((dangky) => (
            <li key={dangky.maDangKy}>
              Mã Đăng Ký: {dangky.maDangKy}, Ngày Kích Hoạt: {new Date(dangky.ngayKichHoat).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} rowKey="maHoaDon" />;
};

export default TableInvoice;
