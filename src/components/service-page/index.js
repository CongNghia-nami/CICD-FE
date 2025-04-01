import Footer from "../footer";
import BannerService from "./banner-service";
import MyService from "./my-service";
import { useRef } from "react";
import FormRegister from "../form-register";
const ServicePage = () => {
    const formRef = useRef(null);

    const handleScrollToForm = () => {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    };
  
    return (
      <div className="service-page">
        <div>
        <BannerService />
        </div>
        <div>
        <MyService onIconClick={handleScrollToForm}/>
        </div>
        <div  ref={formRef}>
        <FormRegister />
        </div>
        <div>
        <Footer/>  
        </div>
      </div>
    );
  };
  
  export default ServicePage;