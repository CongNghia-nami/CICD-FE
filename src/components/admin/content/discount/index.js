import React, { useState, useEffect } from 'react';
import { Input, Button, DatePicker, message } from 'antd';
import ModalInvoice from '../discount/component/modalInvoice';
import TableDiscount from './component/table'; 
import { createDiscount, getDiscounts,searchDiscount  } from '../../../service/apiService';
import { useLoading } from '../../../../loadingContext';
import "./index.scss";
import FilterDiscount from './component/filter';
import dayjs from 'dayjs'; 
const Discounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const [filteredDiscounts, setFilteredDiscounts] = useState([]); 
  const [tongUuDai, setTongUuDai] = useState(0);
  const { setLoading } = useLoading();

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    setLoading(true);
    try {
      const response = await getDiscounts();
      setDiscounts(response.data);
      setFilteredDiscounts(response.data); 
      setTongUuDai(response.data[0]?.tongUuDai || 0);
    } catch (error) {
      message.error("Lấy dữ liệu thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDiscount = async (discountData) => {
    setLoading(true); 
    try {
      await createDiscount(discountData);
      message.success("Tạo dữ liệu thành công");
      fetchDiscounts();
    } catch (error) {
      message.error("Tạo dữ liệu thất bại");
    } finally {
      setLoading(false); 
    }
  };

  const handleFilter = async (filterData) => {
    const { name, dateRange, trangThai } = filterData;
    const maUuDai = name || ''; 
    const ngayBatDau = dateRange[0] ? dayjs(dateRange[0]).format('YYYY-MM-DD') : ''; 
    const ngayKetThuc = dateRange[1] ? dayjs(dateRange[1]).format('YYYY-MM-DD') : ''; 
  
    setLoading(true);
    try {
      const response = await searchDiscount(maUuDai, ngayBatDau, ngayKetThuc, trangThai);
      setFilteredDiscounts(response.data); 
      setTongUuDai(response.data.length); 
    } catch (error) {
      message.error("Tìm kiếm thất bại!");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full overflow-auto">
      <div className="list-discount">
        <span style={{ fontWeight: 'bold', fontSize: '2wh' }}>
          Danh sách ưu đãi ({tongUuDai})
        </span>
        <ModalInvoice onCreateDiscount={handleCreateDiscount} />
      </div>
      <div className="input-page">
        <FilterDiscount onFilter={handleFilter} />
      </div>
      <div className="table-container">
        <TableDiscount discounts={filteredDiscounts} onFetchDiscounts={fetchDiscounts} />
      </div>
    </div>
  );
};

export default Discounts;
