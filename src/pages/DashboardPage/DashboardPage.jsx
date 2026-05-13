import { useSelector } from "react-redux"
import {WrapperDashboard,DashboardContainer,DashboardHeader,DashboardBody} from "./style"
import DashboardSellerComponent from "../../components/DashboardComponent/DashboardSellerComponent";
import DashboardAdminComponent from "../../components/DashboardComponent/DashboardAdminComponent";
import DashboardUserComponent from "../../components/DashboardComponent/DashboardUserComponent";
export default function DashboardPage () {
    const user = useSelector((state) => state.user);
    return (
        <WrapperDashboard>
            <DashboardContainer>
                <DashboardHeader>
                    <h2>Dashboard</h2>
                </DashboardHeader>
                <DashboardBody>
                    {
                        user.role === "sell-user" ? <DashboardSellerComponent iduser={user.id}/> :
                        user.role === "admin" ? <DashboardAdminComponent/> : <DashboardUserComponent userinfo={user}/>
                    }
                </DashboardBody>
            </DashboardContainer>
        </WrapperDashboard>
    )
}