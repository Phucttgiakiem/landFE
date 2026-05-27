import {CardContainer} from "./style"
export default function CardDashboardComponent ({styleComponent,content,...rest}) {
    return (
        <CardContainer
            style={styleComponent}
            {...rest}
        >
            <h5>{content}</h5>
        </CardContainer>
    )
}