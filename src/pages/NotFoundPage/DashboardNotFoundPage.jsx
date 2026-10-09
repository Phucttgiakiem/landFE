import { Button, Result } from 'antd';
import {WrapperNotfoundDashboard,NotfoundDashboardContainer} from "./style"
import { useNavigate } from 'react-router-dom';
export default function DashboadNotFoundPage () {
    const navigate = useNavigate();
    return (
        <WrapperNotfoundDashboard>
            <NotfoundDashboardContainer>
                <Result
                    status="404"
                    title="404"
                    subTitle="the page you are looking for does not exist."
                    extra={<Button type="primary" onClick={() => navigate("/Dashboard")}>Back Home</Button>}
                />
            </NotfoundDashboardContainer>
        </WrapperNotfoundDashboard>
    )
}