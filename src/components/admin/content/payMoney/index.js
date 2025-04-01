import React, { useState, useEffect } from 'react';
import { Input, Button, DatePicker, message } from 'antd';
import "./index.scss";
import { getAllPayMoney, createPayMoney } from '../../../service/apiService';
import TablePayMoney from './component/table';
import ModalPayMoney from './component/modalPayMoney';
import dayjs from 'dayjs';
import axios from 'axios';

const { RangePicker } = DatePicker;

const PayMoney = () => {
  const [pay, setPay] = useState([]);
  const [recentPayment, setRecentPayment] = useState(null); 
  const [timeLeft, setTimeLeft] = useState(600);
  const [isPaymentVerified, setIsPaymentVerified] = useState(false); 

  const fetchDataPayMoney = async () => {
    try {
      const response = await getAllPayMoney();
      setPay(response.data);
    } catch (error) {
      message.error("Không thể tải dữ liệu thanh toán!");
    }
  };

  useEffect(() => {
    fetchDataPayMoney();
  }, []);

  const handleCreateCourses = async (data) => {
    try {
      const response = await createPayMoney(data);
      if (response.status === 200) {
        setRecentPayment(response.data); 
        setTimeLeft(600); 
        setIsPaymentVerified(false); 
        fetchDataPayMoney();
        message.success("Tạo thành công!");
      }
    } catch (error) {
      message.error("Tạo thất bại!");
    }
  };
  useEffect(() => {
    if (recentPayment && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [recentPayment, timeLeft]);

  const verifyPayment = async () => {
    try {
      const response = await axios.get(
        'https://script.googleusercontent.com/macros/echo?user_content_key=fkgH9_GwD0eyNhOc6DJXHp4vuT5ZYPRC0Tcb9oBp4wb4NXr0qOa5euJOxt5fubhviwZvsVrLkD5sEui7gB-mkHbV9pOKiSJNm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnM_S5qIYOkX_H3w2Es3xXGGQpN3od5lbD_Lx2zuWmHaS3yQN3IisVXAl7uM6PdwzAUc9fwOiBig2p9A8XvFCpgFfDtDJXzflDtz9Jw9Md8uu&lib=MwAPEtEpR-BFib0UMhJb9t9B4xyz-CXGR'
      );
      const paymentData = response.data.data;
  
      const matchPayment = paymentData.some(
        (item) => item["Giá trị"] === recentPayment.soTienThanhToan
      );
  
      if (matchPayment) {
        setIsPaymentVerified(true);
        message.success("Thanh toán thành công!");
        setRecentPayment(null); 
      } else {
        message.error("Thông tin thanh toán không khớp!");
      }
    } catch (error) {
      message.error("Lỗi khi xác minh thanh toán!");
    }
  };
  

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full overflow-auto">
      <div className="list-discount">
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
        </span>
        <ModalPayMoney onhandleCreateCourses={handleCreateCourses} />
      </div>
      <div className="table-container">
        <TablePayMoney onPay={pay} />
      </div>
      {recentPayment && timeLeft > 0 && !isPaymentVerified && (
        <div className="qr-code-container" style={{ marginTop: '20px', textAlign: 'center' }}>
          <h3>Mã QR cho thanh toán (hết hạn sau {formatTime(timeLeft)})</h3>
          <img
            src={`https://img.vietqr.io/image/MB-0522488774-compact.png?amount=${recentPayment.soTienThanhToan}&addInfo=${encodeURIComponent(recentPayment.moTaThanhToan)}&accountName=Nguyen%20Van%20A`}
            alt="QR Code"
            style={{ width: 200, height: 200 }}
          />
          <Button type="primary" onClick={verifyPayment} style={{ marginTop: '10px' }}>
            Xác nhận thanh toán
          </Button>
        </div>
      )}
    </div>
  );
};

export default PayMoney;

