import { CloseOutlined } from "@ant-design/icons";
import { Select,Input,Checkbox } from "antd";
import {FilterPersonalpageContainer, FilterPersonalpageWrapper,FilterPersonalpageHeader
    ,FilterPersonalpageContent,FilterPersonalItem,FilterPersonalItemTitle,FilterPersonalItemContent,
    DetailTypeListingWrapper,
} from "./style";
export default function FilterPersonalpageComponent () {
    return (
        <FilterPersonalpageContainer>
            <FilterPersonalpageWrapper>
                <FilterPersonalpageHeader>
                    <h3>Bộ lọc</h3>
                    <CloseOutlined />
                </FilterPersonalpageHeader>
                <FilterPersonalpageContent>
                    <FilterPersonalItem>
                        <FilterPersonalItemTitle>
                            <h4>Loại bất động sản</h4>
                        </FilterPersonalItemTitle>
                        <FilterPersonalItemContent>
                            <Select style={{ width: '100%' }} placeholder="Chọn loại bất động sản" size={"middle"}>
                                <Select.Option value="house">Nhà đất ở</Select.Option>
                                <Select.Option value="apartment">Nhà đất cho thuê</Select.Option>
                            </Select>
                            <Input type="text" placeholder="Tìm kiếm tên bất động sản" />
                            <DetailTypeListingWrapper>
                                <ul>
                                    <li><Checkbox /> <span>Nhà phố</span></li>
                                    <li><Checkbox /> <span>Chung cư</span></li>
                                    <li><Checkbox /> <span>Nhà trọ</span></li>
                                    <li><Checkbox /> <span>Nhà trọ</span></li>
                                    <li><Checkbox /> <span>Nhà trọ</span></li>
                                    <li><Checkbox /> <span>Nhà trọ</span></li>
                                    <li><Checkbox /> <span>Nhà trọ</span></li>
                                    <li><Checkbox /> <span>Nhà trọ</span></li>
                                </ul>
                            </DetailTypeListingWrapper>
                        </FilterPersonalItemContent>
                    </FilterPersonalItem>
                    <FilterPersonalItem>
                        <FilterPersonalItemTitle>
                            <h4>Thành phố</h4>
                        </FilterPersonalItemTitle>
                        <FilterPersonalItemContent>
                            <Input type="text" placeholder="Tìm kiếm thành phố" />
                            <DetailTypeListingWrapper>
                                <ul>
                                    <li><Checkbox /> <span>Hồ Chí Minh</span></li>
                                    <li><Checkbox /> <span>Bình Dương</span></li>
                                    <li><Checkbox /> <span>Đồng Nai</span></li>
                                    <li><Checkbox /> <span>Nhà trọ</span></li>
                                    <li><Checkbox /> <span>Nhà trọ</span></li>
                                    <li><Checkbox /> <span>Nhà trọ</span></li>
                                    <li><Checkbox /> <span>Nhà trọ</span></li>
                                    <li><Checkbox /> <span>Nhà trọ</span></li>
                                </ul>
                            </DetailTypeListingWrapper>
                        </FilterPersonalItemContent>
                    </FilterPersonalItem>
                    <FilterPersonalItem>
                        <FilterPersonalItemTitle>
                            <h4>Phường/Xã</h4>
                        </FilterPersonalItemTitle>
                        <FilterPersonalItemContent>
                            <Input type="text" placeholder="Tìm kiếm phường/xã" />
                            <DetailTypeListingWrapper>
                                <ul>
                                    <li><Checkbox /> <span>Hồ Chí Minh</span></li>
                                    <li><Checkbox /> <span>Bình Dương</span></li>
                                    <li><Checkbox /> <span>Đồng Nai</span></li>
                                    <li><Checkbox /> <span>Nhà trọ</span></li>
                                    <li><Checkbox /> <span>Nhà trọ</span></li>
                                    <li><Checkbox /> <span>Nhà trọ</span></li>
                                    <li><Checkbox /> <span>Nhà trọ</span></li>
                                    <li><Checkbox /> <span>Nhà trọ</span></li>
                                </ul>
                            </DetailTypeListingWrapper>
                        </FilterPersonalItemContent>
                    </FilterPersonalItem>
                    <FilterPersonalItem>
                        <FilterPersonalItemTitle>
                            <h4>Mức giá (VND)</h4>
                        </FilterPersonalItemTitle>
                        <FilterPersonalItemContent>
                            <h5>Chọn nhập tay hay sử dụng select</h5>
                            <Input type="text" placeholder="Nhập giá thấp nhất" />
                            <Input type="text" placeholder="Nhập giá cao nhất" />
                            <Select style={{ width: '100%' }} placeholder="Chọn khung giá" size={"middle"}>
                                <Select.Option > nhỏ hơn 1 triệu</Select.Option>
                                <Select.Option > từ 1 - 3 triệu</Select.Option>
                                <Select.Option > từ 3 - 5 triệu</Select.Option>
                                <Select.Option > trên 5 triệu</Select.Option>
                            </Select>
                        </FilterPersonalItemContent>
                    </FilterPersonalItem>
                </FilterPersonalpageContent>
            </FilterPersonalpageWrapper>
        </FilterPersonalpageContainer>
    )
}