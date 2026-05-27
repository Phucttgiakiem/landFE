import { useState,useMemo,useEffect} from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {Spin} from 'antd';
import { WrapperHeader, WrapperLogoHeader,WrapperHeaderMenu,WrapperHeaderSubMenu,
    HeaderMenuItem,HeaderLink,HeaderLinkSubMenu,HeaderMenuItemsubMenu,
    WrapperHeaderAccount,WrapperMenuMobile,WrapperAction,
    WrapperUserInfo,WrapperPopupitem
} from "./style";
import {MenuOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logo.png';
import { Popover } from "antd";
import * as UserService from "../../services/UserService";
import * as CategoriesService from "../../services/CategoriesService";
import { resetUser } from "../../redux/slides/userSlide";
import {setCategories,setLoading} from "../../redux/slides/CategorySlide";
import MobileDrawerComponent from "../../components/MobileDrawerComponent/MobileDrawerComponent";

export default function HeaderComponent () {
    const [openIndex, setOpenIndex] = useState(null);
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
                    <MobileDrawerComponent
                        open={openMenuMobile}
                        onClose={() => setOpenMenuMobile(false)}
                        user={user}
                        menuData={CategoriItems}
                        loadingmenuData={isLoading}
                        logoutUser={handleLogout}
                    />
            </WrapperHeader>
        </>
    )
}