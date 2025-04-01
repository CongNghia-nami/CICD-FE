import React from 'react';
import { Table } from 'antd';
import dayjs from 'dayjs';

const TableMembers = ({ onMembers }) => {
  const columns = [
    {
      title: 'Mã Thành Viên',
      dataIndex: 'maThanhVien',
      key: 'maThanhVien',
    },
    {
      title: 'Tên Thành Viên',
      dataIndex: 'tenThanhVien',
      key: 'tenThanhVien',
    },
    {
      title: 'Email',
      dataIndex: 'emailThanhVien',
      key: 'emailThanhVien',
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'soDienThoaiThanhVien',
      key: 'soDienThoaiThanhVien',
    },
    {
      title: 'Ngày Sinh',
      dataIndex: 'ngaySinhThanhVien',
      key: 'ngaySinhThanhVien',
      render: (text) => dayjs(text).format('DD-MM-YYYY'),
    },
    {
      title: 'Mật Khẩu',
      dataIndex: 'matKhauNguoiDung',
      key: 'matKhauNguoiDung',
      render: (password) => (password ? '********' : 'N/A'),
    },
    {
      title: 'QR Code',
      dataIndex: 'duLieuQrDinhDanh',
      key: 'duLieuQrDinhDanh',
      render: (qrData, record) =>
        qrData ? (
          <a href={qrData} download={`QR_Code_${record.maThanhVien}.png`}>
            <img src={qrData} alt="QR Code" style={{ width: 50, height: 50 }} />
          </a>
        ) : (
          'N/A'
        ),
    },
  ];

  return (
    <Table 
      dataSource={onMembers} 
      columns={columns} 
      rowKey="maThanhVien" 
      pagination={{ pageSize: 8 }} 
    />
  );
};

export default TableMembers;
