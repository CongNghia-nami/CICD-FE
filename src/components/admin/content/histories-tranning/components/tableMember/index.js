import React from 'react';
import { Table } from 'antd';

const TableMember = ({ data }) => {
  const columns = [
    {
      title: 'Mã Lịch Sử Tập Luyện',
      dataIndex: 'maLichSuTapLuyen',
      key: 'maLichSuTapLuyen',
    },
    {
      title: 'Thời Gian Tập Luyện',
      dataIndex: 'thoiGianTapLuyen',
      key: 'thoiGianTapLuyen',
      render: (text) => new Date(text).toLocaleString(), // Format datetime
    },
    {
      title: 'Ghi Chú Tập Luyện',
      dataIndex: 'ghiChuTapLuyen',
      key: 'ghiChuTapLuyen',
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="maLichSuTapLuyen" // Set unique key for each row
    />
  );
};

export default TableMember;
