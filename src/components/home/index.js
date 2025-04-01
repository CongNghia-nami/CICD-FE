import "./index.scss";
import CustomCarousel from "./banner"; 
import Choose from "./choose";
import Advantage from "./advantage";
import BannerRegister from "./banner-register";
import Footer from "../footer";
import { useRef } from "react";
import FormRegister from "../form-register";
import { useSelector, useDispatch } from 'react-redux'; 

const HomePage = (props) => {
  const { isAuthenticated, user } = useSelector((state) => state.user || {});
  const formRef = useRef(null);

  const handleScrollToForm = () => {
    if (!isAuthenticated) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="homepage">
      <div>
        <CustomCarousel />
      </div>
      <div className="custom-choose">
        <Choose />
      </div>
      <div>
        <Advantage onIconClick={handleScrollToForm} />
      </div>
      <div>
        <BannerRegister onButtonClick={handleScrollToForm} />
      </div>
      {!isAuthenticated && (
        <div ref={formRef}>
          <FormRegister />
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;

