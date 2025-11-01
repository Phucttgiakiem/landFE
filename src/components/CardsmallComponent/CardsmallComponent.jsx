import { Card } from "antd";
import { WrapperCardsmallTitle,CardsmallTitle,WrapperCardConfig,
    CardConfigPrice,CardConfigArea,SeparatorDot,
    WrapperCardLocation,WrapperCardContact,CardContactPublicInfo
} from "./style";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { EnvironmentOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
const CardsmallComponent = ({Title,Img,...rest}) => {
    return (
        <Card 
            hoverable
            cover={Img}
            {...rest}
        >
            <WrapperCardsmallTitle>
                <CardsmallTitle>{Title}</CardsmallTitle>
            </WrapperCardsmallTitle>
            <WrapperCardConfig>
                <CardConfigPrice>25 triệu/tháng</CardConfigPrice>
                <SeparatorDot>-</SeparatorDot>
                <CardConfigArea>50 m²</CardConfigArea>
            </WrapperCardConfig>
            <WrapperCardLocation>
                <EnvironmentOutlined />
                <span>Ba Đình, Hà Nội</span>
            </WrapperCardLocation>
            <WrapperCardContact>
                <CardContactPublicInfo>Đăng 1 tuần trước</CardContactPublicInfo>
                <ButtonComponent textButton={<FontAwesomeIcon icon={faHeart} />} className="btn-heart"/>
            </WrapperCardContact>
        </Card>
    )
}
export default CardsmallComponent;