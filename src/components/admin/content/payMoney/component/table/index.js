import React from 'react';
import { Table } from 'antd';
import dayjs from 'dayjs';

const TablePayMoney = ({ onPay }) => {
    const columns = [
        {
            title: 'Mã Thanh Toán',
            dataIndex: 'maThanhToan',
            key: 'maThanhToan',
        },
        {
            title: 'Mã Đăng Ký',
            dataIndex: ['hoaDon', 'dangkys'], // Truy cập vào `dangkys`
            key: 'maDangKy',
            render: (dangkys) => (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {dangkys.map((dangky) => (
                  <li key={dangky.maDangKy}>{dangky.maDangKy}</li>
                ))}
              </ul>              
            ),
          },
        {
            title: 'Ngày Thanh Toán',
            dataIndex: 'ngayThanhToan',
            key: 'ngayThanhToan',
            render: (date) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'), 
        },
        {
            title: 'Số Tiền Thanh Toán',
            dataIndex: 'soTienThanhToan',
            key: 'soTienThanhToan',
            render: (text) => text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), 
        },
        {
            title: 'Phương Thức Thanh Toán',
            dataIndex: 'phuongThucThanhToan',
            key: 'phuongThucThanhToan',
        },
        {
            title: 'Mô Tả Thanh Toán',
            dataIndex: 'moTaThanhToan',
            key: 'moTaThanhToan',
        },
    ];

    return (
        <Table
            dataSource={onPay} 
            columns={columns}
            rowKey="maThanhToan"
        />
    );
};

export default TablePayMoney;
