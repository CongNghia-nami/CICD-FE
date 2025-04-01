import React, { useEffect, useState } from "react";
import { Table, message, Button, Modal, Form, Input, DatePicker, Switch } from "antd";
import dayjs from "dayjs";
import "./index.scss";
import { getAllPackageCourses, createPackageCourses } from "../../../service/apiService";

const PackageCourses = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const fetchDataPackageCourses = async () => {
    setLoading(true);
    try {
      const response = await getAllPackageCourses();
      console.log("response", response?.data?.data);
      setData(response?.data?.data || []);
      message.success("Lấy dữ liệu thành công!");
    } catch (error) {
      message.error("Lấy dữ liệu thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePackageCourses = async (values) => {
    try {
      const payload = {
        ...values,
        thoiHanGoiTap: values.thoiHanGoiTap.format("YYYY-MM-DD"),
      };
      await createPackageCourses(payload);
      message.success("Tạo gói tập thành công!");
      setIsModalVisible(false); 
      form.resetFields(); 
      fetchDataPackageCourses(); 
    } catch (error) {
      message.error("Tạo gói tập thất bại!");
    }
  };

  useEffect(() => {
    fetchDataPackageCourses();
  }, []);

  const columns = [
    {
      title: "Mã gói tập",
      dataIndex: "maGoiTap",
      key: "maGoiTap",
    },
    {
      title: "Tên Gói",
      dataIndex: "tenGoiTap",
      key: "tenGoiTap",
    },
    {
      title: "Giá gói tập",
      dataIndex: "giaGoiTap",
      key: "giaGoiTap",
      render: (text) => `${text} VND`,
    },
    {
      title: "Thời gian gói tập",
      dataIndex: "thoiHanGoiTap",
      key: "thoiHanGoiTap",
      render: (text) => dayjs(text).format("DD-MM-YYYY"),
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThaiGoiTap",
      key: "trangThaiGoiTap",
      render: (text) => (text ? "Kích hoạt" : "Không kích hoạt"),
    },
  ];

  return (
    <div>
      <div className="mb-3">
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Tạo Gói Tập
        </Button>
      </div>

      <Modal
        title="Tạo Gói Tập"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreatePackageCourses}
          initialValues={{
            trangThaiGoiTap: true, 
          }}
        >
          <Form.Item
            label="Tên Gói Tập"
            name="tenGoiTap"
            rules={[{ required: true, message: "Vui lòng nhập tên gói tập!" }]}
          >
            <Input placeholder="Nhập tên gói tập" />
          </Form.Item>

          <Form.Item
            label="Mô Tả Gói Tập"
            name="moTaGoiTap"
            rules={[{ required: true, message: "Vui lòng nhập mô tả gói tập!" }]}
          >
            <Input.TextArea rows={4} placeholder="Nhập mô tả gói tập" />
          </Form.Item>

          <Form.Item
            label="Giá Gói Tập"
            name="giaGoiTap"
            rules={[
              { required: true, message: "Vui lòng nhập giá gói tập!" },
            ]}
          >
            <Input type="number" placeholder="Nhập giá gói tập" />
          </Form.Item>

          <Form.Item
            label="Thời Hạn Gói Tập"
            name="thoiHanGoiTap"
            rules={[{ required: true, message: "Vui lòng chọn thời hạn gói tập!" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="Trạng Thái"
            name="trangThaiGoiTap"
            valuePropName="checked"
          >
            <Switch checkedChildren="Kích hoạt" unCheckedChildren="Không kích hoạt" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Tạo Gói Tập
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="w-full overflow-auto smooth-scroll">
        <Table
          dataSource={data}
          columns={columns}
          rowKey="maGoiTap"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "100%" }}
        />
      </div>
    </div>
  );
};

export default PackageCourses;
