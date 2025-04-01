import React, { useRef } from 'react';
import './index.scss';
import service1 from '../../assets/service1.jpg';
import service2 from '../../assets/service2.jpg';
import service3 from '../../assets/service3.jpg';
import service4 from '../../assets/service4.jpg';
import service5 from '../../assets/service5.jpg';


import { Card } from 'antd';
import { RightSquareOutlined } from '@ant-design/icons'; 
const { Meta } = Card;
const MyService = ({onIconClick }) => {
  return (
 <div className='service'>
    <div className='my-services'>
      <div className='my-provide'>Các dịch vụ chúng tôi cung cấp</div>
          <div className='custome-grid2'>
              <div className='style-card'> 
                  <Card
                   onClick={onIconClick}
                   hoverable
                   style={{ width:'100%', backgroundColor:'#0A0A0A', border: '1px solid #000' }}                 
                   cover={<img alt="example" src={service1} />}>
                  <div className='icon-margin'>  
                     <div className='custome-text'>
                        <span className='strength-text'>Giảm mỡ</span>
                        <span className='box-text'>Thon gọn</span>
                     </div>
                      <div className='design-text'>
                        <RightSquareOutlined style={{ fontSize: '2vw', color: 'white' }}  />
                      </div> 
                  </div>
                  </Card>
             </div>
             <div className='style-card'> 
                  <Card
                   onClick={onIconClick}
                   hoverable
                   style={{ width:'100%', backgroundColor:'#0A0A0A', border: '1px solid #000' }}                 
                   cover={<img alt="example" src={service2} />}>
                  <div className='icon-margin'>  
                     <div className='custome-text'>
                        <span className='strength-text'>Giảm mỡ</span>
                        <span className='box-text'>Thon gọn</span>
                     </div>
                      <div className='design-text'>
                        <RightSquareOutlined style={{ fontSize: '2vw', color: 'white' }}  />
                      </div> 
                  </div>
                  </Card>
             </div>
             <div className='style-card'> 
                  <Card
                   onClick={onIconClick}
                   hoverable
                   style={{ width:'100%', backgroundColor:'#0A0A0A', border: '1px solid #000' }}                 
                   cover={<img alt="example" src={service3} />}>
                  <div className='icon-margin'>  
                     <div className='custome-text'>
                        <span className='strength-text'>Giảm mỡ</span>
                        <span className='box-text'>Thon gọn</span>
                     </div>
                      <div className='design-text'>
                        <RightSquareOutlined style={{ fontSize: '2vw', color: 'white' }}  />
                      </div> 
                  </div>
                  </Card>
             </div>
             <div className='style-card'> 
                  <Card
                  
                   hoverable
                   style={{ width:'100%', backgroundColor:'#0A0A0A', border: '1px solid #000' }}                 
                   cover={<img alt="example" src={service4} />}>
                  <div className='icon-margin'>  
                     <div className='custome-text'>
                        <span className='strength-text'>Giảm mỡ</span>
                        <span className='box-text'>Thon gọn</span>
                     </div>
                      <div className='design-text'>
                        <RightSquareOutlined style={{ fontSize: '2vw', color: 'white' }}  onClick={onIconClick} />
                      </div> 
                  </div>
                  </Card>
             </div>
         </div>   
     </div>
 </div>
  );
};

export default MyService;
