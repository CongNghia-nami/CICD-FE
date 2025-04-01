import React from 'react';
import './index.scss';
import { FireOutlined } from '@ant-design/icons';

const Choose = (props) => {
  return (
    <div className='choose'>
      <div className="customize">
        <div className='reason'>
          <span className='write-why'>Tại sao lại lựa chọn chúng tôi</span>
        </div>
        <div className='customize-device'>
          <div className='border-around'>
            <div className='blinking'>
              <div className='write-custome'>
                Thiết bị hiện đại
                <FireOutlined style={{ fontSize: '24px', marginLeft: '10px' }} />
              </div>
            </div>
            <span className='write-small'>- Các phòng tập trang bị thiết bị tiên tiến, giúp đảm bảo hiệu quả luyện tập cao nhất và phù hợp với nhu cầu của từng người tập.</span>
          </div> 
          <div className='border-around'>
            <div className='blinking'>
              <div className='write-custome'>
                Sự chuyên nghiệp
                <FireOutlined style={{ fontSize: '24px', marginLeft: '10px' }} />
              </div>
            </div>
            <span className='write-small'>- Đội ngũ huấn luyện viên giàu kinh nghiệm, có chuyên môn cao giúp người tập đạt được mục tiêu thể chất một cách an toàn và hiệu quả.</span>
          </div> 
          <div className='border-around'>
          <div className='blinking'>
              <div className='write-custome'>
                Phòng tập đẳng cấp
                <FireOutlined style={{ fontSize: '24px', marginLeft: '10px' }} />
              </div>
            </div>
            <span className='write-small'>- Không gian tập luyện được thiết kế sang trọng, rộng rãi, mang đến cảm giác thoải mái và động lực luyện tập cho người sử dụng.</span>
          </div> 
          <div className='border-around'>
          <div className='blinking'>
              <div className='write-custome'>
                Dịch vụ tận tình
                <FireOutlined style={{ fontSize: '24px', marginLeft: '10px' }} />
              </div>
            </div>
            <span className='write-small'>- Dịch vụ chăm sóc khách hàng chu đáo, sẵn sàng hỗ trợ từ những yêu cầu nhỏ nhất, tạo trải nghiệm tập luyện tối ưu và hài lòng.</span>
          </div> 
        </div>
      </div>
    </div> 
  );
};

export default Choose;
