import {
    LandDetail,WrapperSimilarLands,
    WrapperContactBox,AvatarArea,AgentInfor,AgentName,ContactInfo,  
    WrapperConfig,ConfigItem,ConfigItemTitle,ConfigItemValue,
    SpecItemTitle,SpecItemValue,WrapperSpecs,SpecTitle,SpecBody,SpecItem,BodyDescription,
    WrapperDiscriptionLand,TitleDescription,
    InfoItemExtend,InfoItemValue,InfoItemTitle,InfoLand,InfoItem,
    Nameland,LocationLand,
   InfoContact,ImageUser,WrapperCtBup,InformationBroker,DetailInfor,PhoneInfor
   ,SwitchTypeproperty,SwitchItem,Titlewrapper } from "./style";
import { useParams,Link} from "react-router-dom";
import {useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Row,Col, Skeleton,Pagination,Breadcrumb} from "antd";
import {DollarOutlined,PhoneOutlined } from "@ant-design/icons";
import DOMPurify from "dompurify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding,faPenRuler,faHouse,faBed,faChair,faToilet } from '@fortawesome/free-solid-svg-icons';
import useravatar from "../../assets/images/user_avatar_3607444.png";
import icon_google from "../../assets/images/google.png";
import icon_vip from "../../assets/images/vip.png";
import * as ListingService from "../../services/ListingService";
import * as ImageService from "../../services/ImageService";
import * as HomeService from "../../services/HomeService";
import { formatDateVN,formatacreage,formatPriceToString } from "../../utils";
import {setEntities, setLoading,setRelated,setLoadingRelated,setPageRelated} from "../../redux/slides/HomeSlide";
import EmblaCarouThumb from "../../components/EmblaCarousel/EmblaCarouThumb";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import CardsmallComponent from "../../components/CardsmallComponent/CardsmallComponent";
import {formatDate,getJoinedTime} from "../../utils";
import Noimage from "../../assets/images/not_image.jpg"
export default function LandsDetailPage () {
  const { id } = useParams();
  const user = useSelector(state => state.user);
  const entity = useSelector(state => state.home.entities[id]);
  const CommuneID = entity?.Address?.Commune?.id;
  const CityID = entity?.Address?.City?.id;
  const ownerId = entity?.UserInfo?._id;
  const [typeproperty,setTypeproperty] = useState("Sale");
  const loadingDetail = useSelector(state => state.home.loading.detail);
  const {items,isLoading,page,limit,total} = useSelector(state => state.home.related);
  const dispatch = useDispatch();
  const [imageClick, setImageclick] = useState("");
  const [imagesland, setImagesland] = useState([]);
  const [isimagesLoading, setImagesLoading] = useState(false);
  const [newsofBroker,setNewsofBroker] = useState({
        loadingnews: false,
        items: [],
        page: 1,
        limit: 6,
        total: 0
  })
  const handleReplaceString = (value) => {
    const wordsToRemove = ["Phường ", "Thành phố ", "Xã "];
    const regex = new RegExp(wordsToRemove.join('|'), 'gi');
    return value?.replace(regex,'').replace(/\s+/g,' ').trim();
  };
  const createbreadcrumb = () => (
        <Breadcrumb
            items={[
                {
                title: <Link to={"/"}>Home</Link>,
                },
                {
                title: <Link>{handleReplaceString(entity?.Address?.Commune?.name)}</Link>,
                },
                {
                title: <Link>{handleReplaceString(entity?.Address?.City?.name)}</Link>,
                },
                {
                title: entity?.Title,
                },
            ]}
        />
    )
  const isValidMongoDate = (date) => {
        if (!date) return false;

        const time = new Date(date).getTime();

        return !isNaN(time) && time > 0;
    };
  const fetchDetailland = async () => {
    try {
      dispatch(setLoading({ detail: true }));
      setImagesLoading(true);

      const [listingRes, imageRes] = await Promise.all([
        ListingService.getListing(id),
        ImageService.getAllImage(id)
      ]);
      
      dispatch(setEntities([{ ...listingRes.data.data }]));

      
      const images = imageRes.data.data || [];
      setImagesland(images);
      setImageclick(images?.[0]?.URL || Noimage);

    } catch (error) {
      console.log(error);
    } finally {
      setImagesLoading(false);
      dispatch(setLoading({ detail: false }));
    }
  };
  
    // the useEffect below will run when the component mounts and whenever the id changes
    useEffect(() => {
        fetchDetailland();
    }, [id]);
  

    useEffect(() => {

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
    }, [page, limit,CommuneID,CityID]);

    useEffect(() => {
        if(!ownerId) return;
        const fetchDataofBroker = async () => {
            try {
                setNewsofBroker(prev => ({
                    ...prev,
                    loadingnews:true,
                }));
                const data = {
                    page: newsofBroker.page,
                    limit: newsofBroker.limit,
                    filter: typeproperty,
                    idowner: ownerId
                }
                const result = await HomeService.getPropertyofBroker(data);
                setNewsofBroker(prev => ({
                    ...prev,
                    loadingnews:false,
                    items: result?.listings,
                    page: result?.pageCurrent,
                    total:result?.total,
                }));

            }catch(e){
                console.log(e);
            }
        }
        fetchDataofBroker();
    },[newsofBroker.page,newsofBroker.limit,ownerId,typeproperty])
  return (
    <LandDetail>
      <Row gutter={[8,16]} style={{marginBottom:"10rem",marginTop:"1rem"}}>
                <Col xs={0} sm={0} md={0} lg={0} xl={18} xxl={18}>
                     {createbreadcrumb()}
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    
                            <EmblaCarouThumb>
                                {/* 1. Phần ảnh lớn ở trên (có nút mũi tên điều hướng) */}
                                <EmblaCarouThumb.Main>
                                    {
                                        imagesland && imagesland.length > 0 && imagesland.map((item,index) => (
                                            <EmblaCarouThumb.Item key={index}>
                                                <img  src={item.URL} alt="image-listing"/>
                                            </EmblaCarouThumb.Item>
                                        ))
                                    }
                                </EmblaCarouThumb.Main>
                                {/* 2. Phần ảnh nhỏ (thumbnails) ở dưới */}
                                {/* Trên máy tính hiện nhiều tấm, trên điện thoại sẽ tự động thu gọn hiển thị đúng 2 tấm và cuộn theo ảnh lớn */}
                                <EmblaCarouThumb.Thumbs>
                                {
                                        imagesland && imagesland.length > 0 && imagesland.map((item,index) => (
                                                <img key={index}  src={item.URL} alt="image-listing"/>
                                        ))
                                }
                                </EmblaCarouThumb.Thumbs>
                            </EmblaCarouThumb>
                   
                </Col>
                <Col xs={0} sm={0} md={0} lg={0} xl={6} xxl={6}>
                    <WrapperContactBox>
                        <WrapperCtBup>
                            <AvatarArea>
                                {
                                    loadingDetail ? (
                                        <Skeleton active avatar paragraph={{rows: 1,width:150}} title={{width:200}} />
                                    ) : (
                                        <>
                                            <AgentInfor>
                                                <img src={useravatar} alt="avatar"/>
                                            </AgentInfor>
                                            <AgentName>
                                                <span>
                                                    {entity?.UserInfo?.fullname}
                                                </span>
                                            </AgentName>
                                        </>
                                    )
                                }
                            </AvatarArea>
                            <InformationBroker>
                                <DetailInfor>
                                    <h5 style={{margin:0}}>Time Joined</h5>
                                    <h3 style={{marginTop:"3px"}}>{getJoinedTime(entity?.UserInfo?.createdAt)}</h3>
                                </DetailInfor>
                                <DetailInfor>
                                    <h5 style={{margin:0}}>Active Listings</h5>
                                    <h3 style={{marginTop:"3px"}}>{entity?.UserInfo?.countnew}</h3>
                                </DetailInfor>
                            </InformationBroker>
                            <ContactInfo>
                                {
                                    loadingDetail ? (
                                        <Skeleton.Button active style={{width:260}}/>
                                    ) : 
                                    <>
                                        { user?.id && <Link to={`https://mail.google.com/mail/?view=cm&fs=1&to=${entity?.UserInfo?.email}`} style={{marginTop:"16px"}}>
                                            <ButtonComponent leftIcon={<img src={icon_google} alt="zaloicon" style={{width:"18px",height:"18px"}}/>} size="large" textButton={"Contact via Gmail"} styleButton={{width:"100%"
                                            }}/>
                                        </Link> }
                                        <PhoneInfor><PhoneOutlined/> {entity?.UserInfo?.phone}</PhoneInfor>
                                    </>
                                    
                                }
                            </ContactInfo>
                        </WrapperCtBup>
                    </WrapperContactBox>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    {
                        loadingDetail ? 
                            <Skeleton avatar={false} active paragraph={false} title={{ width: "100%", style: { height: 30 } }}/> :
                        <Titlewrapper>
                            <Nameland>
                                {entity && entity?.Title}
                            </Nameland>
                            {entity && entity?.type === "vip" && 
                            <img src={icon_vip} style={{width:"30px",height:"30px"}} alt="icon_vip" /> }
                        </Titlewrapper>
                        
                    }
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    {
                        loadingDetail ?
                            <Skeleton avatar={false} active paragraph={false} title={{ width: "100%", style: { height: 30 } }}/> :
                        <LocationLand>{entity && entity?.Address.numberhouse + " - " 
                            + entity?.Address.Commune.name + " - "
                            + entity?.Address.City.name
                        }</LocationLand>
                    }
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    {
                        loadingDetail ?
                            <Skeleton avatar={false} active paragraph={{rows: 1,width:"100%"}} title={{ width: "100%"}}/>
                        :
                        <InfoLand>
                            <InfoItem>
                                <InfoItemTitle>Price</InfoItemTitle>
                                <InfoItemValue>{entity?.Price ? formatPriceToString(entity?.Price)+'/month' : 'Negotiable'}</InfoItemValue>
                            </InfoItem>
                            <InfoItem>
                                <InfoItemTitle>Area</InfoItemTitle>
                                <InfoItemValue>{formatacreage(entity?.horizontal,entity?.vertical)} m²</InfoItemValue>
                                <InfoItemExtend>Frontage {entity?.front_street} m</InfoItemExtend>
                            </InfoItem>
                            <InfoItem>
                                <InfoItemTitle>Bedrooms</InfoItemTitle>
                                <InfoItemValue>{entity?.bedroom}</InfoItemValue>
                            </InfoItem>
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
                                <TitleDescription>Description</TitleDescription>
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
                                <SpecTitle>Property Details</SpecTitle>
                                <SpecBody>
                                    <SpecItem>
                                        <span><DollarOutlined /></span>
                                        <SpecItemTitle>Price Range</SpecItemTitle>
                                        <SpecItemValue>{entity?.Price ? formatPriceToString(entity?.Price)+'/month' : 'Negotiable'}</SpecItemValue>
                                    </SpecItem>
                                    <SpecItem>
                                        <span><FontAwesomeIcon icon={faBuilding} /></span>
                                        <SpecItemTitle>Floors</SpecItemTitle>
                                        <SpecItemValue>{entity?.floor}</SpecItemValue>
                                    </SpecItem>
                                    <SpecItem>
                                        <span><FontAwesomeIcon icon={faPenRuler}/></span>
                                        <SpecItemTitle>Area</SpecItemTitle>
                                        <SpecItemValue>{formatacreage(entity?.horizontal,entity?.vertical)} m²</SpecItemValue>
                                    </SpecItem>
                                    <SpecItem>
                                        <span><FontAwesomeIcon icon={faHouse}/></span>
                                        <SpecItemTitle>Frontage</SpecItemTitle>
                                        <SpecItemValue>{entity?.front_street} m</SpecItemValue>
                                    </SpecItem>
                                    <SpecItem>
                                        <span><FontAwesomeIcon icon={faBed}/></span>
                                        <SpecItemTitle>Bedrooms</SpecItemTitle>
                                        <SpecItemValue>{entity?.bedroom}</SpecItemValue>
                                    </SpecItem>
                                    <SpecItem>
                                        <span><FontAwesomeIcon icon={faChair}/></span>
                                        <SpecItemTitle>Furniture</SpecItemTitle>
                                        <SpecItemValue>Full</SpecItemValue>
                                    </SpecItem>
                                    <SpecItem>
                                        <span><FontAwesomeIcon icon={faToilet}/></span>
                                        <SpecItemTitle>Bathrooms</SpecItemTitle>
                                        <SpecItemValue>{entity?.Toilet} rooms</SpecItemValue>
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
                                    <ConfigItemTitle>Listing Date</ConfigItemTitle>
                                    <ConfigItemValue>{formatDateVN(entity?.createdAt)}</ConfigItemValue>
                                </ConfigItem>
                                {
                                    isValidMongoDate(entity?.ExpiredAt) &&
                                    <ConfigItem>
                                        <ConfigItemTitle>Expiration Date</ConfigItemTitle>
                                        <ConfigItemValue>{formatDateVN(entity?.ExpiredAt)}</ConfigItemValue>
                                    </ConfigItem>
                                }
                                
                            </>
                        }
                    </WrapperConfig>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <div>
                        {
                            items.length > 0 && (
                                <>
                                    <SpecTitle>Other Properties</SpecTitle>
                                    <WrapperSimilarLands>
                                            
                                            {
                                                isLoading ? Array(3).fill(0).map((_, index) => (
                                                    <CardsmallComponent 
                                                    loading={true}
                                                    style={{width:"100%"}} 
                                                    bodyStyle={{padding:"12px 16px 16px 16px"}}/>
                                                )) :

                                                items.length > 0 && items?.map((rs,index) => {
                                                    return (
                                                    <CardsmallComponent 
                                                        key={rs._id}
                                                        Id={rs._id}
                                                        Title={rs.Title}
                                                        Price={rs.Price}
                                                        Area={rs.Address.Commune.name+" / "+rs.Address.City.name}
                                                        createdAt={formatDate(rs.createdAt)}
                                                        Img={<img src={rs?.images[0]?.URL || Noimage}
                                                        alt={`imagebuilding${index}`} className="image-land"/>}
                                                        className="card-small-component"
                                                        Acreage={formatacreage(rs.horizontal,rs.vertical)}
                                                    />
                                                ) 
                                            })
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
                                </>
                            )
                        }          
                    </div>
                </Col>
                 <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <div>
                        <SpecTitle>Other Properties of the Owner</SpecTitle>
                        <SwitchTypeproperty>
                            <SwitchItem 
                                className={typeproperty === "Sale" ? "active" : ""}
                                onClick={() => {setTypeproperty("Sale"); setNewsofBroker(prev => ({...prev,page: 1}))}}
                            >Sale</SwitchItem>
                            <SwitchItem 
                                className={typeproperty === "Rental" ? "active" : ""}
                                onClick={() => {setTypeproperty("Rental");setNewsofBroker(prev => ({...prev,page: 1}))}}
                            >Rental</SwitchItem>
                        </SwitchTypeproperty>
                        <WrapperSimilarLands>
                                {
                                    newsofBroker.loadingnews ? Array(3).fill(0).map((_, index) => (
                                        <CardsmallComponent 
                                        loading={true}
                                        style={{width:"100%"}} 
                                        
                                        bodyStyle={{padding:"12px 16px 16px 16px"}}/>
                                    )) :

                                    newsofBroker?.items && newsofBroker?.items?.map((rs,index) => (
                                        <CardsmallComponent 
                                            key={rs._id}
                                            Id={rs._id}
                                            Title={rs.Title}
                                            Price={rs.Price}
                                            Area={rs.Address.Commune.name+" / "+rs.Address.City.name}
                                            createdAt={formatDate(rs.createdAt)}
                                            Img={<img src={rs?.thumbnail !== "no-image" ? rs?.thumbnail : Noimage}
                                            alt={`imagebuilding${index}`} className="image-land"/>}
                                            className="card-small-component"
                                            Acreage={formatacreage(rs.horizontal,rs.vertical)}
                                        />
                                    ))
                                }
                            </WrapperSimilarLands>
                            {
                                newsofBroker.total > newsofBroker.limit && 
                                    <Pagination
                                        align="center"
                                        current={newsofBroker.page}
                                        total={newsofBroker.total}
                                        pageSize={newsofBroker.limit}
                                        onChange={(page) => {
                                            setNewsofBroker(prev => ({
                                                ...prev,
                                                page:page
                                            }))
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
                <Link to={`https://mail.google.com/mail/?view=cm&fs=1&to=${entity?.UserInfo?.email}`} style={{flexGrow:1}}>
                    <ButtonComponent leftIcon={<img src={icon_google} alt="zaloicon" style={{width:"25px",height:"25px"}}/>} size="large" textButton={"Contact via Gmail"} styleButton={{width:"100%"}}/>
                </Link>
            </InfoContact>
    </LandDetail>
  )
}