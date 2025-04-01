import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, Button, Select } from 'antd';
import dayjs from 'dayjs';
import { getAllInVoice } from '../../../../../service/apiService';

const { Option } = Select;

const ModalPayMoney = ({ onhandleCreateCourses }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [invoice, setInvoice] = useState([]);

  const showModal = () => {
    setVisible(true);
  };

  const fetchDataInvoice = useCallback(async () => {
    try {
      const response = await getAllInVoice();
      console.log("hóa đơn",response.data.data)
      setInvoice(response.data.data); 
    } catch (error) {
      console.error("Failed to fetch invoice data:", error);
    }
  }, []);

  useEffect(() => {
    fetchDataInvoice();
  }, [fetchDataInvoice]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onhandleCreateCourses({
        ...values,
        ngayThanhToan: dayjs(values.ngayThanhToan).toISOString(),
      });
      form.resetFields();
      setVisible(false);
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Thêm Thanh Toán
      </Button>
      <Modal
        title="Tạo Thanh Toán Mới"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          {/* Cập nhật trường "Mã Hóa Đơn" thành Select */}
          <Form.Item
            label="Mã Hóa Đơn"
            name="maHoaDon"
            rules={[{ required: true, message: 'Vui lòng chọn mã hóa đơn!' }]}
          >
            <Select placeholder="Chọn mã hóa đơn">
              {invoice.map((item) => (
                <Option key={item.maHoaDon} value={item.maHoaDon}>
                  Mã hóa đơn: {item.maHoaDon}-Số tiền thanh toán: {item.soTienThanhToan} 
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Ngày Thanh Toán"
            name="ngayThanhToan"
            rules={[{ required: true, message: 'Vui lòng chọn ngày thanh toán!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Số Tiền Thanh Toán"
            name="soTienThanhToan"
            rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Phương Thức Thanh Toán"
            name="phuongThucThanhToan"
            rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
          >
            <Select placeholder="Chọn phương thức thanh toán">
              <Option value="thanhToanTienMat">Thanh toán bằng tiền mặt</Option>
              <Option value="thanhToanNgânHang">Thanh toán bằng ngân hàng</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Mô Tả Thanh Toán"
            name="moTaThanhToan"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalPayMoney;
