// import React, { useState } from "react";
// import { Modal, Input, Button, message } from "antd";
// import QrScanner from "react-qr-scanner";
// import { createRegisterHistoriesMember } from '../service/apiService'; // Giả sử bạn có API này

// const QRScannerCamera = () => {
//   const [qrData, setQrData] = useState(""); // Dữ liệu từ mã QR
//   const [modalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị modal
//   const [maThanhVien, setMaThanhVien] = useState(""); // Mã thành viên
//   const [thoiGianTapLuyen] = useState(new Date().toISOString()); // Thời gian tập luyện (hiện tại)
//   const [ghiChuTapLuyen, setGhiChuTapLuyen] = useState(""); // Ghi chú tập luyện

//   // Xử lý quét mã QR
//   const handleScan = (data) => {
//     if (data) {
//       setQrData(data.text); // Lưu dữ liệu quét được từ QR
//       setMaThanhVien(data.text); // Giả sử mã thành viên là dữ liệu quét từ QR
//       setModalVisible(true); // Mở modal để người dùng nhập thông tin
//     }
//   };

//   // Xử lý lỗi khi quét QR
//   const handleError = (err) => {
//     console.error("Error scanning QR Code:", err);
//   };

//   // Xử lý gửi API khi lưu thông tin
//   const handleSave = async () => {
//     if (!maThanhVien || !ghiChuTapLuyen) {
//       message.error("Vui lòng nhập đầy đủ thông tin.");
//       return;
//     }

//     const data = {
//       maThanhVien,
//       thoiGianTapLuyen,
//       ghiChuTapLuyen,
//     };

//     try {
//       await createRegisterHistoriesMember(data);
//       message.success("Đăng ký lịch sử tập luyện thành công.");
//       setModalVisible(false); // Đóng modal sau khi lưu thành công
//     } catch (error) {
//       message.error("Đăng ký lịch sử tập luyện thất bại.");
//     }
//   };

//   const previewStyle = {
//     height: 240,
//     width: 320,
//   };

//   return (
//     <div>
//       <h1>QR Code Scanner</h1>
//       {qrData ? (
//         <p>Decoded Data: {qrData}</p>
//       ) : (
//         <p>Scanning QR Code... Please align QR code with the camera.</p>
//       )}

//       {/* QR Scanner */}
//       <QrScanner
//         delay={300}
//         style={previewStyle}
//         onError={handleError}
//         onScan={handleScan}
//       />

//       {/* Modal đăng ký */}
//       <Modal
//         title="Đăng Ký Lịch Sử Tập Luyện"
//         visible={modalVisible}
//         onCancel={() => setModalVisible(false)}
//         footer={[
//           <Button key="cancel" onClick={() => setModalVisible(false)}>
//             Hủy
//           </Button>,
//           <Button key="save" type="primary" onClick={handleSave}>
//             Lưu
//           </Button>,
//         ]}
//       >
//         <div>
//           <h3>Mã Thành Viên: {maThanhVien}</h3>
//           <div>
//             <Input
//               placeholder="Nhập ghi chú tập luyện"
//               value={ghiChuTapLuyen}
//               onChange={(e) => setGhiChuTapLuyen(e.target.value)}
//             />
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default QRScannerCamera;

import React, { useState } from "react";
import { Modal, Button, message, Input, DatePicker } from "antd";
import QrScanner from "react-qr-scanner";
import { createRegisterHistoriesMember } from '../service/apiService'; // Giả sử bạn có API này

const QRScannerCamera = () => {
  const [qrData, setQrData] = useState(""); // Dữ liệu từ mã QR
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [maThanhVien, setMaThanhVien] = useState(""); // Mã thành viên
  const [thoiGianTapLuyen, setThoiGianTapLuyen] = useState(null); // Thời gian tập luyện
  const [ghiChuTapLuyen, setGhiChuTapLuyen] = useState(""); // Ghi chú tập luyện

  // Xử lý quét mã QR
  const handleScan = (data) => {
    if (data) {
      const parsedData = JSON.parse(data.text); // Parse JSON từ dữ liệu quét
      setMaThanhVien(parsedData.maThanhVien); // Lấy maThanhVien từ dữ liệu quét
      setModalVisible(true); // Mở modal để người dùng nhập thông tin
    }
  };

  const handleError = (err) => {
    console.error("Error scanning QR Code:", err);
  };

  // Xử lý gửi API khi lưu thông tin
  const handleSave = async () => {
    if (!maThanhVien || !thoiGianTapLuyen || !ghiChuTapLuyen) {
      message.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const data = {
      maThanhVien,
      thoiGianTapLuyen: thoiGianTapLuyen.toISOString(), // Đảm bảo thời gian đúng định dạng ISO
      ghiChuTapLuyen,
    };

    try {
      await createRegisterHistoriesMember(data);
      message.success("Đăng ký lịch sử tập luyện thành công.");
      setModalVisible(false);   
    } catch (error) {
      message.error("Đăng ký lịch sử tập luyện thất bại.");
    }
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      {qrData ? (
        <p>Decoded Data: {qrData}</p>
      ) : (
        <p>Scanning QR Code... Please align QR code with the camera.</p>
      )}

      {/* QR Scanner */}
      <QrScanner
        delay={300}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />

      {/* Modal đăng ký */}
      <Modal
        title="Đăng Ký Lịch Sử Tập Luyện"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Hủy
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Lưu
          </Button>,
        ]}
      >
        <div>
          <h3>Mã Thành Viên: {maThanhVien}</h3>

          {/* DatePicker cho thời gian */}
          <div>
            <span>Thời gian tập luyện:</span>
            <DatePicker
              value={thoiGianTapLuyen}
              onChange={setThoiGianTapLuyen}
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Chọn thời gian"
            />
          </div>

          {/* TextArea cho ghi chú */}
          <div style={{ marginTop: "16px" }}>
            <span>Ghi chú tập luyện:</span>
            <Input.TextArea
              value={ghiChuTapLuyen}
              onChange={(e) => setGhiChuTapLuyen(e.target.value)}
              rows={4}
              placeholder="Nhập ghi chú"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QRScannerCamera;
