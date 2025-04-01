import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import "./index.scss";
import { getAllClassCourses, createClassCourses, updateClassCouses, deleteClassCourses, searchClassCourse } from '../../../service/apiService';
import TableCourses from "./component/table";
import ModalClassCourses from './component/modalClassCourses';
import FilterCourses from './component/filter';

const ClassCourses = () => {
  const [courses, setCourses] = useState([]);
  const [messages, setMessages] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getAllClassCourses();
      setMessages(response.data.messages);
      setCourses(response?.data?.data);
    } catch (error) {
      message.error("Lấy dữ liệu thất bại");
    }
  };
  
  const handleFilter = async (filterData) => {
    const { maLopHoc, tenLopHoc, giaLopHoc, lichHoc } = filterData;
    try {
      const lichHocFormatted = lichHoc ? lichHoc.format('YYYY-MM-DD') : null; 
      const response = await searchClassCourse(maLopHoc, tenLopHoc, '', giaLopHoc, lichHocFormatted);  
      if (response?.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
        setCourses(response.data); 
        message.success("Tìm kiếm thành công!");
      } else {
        setCourses([]);
        message.error("Không có lớp học nào phù hợp với tiêu chí tìm kiếm.");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi tìm kiếm lớp học.");
      console.error("Lỗi tìm kiếm:", error);
    }
  };   

  const handleCreateCourses = async (data) => {
    try {
      const response = await createClassCourses(data);
      if (response?.status === 200) {
        message.success("Tạo lớp học thành công!");
        fetchCourses();
      } else {
        message.error("Không thể tạo lớp học, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi tạo lớp học:", error);
      message.error("Có lỗi xảy ra khi tạo lớp học.");
    }
  };

  const handleUpdateCourses = async (updatedCourse) => {
    try {
      const response = await updateClassCouses(updatedCourse.maLopHoc, updatedCourse);
      if (response?.status === 200) {
        message.success("Cập nhật thành công!");
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.maLopHoc === updatedCourse.maLopHoc ? { ...course, ...updatedCourse } : course
          )
        );
      } else {
        message.error("Không thể cập nhật lớp học, vui lòng thử lại.");
      }
    } catch (error) {
      message.error("Cập nhật thất bại!");
      console.error("Lỗi khi cập nhật lớp học:", error);
    }
  };

  const handleDeleteCourses = async (maLopHocs) => {
    try {
      for (const maLopHoc of maLopHocs) {
        const response = await deleteClassCourses(maLopHoc);
        if (response?.status === 200) {
          message.success(`Xóa lớp học với mã ${maLopHoc} thành công!`);
        } else {
          message.error(`Không thể xóa lớp học với mã ${maLopHoc}, vui lòng thử lại.`);
        }
      }
      setCourses((prevCourses) =>
        prevCourses.filter(course => !maLopHocs.includes(course.maLopHoc))
      );
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa lớp học.");
      console.error("Lỗi khi xóa lớp học:", error);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <div className="list-discount">
        <span style={{ fontWeight: 'bold', fontSize: '3wh' }}>
          {messages && <div>{messages}</div>}
        </span>
        <ModalClassCourses onCreateCourse={handleCreateCourses} />
      </div>
      <div className="input-page">
        <FilterCourses onFilter={handleFilter} />
      </div>
      <div >
        <TableCourses courses={courses} onHandleUpdateCourses={handleUpdateCourses} onHandleDeleteCourses={handleDeleteCourses} />
      </div>
    </div>
  );
};

export default ClassCourses;
