import { instance } from "../utils/axiosCustomize";

const getAllUser = async() => {
  return await instance.get(`user/getAll`);
}

const getAllRegisterCourses = async(data) => {
  return await instance.get(`api-public/dang-ky-goi/search`,{
    params:{
      maDangKy: data.maDangKy,
      maThanhVien: data.maThanhVien,
      maGoiUuDai: data.maGoiUuDai, 
      ngayDangKy: data.ngayDangKy,
      ngayKichHoat: data.ngayKichHoat,
      trangThaiDangKy: data.trangThaiDangKy,
      maLopHoc: data.maLopHoc,
      maHoaDon: data.maHoaDon,
    }
  })
}

const createExportMemberExcel = async(data) => {
  return await instance.post(`member/export`, null, {
    params: {
      name :data.name,
      phone: data.phone,
      email: data.email
    },
  })
}

const createPackageSale = async(data) => {
  return await instance.post(`api/goi-uu-dai/save`,data);
}

const getAllPackageSale = async() => {
  return await instance.get(`api/goi-uu-dai/all`)
}

const createPackageCourses = async(data) => {
  return await instance.post(`api-public/goi-tap/add`,data)
}

const getAllPackageCourses = async() => {
  return await instance.get(`api-public/goi-tap/getAllGoiTap`);
}

const getTotalRevenue = async(day, month, year)=>{
  return await instance.get(`api/doanh-thu/calculate`,{
    params: {
      day: day ?? undefined, 
      month: month ?? undefined,                
      year: year ?? undefined,                 
    },
  })
}

const createRegisterHistoriesMember = async(data) => {
  return await instance.post ('api-public/lichsutapluyen/thanhvien/save',data);
}

const createRegistrationBill = async (data) => {
  return await instance.post(`api-public/registration`, data);
};

const createRegisterWithDiscount = async (params) => {
  return await instance.post(`api-public/dang-ky-goi/with-discount`, null, {
    params,
  });
};
const createRegisterAndMember = async (maGoiTap, data) => {
  return await instance.post(`user/register?maGoiTap=${maGoiTap}`, data);
};

const getAllMember=async()=>{
  return await instance.get(`member/api-public/members/doGetALlMember`);
}

const createQRCode=async(data)=>{
  return await instance.post(`api-public/qrcode/generateQRCode`,data);
}

const createPayMoney=async(data)=>{
  return await instance.post(`api-public/thanh-toan/create`,data);
}

const getAllPayMoney=async()=>{
  return await instance.get('api-public/thanh-toan/all');
}

const getAllInVoice=()=>{
  return instance.get(`api-public/registration`);
}

const getAllClassCourses=()=>{
 return instance.get('api-public/lophoc/getAllLopHoc');
}
const getHistoriesTranningAdmin=()=>{
  return instance.get('api-public/lichsutapluyen/thanhvien/');
 }

const deleteClassCourses=(maLopHoc)=>{
  return instance.delete(`api-public/lophoc/delete/${maLopHoc}`);
}

const createClassCourses=(data)=>{
  return instance.post(`api-public/lophoc/add`,data);
}

const updateClassCouses=async(id, data)=>{
  return await instance.put(`api-public/lophoc/update/${id}`,data)
}

const getHistoriesTranning=async(id)=>{
  return await instance.get(`api-public/lichsutapluyen/thanhvien/${id}`)
}

const searchClassCourse=(maLopHoc,tenLopHoc,moTaLopHoc,giaLopHoc,lichHoc)=>{
  return instance.get(`api-public/lophoc/search`,{
    params:{
      maLopHoc:maLopHoc,
      tenLopHoc:tenLopHoc,
      moTaLopHoc:moTaLopHoc,
      giaLopHoc:giaLopHoc,
      lichHoc:lichHoc,
    }
  })
}

const searchDiscount=(maUuDai,ngayBatDau,ngayKetThuc,trangThai)=>{
  return instance.get(`api-public/uu-dais/search`,{
    params:{
      maUuDai: maUuDai,
      ngayBatDau: ngayBatDau,
      ngayKetThuc: ngayKetThuc,
      trangThaiUuDai: trangThai,
    }
  })
}
const createDiscount=(data)=>{
  return instance.post(`api-public/uu-dais`,data);
}

const postLoginMember=(tenThanhVien,matKhauNguoiDung)=>{
  return instance.post(`member/login`,{tenThanhVien,matKhauNguoiDung});
}

const postLoginUser = (tenNguoiDung, matKhauNguoiDung) => {
  return instance.post(`user/login`, { tenNguoiDung, matKhauNguoiDung });
};

const getDiscounts = () => {
  return instance.get('api-public/uu-dais'); 
};

const deleteDiscount = (id) => {
  return instance.delete(`api-public/uu-dais/${id}`);
};

const updateDiscount = (id, discountData) => {
  return instance.put(`api-public/uu-dais/${id}`, discountData);
};

const createUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("image", image);
  return instance.post("api/v1/participant", data); 
};

const showAllUser = () => {
  return instance.get("api/v1/participant/all");
};

const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("image", image);
  return instance.put("api/v1/participant", data);
};

const deleteUser = (userId) => {
  return instance.delete("api/v1/participant", { data: { id: userId } }); 
};

const getUserWithPaginate = (page, limit) => {
  return instance.get(`api/v1/participant?page=${page}&limit=${limit}`); 
};


const postRegisterUser = (email, username, password) => {
  return instance.post(`api/v1/register`, { email, username, password });
};

const getQuizByUser = () => {
  return instance.get("api/v1/quiz-by-participant");
};
const getDataQuestion = (id) => {
  return instance.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postFinishQuiz = (data) => {
  return instance.post(`api/v1/quiz-submit`, { ...data });
};

export {
  getAllUser,
  getAllRegisterCourses,
  createExportMemberExcel,
  createPackageSale,
  getAllPackageSale,
  createPackageCourses,
  getAllPackageCourses,
  getTotalRevenue,
  createRegisterWithDiscount,
  createUser,
  showAllUser,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLoginUser,
  postRegisterUser,
  getQuizByUser,
  getDataQuestion,
  postFinishQuiz,
  getDiscounts,
  deleteDiscount,
  updateDiscount,
  createDiscount,
  searchDiscount,
  postLoginMember,
  getAllClassCourses,
  createClassCourses,
  updateClassCouses,
  deleteClassCourses,
  getHistoriesTranning,
  getAllInVoice,
  getAllPayMoney,
  searchClassCourse,
  createPayMoney,
  createQRCode,
  getAllMember,
  createRegisterAndMember,
  getHistoriesTranningAdmin,
  createRegistrationBill,
  createRegisterHistoriesMember,
};
