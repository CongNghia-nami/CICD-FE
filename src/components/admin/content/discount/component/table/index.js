import React, { useState, useEffect } from 'react';
import { Table, message, Button, Modal, Form, Input, DatePicker, InputNumber, Switch } from 'antd';
import { getDiscounts, deleteDiscount, updateDiscount } from '../../../../../service/apiService';
import dayjs from 'dayjs';

const TableDiscount = ({ discounts, onFetchDiscounts }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        setLoading(true);
        const response = await getDiscounts();
        setDataSource(response.data);
      } catch (error) {
        message.error('Lấy dữ liệu ưu đãi thất bại');
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      for (const id of selectedRowKeys) {
        await deleteDiscount(id);
      }
      message.success('Xóa ưu đãi thành công');
      onFetchDiscounts(); 
    } catch (error) {
      message.error('Xóa ưu đãi thất bại');
    } finally {
      setLoading(false);
      setSelectedRowKeys([]);
    }
  };
  
  const showUpdateModal = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue({
      maUuDai: record.maUuDai,
      moTaUuDai: record.moTaUuDai,
      ngayBatDauUuDai: dayjs(record.ngayBatDauUuDai),
      ngayKetThucUuDai: dayjs(record.ngayKetThucUuDai),
      giaTriUuDai: record.giaTriUuDai * 100,
      trangThaiUuDai: record.trangThaiUuDai,
    });
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    const values = await form.validateFields();
    const discountData = {
      moTaUuDai: values.moTaUuDai,
      ngayBatDauUuDai: dayjs(values.ngayBatDauUuDai).format('YYYY-MM-DD'),
      ngayKetThucUuDai: dayjs(values.ngayKetThucUuDai).format('YYYY-MM-DD'),
      giaTriUuDai: values.giaTriUuDai / 100, 
      trangThaiUuDai: values.trangThaiUuDai,
    };
    
    await updateDiscount(currentRecord.maUuDai, discountData);
    message.success('Cập nhật ưu đãi thành công');
    onFetchDiscounts(); ;
    setIsModalVisible(false);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: 'Mã Ưu Đãi',
      dataIndex: 'maUuDai',
      key: 'maUuDai',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'moTaUuDai',
      key: 'moTaUuDai',
    },
    {
      title: 'Ngày Bắt Đầu',
      dataIndex: 'ngayBatDauUuDai',
      key: 'ngayBatDauUuDai',
      render: (date) => dayjs(date).format('DD/MM/YYYY'), 
    },
    {
      title: 'Ngày Kết Thúc',
      dataIndex: 'ngayKetThucUuDai',
      key: 'ngayKetThucUuDai',
      render: (date) => dayjs(date).format('DD/MM/YYYY'), 
    },
    {
      title: 'Giá Trị Ưu Đãi',
      dataIndex: 'giaTriUuDai',
      key: 'giaTriUuDai',
      render: (value) => `${value * 100}%`,
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'trangThaiUuDai',
      key: 'trangThaiUuDai',
      render: (status) => (status ? 'Đang hoạt động' : 'Ngừng hoạt động'),
    },
    {
      title: 'Update',
      key: 'update',
      render: (_, record) => (
        <Button onClick={() => showUpdateModal(record)} type="primary">
          Update
        </Button>
      ),
    },
  ];

  const showConfirm = () => {
    Modal.confirm({
        title: "Bạn có chắc muốn xóa không?",
        content: `Bạn đang cố gắng xóa ${selectedRowKeys.length} ưu đãi.`,
        okText: "Có",
        okType: "danger",
        cancelText: "Không",
        onOk: handleDelete,  
    });
};
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          {selectedRowKeys.length > 0 && (
              <Button type="danger" style={{ backgroundColor: "red", color: 'white' }} onClick={showConfirm}>
                  Xóa ({selectedRowKeys.length})
             </Button>
          )}
      </div>
      <Table
        rowSelection={rowSelection}
        dataSource={discounts}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 10 }}
        rowKey="maUuDai"
      />

      <Modal
        title="Cập nhật ưu đãi"
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Mã Ưu Đãi" name="maUuDai">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Mô Tả" name="moTaUuDai" rules={[{ required: true, message: 'Mô tả là bắt buộc!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Ngày Bắt Đầu" name="ngayBatDauUuDai" rules={[{ required: true, message: 'Ngày bắt đầu là bắt buộc!' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Ngày Kết Thúc" name="ngayKetThucUuDai" rules={[{ required: true, message: 'Ngày kết thúc là bắt buộc!' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Giá Trị Ưu Đãi (%)" name="giaTriUuDai" rules={[{ required: true, message: 'Giá trị ưu đãi là bắt buộc!' }]}>
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item label="Trạng Thái" name="trangThaiUuDai" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TableDiscount;
