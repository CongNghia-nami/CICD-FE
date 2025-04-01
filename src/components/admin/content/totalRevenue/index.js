import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { getTotalRevenue } from "../../../service/apiService";
import dayjs from "dayjs";

const TotalRevenue = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState('');
  const [totalBill, setTotalBill] = useState('');
  const [filterType, setFilterType] = useState("day");
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));
  const [selectedYear, setSelectedYear] = useState(dayjs().format("YYYY"));

  const dataTotal = async () => {
  let parsedDate;

  if (filterType === "day") {
    parsedDate = dayjs(selectedDate);
  } else if (filterType === "month") {
    parsedDate = dayjs(`${selectedMonth}-01`);
  } else if (filterType === "year") {
    parsedDate = dayjs(`${selectedYear}-01-01`);
  }
  const payload = {
    day: filterType === "day" ? parsedDate.date() : undefined,
    month: filterType !== "year" ? parsedDate.month() + 1 : undefined, 
    year: parsedDate.year(), 
  };

  try {
    const response = await getTotalRevenue(payload.day, payload.month, payload.year);
    setData(response?.data?.hoaDonList || []);
    setTotal(response?.data?.totalRevenue || 0);
    setTotalBill(response?.data?.totalCount || 0);
    console.log("responseDataTotal", response.data.totalRevenue);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
  }
};

  useEffect(() => {
    dataTotal();
  }, [filterType, selectedDate, selectedMonth, selectedYear]);

  const chartData = data?.map((item) => ({
    date: dayjs(item?.ngayTaoHoaDon).format("DD-MM-YYYY"),
    amount: item?.soTienThanhToan,
  }));

  const option = {
    title: {
      text: "Doanh thu",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: chartData.map((item) => item.date),
    },
    yAxis: {
      type: "value",
      name: "Doanh thu (VND)",
    },
    series: [
      {
        name: "Doanh thu",
        type: "bar",
        data: chartData.map((item) => item.amount),
        itemStyle: {
          color: "#007bff",
        },
      },
    ],
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <span>
          Tổng doanh thu: <span className="fw-bold">{total}</span>
        </span>
        <span>
          Số lượng hóa đơn: <span className="fw-bold">{totalBill}</span>
        </span>
      </div>

      <div className="mb-3">
        <label>Loại lọc:</label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="form-select mb-3"
        >
          <option value="day">Theo ngày</option>
          <option value="month">Theo tháng</option>
          <option value="year">Theo năm</option>
        </select>

        {filterType === "day" && (
          <div>
            <label htmlFor="datePicker">Chọn ngày:</label>
            <input
              id="datePicker"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="form-control"
            />
          </div>
        )}

        {filterType === "month" && (
          <div>
            <label htmlFor="monthPicker">Chọn tháng:</label>
            <input
              id="monthPicker"
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="form-control"
            />
          </div>
        )}

        {filterType === "year" && (
          <div>
            <label htmlFor="yearPicker">Chọn năm:</label>
            <input
              id="yearPicker"
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="form-control"
              min="2000"
              max={dayjs().year()}
            />
          </div>
        )}
      </div>

      <div
        className="w-full d-flex justify-content-center"
        style={{ overflowX: "auto" }}
      >
        <ReactECharts option={option} style={{ width: "80%" }} />
      </div>
    </div>
  );
};

export default TotalRevenue;
