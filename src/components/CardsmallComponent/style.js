import styled,{css} from 'styled-components';
export const WrapperCardsmallTitle = styled.div`
  height: 40px;
  text-align: left;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
`
export const CardsmallTitle = styled.h3`
  font-family: "Lexend Medium", Roboto, Arial !important;
  font-size: 14px; 
  line-height: 20px;
  font-weight: normal !important;
  letter-spacing: -.2px;
  color: #2C2C2C;
`
export const WrapperCardConfig = styled.div`
  margin-top: 4px;
  height: 26px;
`
const staredStyleConfig = css `
  font-family: "Roboto Medium", Roboto, Arial !important;
  font-size: 16px;
  line-height: 26px;
  font-weight: normal !important;
  color: #E03C31;
  line-height: 26px;
`
export const CardConfigPrice = styled.span`
  ${staredStyleConfig}
`
export const CardConfigArea = styled.span`
  ${staredStyleConfig}
`
export const SeparatorDot = styled.span`
  font-family: "Roboto Regular", Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  color: #999;
  margin: 0 8px;
  line-height: 26px;
`
export const WrapperCardLocation = styled.div`
  margin-top: 4px;
  font-family: "Roboto Regular", Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  color: #505050;
  display: flex;
  align-items: center;
  & span:first-child {
    float: left;
    margin-right: 4px;
    line-height: 20px;
    width: 16px;
    text-align: center;
  }
  & span:last-child {
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    font-family: "Roboto Regular", Roboto, Arial !important;
    font-size: 14px;
    line-height: 20px;
    font-weight: normal !important;
  }
`
export const WrapperCardContact = styled.div`
  margin-top:16px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  
  & .btn-heart:hover {
    color: rgba(0,0,0,1);
    border-color: rgba(220,220,220,1);
    background-color: #efefefff;
  }
  & .btn-heart {
    color: rgba(0, 0, 0, 1);
  }
`
export const CardContactPublicInfo = styled.div`
  ${staredStyleConfig}
  color: #999;
  margin: 8px 0;
  
`
