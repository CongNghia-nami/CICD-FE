import React, { useState } from 'react';
import { Input, Button, DatePicker, Form } from 'antd';

const FilterCourses = ({ onFilter }) => {
  const [maLopHoc, setMaLopHoc] = useState('');
  const [tenLopHoc, setTenLopHoc] = useState('');
  const [giaLopHoc, setGiaLopHoc] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); 

  const handleFilter = () => {
    const filterData = {
      maLopHoc,
      tenLopHoc,
      giaLopHoc,
      lichHoc: selectedDate,
    };
    onFilter(filterData);
  };

  return (
    <>
      <Input
        placeholder="Mã khóa học"
        value={maLopHoc}
        onChange={(e) => setMaLopHoc(e.target.value)}
        style={{ width: "100%" }}
      />
      <Input
        placeholder="Tên lớp học"
        value={tenLopHoc}
        onChange={(e) => setTenLopHoc(e.target.value)}
        style={{ width: "100%" }}
      />
      <Input
        placeholder="Giá lớp học"
        value={giaLopHoc}
        onChange={(e) => setGiaLopHoc(e.target.value)}
        style={{ width: "100%" }}
      />
      <DatePicker
        onChange={setSelectedDate} 
        style={{ width: "100%" }}
      />
      <Button type="primary" style={{ width: '100%' }} onClick={handleFilter}>
        Tìm kiếm
      </Button>
    </>
  );
};

export default FilterCourses;
