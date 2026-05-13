import { useState } from "react";
import { Card,Skeleton, } from "antd";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
const CardsmallComponent = ({Id,Title,Img,Price,Stretch,Area,createdAt,loading,Acreage,Login,likeCard,handlelike,...rest}) => {
    
    const navigate = useNavigate();
    const [loadingLike, setLoadingLike] = useState(false);

    const handleLikeProperty = async(item) => {
        if(loadingLike) return;

        if(!Login.access_Token){ 
            navigate('/sign-in');
            return;
        }
        const prev = item;
        const status = !prev;

        setLoadingLike(true);
        handlelike(Id,status);

        try {
            if(prev){
                await FavoriteService.deleteFavoriteofuser(Login,Id);
            } else {
                await FavoriteService.createnewFavorite(Login,Id);
            }
        } catch(err){
            handlelike(Id,prev);
        } finally {
            setLoadingLike(false);
        }
    };
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
                            <ButtonComponent textButton={<FontAwesomeIcon icon={faHeart} 
                                onClick={() => handleLikeProperty(likeCard)}
                                style={{color: likeCard ? "#02CBE0": "#000000"}}
                            />} className="btn-heart"/>
                        </WrapperCardContact>
                    </>
                )
            }
        </Card>
    )
}
export default CardsmallComponent;