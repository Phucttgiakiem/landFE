import styled from 'styled-components';

export const WrapperSlider = styled.div`
    width: 100%;
    margin: 0;
    position: relative;
    @media screen and (max-width: 767px){
      .slidersmall {
        display:none;
      }
    }
`;
export const SliderContent = styled.div`
    width: 100%;
    height: 30rem;
    .loading-image {
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.5rem;
    }
`
export const Sliderbottom = styled.div`
    width: 100%;
    height: 8rem;
    margin-top:0.3rem;
    & .img-listing {
      height: 6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius:0.8rem;
    }

    & .img-listing img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    & .slick-slide {
      padding: 0 4px;
    }

    & .slick-track {
      display: flex !important;
      margin: 0;
    }
    & .slick-list {
      overflow: hidden;
    }
`
export const ImageSlider = styled.img`
    height: 30rem;
    border-radius: 8px;
    @media screen and (max-width: 767px){ 
      height:15rem;
    }
`;
export const SmallImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SmallImageSlider = styled.img`
    width: 90%;
    height: 7rem;
    border-radius: 8px;
`
export const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 1);
  width: 30px;
  height: 30px;
  z-index: 3;
  font-size: 1rem;
  border-radius: 10%;
  cursor: pointer;
  
  color: #000000ff; 
  &.slick-prev {
    left: 25px;
  }
  &.slick-next {
    right: 25px;
  }
  &:before {
    content: '';
  }
  
  &:hover {
    background-color: rgba(211, 211, 211, 0.8);
    color: #ffffffff
  }
`;
export const Nameland = styled.h1`
  font-family: "Lexend Medium", Roboto, Arial !important;
  font-size: 24px;
  line-height: 32px;
  font-weight: normal !important;
  letter-spacing: -.2px;
  color: #2C2C2C;
  display: block;
`
export const LocationLand = styled.span`
  font-family: "Roboto Regular", Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  color: #2C2C2C;
  display: block;
  @media screen and (min-width: 768px) and (max-width: 1199px){
    font-size:20px;
  }
`
export const InfoLand = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 0.1rem solid #f2f2f2;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  @media screen and (max-width:767px){
    flex-direction: column;
  }
`
export const InfoItem = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-right: 2rem;
  @media screen and (max-width:767px){
    margin-right: 0;
    display:flex;
    flex-direction:row;
    align-items:baseline;
  }
`
export const InfoItemTitle = styled.span`
  display: block;
  font-size: 14px;
  line-height: 20px;
  font-weight: nomal !important;
  color: #999;
  @media screen and (min-width:768px) and (max-width:1199px) {
    font-size:19px;
  }
  @media screen and (max-width:767px){
    font-size:15px;
    width: 30%;
    &:after {
      content: ":"
    }
  }
`
export const InfoItemValue = styled.span`
  display: block;
  font-size: 18px;
  margin-top: 0.2rem;
  color: #2C2C2C;
  @media screen and (min-width:768px) and (max-width:1199px) {
    font-size:16px;
  }
  @media screen and (max-width:767px) {
    font-size:13px;
  }
`
export const InfoItemExtend = styled.span`
  display: block;
  font-size: 14px;
  margin-top: 0.2rem;
  color: #666;
  @media screen and (min-width:768px) and (max-width:1199px) {
    font-size:16px;
  }
`
export const WrapperAction = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
export const ActionIcon = styled.span`
  color: #2C2C2C;
  background: rgba(0, 0, 0, 0);
  border: solid 1px rgba(0, 0, 0, 0);
  font-family: "Lexend Medium", Roboto, Arial !important;
  font-size: 1.5rem;
  line-height: 20px;
  font-weight: normal !important;
  letter-spacing: -.2px;
  padding: 13px 15px;
  border-radius: 8px;
  @media screen and (max-width: 767px){
    font-size:1rem;
  }
