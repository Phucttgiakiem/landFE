
import styled,{css} from 'styled-components';
import { Card } from 'antd';
export const StyledCard = styled(Card)`
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);

  /* Tùy chỉnh phần khung ảnh cover của Ant Design Card */
  .ant-card-cover {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .ant-card-body {
    padding: 12px 16px;
  }
`;

export const WrapperCardsmallTitle = styled.div`
  height: 40px;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 8px;
`;

export const CardsmallTitle = styled.h2`
  margin: 0;
  font-family: "Lexend Medium", Roboto, Arial, sans-serif;
  font-size: 14px; 
  line-height: 20px;
  font-weight: 600;
  letter-spacing: -0.2px;
  color: #2C2C2C;
  
  &:hover {
    color: #1890ff;
  }
`;

export const WrapperCardConfig = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

const sharedStyleConfig = css`
  font-family: "Roboto Medium", Roboto, Arial, sans-serif;
  font-size: 15px;
  line-height: 22px;
  font-weight: 500;
  color: #E03C31;
`;

export const CardConfigPrice = styled.span`
  ${sharedStyleConfig}
`;

export const CardConfigArea = styled.span`
  ${sharedStyleConfig}
`;

export const SeparatorDot = styled.span`
  font-family: "Roboto Regular", Roboto, Arial, sans-serif;
  font-size: 14px;
  color: #999;
  margin: 0 8px;
`;

export const WrapperCardLocation = styled.div`
  font-family: "Roboto Regular", Roboto, Arial, sans-serif;
  font-size: 13px;
  color: #505050;
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  /* Định dạng icon vị trí của Ant Design */
  .anticon {
    margin-right: 4px;
    font-size: 14px;
    color: #666;
    flex-shrink: 0;
  }

  span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const WrapperCardContact = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f0f0f0;
  padding-top: 6px;
`;

export const CardContactPublicInfo = styled.div`
  font-family: "Roboto Regular", Roboto, Arial, sans-serif;
  font-size: 12px;
  color: #999;
  margin: 0;
`;
