import { useSelector,useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import {WrapperHeadofHomepage,WrapperSlider,WrapperSearch,
    MenuItem,SearchboxContent,SearchboxHeader,Searchboxdropdown,
    WrapperSearchlist,MenuItemSearchleft,MenuItemSearchright,
    WrapperContentHomepage,WrapperLandslist,WrapperPlacespecial} from "./style";
import { CloseCircleOutlined,SearchOutlined } from "@ant-design/icons";
import buildingone from "../../assets/images/Buldingone.jpg"
import buildingtwo from "../../assets/images/buildingtwo.jpg"
import buildingthree from "../../assets/images/buildingthree.jpg"
import Imagecity_HCM from "../../assets/images/saigon_city.png"
import Imagecity_DNN from "../../assets/images/dongnai.jpg"
import Imagecity_hue from "../../assets/images/hue_city.png"
import Imagecity_danang from "../../assets/images/danang_city.webp"
import Imagecity_hanoi from "../../assets/images/hanoi_city.jpg"
import ImageBuilding from "../../assets/images/20250904001841_bdbe_wm.jpg"
import SliderEffectComponent from "../../components/SlickEffectComponent/SlickEffectComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import CardsmallComponent from "../../components/CardsmallComponent/CardsmallComponent";
import CardPlaceComponent from "../../components/CardPlaceComponent/CardPlaceComponent";
import ListCardLoadingComponent from "../../components/ListCardLoadingComponent/ListCardLoadingComponent";
import * as HomeService from "../../services/HomeService";
import { setData,setLoading,setError } from "../../redux/slides/HomeSlide";
import { formatArea,buildMap,formatDate,formatacreage } from "../../utils";

const HomePage = () => {
    const [activeMenu, setActiveMenu] = useState("sell");
    const [communeMap, setCommuneMap] = useState({});
    const homeState = useSelector((state) => state.home);
    const { featured, latest, cheap, countnews,isLoading } = homeState;
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAreaData = async () => {
            try {
                
                const communes = await HomeService.getArea();
                setCommuneMap(buildMap(communes));
            } catch (error) {
                console.error("Error fetching area data: ", error);
            }
        };
        fetchAreaData();
    }, []);
    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                dispatch(setLoading(true));
                const res = await HomeService.getHome();    
                console.log("images: ",buildingone);
                if(res && res.data){
                    dispatch(setData(res.data));
                }
                else dispatch(setLoading(false));
            } catch (error) {
                console.error("Error fetching home data: ", error);
                dispatch(setError(error.message));
            }
        };
        fetchHomeData();
    }, []);
    const styleitemslider = {
        display: "flex",
        "justify-content": "center",
        "align-items": "center"
    }
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
            className={className}
            style={{ ...style, 
                    width: "35px",
                    height: "35px",
                    borderRadius: "20%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#02CBE0",
                    right: "20px",
                    zIndex: 1 }}
            onClick={onClick}
            >
                
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
            className={className}
            style={{ ...style,width: "35px",
                    height: "35px",
                    borderRadius: "20%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#02CBE0",
                     left: "20px", zIndex: 1 }}
            onClick={onClick}
            >
                
            </div>

        );
    }
   return (
        <div>
            <WrapperHeadofHomepage>
                <WrapperSlider>
                    <SliderEffectComponent 
                        setting={{
                            dots:true,
                            fade: true,
                            infinite: true,
                            speed: 500,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            waitForAnimate:false,
                            prevArrow:<SamplePrevArrow />,
                            nextArrow:<SampleNextArrow />,
                            
                        }}
                    >
                        <div style={{...styleitemslider}}>
                            <img src={buildingone} alt="slider-img" style={{ width: "100%", height: "30rem", objectFit: "fill" }} />
                        </div>
                        <div style={{...styleitemslider}}>
                            <img src={buildingtwo} alt="slider-img" style={{ width: "100%", height: "30rem", objectFit: "fill" }}/>
                        </div>
                        <div style={{...styleitemslider}}>
                            <img src={buildingthree} alt="slider-img" style={{ width: "100%", height: "30rem", objectFit: "fill" }}/>
                        </div>
                    </SliderEffectComponent>
                    <WrapperSearch>
                        <ul>
                            {['sell', 'rent'].map((type) => (
                            <MenuItem
                                    key={type}
                                    $active={activeMenu === type}
                                    onClick={() => setActiveMenu(type)}
                                >
                            {type === 'sell' ? 'Mua bán' : 'Cho thuê'}
                                </MenuItem>
                            ))}
                        </ul>
                        <div>
                            <SearchboxContent>
                                <SearchboxHeader>
                                    <SearchOutlined className="icon-search"/>
                                    <div className="input-searchbox">
                                        <input type="text" placeholder="Nhập nội dung tìm kiếm" />
                                        <CloseCircleOutlined className="closeItemoutlined" />
                                    </div>
                                    <div className="btn-searchbox">
                                        <ButtonComponent textButton={"Tìm kiếm"} className="btn-search"/>
                                    </div>
                                </SearchboxHeader>
                                <Searchboxdropdown>
                                    <WrapperSearchlist>
                                        <li>
                                            <MenuItemSearchleft>
                                                <SearchOutlined className="icon-searchitem"/>
                                            </MenuItemSearchleft>
                                            <MenuItemSearchright>
                                                <span>Mua</span>
                                                <span>bán</span>
                                                <span>nhà</span>
                                                <span>đất</span>
                                                <span>thành</span>
                                                <span>phố</span>
                                                <span>Hồ</span>
                                                <span>Chí</span>
                                                <span>Minh</span>
                                            </MenuItemSearchright>
                                        </li>
                                        <li>
                                            <MenuItemSearchleft>
                                                <SearchOutlined className="icon-searchitem"/>
                                            </MenuItemSearchleft>
                                            <MenuItemSearchright>
                                                <span>Mua</span>
                                                <span>bán</span>
                                                <span>nhà</span>
                                                <span>đất</span>
                                                <span>thành</span>
                                                <span>phố</span>
                                                <span>Hồ</span>
                                                <span>Chí</span>
                                                <span>Minh</span>
                                            </MenuItemSearchright>
                                        </li>
                                        <li>
                                            <MenuItemSearchleft>
                                                <SearchOutlined className="icon-searchitem"/>
                                            </MenuItemSearchleft>
                                            <MenuItemSearchright>
                                                <span>Mua</span>
                                                <span>bán</span>
                                                <span>nhà</span>
                                                <span>đất</span>
                                                <span>thành</span>
                                                <span>phố</span>
                                                <span>Hồ</span>
                                                <span>Chí</span>
                                                <span>Minh</span>
                                            </MenuItemSearchright>
                                        </li>
                                        <li>
                                            <MenuItemSearchleft>
                                                <SearchOutlined className="icon-searchitem"/>
                                            </MenuItemSearchleft>
                                            <MenuItemSearchright>
                                                <span>Mua</span>
                                                <span>bán</span>
                                                <span>nhà</span>
                                                <span>đất</span>
                                                <span>thành</span>
                                                <span>phố</span>
                                                <span>Hồ</span>
                                                <span>Chí</span>
                                                <span>Minh</span>
                                            </MenuItemSearchright>
                                        </li>
                                        <li>
                                            <MenuItemSearchleft>
                                                <SearchOutlined className="icon-searchitem"/>
                                            </MenuItemSearchleft>
                                            <MenuItemSearchright>
                                                <span>Mua</span>
                                                <span>bán</span>
                                                <span>nhà</span>
                                                <span>đất</span>
                                                <span>thành</span>
                                                <span>phố</span>
                                                <span>Hồ</span>
                                                <span>Chí</span>
                                                <span>Minh</span>
                                            </MenuItemSearchright>
                                        </li>
                                        <li>
                                            <MenuItemSearchleft>
                                                <SearchOutlined className="icon-searchitem"/>
                                            </MenuItemSearchleft>
                                            <MenuItemSearchright>
                                                <span>Mua</span>
                                                <span>bán</span>
                                                <span>nhà</span>
                                                <span>đất</span>
                                                <span>thành</span>
                                                <span>phố</span>
                                                <span>Hồ</span>
                                                <span>Chí</span>
                                                <span>Minh</span>
                                            </MenuItemSearchright>
                                        </li>
                                        <li>
                                            <MenuItemSearchleft>
                                                <SearchOutlined className="icon-searchitem"/>
                                            </MenuItemSearchleft>
                                            <MenuItemSearchright>
                                                <span>Mua</span>
                                                <span>bán</span>
                                                <span>nhà</span>
                                                <span>đất</span>
                                                <span>thành</span>
                                                <span>phố</span>
                                                <span>Hồ</span>
                                                <span>Chí</span>
                                                <span>Minh</span>
                                            </MenuItemSearchright>
                                        </li>
                                        <li>
                                            <MenuItemSearchleft>
                                                <SearchOutlined className="icon-searchitem"/>
                                            </MenuItemSearchleft>
                                            <MenuItemSearchright>
                                                <span>Mua</span>
                                                <span>bán</span>
                                                <span>nhà</span>
                                                <span>đất</span>
                                                <span>thành</span>
                                                <span>phố</span>
                                                <span>Hồ</span>
                                                <span>Chí</span>
                                                <span>Minh</span>
                                            </MenuItemSearchright>
                                        </li>
                                        <li>
                                            <MenuItemSearchleft>
                                                <SearchOutlined className="icon-searchitem"/>
                                            </MenuItemSearchleft>
                                            <MenuItemSearchright>
                                                <span>Mua</span>
                                                <span>bán</span>
                                                <span>nhà</span>
                                                <span>đất</span>
                                                <span>thành</span>
                                                <span>phố</span>
                                                <span>Hồ</span>
                                                <span>Chí</span>
                                                <span>Minh</span>
                                            </MenuItemSearchright>
                                        </li>
                                        <li>
                                            <MenuItemSearchleft>
                                                <SearchOutlined className="icon-searchitem"/>
                                            </MenuItemSearchleft>
                                            <MenuItemSearchright>
                                                <span>Mua</span>
                                                <span>bán</span>
                                                <span>nhà</span>
                                                <span>đất</span>
                                                <span>thành</span>
                                                <span>phố</span>
                                                <span>Hồ</span>
                                                <span>Chí</span>
                                                <span>Minh</span>
                                            </MenuItemSearchright>
                                        </li>
                                        <li>
                                            <MenuItemSearchleft>
                                                <SearchOutlined className="icon-searchitem"/>
                                            </MenuItemSearchleft>
                                            <MenuItemSearchright>
                                                <span>Mua</span>
                                                <span>bán</span>
                                                <span>nhà</span>
                                                <span>đất</span>
                                                <span>thành</span>
                                                <span>phố</span>
                                                <span>Hồ</span>
                                                <span>Chí</span>
                                                <span>Minh</span>
                                            </MenuItemSearchright>
                                        </li>
                                        <li>
                                            <MenuItemSearchleft>
                                                <SearchOutlined className="icon-searchitem"/>
                                            </MenuItemSearchleft>
                                            <MenuItemSearchright>
                                                <span>Mua</span>
                                                <span>bán</span>
                                                <span>nhà</span>
                                                <span>đất</span>
                                                <span>thành</span>
                                                <span>phố</span>
                                                <span>Hồ</span>
                                                <span>Chí</span>
                                                <span>Minh</span>
                                            </MenuItemSearchright>
                                        </li>
                                        <li>
                                            <MenuItemSearchleft>
                                                <SearchOutlined className="icon-searchitem"/>
                                            </MenuItemSearchleft>
                                            <MenuItemSearchright>
                                                <span>Mua</span>
                                                <span>bán</span>
                                                <span>nhà</span>
                                                <span>đất</span>
                                                <span>thành</span>
                                                <span>phố</span>
                                                <span>Hồ</span>
                                                <span>Chí</span>
                                                <span>Minh</span>
                                            </MenuItemSearchright>
                                        </li>
                                    </WrapperSearchlist>
                                </Searchboxdropdown>
                            </SearchboxContent>
                        </div>
                    </WrapperSearch>
                </WrapperSlider>
            </WrapperHeadofHomepage>
            <WrapperContentHomepage>
                {
                    featured && featured.length > 0 && (
                        <div>
                            <h2>Nổi bật</h2>
                            <WrapperLandslist className="slider-container">
                                 <SliderEffectComponent 
                                    setting={{
                                        dots: false,
                                        infinite: true,
                                        slidesToShow: 4,
                                        slidesToScroll: 1,
                                        arrows: true,
                                        centerMode: false,
                                        prevArrow:<SamplePrevArrow />,
                                        nextArrow:<SampleNextArrow />,
                                        responsive: [
                                            {
                                                breakpoint: 1024,
                                                settings: {
                                                slidesToShow: 3,
                                                slidesToScroll: 3,
                                                infinite: true,
                                                
                                                }
                                            },
                                            {
                                                breakpoint: 767,
                                                settings: {
                                                slidesToShow: 2,
                                                slidesToScroll: 2,
                                                initialSlide: 2
                                                }
                                            },
                                            {
                                                breakpoint: 766,
                                                settings: {
                                                slidesToShow: 1,
                                                slidesToScroll: 1
                                                }
                                            }
                                        ]
                                    }}
                                >
                                {
                                    isLoading
                                        ? <ListCardLoadingComponent />
                                        : featured.map((item, index) => (
                                            <div key={item.id}>
                                                <CardsmallComponent 
                                                loading={false}
                                                Title={item.Title}
                                                Price={item.Price}
                                                Area={formatArea(communeMap, item.Address.CityID, item.Address.CommuneID)}
                                                createdAt={formatDate(item.createdAt)}
                                                Img={
                                                    <img
                                                    src={item?.images?.URL || ImageBuilding}
                                                    alt={`imagebuilding${index}`}
                                                    className="image-land"
                                                    />
                                                }
                                                Acreage={formatacreage(item.horizontal, item.vertical)}
                                                className="card-small-component"
                                                />
                                            </div>
                                            ))
                                    }
                                </SliderEffectComponent>
                            </WrapperLandslist>
                        </div>
                    )
                }
                {
                    latest && latest.length > 0 && (
                        <div>
                            <h2>Mới nhất</h2>
                            <WrapperLandslist className="slider-container">
                                <SliderEffectComponent 
                                        setting={{
                                            dots: false,
                                            infinite: true,
                                            slidesToShow: 4,
                                            slidesToScroll: 1,
                                            arrows: true,
                                            centerMode: false,
                                            prevArrow:<SamplePrevArrow />,
                                            nextArrow:<SampleNextArrow />,
                                            responsive: [
                                                {
                                                    breakpoint: 1024,
                                                    settings: {
                                                    slidesToShow: 3,
                                                    slidesToScroll: 3,
                                                    infinite: true,
                                                    
                                                    }
                                                },
                                                {
                                                    breakpoint: 767,
                                                    settings: {
                                                    slidesToShow: 2,
                                                    slidesToScroll: 2,
                                                    initialSlide: 2
                                                    }
                                                },
                                                {
                                                    breakpoint: 766,
                                                    settings: {
                                                    slidesToShow: 1,
                                                    slidesToScroll: 1
                                                    }
                                                }
                                            ]
                                        }}
                                    >
                                    {
                                        isLoading
                                        ? <ListCardLoadingComponent />
                                        : latest.map((item, index) => (
                                            <div key={item.id}>
                                                <CardsmallComponent 
                                                loading={false}
                                                Title={item.Title}
                                                Price={item.Price}
                                                Area={formatArea(communeMap, item.Address.CityID, item.Address.CommuneID)}
                                                createdAt={formatDate(item.createdAt)}
                                                Img={
                                                    <img
                                                    src={item?.images?.URL || ImageBuilding}
                                                    alt={`imagebuilding${index}`}
                                                    className="image-land"
                                                    />
                                                }
                                                Acreage={formatacreage(item.horizontal, item.vertical)}
                                                className="card-small-component"
                                                />
                                            </div>
                                            ))
                                    }
                                </SliderEffectComponent>
                            </WrapperLandslist>
                        </div>
                    )
                }
                {
                    cheap && cheap.length > 0 && (
                        <div>
                            <h2>Đáng quan tâm</h2>
                            <WrapperLandslist className="slider-container">
                                <SliderEffectComponent 
                                        setting={{
                                            dots: false,
                                            infinite: true,
                                            slidesToShow: 4,
                                            slidesToScroll: 1,
                                            arrows: true,
                                            centerMode: false,
                                            prevArrow:<SamplePrevArrow />,
                                            nextArrow:<SampleNextArrow />,
                                            responsive: [
                                                {
                                                    breakpoint: 1024,
                                                    settings: {
                                                    slidesToShow: 3,
                                                    slidesToScroll: 3,
                                                    infinite: true,
                                                    
                                                    }
                                                },
                                                {
                                                    breakpoint: 767,
                                                    settings: {
                                                    slidesToShow: 2,
                                                    slidesToScroll: 2,
                                                    initialSlide: 2
                                                    }
                                                },
                                                {
                                                    breakpoint: 766,
                                                    settings: {
                                                    slidesToShow: 1,
                                                    slidesToScroll: 1
                                                    }
                                                }
                                            ]
                                        }}
                                    >
                                    {
                                        isLoading ? <ListCardLoadingComponent />:
                                        cheap.map((item,index) => (
                                                <div key={item.id}>
                                                    <CardsmallComponent 
                                                        Title={item.Title}
                                                        Price={item.Price}
                                                        Area={formatArea(communeMap, item.Address.CityID, item.Address.CommuneID)}
                                                        createdAt={formatDate(item.createdAt)}
                                                        Img={<img src={item?.images?.URL || ImageBuilding} 
                                                        alt={`imagebuilding${index}`} className="image-land"/>}
                                                        className="card-small-component"
                                                        Acreage={formatacreage(item.horizontal, item.vertical)}
                                                    />
                                                </div>
                                            
                                        
                                    ))
                                    }
                                </SliderEffectComponent>
                            </WrapperLandslist>
                        </div>
                    )
                }
                <div style={{marginTop:"4rem"}}>
                    <h2>Bất động sản theo địa điểm</h2>
                    <WrapperPlacespecial>
                            <CardPlaceComponent Img={<img src={Imagecity_HCM} 
                            alt="imagebuilding" style={{width:"100%",height:"100%"}}/>}
                            Title={countnews[0]?.name} number={countnews[0]?.count} gridArea = "place1"/>
                            <CardPlaceComponent Img={<img src={Imagecity_DNN} 
                            alt="imagebuilding" style={{width:"100%",height:"100%"}}/>}
                            Title={countnews[1]?.name} number={countnews[1]?.count} gridArea = "place2"/>
                            <CardPlaceComponent Img={<img src={Imagecity_danang} 
                            alt="imagebuilding" style={{width:"100%",height:"100%"}}/>}
                            Title={countnews[2]?.name} number={countnews[2]?.count} gridArea = "place3"/>
                            <CardPlaceComponent Img={<img src={Imagecity_hue} 
                            alt="imagebuilding" style={{width:"100%",height:"100%"}}/>}
                            Title={countnews[3]?.name} number={countnews[3]?.count} gridArea = "place4"/>
                            <CardPlaceComponent Img={<img src={Imagecity_hanoi} 
                            alt="imagebuilding" style={{width:"100%",height:"100%"}}/>}
                            Title={countnews[4]?.name} number={countnews[4]?.count} gridArea = "place5"/>
                    </WrapperPlacespecial>
                </div>
            </WrapperContentHomepage>
        </div>
   )
}
export default HomePage;