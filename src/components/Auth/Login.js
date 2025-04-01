import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLoginUser } from "../service/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux"; 
import { doLogin } from "../../store/userSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 
import { CheckOutlined } from '@ant-design/icons'; 
import { Button } from 'antd';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await postLoginUser(email, password);
      if (res && res?.data?.accessToken) {
        const defaultUser = {
          username: "Guest",
          email: email,
        };
  
        dispatch(doLogin({
          user: {
            username: res?.data?.tenNguoiDung || defaultUser.username,
          },
          accessToken: res?.data?.accessToken,
          role: res?.data?.role,
        }));
  
        localStorage.setItem('accessToken', res?.data?.accessToken);
        localStorage.setItem('role', res?.data?.role);
        localStorage.setItem('user', JSON.stringify({
          username: res?.data?.tenNguoiDung || defaultUser.username,
        }));
  
        navigate('/home');
        toast.success("Đăng nhập thành công");
      } else {
        toast.error("Đăng nhập thất bại, vui lòng kiểm tra thông tin.");
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại, vui lòng thử lại sau.");
    }
  };  
  

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="px-5 ms-xl-4 mt-5">
              <span className="h1 fw-bold mb-0 crafters-title">Crafters</span>
            </div>
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ width: "23rem" }} onSubmit={handleLogin}>
                <h3 className="fw-normal mb-3 pb-3 fw-bold" style={{ letterSpacing: "1px" }}>Sức khỏe là tất cả</h3>

                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example18">Username</label>
                  <input 
                    type="text" 
                    id="form2Example18" 
                    className="form-control form-control-lg" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                </div>

                <div className="form-outline mb-4 position-relative">
                <label className="form-label" htmlFor="form2Example28">Password</label>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="form2Example28" 
                    className="form-control form-control-lg" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                  />
                  <span 
                    className="position-absolute" 
                    style={{ right: "5%", top: "70%", transform: "translateY(-50%)", cursor: "pointer" }} 
                    onClick={() => setShowPassword(!showPassword)} 
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </span>
                </div>

                <div className="pt-1 mb-4">
                  <Button 
                  type="primary" 
                  size="large" 
                  block 
                  htmlType="submit" 
                  icon={<CheckOutlined />} 
                  >
                    Đăng nhập
                  </Button>
                  <span className="d-flex justify-content-end text-decoration-underline mt-2"
                   style={{ cursor: "pointer" }}
                   onClick={()=>{navigate('/member/logins')}}
                  >
                    Đăng nhập bằng người dùng
                  </span>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img 
              src="https://i.pinimg.com/originals/5d/05/17/5d05170e29ff9b8b9dd6d284e3a8809d.png"
              alt="Login image" 
              className="w-100 vh-100" 
              style={{ objectFit: "cover", objectPosition: "left" }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
