
import { EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
  StyledCard,
  WrapperCardsmallTitle,
  CardsmallTitle,
  WrapperCardConfig,
  CardConfigPrice,
  CardConfigArea,
  SeparatorDot,
  WrapperCardLocation,
  WrapperCardContact,
  CardContactPublicInfo
} from './style';

const CardsmallComponent = ({ 
    Id, 
    Title, 
    Img, 
    Price, 
    Area, 
    createdAt, 
    loading, 
    Acreage, 
    ...rest 
}) => {
    return (
        <StyledCard 
            loading={loading}
            hoverable
            cover={Img}
            {...rest}
        >
            {!loading && (
                <>
                    <WrapperCardsmallTitle>
                        <Link to={`/lands-detail/${Id}`}>
                            <CardsmallTitle>{Title}</CardsmallTitle>
                        </Link>
                    </WrapperCardsmallTitle>

                    <WrapperCardConfig>
                        <CardConfigPrice>
                            {Price === 0 ? "Thỏa thuận" : Price}
                        </CardConfigPrice>
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
            )}
        </StyledCard>
    );
};

export default CardsmallComponent;