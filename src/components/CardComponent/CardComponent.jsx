import { WrapperCard,LeftCard,RightCard,TitleCard,CardConfig,CardLocation,CardDescription,NewLogo } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed,faBath,faLocationDot } from '@fortawesome/free-solid-svg-icons';
import flagnew from "../../assets/images/newlogo.png"
import DOMPurify from "dompurify";
import { useNavigate } from 'react-router-dom';
export const CardComponent = ({idListing,Title,Price,Area,Address,Bedroom,Bathroom,Description,ImageCard}) => {
    const navigate = useNavigate()
    return (
        <WrapperCard>
            <LeftCard>
                <img style={{width:"100%",height:"100%"}}  src={ImageCard} alt="Property exterior"/>
                <NewLogo src={flagnew} alt="new"/>
            </LeftCard>
            <RightCard>
                <TitleCard onClick={() => navigate("/lands-detail/"+idListing)}>
                    {Title}
                </TitleCard>
                <CardConfig>
                    <span style={{fontSize:"1rem",color:"rgba(174, 174, 174, 1)",marginRight:"1rem"}}>{Price}</span>
                    <span style={{fontSize:"1rem",color:"rgba(174, 174, 174, 1)",marginRight:"1rem"}}>{Area}</span>
                    <div style={{marginRight:"1rem"}}>
                        <span style={{fontSize:"0.9rem",color:"rgba(174, 174, 174, 1)",marginRight:"0.2rem"}}>{Bedroom}</span>
                        <FontAwesomeIcon icon={faBed} style={{fontSize:"0.9rem",color:"rgba(174, 174, 174, 1)"}} />
                    </div>
                    <div style={{marginRight:"1rem"}}>
                        <span style={{fontSize:"0.9rem",color:"rgba(174, 174, 174, 1)",marginRight:"0.2rem"}}>{Bathroom}</span>
                        <FontAwesomeIcon icon={faBath} style={{fontSize:"0.9rem",color:"rgba(174, 174, 174, 1)"}}/>
                    </div>
                </CardConfig>
                <CardLocation>
                    <FontAwesomeIcon icon={faLocationDot} style={{fontSize:"1rem",color:"rgba(174, 174, 174, 1)"}} />
                    <span style={{fontSize:"1rem",color:"rgba(174, 174, 174, 1)"}}>{Address}</span>
                </CardLocation>
                <CardDescription
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(Description),
                    }}
                />
            </RightCard>
        </WrapperCard>
    )
}