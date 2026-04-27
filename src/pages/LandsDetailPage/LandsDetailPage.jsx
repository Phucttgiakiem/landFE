import {
    LandDetail,WrapperSimilarLands,
    WrapperContactBox,AvatarArea,AgentInfor,AgentName,ContactLink,ContactInfo,  
    WrapperConfig,ConfigItem,ConfigItemTitle,ConfigItemValue,
    SpecItemTitle,SpecItemValue,WrapperSpecs,SpecTitle,SpecBody,SpecItem,BodyDescription,
    WrapperDiscriptionLand,TitleDescription,ActionIcon,WrapperAction,
    InfoItemExtend,InfoItemValue,InfoItemTitle,InfoLand,InfoItem,
    Nameland,LocationLand,WrapperSlider, SliderContent,Sliderbottom,
   InfoContact,ImageUser } from "./style";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams,Link } from "react-router-dom";
import {useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Row,Col, Skeleton,Pagination} from "antd";
import {WarningOutlined,HeartOutlined,DollarOutlined } from "@ant-design/icons";
import DOMPurify from "dompurify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding,faPenRuler,faHouse,faBed,faChair,faToilet } from '@fortawesome/free-solid-svg-icons';
import useravatar from "../../assets/images/user_avatar_3607444.png";
import icon_zalo from "../../assets/images/icon_zalo.png";
import no_image from "../../assets/images/No_image.png";
import * as ListingService from "../../services/ListingService";
import * as ImageService from "../../services/ImageService";
import * as HomeService from "../../services/HomeService";
import { formatDateVN,formatacreage,formatPriceToString } from "../../utils";
import {setEntities, setLoading,setRelated,setLoadingRelated,setPageRelated} from "../../redux/slides/HomeSlide";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import CardsmallComponent from "../../components/CardsmallComponent/CardsmallComponent";
import SlickEffectComponent from "../../components/SlickEffectComponent/SlickEffectComponent";
import {formatDate} from "../../utils";
export default function LandsDetailPage () {
  const { id } = useParams();

  const entity = useSelector(state => state.home.entities[id]);
  const loadingDetail = useSelector(state => state.home.loading.detail);
  const {items,isLoading,page,limit,total} = useSelector(state => state.home.related);
  const dispatch = useDispatch();
  const [imageClick, setImageclick] = useState("");
  const [imagesland, setImagesland] = useState([]);
  const [isimagesLoading, setImagesLoading] = useState(false);
 
  const handleReplaceString = (value) => {
    const wordsToRemove = ["Phường ", "Thành phố ", "Xã "];
    const regex = new RegExp(wordsToRemove.join('|'), 'gi');
    return value?.replace(regex,'').replace(/\s+/g,' ').trim();
  };

  const fetchDetailland = async () => {
    try {
      dispatch(setLoading({ detail: true }));
      setImagesLoading(true);

      const [listingRes, imageRes] = await Promise.all([
        ListingService.getListing(id),
        ImageService.getAllImage(id)
      ]);

      // set redux 1 lần
      dispatch(setEntities([{ ...listingRes.data.data }]));

      // set local state 1 lần (không cần useEffect nữa)
      const images = imageRes.data.data || [];
      setImagesland(images);
      setImageclick(images?.[0]?.URL || no_image);

    } catch (error) {
      console.log(error);
    } finally {
      setImagesLoading(false);
      dispatch(setLoading({ detail: false }));
    }
  };
  
  // chỉ chạy khi id đổi
  useEffect(() => {
    fetchDetailland();
  }, [id]);
  

    useEffect(() => {
        if (!entity) return;

        const CommuneID = entity.Address?.Commune?.id;
        const CityID = entity.Address?.City?.id;

        if (!CommuneID || !CityID) return;

        const fetchDataRelated = async () => {
            try {
                dispatch(setLoadingRelated(true));

                const res = await HomeService.getListingRelated({
                    page,
                    limit,
                    CommuneID,
                    CityID
                });

                dispatch(setRelated(res.data));
            } catch (e) {
                console.log(e);
            } finally {
                dispatch(setLoadingRelated(false));
            }
        };

        fetchDataRelated();
}, [page, limit, entity]);
  return (
    <LandDetail>
      <Row gutter={[8,16]} style={{marginBottom:"10rem"}}>
                <Col xs={0} sm={0} md={0} lg={0} xl={18} xxl={18}>
                     {/* <nav style={{height: "3rem",display:"flex",alignItems:"center",gap:"5px",fontSize:"16px",fontWeight:"400"}}>
                        <Link style={{color:"black"}}>{handleReplaceString(detailland?.Address?.Commune?.name)}/ </Link>
                        <Link style={{color:"black"}}>{handleReplaceString(detailland?.Address?.City?.name)}/ </Link>
                        <span>{detailland?.Title}</span>
                    </nav> */}
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <WrapperSlider>
                        <SliderContent>
                            {
                                isimagesLoading || !imageClick
                                    ? <Skeleton.Node active className="loading-image"/>
                                    : <img src={imageClick} alt="image-listing"/>    
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
                                    isimagesLoading ? 
                                        <div>
                                            <Skeleton.Image active/>
                                        </div>
                                        :
                                        // eslint-disable-next-line array-callback-return
                                        imagesland && imagesland.length > 0 && imagesland.map((item,index) => (
                                            <div key={index} className="img-listing" onClick={() => setImageclick(item.URL)}>
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
                                loadingDetail ? (
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
                                                {entity?.UserInfo?.fullname}
                                            </Link>
                                            <ContactLink>
                                                <Link href="#" style={{color:"#000000ff"}}>Xem {entity?.UserInfo?.countnew} tin khác</Link>
                                            </ContactLink>
                                        </AgentName>
                                    </>
                                )
                            }
                        </AvatarArea>
                        <ContactInfo>
                            {
                                loadingDetail ? (
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
                        loadingDetail ? 
                            <Skeleton avatar={false} active paragraph={false} title={{ width: "100%", style: { height: 30 } }}/> :
                        <Nameland>
                            {entity && entity?.Title}
                        </Nameland>
                    }
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    {
                        loadingDetail ?
                            <Skeleton avatar={false} active paragraph={false} title={{ width: "100%", style: { height: 30 } }}/> :
                        <LocationLand>Đường Xuân Thủy, Phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội</LocationLand>
                    }
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    {
                        loadingDetail ?
                            <Skeleton avatar={false} active paragraph={{rows: 1,width:"100%"}} title={{ width: "100%"}}/>
                        :
                        <InfoLand>
                            <InfoItem>
                                <InfoItemTitle>Khoảng giá</InfoItemTitle>
                                <InfoItemValue>{formatPriceToString(entity?.Price)}/tháng</InfoItemValue>
                            </InfoItem>
                            <InfoItem>
                                <InfoItemTitle>Diện tích</InfoItemTitle>
                                <InfoItemValue>{formatacreage(entity?.horizontal,entity?.vertical)} m²</InfoItemValue>
                                <InfoItemExtend>Mặt tiền {entity?.front_street} m</InfoItemExtend>
                            </InfoItem>
                            <InfoItem>
                                <InfoItemTitle>Phòng ngủ</InfoItemTitle>
                                <InfoItemValue>{entity?.bedroom} PN</InfoItemValue>
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
                            loadingDetail ? 
                                <Skeleton 
                                    avatar={false} 
                                    active 
                                    paragraph={{rows: 8,width:"100%"}} 
                                    title={{ width: "50%"}}/>
                            : <>
                                <TitleDescription>Thông tin mô tả</TitleDescription>
                                <BodyDescription
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(entity?.Description),
                                    }}
                                />
                                    
                            </>
                        }
                    </WrapperDiscriptionLand>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <WrapperSpecs>
                        {
                            loadingDetail ? 
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
                                        <SpecItemValue>{formatPriceToString(entity?.Price)}/tháng</SpecItemValue>
                                    </SpecItem>
                                    <SpecItem>
                                        <span><FontAwesomeIcon icon={faBuilding} /></span>
                                        <SpecItemTitle>Số tầng</SpecItemTitle>
                                        <SpecItemValue>{entity?.floor}</SpecItemValue>
                                    </SpecItem>
                                    <SpecItem>
                                        <span><FontAwesomeIcon icon={faPenRuler}/></span>
                                        <SpecItemTitle>Diện tích</SpecItemTitle>
                                        <SpecItemValue>{formatacreage(entity?.horizontal,entity?.vertical)} m²</SpecItemValue>
                                    </SpecItem>
                                    <SpecItem>
                                        <span><FontAwesomeIcon icon={faHouse}/></span>
                                        <SpecItemTitle>mặt tiền</SpecItemTitle>
                                        <SpecItemValue>{entity?.front_street} m</SpecItemValue>
                                    </SpecItem>
                                    <SpecItem>
                                        <span><FontAwesomeIcon icon={faBed}/></span>
                                        <SpecItemTitle>Số phòng ngủ</SpecItemTitle>
                                        <SpecItemValue>{entity?.bedroom} phòng</SpecItemValue>
                                    </SpecItem>
                                    <SpecItem>
                                        <span><FontAwesomeIcon icon={faChair}/></span>
                                        <SpecItemTitle>Nội thất</SpecItemTitle>
                                        <SpecItemValue>Trang bị đầy đủ nhất</SpecItemValue>
                                    </SpecItem>
                                    <SpecItem>
                                        <span><FontAwesomeIcon icon={faToilet}/></span>
                                        <SpecItemTitle>Số phòng vệ sinh</SpecItemTitle>
                                        <SpecItemValue>{entity?.Toilet} phòng</SpecItemValue>
                                    </SpecItem>
                                </SpecBody>
                            </>
                        }
                    </WrapperSpecs>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <WrapperConfig>
                        {
                            loadingDetail ? 
                            <Skeleton active avatar={false} paragraph={{rows: 1,width:"100%"}} title={{width:"100%"}} />
                            : 
                            <>
                                <ConfigItem>
                                    <ConfigItemTitle>Ngày đăng</ConfigItemTitle>
                                    <ConfigItemValue>{formatDateVN(entity?.createdAt)}</ConfigItemValue>
                                </ConfigItem>
                                <ConfigItem>
                                    <ConfigItemTitle>Ngày hết hạn</ConfigItemTitle>
                                    <ConfigItemValue>{formatDateVN(entity?.ExpiredAt)}</ConfigItemValue>
                                </ConfigItem>
                            </>
                        }
                    </WrapperConfig>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <div>
                        
                           
                                    <SpecTitle>Bất động sản khác</SpecTitle>
                                    <WrapperSimilarLands>
                                        
                                        {
                                          isLoading ? Array(3).fill(0).map((_, index) => (
                                                <CardsmallComponent 
                                                loading={true}
                                                style={{width:"100%"}} 
                                                
                                                bodyStyle={{padding:"12px 16px 16px 16px"}}/>
                                            )) :

                                            items && items?.map((rs,index) => (
                                                <CardsmallComponent 
                                                    key={rs._id}
                                                    Id={rs._id}
                                                    Title={rs.Title}
                                                    Price={rs.Price}
                                                    Area={rs.Address.Commune.name+" / "+rs.Address.City.name}
                                                    createdAt={formatDate(rs.createdAt)}
                                                    Img={<img src={rs?.images[0]?.URL}
                                                    alt={`imagebuilding${index}`} className="image-land"/>}
                                                    className="card-small-component"
                                                    Acreage={formatacreage(rs.horizontal,rs.vertical)}
                                                />
                                            ))
                                        }
                                        
                                        
                                    </WrapperSimilarLands>
                                {
                                    total > limit && 
                                   <Pagination
                                        align="center"
                                        current={page}
                                        total={total}
                                        pageSize={limit}
                                        onChange={(page) => {
                                            dispatch(setPageRelated(page));
                                        }}
                                    />
                                }
                                   
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
    </LandDetail>
  )
}