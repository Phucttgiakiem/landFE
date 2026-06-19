import { useState } from "react";
import { Card } from "antd";
import { Link,useNavigate } from "react-router-dom";
import { WrapperCardsmallTitle,CardsmallTitle,WrapperCardConfig,
    CardConfigPrice,CardConfigArea,SeparatorDot,
    WrapperCardLocation,WrapperCardContact,CardContactPublicInfo
} from "./style";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { EnvironmentOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { formatPriceToString } from "../../utils";
import * as FavoriteService from "../../services/FavoriteService";
import Noimage from "../../assets/images/not_image.jpg"
const CardsmallComponent = ({Id,Title,Img,Price,Stretch,Area,createdAt,loading,Acreage,...rest}) => {
  
    
    
    return (
        <Card 
            loading={loading}
            hoverable
            cover={loading ? <div style={{
                    width:"100%",
                    height:"200px",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    justifyContent:"center",
                    }}>
                                <img src={Noimage} alt="loading-image" width="100%" height="100%" />
                            </div> : Img}
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
                            <CardConfigPrice>{Price === 0 ? "Thỏa thuận" : formatPriceToString(Price)}/tháng</CardConfigPrice>
                            <SeparatorDot>-</SeparatorDot>
                            <CardConfigArea>{Acreage} m²</CardConfigArea>
                        </WrapperCardConfig>
                        <WrapperCardLocation>
                            <EnvironmentOutlined />
                            <span>{Area}</span>
                        </WrapperCardLocation>
                        <WrapperCardContact>
                            <CardContactPublicInfo>{createdAt}</CardContactPublicInfo>
                            
                        </WrapperCardContact>
                    </>
                )
            }
        </Card>
    )
}
export default CardsmallComponent;