import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, message, DatePicker, Form, InputNumber, Switch } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const ModalInvoice = ({ onCreateDiscount }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    const discountData = {
      moTaUuDai: values.moTaUuDai,
      ngayBatDauUuDai: values.ngayBatDauUuDai.format('YYYY-MM-DD'),
      ngayKetThucUuDai: values.ngayKetThucUuDai.format('YYYY-MM-DD'),
      giaTriUuDai: values.giaTriUuDai / 100,
      trangThaiUuDai: values.trangThaiUuDai
    };
    
    onCreateDiscount(discountData);
    setIsModalVisible(false);
    form.resetFields();
  };
 
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" style={{ width: '7rem', borderRadius:'1px' }} onClick={showModal} icon={<PlusCircleOutlined/>}>
        Tạo ưu đãi
      </Button>

      <Modal
        title="Tạo khóa học mới"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Tạo"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Mô Tả Ưu Đãi" name="moTaUuDai" rules={[{ required: true, message: 'Mô tả là bắt buộc!' }]}>
            <Input placeholder="Mô tả ưu đãi" />
          </Form.Item>
          <Form.Item label="Ngày Bắt Đầu" name="ngayBatDauUuDai" rules={[{ required: true, message: 'Ngày bắt đầu là bắt buộc!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Ngày Kết Thúc" name="ngayKetThucUuDai" rules={[{ required: true, message: 'Ngày kết thúc là bắt buộc!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Giá Trị Ưu Đãi (%)" name="giaTriUuDai" rules={[{ required: true, message: 'Giá trị ưu đãi là bắt buộc!' }]}>
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Trạng Thái" name="trangThaiUuDai" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalInvoice;
