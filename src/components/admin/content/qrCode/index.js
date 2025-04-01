import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, message } from 'antd';
import { createQRCode } from '../../../service/apiService';
import dayjs from 'dayjs';

const QrCodeForm = () => {
  const [formData, setFormData] = useState({
    maThanhVien: '',
    tenThanhVien: '',
    matKhauNguoiDung: '',
    emailThanhVien: '',
    soDienThoaiThanhVien: '',
    ngaySinhThanhVien: '',
    duLieuQrDinhDanh: '',
    maGoiTap: '',
    maDangKy: ''
  });

  const [qrCode, setQrCode] = useState(null);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const qrData = await createQRCode(formData);
      console.log("QR Data từ API:", qrData.data.data);
      setQrCode(qrData.data.data);
      message.success("QR Code created successfully!");
    } catch (error) {
      console.error("Failed to generate QR code:", error);
      message.error("Failed to generate QR code.");
    }
  };

  return (
    <div className="qr-code-form-container">
      <Form
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item label="Mã Thành Viên" name="maThanhVien">
          <Input
            type="number"
            value={formData.maThanhVien}
            onChange={(e) => handleChange('maThanhVien', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Tên Thành Viên" name="tenThanhVien">
          <Input
            type="text"
            value={formData.tenThanhVien}
            onChange={(e) => handleChange('tenThanhVien', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Mật Khẩu Người Dùng" name="matKhauNguoiDung">
          <Input.Password
            value={formData.matKhauNguoiDung}
            onChange={(e) => handleChange('matKhauNguoiDung', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Email Thành Viên" name="emailThanhVien">
          <Input
            type="email"
            value={formData.emailThanhVien}
            onChange={(e) => handleChange('emailThanhVien', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Số Điện Thoại Thành Viên" name="soDienThoaiThanhVien">
          <Input
            type="tel"
            value={formData.soDienThoaiThanhVien}
            onChange={(e) => handleChange('soDienThoaiThanhVien', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Ngày Sinh Thành Viên" name="ngaySinhThanhVien">
          <DatePicker
            format="YYYY-MM-DD"
            value={formData.ngaySinhThanhVien ? dayjs(formData.ngaySinhThanhVien) : null}
            onChange={(date, dateString) => handleChange('ngaySinhThanhVien', dateString)}
          />
        </Form.Item>

        <Form.Item label="Dữ Liệu QR Định Danh" name="duLieuQrDinhDanh">
          <Input
            type="text"
            value={formData.duLieuQrDinhDanh}
            onChange={(e) => handleChange('duLieuQrDinhDanh', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Mã Gói Tập" name="maGoiTap">
          <Input
            type="number"
            value={formData.maGoiTap}
            onChange={(e) => handleChange('maGoiTap', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Mã Đăng Ký" name="maDangKy">
          <Input
            type="number"
            value={formData.maDangKy}
            onChange={(e) => handleChange('maDangKy', e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tạo QR Code
          </Button>
        </Form.Item>
      </Form>

      {qrCode && (
        <div className="qr-code-display">
          <img src={qrCode} alt="QR Code" />
        </div>
      )}
    </div>
  );
};

export default QrCodeForm;
