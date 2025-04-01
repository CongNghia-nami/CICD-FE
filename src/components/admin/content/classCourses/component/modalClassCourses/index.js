import React, { useState } from 'react';
import { Modal, Button, Input, DatePicker, Form, InputNumber } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const ModalClassCourses = ({ onCreateCourse }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const courseData = {
        tenLopHoc: values.tenLopHoc,
        moTaLopHoc: values.moTaLopHoc,
        giaLopHoc: values.giaLopHoc,
        lichHoc: values.lichHoc.format('YYYY-MM-DDTHH:mm:ss[.000Z]'),
        soLuongThanhVienLopHoc: values.soLuongThanhVienLopHoc,
      };
      
      onCreateCourse(courseData);
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
      <Button type="primary" style={{ width: '7rem', borderRadius: '1px' }} onClick={showModal} icon={<PlusCircleOutlined />}>
        Tạo lớp học
      </Button> 
      
      <Modal
        title="Tạo lớp học mới"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Tạo"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Tên Lớp Học" name="tenLopHoc" rules={[{ required: true, message: 'Tên lớp học là bắt buộc!' }]}>
            <Input placeholder="Tên lớp học" />
          </Form.Item>
          <Form.Item label="Mô Tả Lớp Học" name="moTaLopHoc" rules={[{ required: true, message: 'Mô tả lớp học là bắt buộc!' }]}>
            <Input placeholder="Mô tả lớp học" />
          </Form.Item>
          <Form.Item label="Giá Lớp Học (VND)" name="giaLopHoc" rules={[{ required: true, message: 'Giá lớp học là bắt buộc!' }]}>
            <InputNumber min={0} style={{ width: '100%' }} placeholder="Giá lớp học" />
          </Form.Item>
          <Form.Item label="Lịch Học" name="lichHoc" rules={[{ required: true, message: 'Lịch học là bắt buộc!' }]}>
            <DatePicker style={{ width: '100%' }} showTime />
          </Form.Item>
          <Form.Item label="Số Lượng Thành Viên" name="soLuongThanhVienLopHoc" rules={[{ required: true, message: 'Số lượng thành viên là bắt buộc!' }]}>
            <InputNumber min={1} style={{ width: '100%' }} placeholder="Số lượng thành viên" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalClassCourses;