`
export const WrapperDiscriptionLand = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`
export const TitleDescription = styled.span`
  font-family: "Lexend Medium", Roboto, Arial !important;
  font-size: 18px;
  line-height: 28px;
  font-weight: normal !important;
  letter-spacing: -.2px;
  color: #2C2C2C;
  display: block;
`
export const BodyDescription = styled.div`
  font-family: "Roboto Regular", Roboto, Arial !important;
  font-size: 14px;
  line-height: 24px;
  font-weight: normal !important;
  @media screen and (min-width:768px) and (max-width:1199px) {
    font-size:16px;
  }
`
export const WrapperSpecs = styled.div`
  margin-top: 2rem;
`
export const SpecTitle = styled.span`
  font-family: "Lexend Medium", Roboto, Arial !important;
  font-size: 18px;
  line-height: 28px;
  font-weight: normal !important;
  letter-spacing: -.2px;
  color: #2C2C2C;
  display: block;
  margin-bottom: 24px;
`
export const SpecBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
  }
`
export const SpecItem = styled.div`
  width: 50%;
  max-height: 160px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid #F2F2F2;
  border-bottom: 1px solid #F2F2F2;
  padding: 10px 0px;
  margin-bottom: -1px;
  @media screen and (max-width:767px) {
    width: 100%;
    align-items:center;
  }
`
export const SpecItemTitle = styled.span`
  margin: 2px 16px;
  font-family: "Roboto Medium", Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  color: #2C2C2C;
  @media screen and (min-width:768px) and (max-width:1199px) {
    font-size:16px;
  }
  @media screen and (max-width:767px){
    &:after{
      content: " :";
    }
    flex-grow:1;
  }
`
export const SpecItemValue = styled.span`
  margin: 2px 0px;
  font-family: "Roboto Medium", Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  color: #2C2C2C;
  @media screen and (min-width:768px) and (max-width:1199px) {
    font-size:16px;
  }
`
export const WrapperConfig = styled.div`
  width: 100%;
`
export const ConfigItem = styled.div`
  display: flex;
  flex-direction: column;
  float: left;
  width: 25%;
`
export const ConfigItemTitle = styled.span`
  font-family: "Roboto Regular", Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  color: #999;
  display: block;
  @media screen and (min-width:768px) and (max-width:1199px) {
    font-size:16px;
  }
`
export const ConfigItemValue = styled.span`
  font-family: "Roboto Medium", Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  display: block;
  @media screen and (min-width:768px) and (max-width:1199px) {
    font-size:16px;
  }
`
export const WrapperContactBox = styled.div`
  border: 2px solid #F2F2F2;
  border-radius: 8px;
  box-shadow: 0px 4px 16px 0px rgba(44, 44, 44, 0.08);
  padding: 16px 0;
  width: 100%;
  max-width: 292px;
  background-color: #fff;
`
export const AvatarArea = styled.div`
  padding: 0 16px 16px;
  border-bottom: 1px solid #F2F2F2;
  display: flex;
`
export const AgentInfor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  min-width: 48px;
  margin-right: 12px;
  & a img {
    width: 48px;
    height: 48px;
  }
`
export const AgentName = styled.div`
  max-width: calc(100% - 60px);
  align-self: center;
`
export const ContactLink = styled.div`
  font-family: "Roboto Regular", Roboto, Arial !important;
  font-size: 12px;
  line-height: 16px;
  font-weight: normal !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #505050;
  margin-top: 4px;
`
export const ContactInfo = styled.div`
  margin-top: 16px;
  padding: 0 16px;
`
export const WrapperSimilarLands = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap:1.2rem;
  & .image-land {
    height: auto !important;
    aspect-ratio: 16/9;
  }
  @media screen and (max-width:767px){
    grid-template-columns: repeat(1,1fr);
  }
`
export const InfoContact = styled.div`
  position:fixed;
  bottom:0;
  left:0;
  width: 100%;
  height:7rem;
  z-intex:5;
  background-color: rgba(255, 255, 255, 1);
  display:flex;
  flex-direction: row;
  padding:15px;
  box-sizing:border-box;
  align-items:center;
  gap:1rem;
  box-shadow: 0 4px 1.2rem rgba(0,0,0,0.25);
  @media screen and (min-width: 768px){
    display:none;
  }
`
export const ImageUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  min-width: 48px;
  & a img {
    width: 48px;
    height: 48px;
  }
`
