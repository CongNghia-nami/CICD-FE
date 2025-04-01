import React, { useState } from 'react'; 
import { Button, Input, DatePicker,Select  } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Option } = Select;
const { RangePicker } = DatePicker;

const FilterDiscount = ({ onFilter }) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedDates, setSelectedDates] = useState([]);
    const [trangThai, setTrangThai] = useState(null); 
  
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  
    const handleDateChange = (dates, dateStrings) => {
      setSelectedDates(dateStrings);
    };
  
    const handleStatusChange = (value) => {
      setTrangThai(value);
    };
  
    const handleSearch = () => {
      onFilter({
        name: inputValue,
        dateRange: selectedDates,
        trangThai: trangThai 
      });
    };
  
    return (
      <>
        <Input
          placeholder="Tên khóa học"
          value={inputValue}
          onChange={handleInputChange}
          style={{ width: "100%" }}
        />
        <RangePicker
          onChange={handleDateChange}
          style={{ width: "100%" }}
          placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
        />
        <Select
          placeholder="Chọn trạng thái"
          style={{ width: "100%" }} 
          onChange={handleStatusChange}
        >
          <Option value={true}>Đang hoạt động</Option>
          <Option value={false}>Ngừng hoạt động</Option>
        </Select>
        <Button 
          type="primary" 
          style={{ width: '100%' }} 
          icon={<SearchOutlined />} 
          onClick={handleSearch}
        >
          Tìm kiếm
        </Button>
      </>
    );
  };
  export default FilterDiscount;