import React, { useRef } from 'react';
import banner from '../../assets/banner-bg.jpg';
import './index.scss';

const BannerRegister = ({ onButtonClick }) => {
  return (
    <div>
      <div className='custome-banner'>
        <div>
          <img className="image" src={banner} alt="Banner" />
          <span className='text-register'>Đăng kí ngay để có nhiều ưu đãi</span>
          <span 
            className='button-register' 
            onClick={onButtonClick} 
          >
            Đăng kí
          </span>
        </div>
      </div>
    </div>
  );
};

export default BannerRegister;
