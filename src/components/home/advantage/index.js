import './index.scss';
import class1 from '../../assets/class-1.jpg';
import class2 from '../../assets/class-2.jpg';
import class3 from '../../assets/class-3.jpg';
import class4 from '../../assets/class-4.jpg';
import class5 from '../../assets/class-5.jpg';
import { Card } from 'antd';
import { RightSquareOutlined } from '@ant-design/icons'; 
const { Meta } = Card;
const Advantage = ({onIconClick }) => {
    return(
        <div className='advantage'>
          <div className='custome-advantage'>
            <div>
                <span className='write-why'>Đến với chúng tôi bạn có thể !</span>
            </div>
            <div className='custome-three'>
            <div className='custome-grid'>
              <div className='style-card'> 
                  <Card
                   hoverable
                   style={{ width:'100%', backgroundColor:'#0A0A0A', border: '1px solid #000' }}                 
                   cover={<img alt="example" src={class1} />}>
                   <div className='icon-margin'>  
                     <div className='custome-text'>
                     <span className='strength-text'>Giảm mỡ</span>
                     <span className='box-text'>Thon gọn</span>
                     </div>
                      <div className='design-text'>
                      <RightSquareOutlined style={{ fontSize: '2vw', color: 'white' }} onClick={onIconClick} />

                      </div> 
                  </div>
                  </Card>
              </div>
              <div className='style-card'> 
                  <Card
                   hoverable
                   style={{ width: '100%', backgroundColor:'#0A0A0A', border: '1px solid #000' }}                 
                   cover={<img alt="example" src={class2} />}>
                   <div className='icon-margin'>  
                     <div className='custome-text'>
                     <span className='strength-text'>Yoga</span>
                     <span className='box-text'>Bền bỉ</span>
                     </div>
                      <div className='design-text'>
                      <RightSquareOutlined style={{ fontSize: '2vw', color: 'white' }} onClick={onIconClick} />
                      </div> 
                  </div>
                  </Card>
              </div>
              <div className='style-card'> 
                  <Card
                   hoverable
                   style={{ width: '100%', backgroundColor:'#0A0A0A', border: '1px solid #000' }}                 
                   cover={<img alt="example" src={class3} />}>
                   <div className='icon-margin'>  
                     <div className='custome-text'>
                     <span className='strength-text'>Cử tạ</span>
                     <span className='box-text'>Sức mạnh</span>
                     </div>
                      <div className='design-text'>
                      <RightSquareOutlined style={{ fontSize: '2vw', color: 'white' }} onClick={onIconClick} />
                      </div> 
                  </div>
                  </Card>
              </div>
            </div>    
           </div>

           <div className='custome-two'>
            <div className='custome-grid3'>
              <div className='style-card2'> 
                  <Card
                   hoverable
                   style={{ width:'100%', backgroundColor:'#0A0A0A', border: '1px solid #000' }}                 
                   cover={<img alt="example" src={class4} />}>
                   <div className='icon-margin'>  
                     <div className='custome-text'>
                     <span className='strength-text'>Giảm mỡ</span>
                     <span className='box-text'>Thon gọn</span>
                     </div>
                      <div className='design-text2'>
                      <RightSquareOutlined style={{ fontSize: '2vw', color: 'white' }} onClick={onIconClick} />
                      </div> 
                  </div>
                  </Card>
              </div>
              <div className='style-card2'> 
                  <Card
                   hoverable
                   style={{ width: '100%', backgroundColor:'#0A0A0A', border: '1px solid #000' }}                 
                   cover={<img alt="example" src={class5} />}>
                   <div className='icon-margin'>  
                     <div className='custome-text'>
                     <span className='strength-text'>Cử tạ</span>
                     <span className='box-text'>Sức mạnh</span>
                     </div>
                      <div className='design-text2'>
                      <RightSquareOutlined style={{ fontSize: '2vw', color: 'white' }} onClick={onIconClick} />
                      </div> 
                  </div>
                  </Card>
              </div>
            </div>    
           </div>
           </div>
        </div>
    );
};
export default Advantage