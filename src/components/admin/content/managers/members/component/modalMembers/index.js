import React, { useState } from 'react';
import { Modal, Button, Input, DatePicker, Form, InputNumber } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const ModalMember = ({ onCreateMember }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const memberData = {
        tenThanhVien: values.tenThanhVien,
        emailThanhVien: values.emailThanhVien,
        matKhauNguoiDung: values.matKhauNguoiDung,
        soDienThoaiThanhVien: values.soDienThoaiThanhVien,
        ngaySinhThanhVien: values.ngaySinhThanhVien.format('YYYY-MM-DD'),
        duLieuQrDinhDanh: values.duLieuQrDinhDanh,
        trangThaiThanhVien: true,  
      };
      onCreateMember(1, memberData); 
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };
  

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" style={{ width: '8rem', borderRadius: '1px' }} onClick={showModal} icon={<PlusCircleOutlined />}>
        Tạo thành viên
      </Button> 
      
      <Modal
        title="Tạo thành viên mới"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Tạo"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="tenThanhVien"
            label="Tên Thành Viên"
            rules={[{ required: true, message: 'Vui lòng nhập tên thành viên' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="emailThanhVien"
            label="Email"
            rules={[{ required: true, message: 'Vui lòng nhập email', type: 'email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="matKhauNguoiDung"
            label="Mật Khẩu"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="soDienThoaiThanhVien"
            label="Số Điện Thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="ngaySinhThanhVien"
            label="Ngày Sinh"
            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalMember;
