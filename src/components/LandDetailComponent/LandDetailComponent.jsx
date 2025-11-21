
import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { Row,Col} from "antd";
import { LeftOutlined,RightOutlined,WarningOutlined,HeartOutlined,DollarOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding,faPenRuler,faHouse,faBed,faChair,faToilet } from '@fortawesome/free-solid-svg-icons';
import Slider from "react-slick";
import {
    WrapperSimilarLands,
    WrapperContactBox,AvatarArea,AgentInfor,AgentName,ContactLink,ContactInfo,  
    WrapperConfig,ConfigItem,ConfigItemTitle,ConfigItemValue,
    SpecItemTitle,SpecItemValue,WrapperSpecs,SpecTitle,SpecBody,SpecItem,BodyDescription,
    WrapperDiscriptionLand,TitleDescription,ActionIcon,WrapperAction,
    InfoItemExtend,InfoItemValue,InfoItemTitle,InfoLand,InfoItem,
    Nameland,LocationLand,WrapperSlider,ImageSlider, 
    SmallImageSlider,SmallImageWrapper,Arrow,InfoContact,ImageUser } from "./style";
import useravatar from "../../assets/images/user_avatar_3607444.png";
import icon_zalo from "../../assets/images/icon_zalo.png";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import CardsmallComponent from "../CardsmallComponent/CardsmallComponent";
export default function LandDetailComponent({ arrImages }) {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);

    useEffect(() => {
        setNav1(sliderRef1.current);
        setNav2(sliderRef2.current);
    }, []);
    return (
        <>
            <Row gutter={[8,16]} style={{marginBottom:"10rem"}}>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <WrapperSlider
                        style={{ width: "100%", margin: "0" }}
                    >
                        <Slider 
                            asNavFor={nav2} 
                            ref={sliderRef1}
                            
                            prevArrow={<Arrow className="slick-prev"><LeftOutlined style={{display:"block",margin:"auto",lineHeight:"30px"}}/></Arrow>}
                            nextArrow={<Arrow className="slick-next"><RightOutlined style={{display:"block",margin:"auto",lineHeight:"30px"}} /></Arrow>}
                            className="bigslider"
                        >
                            {arrImages.map((image, index) => {
                                return (
                                    <ImageSlider src={image} alt="slider"/>
                                );
                            })}
                        </Slider>
                        <Slider
                            asNavFor={nav1}
                            ref={sliderRef2}
                            slidesToShow={3}
                            slidesToScroll={1}
                            swipeToSlide={true}
                            focusOnSelect={true}
                            
                            className="slidersmall"

                            style={{ marginTop: "1rem" }}
                        >
                            {arrImages.map((image, index) => {
                                return (
                                    <SmallImageWrapper>
                                        <SmallImageSlider src={image} alt="slider"/>
                                    </SmallImageWrapper>                           
                                );
                            })}
                        </Slider>
                    </WrapperSlider>
                </Col>
                <Col xs={0} sm={0} md={0} lg={0} xl={6} xxl={6}>
                    <WrapperContactBox>
                        <AvatarArea>
                            <AgentInfor>
                                <Link rel="icon" href="#" >
                                    <img src={useravatar} alt="avatar"/>
                                </Link>
                            </AgentInfor>
                            <AgentName>
                                <Link href="#" style={{color:"#000000ff",fontWeight:"600",fontSize:"16px"}}>
                                    huyhoang123@gmail.com
                                </Link>
                                <ContactLink>
                                    <Link href="#" style={{color:"#000000ff"}}>Xem 3 tin khác</Link>
                                </ContactLink>
                            </AgentName>
                        </AvatarArea>
                        <ContactInfo>
                            <Link href="#" style={{marginTop:"16px"}}>
                                <ButtonComponent leftIcon={<img src={icon_zalo} alt="zaloicon" style={{width:"25px",height:"25px"}}/>} size="large" textButton={"Chat qua Zalo"} styleButton={{width:"100%"}}/>
                            </Link>
                        </ContactInfo>
                    </WrapperContactBox>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <Nameland>
                        Cho thuê nhà tại Số 8 Ngõ 68 Đường Xuân Thủy (cách đường Xuân Thủy 50m)
                    </Nameland>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <LocationLand>Đường Xuân Thủy, Phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội</LocationLand>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <InfoLand>
                        <InfoItem>
                            <InfoItemTitle>Khoảng giá</InfoItemTitle>
                            <InfoItemValue>5 triệu/tháng</InfoItemValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoItemTitle>Diện tích</InfoItemTitle>
                            <InfoItemValue>50 m²</InfoItemValue>
                            <InfoItemExtend>Mặt tiền 5 m</InfoItemExtend>
                        </InfoItem>
                        <InfoItem>
                            <InfoItemTitle>Phòng ngủ</InfoItemTitle>
                            <InfoItemValue>4 PN</InfoItemValue>
                        </InfoItem>
                    < WrapperAction>
                            <ActionIcon><WarningOutlined /></ActionIcon>
                            <ActionIcon><HeartOutlined/></ActionIcon>
                    </WrapperAction>
                    </InfoLand>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <WrapperDiscriptionLand>
                        <TitleDescription>Thông tin mô tả</TitleDescription>
                        <BodyDescription>
                            Cho thuê nhà nguyên căn 3.5 tầng, 45m² tại ngõ 766 Đê La Thành Quận Ba Đình, Hà Nội.
                            <br/>
                            - Giá thuê chỉ 15 triệu/tháng Full nội thất, xách vali vào ở ngay.
                            <br/>
                            - Vị trí trung tâm:
                            <br/>
                            Nhà nằm trong ngõ 766 Đê La Thành, Quận Ba Đình khu vực dân trí cao, an ninh tốt, gần trường học, bệnh viện, trung tâm thương mại, giao thông thuận tiện.
                            <br/>
                            - Diện tích sử dụng: 45m² x 3.5 tầng, thiết kế hợp lý, nhà xây kiên cố, thông thoáng tự nhiên.
                            <br/>
                            - Thiết kế công năng gồm: 4 phòng ngủ, 3 nhà vệ sinh, 1 phòng khách, 1 bếp, Phòng thờ & sân thượng phơi đồ.
                            <br/>
                            - Trang bị đầy đủ nội thất: Tủ lạnh, điều hòa, máy giặt, giường tủ, bàn ghế, thiết bị vệ sinh cao cấp chỉ việc dọn vào ở ngay.
                            <br/>
                            - Phù hợp: Hộ gia đình, chuyên gia, người nước ngoài Ưu tiên khách thuê lâu dài, hợp đồng ổn định.
                            <br/>
                            - Giá thuê: 15 triệu/tháng.
                            <br/>
                            - Các bạn MG vui lòng không làm phiền, miễn quảng cáo
                            <br/>
                            - Liên hệ chính chủ: 0932 123 456 
                        </BodyDescription>
                    </WrapperDiscriptionLand>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <WrapperSpecs>
                        <SpecTitle>Đặc điểm bất động sản</SpecTitle>
                        <SpecBody>
                            <SpecItem>
                                <span><DollarOutlined /></span>
                                <SpecItemTitle>Khoảng giá</SpecItemTitle>
                                <SpecItemValue>5 triệu/tháng</SpecItemValue>
                            </SpecItem>
                            <SpecItem>
                                <span><FontAwesomeIcon icon={faBuilding} /></span>
                                <SpecItemTitle>Số tầng</SpecItemTitle>
                                <SpecItemValue>4 tầng</SpecItemValue>
                            </SpecItem>
                            <SpecItem>
                                <span><FontAwesomeIcon icon={faPenRuler}/></span>
                                <SpecItemTitle>Diện tích</SpecItemTitle>
                                <SpecItemValue>45 m²</SpecItemValue>
                            </SpecItem>
                            <SpecItem>
                                <span><FontAwesomeIcon icon={faHouse}/></span>
                                <SpecItemTitle>mặt tiền</SpecItemTitle>
                                <SpecItemValue>5 m</SpecItemValue>
                            </SpecItem>
                            <SpecItem>
                                <span><FontAwesomeIcon icon={faBed}/></span>
                                <SpecItemTitle>Số phòng ngủ</SpecItemTitle>
                                <SpecItemValue>5 phòng</SpecItemValue>
                            </SpecItem>
                            <SpecItem>
                                <span><FontAwesomeIcon icon={faChair}/></span>
                                <SpecItemTitle>Nội thất</SpecItemTitle>
                                <SpecItemValue>Trang bị đầy đủ nhất</SpecItemValue>
                            </SpecItem>
                            <SpecItem>
                                <span><FontAwesomeIcon icon={faToilet}/></span>
                                <SpecItemTitle>Số phòng vệ sinh</SpecItemTitle>
                                <SpecItemValue>3 phòng</SpecItemValue>
                            </SpecItem>
                        </SpecBody>
                    </WrapperSpecs>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <WrapperConfig>
                        <ConfigItem>
                            <ConfigItemTitle>Ngày đăng</ConfigItemTitle>
                            <ConfigItemValue>05/09/2023</ConfigItemValue>
                        </ConfigItem>
                        <ConfigItem>
                            <ConfigItemTitle>Ngày hết hạn</ConfigItemTitle>
                            <ConfigItemValue>05/10/2023</ConfigItemValue>
                        </ConfigItem>
                    </WrapperConfig>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <div>
                        <SpecTitle>Bất động sản khác</SpecTitle>
                        <WrapperSimilarLands>
                            <CardsmallComponent 
                                Title={"Europe Street beat"} 
                                style={{width:"100%"}} 
                                Img={<img draggable={false} alt="example" src={arrImages[0]} className="image-land"/>}
                                bodyStyle={{padding:"12px 16px 16px 16px"}}
                            />
                            <CardsmallComponent 
                                Title={"Europe Street beat"} 
                                style={{width:"100%"}} 
                                Img={<img draggable={false} alt="example" src={arrImages[0]} className="image-land"/>}
                                bodyStyle={{padding:"12px 16px 16px 16px"}}
                            />
                            <CardsmallComponent 
                                Title={"Europe Street beat"} 
                                style={{width:"100%"}} 
                                Img={<img draggable={false} alt="example" src={arrImages[0]} className="image-land"/>}
                                bodyStyle={{padding:"12px 16px 16px 16px"}}
                            />
                            <CardsmallComponent 
                                Title={"Europe Street beat"} 
                                style={{width:"100%"}} 
                                Img={<img draggable={false} alt="example" src={arrImages[0]} className="image-land"/>}
                                bodyStyle={{padding:"12px 16px 16px 16px"}}
                            />
                            <CardsmallComponent 
                                Title={"Europe Street beat"} 
                                style={{width:"100%"}} 
                                Img={<img draggable={false} alt="example" src={arrImages[0]} className="image-land"/>}
                                bodyStyle={{padding:"12px 16px 16px 16px"}}
                            />
                            <CardsmallComponent 
                                Title={"Europe Street beat"} 
                                style={{width:"100%"}} 
                                Img={<img draggable={false} alt="example" src={arrImages[0]} className="image-land"/>}
                                bodyStyle={{padding:"12px 16px 16px 16px"}}
                            />
                        </WrapperSimilarLands>
                    </div>
                </Col>
            </Row>
            <InfoContact>
                <ImageUser>
                    <Link rel="icon" href="#" >
                        <img src={useravatar} alt="avatar"/>
                    </Link>
                </ImageUser>
                <Link href="#" style={{flexGrow:1}}>
                    <ButtonComponent leftIcon={<img src={icon_zalo} alt="zaloicon" style={{width:"25px",height:"25px"}}/>} size="large" textButton={"Chat qua Zalo"} styleButton={{width:"100%"}}/>
                </Link>
            </InfoContact>
        </>
        
    );
}