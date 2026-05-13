import { useState,useMemo,useEffect} from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {Spin} from 'antd';
import { WrapperHeader, WrapperLogoHeader,WrapperHeaderMenu,WrapperHeaderSubMenu,
    HeaderMenuItem,HeaderLink,HeaderLinkSubMenu,HeaderMenuItemsubMenu,
    WrapperHeaderAccount,WrapperMenuMobile,WrapperAction,Backgroundfaded,
    WrapperControl,MenuLeft,WrapperMainMenuLeft,DropdownMenu,
    MenuHeader,MenuHeaderLink,SubMenuDropdown,SubMenuLink,CloseMenuMobile,
    WrapperUserInfo,WrapperPopupitem
} from "./style";
import { CloseCircleOutlined, DownOutlined, EuroOutlined, HomeOutlined, MenuOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logo.png';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { Popover } from "antd";
import * as UserService from "../../services/UserService";
import * as CategoriesService from "../../services/CategoriesService";
import { resetUser } from "../../redux/slides/userSlide";
import {setCategories,setLoading} from "../../redux/slides/CategorySlide";
import { useFilters } from "../../hooks/useFiltershook";
const menuData = [
  {
    title: "Nhà đất bán",
    link: "/nha-dat-ban",
    children: [
      { title: "Bán căn hộ chung cư", link: "/ban-can-ho" },
      { title: "Bán nhà riêng", link: "/ban-nha-rieng" },
      { title: "Bán condotel", link: "/ban-condotel" },
      // thêm các mục khác...
    ],
  },
  {
    title: "Nhà đất cho thuê",
    link: "/nha-dat-cho-thue",
    children: [],
  },
];

export default function HeaderComponent () {
    const [openIndex, setOpenIndex] = useState(null);
    const [itemActive, setItemActive] = useState(null);
    const [openMenuMobile, setOpenMenuMobile] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const {CategoriItems,isLoading} = useSelector(state => state.Category);
    const location = useLocation();
    const navigate = useNavigate();
    const [arrow, setArrow] = useState('Show');
    const mergedArrow = useMemo(() => {
        if (arrow === 'Hide') {
        return false;
        }
        if (arrow === 'Show') {
        return true;
        }
        return {
        pointAtCenter: true,
        };
    }, [arrow]);
    const toggleMenu = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    const handleNavigationLogin = () => {
        navigate('/sign-in')
    }
    const handleMovetoHome = () => {
        navigate('/');
    }
    const handleLogout = async() => {
        await UserService.logoutUser();
        localStorage.removeItem("access_token");
        dispatch(resetUser());
        navigate("/");
    }
    const content = () => (
        <div>
            <WrapperPopupitem onClick={() => navigate('/Dashboard')}>Thông tin cá nhân</WrapperPopupitem>
            <WrapperPopupitem onClick={()=> handleLogout()}>Đăng xuất</WrapperPopupitem>
        </div>
    )
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setLoading(true));
                const {data} = await CategoriesService.getCategory();
                dispatch(setCategories({...data}))
                dispatch(setLoading(false));
            }catch(e){
                dispatch(setLoading(false));
                console.log(e);
            }
        }
        fetchData();
    },[dispatch])
    return (
        <>
            <WrapperHeader>
                    <WrapperLogoHeader onClick={handleMovetoHome}>
                        <img src={logo} alt="logo" className="Image-logo"/>
                    </WrapperLogoHeader>
                    <WrapperMenuMobile>
                        <MenuOutlined onClick={() => setOpenMenuMobile(true)}/>
                    </WrapperMenuMobile>
                    <WrapperAction>
                        <WrapperHeaderMenu>
                            {
                                isLoading ? <Spin /> : (
                                    <>
                                            {
                                                CategoriItems[0] 
                                                    && 
                                                    <HeaderMenuItem
                                                        $active={location.pathname.includes("Nha-dat-cho-thue")}
                                                    >
                                                        <HeaderLink
                                                            href={`/listing/${CategoriItems[0].TypeSlug}`}
                                                            >{CategoriItems[0]._id}
                                                        </HeaderLink>
                                                        <WrapperHeaderSubMenu>
                                                            {
                                                                CategoriItems[0].items.map((vl,index)=>(
                                                                <HeaderMenuItemsubMenu key={index}>
                                                                        <HeaderLinkSubMenu href={`/listing/${CategoriItems[0].TypeSlug}/${vl.NameSlug}`}>{vl.Name}</HeaderLinkSubMenu>
                                                                </HeaderMenuItemsubMenu> 
                                                                ))
                                                            }
                                                        </WrapperHeaderSubMenu>
                                                    </HeaderMenuItem>
                                            }
                                            {
                                                CategoriItems[1] 
                                                    && 
                                                    <HeaderMenuItem
                                                        $active={location.pathname.includes("Nha-dat-ban")}
                                                    >
                                                        <HeaderLink
                                                            href={`/listing/${CategoriItems[1].TypeSlug}`}
                                                            >{CategoriItems[1]._id}
                                                        </HeaderLink>
                                                        <WrapperHeaderSubMenu>
                                                            {
                                                                CategoriItems[1].items.map((vl,index)=>(
                                                                <HeaderMenuItemsubMenu key={index}>
                                                                        <HeaderLinkSubMenu  href={`/listing/${CategoriItems[1].TypeSlug}/${vl.NameSlug}`}>{vl.Name}</HeaderLinkSubMenu>
                                                                </HeaderMenuItemsubMenu> 
                                                                ))
                                                            }
                                                        </WrapperHeaderSubMenu>
                                                    </HeaderMenuItem>
                                            }
                                    </>
                                )
                            }
                            
                        </WrapperHeaderMenu>
                        {
                            user?.email ? (
                                <Popover placement="bottomRight"content={content} arrow={mergedArrow} color="#02CBE0" 
                                    styles={{
                                        body: {
                                            padding: "0",
                                            overflow: "hidden",
                                    }}}>
                                    <WrapperUserInfo>
                                        <span>
                                            <UserOutlined />
                                        </span>
                                        <span>
                                            {user?.name.length ? user?.name : user?.email}
                                        </span>
                                    </WrapperUserInfo>
                                </Popover>
                                
                            ):(
                                <WrapperHeaderAccount onClick={handleNavigationLogin}>
                                    <HeaderLink>Đăng nhập</HeaderLink>
                                    <HeaderLink>Đăng ký</HeaderLink>
                                </WrapperHeaderAccount>
                            )
                        }
                    </WrapperAction>
                    {/* session will show on device when the device has viewport true*/}
                    {
                        <>
                            <MenuLeft open={openMenuMobile}>
                                <CloseMenuMobile>
                                    <CloseCircleOutlined onClick={() => { setOpenMenuMobile(false); setOpenIndex(null) }} />
                                </CloseMenuMobile>
                                <WrapperControl>
                                    <ButtonComponent textButton="Đăng nhập" styleButton={{fontWeight: "bold"}} className="btn-control"/>
                                    <ButtonComponent textButton="Đăng ký" styleButton={{background:"red", color:"#fff", 
                                        border:"none",outline:"none",fontWeight: "bold"}}  className="btn-control"  />
                                </WrapperControl>
                                <WrapperMainMenuLeft>
                                    <DropdownMenu>
                                        {
                                            menuData.map((item,index) =>(
                                                <li key={index} isOpen={openIndex === index} >
                                                    <MenuHeader>
                                                        <MenuHeaderLink href={item.link} 
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setItemActive(item.link);}} active={itemActive === item.link ? "is-active" : "out-active"}>
                                                            {
                                                                item.title === "Nhà đất bán" ? 
                                                                <EuroOutlined className="icon-sellland"/> : 
                                                                <HomeOutlined className="icon-sellland"/>
                                                            }
                                                            {item.title}
                                                        </MenuHeaderLink>
                                                        {item.children.length > 0 && (
                                                            <span className="icon-dropdown" arrowclick={openIndex === index ? "true" : "false"}  onClick={() => toggleMenu(index)}>
                                                                <DownOutlined className="dropdown-icon" />
                                                            </span>
                                                        )}
                                                    </MenuHeader>
                                                    {
                                                        openIndex === index && item.children.length > 0 && (
                                                            <SubMenuDropdown>
                                                                {
                                                                    item.children.map((child,i) =>(
                                                                        <li 
                                                                            key={i}
                                                                        >
                                                                            <SubMenuLink 
                                                                                to={child.link} 
                                                                                onClick={(e) => {e.preventDefault(); 
                                                                                    setItemActive(child.link)}} 
                                                                                active={itemActive === child.link}>{child.title}</SubMenuLink>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </SubMenuDropdown>
                                                        )
                                                    }
                                                </li>
                                            ))
                                        }
                                        <li>
                                            <SearchOutlined className="icon-search" />
                                            Tìm kiếm
                                        </li>
                                    </DropdownMenu>
                                </WrapperMainMenuLeft>
                            </MenuLeft>
                            <Backgroundfaded onClick={() => { setOpenMenuMobile(false); setOpenIndex(null) }} open={openMenuMobile}/>
                        </>
                    }
            </WrapperHeader>
        </>
    )
}