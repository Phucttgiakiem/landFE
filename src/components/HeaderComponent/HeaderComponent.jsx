
import { useState,useMemo} from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "antd";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
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
    const [activeMenu, setActiveMenu] = useState("sell");
    const [openIndex, setOpenIndex] = useState(null);
    const [itemActive, setItemActive] = useState(null);
    const [openMenuMobile, setOpenMenuMobile] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
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
        dispatch(resetUser());
    }
    const content = () => (
        <div>
            <WrapperPopupitem onClick={() => navigate('/profile-user')}>Thông tin cá nhân</WrapperPopupitem>
            <WrapperPopupitem onClick={()=> handleLogout()}>Đăng xuất</WrapperPopupitem>
        </div>
    )
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
                            <HeaderMenuItem
                                $active={activeMenu === "sell"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveMenu("sell");
                                    }}
                            >
                                <HeaderLink
                                    href="/"
                                    >Nhà đất bán
                                </HeaderLink>
                                <WrapperHeaderSubMenu>
                                    <HeaderMenuItemsubMenu><HeaderLinkSubMenu href="/">Bán căn hộ chung cư</HeaderLinkSubMenu></HeaderMenuItemsubMenu>
                                    <HeaderMenuItemsubMenu><HeaderLinkSubMenu href="/">Bán nhà riêng</HeaderLinkSubMenu></HeaderMenuItemsubMenu>
                                    <HeaderMenuItemsubMenu><HeaderLinkSubMenu href="/">Bán nhà mặt phố</HeaderLinkSubMenu></HeaderMenuItemsubMenu>
                                    <HeaderMenuItemsubMenu><HeaderLinkSubMenu href="/">Bán Đất nền dự án</HeaderLinkSubMenu></HeaderMenuItemsubMenu>
                                    <HeaderMenuItemsubMenu><HeaderLinkSubMenu href="/">Đất thổ cư</HeaderLinkSubMenu></HeaderMenuItemsubMenu>
                                    <HeaderMenuItemsubMenu><HeaderLinkSubMenu href="/">Trang trại, khu nghỉ dưỡng</HeaderLinkSubMenu></HeaderMenuItemsubMenu>
                                    <HeaderMenuItemsubMenu><HeaderLinkSubMenu href="/">Nhà trọ, phòng trọ</HeaderLinkSubMenu></HeaderMenuItemsubMenu>
                                </WrapperHeaderSubMenu> 
                            </HeaderMenuItem>
                            <HeaderMenuItem
                                $active={activeMenu === "rent"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveMenu("rent")}}
                            >
                                <HeaderLink
                                    href="/"
                                    >
                                    Nhà đất cho thuê
                                </HeaderLink>
                                <WrapperHeaderSubMenu>
                                    <HeaderMenuItemsubMenu><HeaderLinkSubMenu href="/">Cho thuê căn hộ chung cư</HeaderLinkSubMenu></HeaderMenuItemsubMenu>
                                    <HeaderMenuItemsubMenu><HeaderLinkSubMenu href="/">Cho thuê chung cư mini, căn hộ dịch vụ</HeaderLinkSubMenu></HeaderMenuItemsubMenu>
                                    <HeaderMenuItemsubMenu><HeaderLinkSubMenu href="/">Cho thuê nhà biệt thự liền kề</HeaderLinkSubMenu></HeaderMenuItemsubMenu>
                                    <HeaderMenuItemsubMenu><HeaderLinkSubMenu href="/">Cho thuê nhà mặt phố</HeaderLinkSubMenu></HeaderMenuItemsubMenu>
                                    <HeaderMenuItemsubMenu><HeaderLinkSubMenu href="/">Cho thuê nhà trọ, phòng trọ</HeaderLinkSubMenu></HeaderMenuItemsubMenu>
                                </WrapperHeaderSubMenu> 
                            </HeaderMenuItem>
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