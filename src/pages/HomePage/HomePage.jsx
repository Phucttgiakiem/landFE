import { useSelector,useDispatch } from "react-redux";
import { useState,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {WrapperHeadofHomepage,WrapperSlider,WrapperSearch,
    MenuItem,SearchboxContent,SearchboxHeader,Searchboxdropdown,SearchItem,SearchIconWrapper,SearchContent,EmptySearch,
    WrapperContentHomepage,WrapperPlacespecial} from "./style";
import { CloseCircleOutlined,SearchOutlined } from "@ant-design/icons";
import buildingone from "../../assets/images/Buldingone.jpg"
import buildingtwo from "../../assets/images/buildingtwo.jpg"
import buildingthree from "../../assets/images/buildingthree.jpg"
import Imagecity_HCM from "../../assets/images/saigon_city.png"
import Imagecity_DNN from "../../assets/images/dongnai.jpg"
import Imagecity_hue from "../../assets/images/hue_city.png"
import Imagecity_danang from "../../assets/images/danang_city.webp"
import Imagecity_hanoi from "../../assets/images/hanoi_city.jpg"
import Vipicon from "../../assets/images/vip.png";
import Newicon from "../../assets/images/new.png"
import Noimage from "../../assets/images/not_image.jpg"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import CardsmallComponent from "../../components/CardsmallComponent/CardsmallComponent";
import CardPlaceComponent from "../../components/CardPlaceComponent/CardPlaceComponent";
import * as HomeService from "../../services/HomeService";
import { setData,setLoading,setError } from "../../redux/slides/HomeSlide";
import {getSuggestionsSearch} from "../../services/ListingService";
import {formatDate,formatacreage,isNew,formatPriceToString} from "../../utils";
import {EmblaCarousel} from "../../components/EmblaCarousel/EmblaCarousel";
const HomePage = () => {
    const [activeMenu, setActiveMenu] = useState("Sale");
    const [suggestions,setSuggestions] = useState([]);
    const [keyword,setKeyword] = useState("");
    const wrapperRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loadingSearch,setLoadingSearch] = useState(false);
    const homeState = useSelector((state) => state.home);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const { featured, latest, cheap, countnews, entities,loading } = homeState;
    const dispatch = useDispatch();
    const getList = (ids, entities) => {
            return ids.map(id => entities[id]).filter(Boolean)
        }

    const featuredls = getList(featured, entities)
    const latestls = getList(latest, entities)
    const cheapls = getList(cheap, entities)
    const handleSearch = () => {
        if(!keyword.trim()) return;
        const typecata = activeMenu+"-property";
        navigate(`/listing/${typecata}?keyword=${keyword.trim()}`);
    };
    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                dispatch(setLoading({
                    featured: true,
                    latest: true,
                    cheap: true,
                    countnews: true
                }));
                const res = await HomeService.getHome(user?.access_Token);    
                
                if(res && res.data){
                    dispatch(setData(res.data));
                }
                dispatch(setLoading({
                    featured: false,
                    latest: false,
                    cheap: false,
                    countnews: false
                }));
            } catch (error) {
                console.error("Error fetching home data: ", error);
                dispatch(setError(error.message));
            }
        };
        fetchHomeData();
    }, [dispatch,user?.access_Token]);
    useEffect(() => {

        if(!keyword.trim()) {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(async() => {

            try {

                setLoadingSearch(true);

                const res = await getSuggestionsSearch({
                    limit: 8,
                    keyword:keyword,
                    typeproperty: activeMenu
                });
                setSuggestions(res.result);

            } catch(error) {

                console.log(error);

            } finally {

                setLoadingSearch(false);

            }

        },400);

        return () => clearTimeout(timer);

    },[keyword]);
    
   return (
        <>
            <WrapperHeadofHomepage>
                <WrapperSlider>
                    <EmblaCarousel options={{ loop: true }} slidesToShow={1} showDots={true} >
                        <div className="embla__slide">
                            <img src={buildingone} alt="slider-1" style={{ width: "100%", height: "30rem", objectFit: "fill", display: "block" }} />
                        </div>
                        <div className="embla__slide">
                            <img src={buildingtwo} alt="slider-2" style={{ width: "100%", height: "30rem", objectFit: "fill", display: "block" }} />
                        </div>
                        <div className="embla__slide">
                            <img src={buildingthree} alt="slider-3" style={{ width: "100%", height: "30rem", objectFit: "fill", display: "block" }} />
                        </div>
                    </EmblaCarousel>
                            
                        
                    <WrapperSearch >
                        <ul>
                            {['Sale', 'Rental'].map((type) => (
                            <MenuItem
                                    key={type}
                                    $active={activeMenu === type}
                                    onClick={() => setActiveMenu(type)}
                                >
                                {type === 'Sale' ? 'Sale' : 'Rental'}
                                </MenuItem>
                            ))}
                        </ul>
                        <div>
                            <SearchboxContent ref={wrapperRef}>
                                <SearchboxHeader>
                                    <SearchOutlined className="icon-search"/>
                                    <div className="input-searchbox">
                                        <input type="text" placeholder="Enter search content" value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                            onFocus={() => setIsOpen(true)}
                                        />
                                       {keyword && <CloseCircleOutlined className="closeItemoutlined" onClick={()=> setKeyword("")}/>} 
                                    </div>
                                    <div className="btn-searchbox">
                                        <ButtonComponent textButton={"Find"} className="btn-search" onClick={() => handleSearch()}/>
                                    </div>
                                </SearchboxHeader>
                                {
                                isOpen &&
                                <Searchboxdropdown>
                                    {
                                        !keyword ? <EmptySearch>Enter search content</EmptySearch> :
                                        suggestions.length > 0 ?

                                        suggestions.map(item => (

                                            <SearchItem key={item._id} onClick={() => navigate(`/lands-detail/${item._id}`)}>

                                                <SearchIconWrapper>
                                                    <SearchOutlined className="icon-searchitem"/>
                                                </SearchIconWrapper>

                                                <SearchContent>
                                                    {item.Title}
                                                </SearchContent>

                                            </SearchItem>

                                        ))

                                        :

                                        <EmptySearch>
                                            No information found
                                        </EmptySearch>
                                    }

                                </Searchboxdropdown>
                                }
                            </SearchboxContent>
                        </div>
                    </WrapperSearch>
                </WrapperSlider> 
            </WrapperHeadofHomepage>
            <WrapperContentHomepage>
                {
                    featuredls && featuredls.length > 0 && (
                        <>
                            <h2>Featured</h2>
                            <>
                                {
                                    featuredls && featuredls.length > 0 ? 
                                    <EmblaCarousel 
                                        
                                        slideSpacing="20px"
                                        hiddenArrow={featuredls.length > 4}
                                    >
                                    {
                                        loading?.featured
                                            ? (
                                                Array(5).fill(null).map((_, index) => (
                                                    <div key={index}>
                                                        <CardsmallComponent loading={true} />
                                                    </div>
                                                    ))
                                            )
                                            : featuredls.map((item, index) => (
                                                    <CardsmallComponent 
                                                        Id={item._id}
                                                        loading={false}
                                                        Title={item.Title}
                                                        Price={formatPriceToString(item.Price)}
                                                        Area={item.Address.Commune.name+" / "+item.Address.City.name}
                                                        createdAt={formatDate(item.createdAt)}
                                                        Img={
                                                            <div
                                                                style={{position:"relative",
                                                                overflow: "hidden"}}
                                                            >   
                                                                {
                                                                    item?.type === "vip" ?  
                                                                        <img src={Vipicon} alt="vip-icon" 
                                                                            style={{
                                                                                position: "absolute",
                                                                                top: "10px",
                                                                                left: "10px",
                                                                                width:"35px",
                                                                                height: "35px",
                                                                                zIndex: 2,
                                                                            }}/> : isNew(item.createdAt) && 
                                                                        <img src={Newicon} alt="vip-icon" 
                                                                            style={{
                                                                                position: "absolute",
                                                                                top: "10px",
                                                                                left: "10px",
                                                                                width:"35px",
                                                                                height: "35px",
                                                                                zIndex: 2,
                                                                            }}/>
                                                                }
                                                                <img
                                                                    src={item?.images?.URL || Noimage}
                                                                    alt={`imagebuilding${index}`}
                                                                />
                                                            </div>
                                                            
                                                        }
                                                        Acreage={formatacreage(item.horizontal, item.vertical)}
                                                        className="card-small-component"
                                                    />
                                                ))
                                        }
                                    </EmblaCarousel> :
                                    <span>No information found</span>
                                }
                            </>
                        </>
                    )
                }
                 {
                    latestls && latestls.length > 0 && (
                        <>
                            <h2>Latest</h2>
                            <EmblaCarousel 
                                slideSpacing="20px"
                                hiddenArrow={latestls.length > 4}
                            >
                                        {
                                        loading.latest
                                        ? (
                                             Array(5).fill(null).map((_, index) => (
                                                <div key={index}>
                                                    <CardsmallComponent loading={true} />
                                                </div>
                                                ))
                                        )
                                        : latestls.map((item, index) => (
                                            <div key={item._id}>
                                                <CardsmallComponent 
                                                Id={item._id}
                                                loading={false}
                                                Title={item.Title}
                                                Price={formatPriceToString(item.Price)}
                                                Area={item.Address.Commune.name+" / "+item.Address.City.name}
                                                createdAt={formatDate(item.createdAt)}
                                                Img={
                                                    <div
                                                            style={{position:"relative",
                                                            overflow: "hidden"}}
                                                        >   
                                                            {
                                                                item?.type === "vip" ?  
                                                                    <img src={Vipicon} alt="vip-icon" 
                                                                        style={{
                                                                            position: "absolute",
                                                                            top: "10px",
                                                                            left: "10px",
                                                                            width:"35px",
                                                                            height: "35px",
                                                                            zIndex: 2,
                                                                        }}/> : isNew(item.createdAt) && 
                                                                    <img src={Newicon} alt="vip-icon" 
                                                                        style={{
                                                                            position: "absolute",
                                                                            top: "10px",
                                                                            left: "10px",
                                                                            width:"35px",
                                                                            height: "35px",
                                                                            zIndex: 2,
                                                                        }}/>
                                                            }
                                                            <img
                                                                src={item?.images?.URL || Noimage}
                                                                alt={`imagebuilding${index}`}
                                                                className={"image-land"}
                                                            />
                                                        </div>
                                                }
                                                Acreage={formatacreage(item.horizontal, item.vertical)}
                                                className="card-small-component"
                                                />
                                            </div>
                                            ))
                                    }
                        
                    
                

                            </EmblaCarousel>
                        </>
                    )
                }            
                {
                    cheapls && cheapls.length > 0 && (
                        <div>
                            <h2>Cheap</h2>
                            <EmblaCarousel 
                                slideSpacing="20px"
                                hiddenArrow={cheapls.length > 4}
                            >
                                {
                                        loading.cheap ? (
                                             Array(5).fill(null).map((_, index) => (
                                                <div key={index}>
                                                    <CardsmallComponent loading={true} />
                                                </div>
                                                ))
                                        ):
                                        cheapls.map((item,index) => (
                                            <div key={item._id}>
                                                <CardsmallComponent 
                                                    Id={item._id}
                                                    Title={item.Title}
                                                    Price={formatPriceToString(item.Price)}
                                                    Area={item.Address.Commune.name+" / "+item.Address.City.name}
                                                    createdAt={formatDate(item.createdAt)}
                                                    Img={
                                                    <div
                                                            style={{position:"relative",
                                                            overflow: "hidden"}}
                                                        >   
                                                            {
                                                                item?.type === "vip" ?  
                                                                    <img src={Vipicon} alt="vip-icon" 
                                                                        style={{
                                                                            position: "absolute",
                                                                            top: "10px",
                                                                            left: "10px",
                                                                            width:"35px",
                                                                            height: "35px",
                                                                            zIndex: 2,
                                                                        }}/> : isNew(item.createdAt) && 
                                                                    <img src={Newicon} alt="vip-icon" 
                                                                        style={{
                                                                            position: "absolute",
                                                                            top: "10px",
                                                                            left: "10px",
                                                                            width:"35px",
                                                                            height: "35px",
                                                                            zIndex: 2,
                                                                        }}/>
                                                            }
                                                            <img
                                                                src={item?.images?.URL || Noimage}
                                                                alt={`imagebuilding${index}`}
                                                                className={"image-land"}
                                                            />
                                                        </div>}
                                                    className="card-small-component"
                                                    Acreage={formatacreage(item.horizontal, item.vertical)}
                                                />
                                            </div>
                                    ))
                                    }
                            </EmblaCarousel>
                        </div>
                    )
                } 
                <div style={{marginTop:"4rem"}}>
                    <h2>Properties by Location</h2>
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
        </>
   )
}
export default HomePage;