import { Carousel as AntdCarousel } from "antd"; 
import logo1 from '../../assets/hero-1.jpg';
import logo2 from '../../assets/hero-2.jpg';
import './index.scss';

const CustomCarousel = (props) => {
  return (
    <div className="custom-banner">
    <AntdCarousel autoplay>
      <div>
        <img
          className="carousel-image"
          src={logo1} 
          alt="First slide"
        />
      </div>
      <div>
        <img
          className="carousel-image"
          src={logo2} 
          alt="Second slide"
        />
      </div>
       </AntdCarousel>
       </div>
  );
};

export default CustomCarousel;
