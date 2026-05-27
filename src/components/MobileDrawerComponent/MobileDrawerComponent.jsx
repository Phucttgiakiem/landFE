import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {MenuSidebar} from "../../constant/MenuOption";
import { CloseCircleFilled,UserOutlined,EuroOutlined,HomeOutlined,DownOutlined,LogoutOutlined } from "@ant-design/icons";
import {Mobiledrawer,Draweroverlay,Drawersection,DrawerTitle,DrawerList,DrawerItem,
    DrawerParent,DrawerSubmenu,DrawerArrow,DrawerClose,DrawerUser,DrawerAuth,DrawerNameuser,
    DrawerLogout
} from "./style"
const MobileDrawerComponent = ({open,onClose,user,menuData,loadingmenuData,logoutUser}) => {
    const location = useLocation();
    const [openlist,setOpenlist] = useState("");
    
    // role user
    const role = user?.role || "user";

    // filter sidebar theo role
    const sidebarMenus = MenuSidebar.filter(item =>
        item.roles.includes(role)
    );
    return (
        <>
            <Mobiledrawer className={open ? "active" : ""}>
                <DrawerClose>
                    <CloseCircleFilled 
                        onClick={onClose}
                    />
                </DrawerClose>
                <DrawerUser>

                    {
                        user?.email ? (
                            <DrawerNameuser>
                                <UserOutlined />

                                <span>
                                    {
                                        user?.name?.length
                                        ? user.name
                                        : user.email
                                    }
                                </span>
                            </DrawerNameuser>
                        ) : (
                            <DrawerAuth>
                                <Link to="/sign-in" className="btn-auth">
                                    Đăng nhập
                                </Link>
                                <Link to="/sign-up" className="btn-auth">
                                    Đăng ký
                                </Link>
                            </DrawerAuth>
                        )
                    }

                </DrawerUser>

                {/* WEBSITE NAVIGATION */}

                <Drawersection>

                    <DrawerTitle>
                        Trang chính
                    </DrawerTitle>

                    <DrawerList>
                        <DrawerItem>
                            <DrawerParent
                            >
                                <div
                                    onClick={() =>
                                        setOpenlist(prev =>
                                            prev === menuData[0]?._id
                                                ? ""
                                                : menuData[0]?._id
                                        )
                                    }
                                    className={`drawer-link ${
                                        location.pathname.includes(menuData[0]?.TypeSlug)
                                            ? "active"
                                            : ""
                                    }`}
                                    
                                >
                                    <EuroOutlined />
                                    <span>
                                        {menuData[0]?._id}
                                    </span>
                                    {
                                        menuData[0]?.items?.length > 0 && (
                                            <DrawerArrow
                                                className={
                                                    openlist === menuData[0]?._id
                                                        ? "rotate"
                                                        : ""
                                                }
                                            >
                                                <DownOutlined />
                                            </DrawerArrow>
                                        )
                                    }
                                </div>

                                

                            </DrawerParent>

                            {
                                openlist === menuData[0]?._id &&
                                menuData[0]?.items?.length > 0 && (
                                    <DrawerSubmenu>
                                        {
                                            menuData[0]?.items?.map((child,i) => (
                                                <li key={i}>
                                                    <Link
                                                        to={`/listing/${menuData[0]?.TypeSlug}/${child.NameSlug}`}
                                                        className={
                                                            location.pathname.endsWith(child.NameSlug)
                                                                ? "submenu-active"
                                                                : ""
                                                        }
                                                    >
                                                        {child.Name}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </DrawerSubmenu>
                                )
                            }

                        </DrawerItem>
                        <DrawerItem>
                            <DrawerParent
                            >
                                <div
                                    onClick={() =>
                                        setOpenlist(prev =>
                                            prev === menuData[1]?._id
                                                ? ""
                                                : menuData[1]?._id
                                        )
                                    }
                                    className={`drawer-link ${
                                        location.pathname.includes(menuData[1]?.TypeSlug)
                                            ? "active"
                                            : ""
                                    }`}
                                    
                                >
                                    <HomeOutlined />
                                    <span>
                                        {menuData[1]?._id}
                                    </span>
                                    {
                                        menuData[1]?.items?.length > 0 && (
                                            <DrawerArrow
                                                className={
                                                    openlist === menuData[1]?._id
                                                        ? "rotate"
                                                        : ""
                                                }
                                            >
                                                <DownOutlined />
                                            </DrawerArrow>
                                        )
                                    }
                                </div>

                                

                            </DrawerParent>

                            {
                                openlist === menuData[1]?._id &&
                                menuData[1]?.items?.length > 0 && (
                                    <DrawerSubmenu>
                                        {
                                            menuData[1]?.items?.map((child,i) => (
                                                <li key={i}>
                                                    <Link
                                                        to={`/listing/${menuData[1]?.TypeSlug}/${child.NameSlug}`}
                                                        className={
                                                            location.pathname.endsWith(child.NameSlug)
                                                                ? "submenu-active"
                                                                : ""
                                                        }
                                                    >
                                                        {child.Name}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </DrawerSubmenu>
                                )
                            }

                        </DrawerItem>
                    </DrawerList>

                </Drawersection>
                {/* DASHBOARD NAVIGATION */}

                {
                    user?.email && (
                        <Drawersection>

                            <DrawerTitle>
                                Quản lý
                            </DrawerTitle>

                            <DrawerList>

                                {
                                    sidebarMenus.map((item,index) => {

                                        return (
                                            <DrawerItem
                                                key={index}
                                                
                                            >

                                                <DrawerParent>

                                                    {
                                                        item.path ? (
                                                            <Link
                                                                to={item.path}
                                                                className={`drawer-link ${
                                                                    location.pathname === item.path
                                                                    ? "active"
                                                                    : ""
                                                                }`}
                                                                onClick={()=> {setOpenlist(item.label); onClose();}}
                                                            >

                                                                <span className="drawer-icon">
                                                                    {item.icon}
                                                                </span>

                                                                <span>
                                                                    {item.label}
                                                                </span>

                                                            </Link>
                                                        ) : (
                                                            <div className="drawer-link"
                                                                onClick={() => {
                                                                    if (openlist === item.label) {
                                                                        setOpenlist("");
                                                                    } else {
                                                                        setOpenlist(item.label);
                                                                    }
                                                                }}
                                                            >

                                                                <span className="drawer-icon">
                                                                    {item.icon}
                                                                </span>

                                                                <span>
                                                                    {item.label}
                                                                </span>
                                                                {
                                                                    item.children?.length > 0 && (
                                                                        <DrawerArrow
                                                                            className={`${
                                                                                openlist === item.label ? "rotate" : ""
                                                                            }`}
                                                                        >
                                                                            <DownOutlined />
                                                                        </DrawerArrow>
                                                                    )
                                                                }
                                                            </div>
                                                        )
                                                    }

                                                    

                                                </DrawerParent>

                                                {
                                                    openlist === item.label &&
                                                    item.children?.length > 0 && (
                                                        <DrawerSubmenu>

                                                            {
                                                                item.children
                                                                    .filter(child =>
                                                                        child.roles.includes(role)
                                                                    )
                                                                    .map((child,i) => (
                                                                        <li key={i}>
                                                                            <Link
                                                                                to={child.path}
                                                                                onClick={ () => {
                                                                                    setOpenlist("");
                                                                                    onClose();
                                                                                }}
                                                                                className={
                                                                                    location.pathname.endsWith(child.path)
                                                                                        ? "submenu-active"
                                                                                        : ""
                                                                                }
                                                                            >
                                                                                {child.label}
                                                                            </Link>

                                                                        </li>
                                                                    ))
                                                            }

                                                        </DrawerSubmenu>
                                                    )
                                                }

                                            </DrawerItem>
                                        )
                                    })
                                }

                            </DrawerList>
                            <DrawerLogout
                                onClick={logoutUser}
                            >

                                <LogoutOutlined />
                                <span>
                                    Đăng xuất
                                </span>
                            </DrawerLogout>
                        </Drawersection>
                    )

                }
            </Mobiledrawer>
            {/* OVERLAY */}
            <Draweroverlay
                className={open ? "active" : ""}
                onClick={onClose}
            >
            </Draweroverlay>
        </>
    )
}
export default MobileDrawerComponent;