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
                        <div style={{ minWidth: '800px' }}>
                            <Line
                                data={propertybymonth}
                                xField="month"
                                yField="value"
                                seriesField="type"
                                height={400}
                                colorField="rgb(75,0, 144)"
                                tooltip={{ shared: true }}
                                style={{
                                    lineWidth: 2,
                                }}
                                point={{
                                    shapeField: 'square',
                                    sizeField:4,
                                    animate: {
                                        enter: {
                                        type: 'fadeIn',
                                        duration: 500,
                                        },
                                    },
                                }}
                                animate = {{ enter : { type : 'pathIn' , duration : 3000 } }}
                                axis={{
                                    x: {
                                        line:true,
                                        arrow: true,
                                        title: "Time",
                                        titleFontSize: 16,
                                        titleFontWeight: 300,
                                        labelAutoHide: true,
                                        labelAutoRotate: false,
                                    },
                                    y: {
                                        line:true,
                                        arrow : true,
                                        title: "Total Post",
                                        titleFontSize: 16,
                                        titleFontWeight: 300,
                                        gridLineDash: [20,5],
                                    },

                                }}
                            />
                            <h5 style={{width:"100%",textAlign:"center"}}>Biểu đồ số bài đăng trên hệ thống trong 12 tháng gần nhất</h5>
                        </div>
                    </DashboardChartWapper>
                    <DashboardChartWapper>
                        <div style={{ minWidth: '800px' }}> 
                                <Line
                            data={userbymonth}
                            xField="month"
                            yField="value"
                            seriesField="type"
                            height={400}
                            tooltip={{ shared: true }}
                             colorField="rgb(16, 40, 140)"
                                style={{
                                    lineWidth: 2,
                                }}
                                point={{
                                    shapeField: 'square',
                                    sizeField:4,
                                    animate: {
                                        enter: {
                                        type: 'fadeIn',
                                        duration: 500,
                                        },
                                    },
                                }}
                                animate = {{ enter : { type : 'pathIn' , duration : 3000 } }}
                                axis={{
                                    x: {
                                        line:true,
                                        arrow: true,
                                        title: "Time",
                                        titleFontSize: 16,
                                        titleFontWeight: 300,
                                        labelAutoHide: true,
                                        labelAutoRotate: false,
                                    },
                                    y: {
                                        line:true,
                                        arrow : true,
                                        title: "Total account",
                                        titleFontSize: 16,
                                        titleFontWeight: 300,
                                        gridLineDash: [20,5],
                                    },

                                }}
                        />
                        <h5 style={{width:"100%",textAlign:"center"}}>Biểu đồ số tài khoản đăng ký mới trong 12 tháng gần nhất</h5>
                        </div>
                    </DashboardChartWapper>
                </ChartContainer>
            </DashboardAdminpropertybyMonth>
        </div>
    )
}