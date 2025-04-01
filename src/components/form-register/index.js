import React from 'react';
import { Form, Input, Button, message } from 'antd';
import './index.scss';
import { createExportMemberExcel } from "../service/apiService";

const FormRegister = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      console.log('Sending data to API:', values);

      const response = await createExportMemberExcel({
        name: values.name,
        phone: values.phone,
        email: values.email,
      });

      message.success("Đăng ký thành công!"); 
      form.resetFields(); 
    } catch (error) {
      console.error("API Error:", error);
      message.error("Đăng ký thất bại!"); 
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error("Vui lòng kiểm tra lại thông tin!");
  };

  return (
    <div className='form-main' id="register-form">
      <div className='text-register'>
        Form đăng kí
      </div>
      <div className='form-register'>
        <Form
          form={form}
          name="register"
          layout="vertical"
          onFinish={onFinish} 
          onFinishFailed={onFinishFailed} 
        >
          <Form.Item
            label="Họ tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input placeholder="Nhập họ tên" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              style={{ width: '100%', backgroundColor: 'brown', color: 'white' }}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormRegister;
