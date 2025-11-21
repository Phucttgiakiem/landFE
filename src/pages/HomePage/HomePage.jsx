import {WrapperHeadofHomepage,WrapperSlider,WrapperSearch,
    Arrow,MenuItem,SearchboxContent,SearchboxHeader,Searchboxdropdown,
    WrapperSearchlist,MenuItemSearchleft,MenuItemSearchright,
    WrapperContentHomepage,WrapperLandslist,WrapperPlacespecial} from "./style";
import { CloseCircleOutlined, LeftOutlined,RightOutlined, SearchOutlined } from "@ant-design/icons";
import buildingone from "../../assets/images/Buldingone.jpg"
import buildingtwo from "../../assets/images/buildingtwo.jpg"
import buildingthree from "../../assets/images/buildingthree.jpg"
import ImageBuilding from "../../assets/images/20250904001841_bdbe_wm.jpg"
import { useState } from "react";
import Slider from "react-slick";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import CardsmallComponent from "../../components/CardsmallComponent/CardsmallComponent";
import CardPlaceComponent from "../../components/CardPlaceComponent/CardPlaceComponent";
const HomePage = () => {
    const [activeMenu, setActiveMenu] = useState("sell");
    const styleitemslider = {
        display: "flex",
        "justify-content": "center",
        "align-items": "center"
    }
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        prevArrow:<Arrow className="slick-prev"><LeftOutlined style={{display:"block",margin:"auto",lineHeight:"30px"}}/></Arrow>,
        nextArrow:<Arrow className="slick-next"><RightOutlined style={{display:"block",margin:"auto",lineHeight:"30px"}} /></Arrow>,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
    };
   return (
        <div>
            <WrapperHeadofHomepage>
                <WrapperSlider>
                    <Slider {
                        ...settings
                        }>
                        <div style={{...styleitemslider}}>
                            <img src={buildingone} alt="slider-img" style={{ width: "100%", height: "30rem", objectFit: "fill" }} />
                        </div>
                        <div style={{...styleitemslider}}>
                            <img src={buildingtwo} alt="slider-img" style={{ width: "100%", height: "30rem", objectFit: "fill" }}/>
                        </div>
                        <div style={{...styleitemslider}}>
                            <img src={buildingthree} alt="slider-img" style={{ width: "100%", height: "30rem", objectFit: "fill" }}/>
                        </div>
                    </Slider>
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
                <div>
                    <h2>Bất động sản dành cho bạn</h2>
                    <WrapperLandslist>
                        <CardsmallComponent 
                            Title="Nhà trọ cho thuê hẻm 127" 
                            Img={<img src={ImageBuilding} 
                            alt="imagebuilding" className="image-land"/>}
                            bodyStyle={{padding:"12px 16px 16px 16px"}}
                            />
                        <CardsmallComponent 
                            Title="Nhà trọ cho thuê hẻm 127" 
                            Img={<img src={ImageBuilding} 
                            alt="imagebuilding" className="image-land"/>}
                            bodyStyle={{padding:"12px 16px 16px 16px"}}
                            />
                        <CardsmallComponent 
                            Title="Nhà trọ cho thuê hẻm 127" 
                            Img={<img src={ImageBuilding} 
                            alt="imagebuilding" className="image-land"/>}
                            bodyStyle={{padding:"12px 16px 16px 16px"}}
                            />
                        <CardsmallComponent 
                            Title="Nhà trọ cho thuê hẻm 127" 
                            Img={<img src={ImageBuilding} 
                            alt="imagebuilding" className="image-land"/>}
                            bodyStyle={{padding:"12px 16px 16px 16px"}}
                            />
                        <CardsmallComponent 
                            Title="Nhà trọ cho thuê hẻm 127" 
                            Img={<img src={ImageBuilding} 
                            alt="imagebuilding" className="image-land"/>}
                            bodyStyle={{padding:"12px 16px 16px 16px"}}
                            />
                        <CardsmallComponent 
                            Title="Nhà trọ cho thuê hẻm 127" 
                            Img={<img src={ImageBuilding} 
                            alt="imagebuilding" className="image-land"/>}
                            bodyStyle={{padding:"12px 16px 16px 16px"}}
                            />  
                    </WrapperLandslist>
                </div>
                <div style={{marginTop:"4rem"}}>
                    <h2>Bất động sản theo địa điểm</h2>
                    <WrapperPlacespecial>
                            <CardPlaceComponent Img={<img src={buildingone} 
                            alt="imagebuilding" style={{width:"100%",height:"100%"}}/>}
                            Title="TP. Hồ Chí Minh" number={1200} gridArea = "place1"/>
                            <CardPlaceComponent Img={<img src={buildingone} 
                            alt="imagebuilding" style={{width:"100%",height:"100%"}}/>}
                            Title="TP. Hồ Chí Minh" number={1200} gridArea="place2"/>
                            <CardPlaceComponent Img={<img src={buildingone} 
                            alt="imagebuilding" style={{width:"100%",height:"100%"}}/>}
                            Title="TP. Hồ Chí Minh" number={1200} gridArea="place3"/>
                            <CardPlaceComponent Img={<img src={buildingone} 
                            alt="imagebuilding" style={{width:"100%",height:"100%"}}/>}
                            Title="TP. Hồ Chí Minh" number={1200} gridArea="place4"/>
                            <CardPlaceComponent Img={<img src={buildingone} 
                            alt="imagebuilding" style={{width:"100%",height:"100%"}}/>}
                            Title="TP. Hồ Chí Minh" number={1200} gridArea="place5"/>
                        
                    </WrapperPlacespecial>
                </div>
            </WrapperContentHomepage>
        </div>
   )
}
export default HomePage;