import React, { useRef } from 'react';
import banner from '../../assets/breadcrumb-bg.jpg';
import './index.scss';

const BannerService = ({ onButtonClick }) => {
  return (
    <div>
      <div className='custome-services'>
        <div>
          <img className="image" src={banner} alt="Banner" />
          <span className='text-services'>Services</span>
        </div>
      </div>
    </div>
  );
};

export default BannerService;
