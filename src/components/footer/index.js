import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './index.scss';
const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-icons'>
        <div className='footer-icon'>
          <i className="fa fa-map-marker"></i> 
          <span>123 Địa chỉ, Thành phố, Quốc gia</span>
        </div>
        <div className='footer-icon'>
          <i className="fa fa-mobile"></i> 
          <span>+123456789</span>
        </div>
        <div className='footer-icon'>
          <i className="fa fa-envelope"></i> 
          <span>email@example.com</span>
        </div>
      </div>
      <div className='footer-icons'>
         <div className='footer-icon'>
         <span>Dự án tốt nghiệp:<span style={{color:'orange', fontWeight:'bold',marginLeft:'5px'}}>Crafters</span> </span>
         </div>
         <div className='footer-icon'>GV: Bùi Quốc Đạt </div>
         <div className='footer-icon'>PRO2112.08</div>
      </div>
    </div>
  );
};

export default Footer;
