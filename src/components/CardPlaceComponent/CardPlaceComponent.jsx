import {WrapperTitleandNumber} from './style';
const CardPlaceComponent = ({Img,Title,number,width,height,gridArea}) => {
    return (
        <div style={{
                position:'relative',
                width:width,
                height:height,
                borderRadius:'8px',
                overflow:'hidden',
                cursor:'pointer',
                gridArea:gridArea,
                }}>
            {Img}
            <WrapperTitleandNumber>
                <span>{Title}</span>
                {number !== 0 && <span>{number} posts</span>}
            </WrapperTitleandNumber>
        </div>
    )
}
export default CardPlaceComponent
