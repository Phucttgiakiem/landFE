import {DashboardSellerTitle,DashboardSellerpropertybyMonth,DashboardChartWapper,ChartContainer,WrapperCardDashboard} from './style';
import { Line } from '@ant-design/plots';
import {useState,useEffect} from "react";
import {getDashboardoverviewSeller} from "../../services/DashboardService";
import CardDashboardComponent from "../CardDashboardComponent/CardDashboardComponent"
export default function DashboardSellerComponent ({iduser}) {
    const [propertyBymonth,setPropertyBymonth] = useState([]);
    const [totalProperty,setTotalproperty] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDashboardoverviewSeller(iduser);

                setPropertyBymonth(res?.data?.propertyChart || []);
                setTotalproperty(res?.data?.totalproperty);
            } catch (e) {
                console.error(e);
                setPropertyBymonth([]);
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
                        <div style={{ minWidth: '800px' }}>
                            <Line
                                data={propertyBymonth}
                                xField="month"
                                yField="value"
                                colorField="rgb(31, 242, 235)"
                                seriesField="type"
                                height={400}
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
                            <h5 style={{width:"100%",textAlign:"center"}}>Biểu đồ thống kê số bài đăng theo 12 tháng gần nhất</h5>
                        </div>
                        
                    </DashboardChartWapper>
                </ChartContainer>
            </DashboardSellerpropertybyMonth>
        </div>
    )
}