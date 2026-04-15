import { Card,Skeleton, } from "antd";
import { Link } from "react-router-dom";
import { WrapperCardsmallTitle,CardsmallTitle,WrapperCardConfig,
    CardConfigPrice,CardConfigArea,SeparatorDot,
    WrapperCardLocation,WrapperCardContact,CardContactPublicInfo
} from "./style";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { EnvironmentOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { formatPriceToString } from "../../utils";

const CardsmallComponent = ({Id,Title,Img,Price,Stretch,Area,createdAt,loading,Acreage,...rest}) => {
    
    return (
        <Card 
            loading={loading}
            hoverable
            cover={loading ? <Skeleton.Image active={true} style={{width:"100%",height:"200px"}}/> : Img}
            {...rest}
            style={{backgroundColor:"#ffffffe7"}}
        >
            {
                !loading && (
                    <>
                        <WrapperCardsmallTitle>
                            <Link to={`/lands-detail/${Id}`}>
                                <CardsmallTitle>{Title}</CardsmallTitle>
                            </Link>
                        </WrapperCardsmallTitle>
                        <WrapperCardConfig>
                            <CardConfigPrice>{formatPriceToString(Price)}/tháng</CardConfigPrice>
                            <SeparatorDot>-</SeparatorDot>
                            <CardConfigArea>{Acreage} m²</CardConfigArea>
                        </WrapperCardConfig>
                        <WrapperCardLocation>
                            <EnvironmentOutlined />
                            <span>{Area}</span>
                        </WrapperCardLocation>
                        <WrapperCardContact>
                            <CardContactPublicInfo>{createdAt}</CardContactPublicInfo>
                            <ButtonComponent textButton={<FontAwesomeIcon icon={faHeart} />} className="btn-heart"/>
                        </WrapperCardContact>
                    </>
                )
            }
        </Card>
    )
}
export default CardsmallComponent;