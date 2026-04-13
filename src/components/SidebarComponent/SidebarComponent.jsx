import { WrapperSidebar, UserSection,Listfunction,SubMenufunction } from './style';
import { PieChartOutlined,MenuOutlined,SettingOutlined,DownOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const MenuUser = [
    {
        id:1,
        title: "Tổng quan",
        icon: <PieChartOutlined />,
        link: "/profile-user"
    },
    {
        id:2,
        title: "Quản lý tin đăng",
        icon: <MenuOutlined />,
        link: "/manage-listing"
    },
    {
        id:3,
        title: "Quản lý khách hàng",
        icon: <FontAwesomeIcon icon={faUserGroup}/>,
        link: "/profile-user"
    },
    {
        id:4,
        title: "Tài khoản",
        icon: <SettingOutlined />,
        children: [
            {id:4.1,title:"Cài đặt tài khoản",link: "/profile-user"},
            {id:4.2,title:"Đổi mật khẩu",link: "/Change-password"}
        ]
    },
]
export default function SidebarComponent() {
    const [openMenuId, setOpenMenuId] = useState(null);
    const [selectedSubId, setSelectedSubId] = useState(null);
    const navigate = useNavigate();

    return (
        <WrapperSidebar>
            <div>
                    <UserSection>
                        <span>
                            <img src="./user.png" alt="User Avatar" />
                        </span>
                        <h3>Ten nguoi dung</h3>
                    </UserSection>
                    <Listfunction>
                        {
                            MenuUser.map((item) => (
                                <li key={item.id}>
                                    <div
                                        onClick={() => {
                                            if (item.children) {
                                                //chỉ mở submenu
                                                setOpenMenuId(openMenuId === item.id ? null : item.id);
                                                setSelectedSubId(null); // reset submenu
                                            } else {
                                                //menu thường thì navigate
                                                setOpenMenuId(item.id);
                                                setSelectedSubId(null);
                                                navigate(item.link);
                                            }
                                        }}
                                        className={`${openMenuId === item.id ? "selected" : ""}
                                            ${item.children ? "has-submenu" : "no-submenu"}
                                            `}
                                    >
                                        <span>
                                            {item.icon}
                                        </span>
                                        <span>{item.title}</span>
                                        {item?.children && (<span className={`down_submenu ${
                                            openMenuId === item.id ? "rotate" : ""
                                        }`}><DownOutlined /></span>)}
                                    </div>
                                    {
                                        item?.children && openMenuId === item.id &&
                                        <SubMenufunction>
                                            {
                                                item.children.map((value) => (
                                                    <li
                                                        key={value.id}
                                                        onClick={(e) => {
                                                            e.stopPropagation(); //QUAN TRỌNG
                                                            setSelectedSubId(value.id);
                                                            navigate(value.link);
                                                        }}
                                                        className={selectedSubId === value.id ? "selected" : ""}
                                                    >
                                                        {value.title}
                                                    </li>
                                                ))
                                            }
                                        </SubMenufunction>
                                    }
                                </li>
                            ))
                        }
                    </Listfunction>
            </div>
        </WrapperSidebar>
    );
}