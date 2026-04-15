import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { Row,Col, Skeleton,Space} from "antd";
import { LeftOutlined,RightOutlined,WarningOutlined,HeartOutlined,DollarOutlined } from "@ant-design/icons";
import DOMPurify from "dompurify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding,faPenRuler,faHouse,faBed,faChair,faToilet } from '@fortawesome/free-solid-svg-icons';
import SlickEffectComponent from "../../components/SlickEffectComponent/SlickEffectComponent";
import {
    WrapperSimilarLands,
    WrapperContactBox,AvatarArea,AgentInfor,AgentName,ContactLink,ContactInfo,  
    WrapperConfig,ConfigItem,ConfigItemTitle,ConfigItemValue,
    SpecItemTitle,SpecItemValue,WrapperSpecs,SpecTitle,SpecBody,SpecItem,BodyDescription,
    WrapperDiscriptionLand,TitleDescription,ActionIcon,WrapperAction,
    InfoItemExtend,InfoItemValue,InfoItemTitle,InfoLand,InfoItem,
    Nameland,LocationLand,WrapperSlider,ImageSlider, SliderContent,Sliderbottom,
    SmallImageSlider,SmallImageWrapper,Arrow,InfoContact,ImageUser } from "./style";
import useravatar from "../../assets/images/user_avatar_3607444.png";
import icon_zalo from "../../assets/images/icon_zalo.png";
import no_image from "../../assets/images/No_image.png";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import CardsmallComponent from "../CardsmallComponent/CardsmallComponent";
import { formatArea,buildMap,formatDateVN,formatacreage,formatPriceToString } from "../../utils";
export default function LandDetailComponent({loading,listing,images}) {
    //console.log("listing: ",listing);
    const [imageClick ,setImageclick] = useState("");
    const [nav1, setNav1] = useState(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);
    useEffect(() => {
        setNav1(sliderRef1.current);
    }, []);
    useEffect(() => {
        if (images && images.length > 0) {
            setImageclick(images[0].URL);
        }
    }, [images]);
    return (
        <>
            <Row gutter={[8,16]} style={{marginBottom:"10rem"}}>
                <Col xs={0} sm={0} md={0} lg={0} xl={18} xxl={18}>
                     <nav style={{height: "3rem",display:"flex",alignItems:"center",gap:"5px",fontSize:"16px",fontWeight:"400"}}>
                        <Link style={{color:"black"}}>{listing?.purpose}/ </Link>
                        <Link style={{color:"black"}}>{listing?.Address.Commune.name}/ </Link>
                        <Link style={{color:"black"}}>{listing?.Address.City.name}/ </Link>
                        <span>{listing?.Title}</span>
                    </nav>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <WrapperSlider>
                        <SliderContent>
                            {
                                loading ? <Skeleton.Node active className="loading-image"/> :
                                <img src={imageClick ? imageClick: no_image} atl="image-listing" />
                            }
                        </SliderContent>
                        <Sliderbottom className="slider-container">
                            <SlickEffectComponent
                               setting={{
                                    dots: false,
                                    infinite: true,
                                    slidesToShow: 8,
                                    slidesToScroll: 1,
                                    centerMode: false,
                               }}
                            >
                                {
                                    loading ? 
                                        <div>
                                            <Skeleton.Image active/>
                                        </div>
                                        :
                                        // eslint-disable-next-line array-callback-return
                                        images && images.length > 0 && images.map((item,index) => (
                                            <div key={index} className="img-listing">
                                                <img  src={item.URL} alt="image-listing"/>
                                            </div>
                                        ))
                                }
                                
                                
                            </SlickEffectComponent>
                        </Sliderbottom>
                    </WrapperSlider>
                </Col>
                <Col xs={0} sm={0} md={0} lg={0} xl={6} xxl={6}>
                    <WrapperContactBox>
                        <AvatarArea>
                            {
                                loading ? (
                                    <Skeleton active avatar paragraph={{rows: 1,width:150}} title={{width:200}} />
                                ) : (
                                    <>
                                        <AgentInfor>
                                            <Link rel="icon" href="#" >
                                                <img src={useravatar} alt="avatar"/>
                                            </Link>
                                        </AgentInfor>
                                        <AgentName>
                                            <Link href="#" style={{color:"#000000ff",fontWeight:"600",fontSize:"16px"}}>
                                                {listing?.UserInfo.fullname}
                                            </Link>
                                            <ContactLink>
                                                <Link href="#" style={{color:"#000000ff"}}>Xem {listing?.UserInfo.countnew} tin khác</Link>
                                            </ContactLink>
                                        </AgentName>
                                    </>
                                )
                            }
                        </AvatarArea>
                        <ContactInfo>
                            {
                                loading ? (
                                    <Skeleton.Button active style={{width:260}}/>
                                ) : 
                                <Link href="#" style={{marginTop:"16px"}}>
                                    <ButtonComponent leftIcon={<img src={icon_zalo} alt="zaloicon" style={{width:"25px",height:"25px"}}/>} size="large" textButton={"Chat qua Zalo"} styleButton={{width:"100%"}}/>
                                </Link>
                            }
                        </ContactInfo>
                    </WrapperContactBox>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    {
                        loading ? 
                            <Skeleton avatar={false} active paragraph={false} title={{ width: "100%", style: { height: 30 } }}/> :
                        <Nameland>
                            {listing && listing?.Title}
                        </Nameland>
                    }
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    {
                        loading ?
                            <Skeleton avatar={false} active paragraph={false} title={{ width: "100%", style: { height: 30 } }}/> :
                        <LocationLand>Đường Xuân Thủy, Phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội</LocationLand>
                    }
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    {
                        loading ?
                            <Skeleton avatar={false} active paragraph={{rows: 1,width:"100%"}} title={{ width: "100%"}}/>
                        :
                        <InfoLand>
                            <InfoItem>
                                <InfoItemTitle>Khoảng giá</InfoItemTitle>
                                <InfoItemValue>{formatPriceToString(listing?.Price)}/tháng</InfoItemValue>
                            </InfoItem>
                            <InfoItem>
                                <InfoItemTitle>Diện tích</InfoItemTitle>
                                <InfoItemValue>{formatacreage(listing?.horizontal,listing?.vertical)} m²</InfoItemValue>
                                <InfoItemExtend>Mặt tiền {listing?.front_street} m</InfoItemExtend>
                            </InfoItem>
                            <InfoItem>
                                <InfoItemTitle>Phòng ngủ</InfoItemTitle>
                                <InfoItemValue>{listing?.bedroom} PN</InfoItemValue>
                            </InfoItem>
                            < WrapperAction>
                                    <ActionIcon><WarningOutlined /></ActionIcon>
                                    <ActionIcon><HeartOutlined/></ActionIcon>
                            </WrapperAction>
                        </InfoLand>
                    }
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <WrapperDiscriptionLand>
                        {
                            loading ? 
                                <Skeleton 
                                    avatar={false} 
                                    active 
                                    paragraph={{rows: 8,width:"100%"}} 
                                    title={{ width: "50%"}}/>
                            : <>
                                <TitleDescription>Thông tin mô tả</TitleDescription>
                                <BodyDescription
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(listing?.Description),
                                    }}
                                />
                                    
                            </>
                        }
                    </WrapperDiscriptionLand>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <WrapperSpecs>
                        {
                            loading ? 
                                <Skeleton 
                                    avatar={false} 
                                    active 
                                    paragraph={{rows: 8,width:"100%"}} 
                                    title={{ width: "50%"}}/>
                            : <>
                                <SpecTitle>Đặc điểm bất động sản</SpecTitle>
                                <SpecBody>
                                    <SpecItem>
                                        <span><DollarOutlined /></span>
                                        <SpecItemTitle>Khoảng giá</SpecItemTitle>
                                        <SpecItemValue>{formatPriceToString(listing?.Price)}/tháng</SpecItemValue>
                                    </SpecItem>
                                    <SpecItem>
                                        <span><FontAwesomeIcon icon={faBuilding} /></span>
                                        <SpecItemTitle>Số tầng</SpecItemTitle>
                                        <SpecItemValue>{listing?.floor}</SpecItemValue>
                                    </SpecItem>
                                    <SpecItem>
                                        <span><FontAwesomeIcon icon={faPenRuler}/></span>
                                        <SpecItemTitle>Diện tích</SpecItemTitle>
                                        <SpecItemValue>{formatacreage(listing?.horizontal,listing?.vertical)} m²</SpecItemValue>
                                    </SpecItem>
                                    <SpecItem>
                                        <span><FontAwesomeIcon icon={faHouse}/></span>
                                        <SpecItemTitle>mặt tiền</SpecItemTitle>
                                        <SpecItemValue>{listing?.front_street} m</SpecItemValue>
                                    </SpecItem>
                                    <SpecItem>
                                        <span><FontAwesomeIcon icon={faBed}/></span>
                                        <SpecItemTitle>Số phòng ngủ</SpecItemTitle>
                                        <SpecItemValue>{listing?.bedroom} phòng</SpecItemValue>
                                    </SpecItem>
                                    <SpecItem>
                                        <span><FontAwesomeIcon icon={faChair}/></span>
                                        <SpecItemTitle>Nội thất</SpecItemTitle>
                                        <SpecItemValue>Trang bị đầy đủ nhất</SpecItemValue>
                                    </SpecItem>
                                    <SpecItem>
                                        <span><FontAwesomeIcon icon={faToilet}/></span>
                                        <SpecItemTitle>Số phòng vệ sinh</SpecItemTitle>
                                        <SpecItemValue>{listing?.Toilet} phòng</SpecItemValue>
                                    </SpecItem>
                                </SpecBody>
                            </>
                        }
                    </WrapperSpecs>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <WrapperConfig>
                        {
                            loading ? 
                            <Skeleton active avatar={false} paragraph={{rows: 1,width:"100%"}} title={{width:"100%"}} />
                            : 
                            <>
                                <ConfigItem>
                                    <ConfigItemTitle>Ngày đăng</ConfigItemTitle>
                                    <ConfigItemValue>{formatDateVN(listing?.createdAt)}</ConfigItemValue>
                                </ConfigItem>
                                <ConfigItem>
                                    <ConfigItemTitle>Ngày hết hạn</ConfigItemTitle>
                                    <ConfigItemValue>{formatDateVN(listing?.ExpiredAt)}</ConfigItemValue>
                                </ConfigItem>
                            </>
                        }
                    </WrapperConfig>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <div>
                        <SpecTitle>Bất động sản khác</SpecTitle>
                        <WrapperSimilarLands>
                            {/* <CardsmallComponent 
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
                            /> */}
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