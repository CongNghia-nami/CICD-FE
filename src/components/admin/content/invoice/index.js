import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, DatePicker, message,Select } from 'antd';
import { getAllInVoice, createRegisterWithDiscount, createRegistrationBill,
getAllMember, getAllPackageSale, getAllClassCourses, getAllRegisterCourses} from '../../../service/apiService';

import TableInvoice from './component/table';

const Invoice = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [invoiceModalVisible, setInvoiceModalVisible] = useState(false);
  const [activationDate, setActivationDate] = useState('');
  const [memberId, setMemberId] = useState('');
  const [packageId, setPackageId] = useState('');
  const [classId, setClassId] = useState('');
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceDetails, setInvoiceDetails] = useState({
    maDangKy: '',
    ngayDangKy: '',
  });
  const [members, setMembers] = useState([]);
  const [packageSale, setPackageSale] = useState([]);
  const [classCourses, setClassCourses] = useState([]);
  const [registerCourses, setRegisterCourses] = useState([]);

  useEffect(() => {
    fetchDataInvoice();
    fetchDataMember();
    fetchDataPackageSale();
    fetchDataClassCourses();
    fetchDataRegisterCourses();
  }, []);

  const fetchDataInvoice = async () => {
    try {
      const response = await getAllInVoice();
      if (response.data.data) {
        setInvoiceData(response.data.data);
        console.log("response.data.data",response.data.data)
        message.success('Lấy dữ liệu thành công');
      }
    } catch (error) {
      message.error('Không thể lấy dữ liệu hóa đơn');
    }
  };

  const fetchDataMember = async () => {
    try {
      const response = await getAllMember();
      setMembers(response.data.content);
    } catch (error) {
      message.error("Lỗi lấy data member");
    }
  }

  const fetchDataPackageSale = async () => {
    try {
      const response = await getAllPackageSale();
      setPackageSale(response?.data);
    } catch (error) {
    }
  }

  const fetchDataClassCourses = async () => {
    try {
      const respone = await getAllClassCourses();
      setClassCourses(respone?.data?.data);
    } catch (error) {
      
    }
  }

  const fetchDataRegisterCourses = async () => {
    try {
      const params = {
        maDangKy: '', 
        maThanhVien: '', 
        maGoiUuDai: '',
        ngayDangKy: '',
        ngayKichHoat: '',
        trangThaiDangKy: '', 
        maLopHoc: '',
        maHoaDon: '',
      };
      const response = await getAllRegisterCourses(params);
      setRegisterCourses(response.data);
    } catch (error) {
      
    }
  }

  const handleCreateInvoice = async () => {
    if (!memberId || !packageId || !classId || !activationDate) {
      message.warning('Vui lòng nhập đầy đủ thông tin trước khi đăng ký!');
      return;
    }

    const params = {
      maThanhVien: memberId,
      maGoiUuDai: packageId,
      maLopHoc: classId,
      ngayKichHoat: activationDate,
      trangThaiDangKy: true,
    };

    try {
      const response = await createRegisterWithDiscount(params);
      if (response.data) {
        message.success('Đăng ký thành công');
        fetchDataInvoice();
        setModalVisible(false); 
      }
    } catch (error) {
      message.error('Đăng ký thất bại');
    }
  };

  const handleCreateRegistrationBill = async () => {
    if (!invoiceDetails.maDangKy || !invoiceDetails.ngayDangKy) {
      message.warning('Vui lòng nhập đầy đủ thông tin hóa đơn!');
      return;
    }

    const params = {
      ...invoiceDetails,
    };

    try {
      const response = await createRegistrationBill(params);
      if (response.data) {
        message.success('Hóa đơn được tạo thành công');
        fetchDataInvoice(); 
        setInvoiceModalVisible(false); 
      }
    } catch (error) {
      message.error('Tạo hóa đơn thất bại');
    }
  };

  return (
    <div className="w-full overflow-auto">
      <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: '20px' }}>
        Đăng ký gói hóa đơn
      </Button>
      <Button type="primary" onClick={() => setInvoiceModalVisible(true)} style={{ marginBottom: '20px', marginLeft: '10px' }}>
        Tạo hóa đơn
      </Button>
      <Modal
        title="Đăng ký gói hóa đơn"
        visible={modalVisible}
        onOk={handleCreateInvoice}
        onCancel={() => setModalVisible(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Select
          placeholder="Chọn mã thành viên"
          value={memberId|| undefined}
          onChange={(value) => setMemberId(value)}
          style={{ width: '100%', marginBottom: '10px' }}
          allowClear 
        >
          {members.map(member => (
            <Select.Option key={member.maThanhVien} value={member.maThanhVien}>
              {member.tenThanhVien} 
            </Select.Option>
          ))}
        </Select>
        <Select
          placeholder = "Nhập mã gói ưu đãi"
          value={packageId||undefined}
          onChange={(value)=>setPackageId(value)}
          style={{ width: '100%', marginBottom: '10px' }}
          allowClear
        >
          {packageSale.map(packages => (
            <Select.Option key={packages.maGoiUuDai} value={packages.maGoiUuDai}>
              {packages.maGoiUuDai}
            </Select.Option>
          ))}
        </Select>
        <Select
        placeholder="Nhập mã lớp học"
        value={classId||undefined}
        onChange={(e)=> setClassId(e)}
        style={{width: '100%', marginBottom:'10px'}}
        allowClear
        >
        {classCourses.map(classCourse =>(
          <Select.Option key={classCourse.maLopHoc} value={classCourse.maLopHoc}>
          {classCourse.tenLopHoc}
          </Select.Option>
        ))}
        </Select>
        <DatePicker
          onChange={(date, dateString) => setActivationDate(dateString)}
          style={{ width: '100%' }}
          placeholder="Ngày kích hoạt"
        />
      </Modal>

      <Modal
        title="Tạo hóa đơn"
        visible={invoiceModalVisible}
        onOk={handleCreateRegistrationBill}
        onCancel={() => setInvoiceModalVisible(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Select
        placeholder="Chọn mã đăng ký"
        value={invoiceDetails.maDangKy || undefined}
        onChange={(value) => setInvoiceDetails({ ...invoiceDetails, maDangKy: value })}
        style={{ width: '100%', marginBottom: '10px' }}
        allowClear
        >
        {registerCourses.map((course) => (
          <Select.Option key={course.maDangKy} value={course.maDangKy}>
            {course.tenDangKy}
          </Select.Option>
        ))}
      </Select>
        <DatePicker
          onChange={(date, dateString) => setInvoiceDetails({ ...invoiceDetails, ngayDangKy: dateString })}
          style={{ width: '100%' }}
          placeholder="Ngày đăng ký"
        />
      </Modal>
      <div className="table-container">
        <TableInvoice data={invoiceData} />
      </div>
    </div>
  );
};

export default Invoice;
