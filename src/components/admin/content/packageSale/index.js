import { useEffect, useState } from "react";
import { getAllPackageSale, createPackageSale } from "../../../service/apiService";
import { Table, message, Modal, Button, Form, Input, Select } from "antd";
import dayjs from "dayjs";

const PagekageSale = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchDataPackageSale = async () => {
    setLoading(true);
    try {
      const response = await getAllPackageSale();
      setData(response?.data || []);
      message.success("Lấy dữ liệu thành công!");
    } catch (error) {
      message.error("Lấy dữ liệu thất bại");
    } finally {
      setLoading(false);
    }
  };

  // Tạo mới gói ưu đãi
  const handleCreatePackageSale = async (values) => {
    try {
      const payload = {
        maGoiTap: values.maGoiTap,
        maUuDai: values.maUuDai,
      };
      await createPackageSale(payload);
      message.success("Tạo gói ưu đãi thành công!");
      setIsModalVisible(false); // Đóng modal
      form.resetFields(); // Reset form
      fetchDataPackageSale(); // Làm mới dữ liệu
    } catch (error) {
      message.error("Tạo gói ưu đãi thất bại!");
    }
  };

  useEffect(() => {
    fetchDataPackageSale();
  }, []);

  const columns = [
    {
      title: "Mã gói ưu đãi",
      dataIndex: "maGoiUuDai",
      key: "maGoiUuDai",
    },
    {
      title: "Thông tin đăng ký",
      key: "dangKy",
      align: "center",
      render: (_, record) =>
        record.dangKy?.length > 0 ? (
          <Table
            dataSource={record.dangKy}
            columns={[
              {
                title: "Mã đăng ký",
                dataIndex: "maDangKy",
                key: "maDangKy",
              },
              {
                title: "Ngày đăng ký",
                dataIndex: "ngayDangKy",
                key: "ngayDangKy",
                render: (text) => dayjs(text).format("DD-MM-YYYY"),
              },
              {
                title: "Ngày kích hoạt",
                dataIndex: "ngayKichHoat",
                key: "ngayKichHoat",
                render: (text) => dayjs(text).format("DD-MM-YYYY"),
              },
              {
                title: "Trạng thái đăng ký",
                dataIndex: "trangThaiDangKy",
                key: "trangThaiDangKy",
                render: (text) => (text ? "Kích hoạt" : "Không kích hoạt"),
              },
            ]}
            rowKey="maDangKy"
            pagination={false}
            size="small"
          />
        ) : (
          "Không có thông tin đăng ký"
        ),
    },
  ];

  return (
    <div>
      <div className="mb-3">
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Tạo Gói Ưu Đãi
        </Button>
      </div>

      <Modal
        title="Tạo Gói Ưu Đãi"
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
          onFinish={handleCreatePackageSale}
          initialValues={{
            maGoiTap: 0,
            maUuDai: 0,
          }}
        >
          <Form.Item
            label="Mã Gói Tập"
            name="maGoiTap"
            rules={[{ required: true, message: "Vui lòng nhập mã gói tập!" }]}
          >
            <Input type="number" placeholder="Nhập mã gói tập" />
          </Form.Item>

          <Form.Item
            label="Mã Ưu Đãi"
            name="maUuDai"
            rules={[{ required: true, message: "Vui lòng nhập mã ưu đãi!" }]}
          >
            <Input type="number" placeholder="Nhập mã ưu đãi" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Tạo Gói Ưu Đãi
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Table
        dataSource={data}
        columns={columns}
        rowKey="maGoiUuDai"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "100%" }}
      />
    </div>
  );
};

export default PagekageSale;
