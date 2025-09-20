import { WrapperCard,LeftCard,RightCard } from './style';

export const CardComponent = () => {
    return (
        <WrapperCard>
            <LeftCard>
                <img style={{width:"100%",height:"100%"}}  src="No_image.png" alt="Property exterior"/>
            </LeftCard>
            <RightCard>
                RightCard
            </RightCard>
        </WrapperCard>
    )
}