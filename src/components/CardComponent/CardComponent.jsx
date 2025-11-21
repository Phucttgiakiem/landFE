import { WrapperCard,LeftCard,RightCard,TitleCard,CardConfig,CardLocation,CardDescription,NewLogo } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed,faBath,faLocationDot } from '@fortawesome/free-solid-svg-icons';
export const CardComponent = () => {
    return (
        <WrapperCard>
            <LeftCard>
                <img style={{width:"100%",height:"100%"}}  src="20250904001841_bdbe_wm.jpg" alt="Property exterior"/>
                <NewLogo src="newlogo.png" alt="new"/>
            </LeftCard>
            <RightCard>
                <TitleCard>Nhà riêng 7 tầng cho thuê nguyên căn số 39 ngõ 221 Tôn Đức Thắng,MT 5m,
                    PCCC tiêu chuẩn, thang máy
                </TitleCard>
                <CardConfig>
                    <span style={{fontSize:"1rem",color:"rgba(174, 174, 174, 1)",marginRight:"1rem"}}>39 triệu/tháng</span>
                    <span style={{fontSize:"1rem",color:"rgba(174, 174, 174, 1)",marginRight:"1rem"}}>45 m2</span>
                    <div style={{marginRight:"1rem"}}>
                        <span style={{fontSize:"0.9rem",color:"rgba(174, 174, 174, 1)",marginRight:"0.2rem"}}>5</span>
                        <FontAwesomeIcon icon={faBed} style={{fontSize:"0.9rem",color:"rgba(174, 174, 174, 1)"}} />
                    </div>
                    <div style={{marginRight:"1rem"}}>
                        <span style={{fontSize:"0.9rem",color:"rgba(174, 174, 174, 1)",marginRight:"0.2rem"}}>2</span>
                        <FontAwesomeIcon icon={faBath} style={{fontSize:"0.9rem",color:"rgba(174, 174, 174, 1)"}}/>
                    </div>
                </CardConfig>
                <CardLocation>
                    <FontAwesomeIcon icon={faLocationDot} style={{fontSize:"1rem",color:"rgba(174, 174, 174, 1)"}} />
                    <span style={{fontSize:"1rem",color:"rgba(174, 174, 174, 1)"}}>Đống đa, hà nội</span>
                </CardLocation>
                <CardDescription>
                    Tôn Đức Thắng Đống Đa - vỉa hè - thang máy, 45m x 7 tầng, MT 5m. - Vị trí vàng mặt ngõ rộng, 2 ôtô tránh nhau, có vỉa hè, - tuyến ngõ kinh doanh sầm uất bậc nhất quận Đống Đa. - Cơ hội hiếm - Nhà mới - Đầy đủ công năng - Kinh doanh gì cũng hợp. - Khu dân cư đông đúc, gần nhiều trường đại học, văn phòng, thuận tiện khai thác đa dạng mô hình.
                </CardDescription>
            </RightCard>
        </WrapperCard>
    )
}