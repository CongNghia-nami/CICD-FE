import React, { useState, useEffect } from 'react';
import {  message } from 'antd';
import { getHistoriesTranningAdmin} from '../../../service/apiService';
import "./index.scss";
import TableMember from './components/tableMember';
const TotalHistoriesTraning = () => {
  const [member, setMember] = useState([]);
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await getHistoriesTranningAdmin();
      console.log("response",response.data.data);
      setMember(response.data.data);
    } catch (error) {
      message.error("Lấy dữ liệu thất bại!");
    } 
  };

  return (
    <div className="w-full overflow-auto">
      <div className="list-discount">
        <span style={{ fontWeight: 'bold', fontSize: '2wh' }}>
          Danh sách  
        </span>
      </div>
      <div className="table-container">
        <TableMember data={member} />
      </div>
    </div>
  );
};

export default TotalHistoriesTraning;
