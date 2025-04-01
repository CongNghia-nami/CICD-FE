import React, { useState, useEffect } from 'react';
import { Calendar, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getHistoriesTranning } from '../service/apiService'; 
import { setLichSuTapLuyen } from "../../store/userSlice"
import { CheckCircleOutlined } from '@ant-design/icons';

const HistoriesMember = (props) => {
  // const dispatch = useDispatch();
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { maThanhVien } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchHistories = async () => {
      if (maThanhVien) { 
        try {
          const response = await getHistoriesTranning(maThanhVien);
          const data = response.data.data;
          if (!Array.isArray(data)) {
            console.error("Dữ liệu không phải là một mảng:", data);
            return; }
          // dispatch(setLichSuTapLuyen(data)); 
          const formattedEvents = {};
          data.forEach(event => {
            const date = event.thoiGianTapLuyen.split('T')[0]; 
            if (!formattedEvents[date]) {
              formattedEvents[date] = [];
            }
            formattedEvents[date].push(event); 
          });
          setEvents(formattedEvents);
        } catch (error) {
          console.error("Lỗi khi lấy lịch sử tập luyện:", error);
        }
      }
    };
    
    fetchHistories();
  // }, [maThanhVien, dispatch]);
  },[]);
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const onSelect = (date) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const dateCellRender = (date) => {
    const dateString = date.format('YYYY-MM-DD');
    if (events[dateString]) {
      return (
        <div
         style={{
          color: 'black',
          fontWeight: 'bold',
          marginBottom: '20%',
          display: 'flex',
          alignItems: 'center',
         justifyContent: 'center',
         marginTop:'8%',
          gap: '1px', 
          fontSize:'1vw'
        }}
      >
  <CheckCircleOutlined style={{ color: 'green' }} />
  {events[dateString].length} Nội dung
</div>      
      );
    }
    return null;
  };

  return (
    <div className="histories">
      <Calendar 
        onPanelChange={onPanelChange}
        onSelect={onSelect} 
        dateCellRender={dateCellRender} 
      />
      <Modal
        title={`Sự kiện cho ngày: ${selectedDate ? selectedDate.format('YYYY-MM-DD') : ''}`}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedDate && (
          <ul>
            {events[selectedDate.format('YYYY-MM-DD')] 
              ? events[selectedDate.format('YYYY-MM-DD')].map((event, index) => (
                  <li key={index}>
                    {event.ghiChuTapLuyen} - {event.thoiGianTapLuyen}
                  </li>
                ))
              : <li>Không có sự kiện nào.</li>
            }
          </ul>
        )}
      </Modal>
    </div>
  );
};

export default HistoriesMember;
