import { WrapperSidebar, UserSection,Listfunction } from './style';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate,useLocation } from "react-router-dom";
import { useState } from 'react';
import { useSelector } from "react-redux";
import {MenuSidebar} from '../../constant/MenuOption';
import { filterMenu } from './filterMenu';
import userImage from "../../assets/images/user.png"
const SidebarItem = ({item,level = 0,openMenu,setOpenMenu,}) => {
    const isOpen = openMenu === item.label;
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = item.path && location.pathname.includes(item.path);
    const handleClick = () => {
        if (item.children) {
            setOpenMenu(isOpen ? null : item.label);
        } else if (item.path) {
            navigate(item.path);
        }
    }
    return (
        <div>
            <div
            onClick={handleClick}
            style={{
                boxSizing: "border-box",
                height: "4rem",
                padding: "10px 20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                background: isActive ? "#02CBE0" : "",
                color: isActive ? "#fff" : "#000",
                borderTop: isActive ? "1px solid #ccc" : "none",
                borderBottom: isActive ? "1px solid #ccc" : "none",
                borderRight: isActive ? "5px solid #fff" : "none",
                gap:10
            }}
            >
            <span
                style={{
                width: 30,           
                display: "flex",
                justifyContent: "center",
                fontSize: 20
                }}
            >
                {item.icon}
            </span>
            <span style={{ flex: 2 }}>
                {item.label}
            </span>
            {item.children && (
                <span className={`arrow ${isOpen ? "open" : ""}`}>
                <DownOutlined />
                </span>
            )}
            </div>

            {item.children && isOpen && (
                <div>
                    {item.children.map(child => (
                        <SidebarItem key={child.label} item={child} level={level + 1} openMenu={openMenu}
                            setOpenMenu={setOpenMenu}/>
                    ))}
                </div>
            )}
        </div>
    )
}
export default function SidebarComponent() { 
    const user = useSelector(state => state.user);
    const filteredMenu = filterMenu(MenuSidebar, user.role);

    const [openMenu, setOpenMenu] = useState(null);
    return (
        <WrapperSidebar>
            <UserSection>
                <span>
                    <img src={userImage} alt="User Avatar" />
                </span>
                <h3>{user?.name}</h3>
            </UserSection>
            <Listfunction>
                {
                    filteredMenu.map(item => (
                        <SidebarItem 
                            key={item.label} 
                            item={item}
                            openMenu={openMenu}
                            setOpenMenu={setOpenMenu}
                        />
                    ))
                }
            </Listfunction>
        </WrapperSidebar>
    )
}
