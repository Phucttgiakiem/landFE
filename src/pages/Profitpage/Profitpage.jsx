import { WrapperProfit, ProfitContainer,ProfitHeader,ProfitBody,Statisticaltype } from "./style";
import { Select,DatePicker,Table,Space } from "antd";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {formatDateVN,formatPrice} from "../../utils";
//import dayjs from 'dayjs'
import {getdataStatisticalbytype,getAllowners} from "../../services/StatisticalService";
const column = [
    {
        title: "Mã hợp đồng",
        dataIndex: "_id",
    },
    {
        title: "Ngày lập hợp đồng",
        dataIndex: "createdAt",
        render: (value) => formatDateVN(value)
    },
    {
        title: "Ngày cập nhật mới nhất",
        dataIndex: "updatedAt",
        render: (value) => formatDateVN(value)
    },
    {
        title: "Loại hợp đồng",
        dataIndex: "typeContract",
    },
    {
        title: "Giá trị hợp đồng",
        dataIndex: "price",
        render: (value) => formatPrice(value)
    },
    {
        title: "Hành động",
        dataIndex: "action",
         render: (_, record) => 
            <Space>
                <Link to={`/Detail-listing/${record.listingId}`} state={{ from: "listings" }}>Detail</Link>
            </Space>
    },
]
export default function Profitpage() {
    const [ListAllOwners,setListallOwners] = useState([]);
    const [statisticalType, setStatisticalType] = useState("");
    const [Datastatistical,setDatastatistical] = useState({
        limit: 5,
        pageCurrent: 1,
        totalpage: 0,
        totalitem: 0,
        items : [],
        totalprofit: 0,
    })
    const [datafilter,setDatafilter] = useState({})
    const user = useSelector(state => state.user);
    const [userSelected,setUserselected] = useState("");
    const resettable = () => {
        setDatastatistical({
            limit: 5,
            pageCurrent: 1,
            totalpage: 0,
            totalitem: 0,
            items : [],
            totalprofit: 0,
        });
        setDatafilter({});
        return;
    }
    const handleTableChange = (pagination) => {
        console.log(pagination);
        setDatastatistical(prev=> ({
            ...prev,
            pageCurrent:pagination.current
        }))
    }
    useEffect(() => {
        if (Object.keys(datafilter).length === 0) return;

        const fetchData = async () => {
            try {
                const data = {
                    limit: Datastatistical.limit,
                    page: Datastatistical.pageCurrent,
                    userId: user.role !== "admin" ? user.id : userSelected,
                    ...datafilter
                };

                const response = await getdataStatisticalbytype(data);
                //console.log(response);
                
                    setDatastatistical(prev => ({
                        ...prev,
                        pageCurrent: response?.pageCurrent,
                        totalpage: response?.totalitem / prev.limit,
                        totalitem: response?.totalitem,
                        items: response?.contracts,
                        totalprofit: response?.totalProfit
                    }))
                

            } catch(err){
                console.log(err);
            }
        };

        fetchData();
    },[datafilter,Datastatistical.pageCurrent,userSelected]);
    useEffect(()=> {
        const fetchData = async () => {
            try {
                const response = await getAllowners();
                console.log(response);
                setListallOwners(response.result);
            }catch(err){
                console.log(err);
            }
        }
        fetchData()
    },[])
    return (
        <WrapperProfit>
            <ProfitContainer>
                <ProfitHeader>
                    <h2>Thống kê doanh thu</h2>
                </ProfitHeader>
                <ProfitBody>
                    <Statisticaltype>
                        <div>
                            <h5>Kiểu thống kê</h5>
                            <Select placeholder="Chọn kiểu thống kê" size="large" style={{width:"40%",marginTop:"10px"}} allowClear value={statisticalType} onChange={(value) => setStatisticalType(value)}>
                                <Select.Option value="day">Theo ngày</Select.Option>
                                <Select.Option value="month">Theo tháng</Select.Option>
                                <Select.Option value="quarter">Theo quý</Select.Option>
                                <Select.Option value="year">Theo năm</Select.Option>
                            </Select>
                        </div>
                        {
                            statisticalType === "day" ? (
                                <div>
                                    <h5>Chọn ngày</h5>
                                    <DatePicker.RangePicker style={{width:"40%",marginTop:"10px"}} size="large"
                                        onChange={(date,dateStrings) => {
                                            if (!dateStrings?.[0] || !dateStrings?.[1]) {
                                                resettable()
                                            }
                                            setDatafilter({
                                                
                                                    startDate: dateStrings?.[0],
                                                    endDate: dateStrings?.[1]
                                                }
                                            )
                                        }}
                                    />
                                </div>
                            ) : statisticalType === "month" ? (
                                <div>
                                    <h5>Chọn tháng</h5>
                                    <DatePicker picker="month" style={{width:"40%",marginTop:"10px"}} size="large"
                                        onChange={(date,dateStrings) => {
                                            if(!dateStrings){
                                                resettable()
                                            }
                                            setDatafilter({
                                                
                                                    month: dateStrings
                                                }
                                            )
                                        }}
                                    />
                                </div>
                            ) : statisticalType === "quarter" ? (
                                <div>
                                    <h5>Chọn quý</h5>
                                    <DatePicker picker="quarter" style={{width:"40%",marginTop:"10px"}} size="large"
                                        onChange={(date,dateStrings) => {
                                            if(!dateStrings){
                                                resettable()
                                            }
                                            setDatafilter({
                                                
                                                    quarter: dateStrings
                                                
                                            })
                                        }}
                                    />
                                </div>
                            ) : statisticalType === "year" && (
                                <div>
                                    <h5>Chọn năm</h5>
                                    <DatePicker picker="year" style={{width:"40%",marginTop:"10px"}} size="large"
                                        onChange={(date,dateStrings) => {
                                            if(!dateStrings){
                                                resettable()
                                            }
                                            setDatafilter({
                                               
                                                    year:dateStrings
                                               
                                            })
                                        }}
                                    />
                                </div>
                            ) 
                        }
                        {
                            user.role === "admin" && 
                            <div>
                                <h5>Chọn người cần thống kê trong danh sách</h5>
                                <Select 
                                    style={{width:"40%",marginTop:"10px"}} size="large"
                                    value={userSelected}
                                    onChange={(value) => setUserselected(value)}
                                >
                                    <Select.Option value="">
                                        Tất cả
                                    </Select.Option>

                                    {
                                        ListAllOwners.map(item => (
                                            <Select.Option
                                                key={item._id}
                                                value={item._id}
                                            >
                                                {item.fullname + " - " + item.phone}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        }
                    </Statisticaltype>
                    <Table 
                        columns={column} 
                        dataSource={Datastatistical?.items} 
                        pagination={{current: Datastatistical?.pageCurrent,pageSize:Datastatistical?.limit,total: Datastatistical.totalitem}} 
                        onChange={handleTableChange}
                        style={{marginTop:"20px"}}/>
                    <div style={{display:"flex",justifyContent:"flex-end",marginTop:"20px"}}>
                        <h3>Tổng doanh thu: {formatPrice(Datastatistical.totalprofit || 0)}</h3>
                    </div>
                </ProfitBody>
            </ProfitContainer>
        </WrapperProfit>
  );
}