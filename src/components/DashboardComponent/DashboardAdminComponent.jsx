import {DashboardAdminTitle,DashboardAdminpropertybyMonth,DashboardChartWapper,ChartContainer,WrapperCardDashboard} from "./style";
import { Line } from '@ant-design/plots';
import CardDashboardComponent from "../CardDashboardComponent/CardDashboardComponent"
import {useState,useEffect} from "react";
import {getDashboardoverviewadmin} from "../../services/DashboardService";
export default function DashboardAdminComponent () {
    const [totalUser,setTotaluser] = useState(0);
    const [totalproperty,setTotalproperty] = useState(0);
    const [propertybymonth,setPropertybymonth] = useState([]);
    const [userbymonth,setUserbymonth] = useState([]);
    useEffect(() =>{
        const fetchData = async () => {
            try {
                const res = await getDashboardoverviewadmin();
                setTotaluser(res?.data?.totalUsers);
                setTotalproperty(res?.data?.totalListings);
                setPropertybymonth(res?.data?.listingChart);
                setUserbymonth(res?.data?.userChart);
                console.log(res.data);
            } catch(err){

            }
        }
        fetchData()
    },[])
    return (
        <div>
            <DashboardAdminTitle>
                <h4>Tổng quan</h4>
            </DashboardAdminTitle>
            <DashboardAdminpropertybyMonth>
                <WrapperCardDashboard>
                    <CardDashboardComponent styleComponent={{
                        backgroundColor:"#10288C",  
                    }}
                        content={`Tổng số tài khoản sử dụng website: ${totalUser} `}
                    />
                    <CardDashboardComponent styleComponent={{
                        backgroundColor:"#4B0090",  
                    }}
                        content={`Tổng số tin đăng bất động sản: ${totalproperty} `}
                    />
                </WrapperCardDashboard>
                <ChartContainer>
                    <DashboardChartWapper>
                        <Line
                            data={propertybymonth}
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
                            data={userbymonth}
                            xField="month"
                            yField="value"
                            seriesField="type"
                            height={400}
                            tooltip={{ shared: true }}
                        />
                        <h5>Biểu đồ số tài khoản đăng ký mới trong 12 tháng gần nhất</h5>
                    </DashboardChartWapper>
                </ChartContainer>
            </DashboardAdminpropertybyMonth>
        </div>
    )
}