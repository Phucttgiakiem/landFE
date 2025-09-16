import { Col } from "antd";
import { useState } from "react";
import { WrapperHeader, WrapperTextHeader,WrapperHeaderMenu,WrapperHeaderSubMenu,
    HeaderMenuItem,HeaderLink,HeaderLinkSubMenu,HeaderMenuItemsubMenu,WrapperHeaderAccount} from "./style";

export default function HeaderComponent () {
    const [activeMenu, setActiveMenu] = useState("sell");
    return (
        <div>
            <WrapperHeader>
                <Col span={2}>
                    <WrapperTextHeader>Property</WrapperTextHeader>
                </Col>
                <Col span={16}>
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
                </Col>
                <Col span={6}>
                    <WrapperHeaderAccount>
                        <HeaderLink href="/">Đăng nhập</HeaderLink>
                        <HeaderLink href="/">Đăng ký</HeaderLink>
                    </WrapperHeaderAccount>
                </Col>
            </WrapperHeader>
        </div>
    )
}