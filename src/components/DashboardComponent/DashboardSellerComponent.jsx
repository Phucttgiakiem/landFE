import {DashboardSellerTitle,DashboardSellerpropertybyMonth,DashboardChartWapper,ChartContainer,WrapperCardDashboard} from './style';
import { Line } from '@ant-design/plots';
import {useState,useEffect} from "react";
import {getDashboardoverviewSeller} from "../../services/DashboardService";
import CardDashboardComponent from "../CardDashboardComponent/CardDashboardComponent"
export default function DashboardSellerComponent ({iduser}) {
    const [propertyBymonth,setPropertyBymonth] = useState([]);
    const [favoriteBymonth,setFavoriteBymonth] = useState([]);
    const [totalProperty,setTotalproperty] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDashboardoverviewSeller(iduser);

                setPropertyBymonth(res?.data?.propertyChart || []);
                setFavoriteBymonth(res?.data?.favoriteChart || []);
                setTotalproperty(res?.data?.totalproperty);
            } catch (e) {
                console.error(e);
                setPropertyBymonth([]);
                setFavoriteBymonth([]);
                setTotalproperty(0);
            }
        };

        if (iduser) {
            fetchData();
        }
    }, [iduser]);
    
    return (
        <div>
            <DashboardSellerTitle>
                <h4>Tổng quan</h4>
            </DashboardSellerTitle>
            <DashboardSellerpropertybyMonth>
                <WrapperCardDashboard>
                    <CardDashboardComponent styleComponent={{
                        backgroundColor:"#10288C",  
                    }}
                        content={`Tổng số bài đăng: ${totalProperty} bài `}
                    />
                </WrapperCardDashboard>
                <ChartContainer>
                    <DashboardChartWapper>
                        <Line
                            data={propertyBymonth}
                            xField="month"
                            yField="value"
                            seriesField="type"
                            height={400}
                            tooltip={{ shared: true }}
                        />
                        <h5>Biểu đồ số bài đăng trong 12 tháng gần nhất</h5>
                    </DashboardChartWapper>
                    <DashboardChartWapper>
                        <Line
                            data={favoriteBymonth}
                            xField="month"
                            yField="value"
                            seriesField="type"
                            height={400}
                            tooltip={{ shared: true }}
                        />
                        <h5>Biểu đồ số lượt like 4 tháng gần nhất</h5>
                    </DashboardChartWapper>
                </ChartContainer>
                
                {/* <Line data={favoriteBymonth} xField="month" yField="value" /> */}
            </DashboardSellerpropertybyMonth>
        </div>
    )
}