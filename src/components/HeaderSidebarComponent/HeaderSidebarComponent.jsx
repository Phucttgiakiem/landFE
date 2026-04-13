import HeaderComponent from "../HeaderComponent/HeaderComponent";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
const HeaderSidebarComponent = ({children}) => {
        return (
            <div>
                <HeaderComponent/>
                <div>
                    <SidebarComponent/>
                    {children}
                </div>
                
            </div>
        )
}
export default HeaderSidebarComponent;