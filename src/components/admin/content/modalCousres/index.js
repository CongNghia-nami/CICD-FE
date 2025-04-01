import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';

const ModalCourses = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary"  style={{width:'100%'}} onClick={showModal}>
        Tạo khóa học
      </Button>

      <Modal
        title="Tạo khóa học mới"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Tạo"
        cancelText="Hủy"
      >
        <p>Nhập thông tin khóa học mới</p>
        <Input placeholder="Tên khóa học" style={{ marginBottom: 10 }} />
        <Input placeholder="Mô tả khóa học" />
      </Modal>
    </>
  );
};

export default ModalCourses;
