import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, DatePicker, message } from 'antd';
import dayjs from 'dayjs';

const TableCourses = ({ courses, onHandleUpdateCourses, onHandleDeleteCourses }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentCourse, setCurrentCourse] = useState(null);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRows(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: 'Mã Lớp Học',
      dataIndex: 'maLopHoc',
      key: 'maLopHoc',
    },
    {
      title: 'Tên Lớp Học',
      dataIndex: 'tenLopHoc',
      key: 'tenLopHoc',
    },
    {
      title: 'Mô Tả Lớp Học',
      dataIndex: 'moTaLopHoc',
      key: 'moTaLopHoc',
    },
    {
      title: 'Giá Lớp Học',
      dataIndex: 'giaLopHoc',
      key: 'giaLopHoc',
      render: (value) => `${value.toLocaleString('vi-VN')} VND`,
    },
    {
      title: 'Lịch Học',
      dataIndex: 'lichHoc',
      key: 'lichHoc',
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Số Lượng Thành Viên',
      dataIndex: 'soLuongThanhVienLopHoc',
      key: 'soLuongThanhVienLopHoc',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => showUpdateModal(record)}>
          Update
        </Button>
      ),
    },
  ];

  const showUpdateModal = (record) => {
    setCurrentCourse(record);
    form.setFieldsValue({
      ...record,
      lichHoc: dayjs(record.lichHoc),
    });
    setIsModalVisible(true);
  };

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      const updatedCourse = {
        ...currentCourse,
        ...values,
        lichHoc: values.lichHoc.format('YYYY-MM-DD'),
      };
      onHandleUpdateCourses(updatedCourse);
      setIsModalVisible(false);
    });
  };

  const handleDelete = () => {
    if (selectedRows.length > 0) {
      Modal.confirm({
        title: 'Xác nhận xóa',
        content: `Bạn có chắc chắn muốn xóa ${selectedRows.length} lớp học này?`,
        okText: 'Có',
        okType: 'danger',
        cancelText: 'Không',
        onOk: () => {
          onHandleDeleteCourses(selectedRows);
          setSelectedRows([]);
        },
      });
    } else {
      message.warning("Vui lòng chọn ít nhất một lớp học để xóa!");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        {selectedRows.length > 0 && (
          <Button 
            type="danger" 
            style={{ backgroundColor: "red", color: 'white' }} 
            onClick={handleDelete}
          >
            Xóa
          </Button>
        )}
      </div>
      <Table
        rowSelection={rowSelection}
        dataSource={courses}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey="maLopHoc"
      />
      <Modal
        title="Cập nhật lớp học"
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Tên Lớp Học" name="tenLopHoc" rules={[{ required: true, message: 'Tên lớp học là bắt buộc!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mô Tả Lớp Học" name="moTaLopHoc" rules={[{ required: true, message: 'Mô tả lớp học là bắt buộc!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Giá Lớp Học" name="giaLopHoc" rules={[{ required: true, message: 'Giá lớp học là bắt buộc!' }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item label="Lịch Học" name="lichHoc" rules={[{ required: true, message: 'Lịch học là bắt buộc!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Số Lượng Thành Viên" name="soLuongThanhVienLopHoc" rules={[{ required: true, message: 'Số lượng thành viên là bắt buộc!' }]}>
            <InputNumber style={{ width: '100%' }} min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TableCourses;
