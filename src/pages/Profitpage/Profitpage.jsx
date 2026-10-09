import { WrapperProfit, ProfitContainer,ProfitHeader,ProfitBody,Statisticaltype,
    WrapperStatisticaldatenotmobile,WrapperStatisticaldatemobile
 } from "./style";
import { Select,DatePicker,Table } from "antd";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import {formatDateVN,formatPrice} from "../../utils";
//import dayjs from 'dayjs'
import {getdataStatisticalbytype,getAllowners} from "../../services/StatisticalService";
const column = [
    {
        title: "ID of contract",
        dataIndex: "_id",
        width:280
    },
    {
        title: "date of contract",
        dataIndex: "createdAt",
        render: (value) => formatDateVN(value),
         width:280
    },
    {
        title: "date of last update",
        dataIndex: "updatedAt",
        render: (value) => formatDateVN(value),
         width:280
    },
    {
        title: "Type of contract",
        dataIndex: "typeContract",
         width:280
    },
    {
        title: "all money of contract",
        dataIndex: "price",
        render: (value) => formatPrice(value),
        width:280
    }
]
export default function Profitpage() {
    const [ListAllOwners,setListallOwners] = useState([]);
    const [statisticalType, setStatisticalType] = useState("");
    const [Datastatistical,setDatastatistical] = useState({
        limit: 3,
        pageCurrent: 1,
        totalpage: 0,
        totalitem: 0,
        items : [],
        totalprofit: 0,
    })
    const [loadingtable,setLoadingTable] = useState(false);
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
        setDatastatistical(prev=> ({
            ...prev,
            pageCurrent:pagination.current
        }))
    }
    useEffect(() => {
        if (Object.keys(datafilter).length === 0) return;

        const fetchData = async () => {
            try {
                setLoadingTable(true);
                const data = {
                    limit: Datastatistical.limit,
                    page: Datastatistical.pageCurrent,
                    userId: user.role !== "admin" ? user.id : userSelected,
                    ...datafilter
                };

                const response = await getdataStatisticalbytype(data);
                    setDatastatistical(prev => ({
                        ...prev,
                        pageCurrent: response?.pageCurrent,
                        totalpage: response?.totalitem / prev.limit,
                        totalitem: response?.totalitem,
                        items: response?.contracts,
                        totalprofit: response?.totalProfit
                    }))
                
                setLoadingTable(false);
            } catch(err){
                console.log(err);
                setLoadingTable(false);
            }
        };

        fetchData();
    },[datafilter,Datastatistical.pageCurrent,userSelected]);
    useEffect(()=> {
        const fetchData = async () => {
            try {
                const response = await getAllowners();
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
                    <h2>Profit Statistics</h2>
                </ProfitHeader>
                <ProfitBody>
                    <Statisticaltype>
                        <div>
                            <h5>Statistical Type</h5>
                            <Select placeholder="Select statistical type" size="large" className="fieldDataProfit" allowClear value={statisticalType} onChange={(value) => setStatisticalType(value)}>
                                <Select.Option value="day">Daily</Select.Option>
                                <Select.Option value="month">Monthly</Select.Option>
                                <Select.Option value="quarter">Quarterly</Select.Option>
                                <Select.Option value="year">Yearly</Select.Option>
                            </Select>
                        </div>
                        {
                            statisticalType === "day" ? (
                                <div>
                                    <h5>Select Date</h5>
                                    <WrapperStatisticaldatenotmobile>
                                        <DatePicker.RangePicker className="fieldDataProfit" size="large"
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
                                    </WrapperStatisticaldatenotmobile>
                                    <WrapperStatisticaldatemobile>
                                        <DatePicker 
                                            className="fieldDataProfit" 
                                            size="large" 
                                            placeholder="Start Date"
                                            onChange={(date,dateString) => {
                                                setDatafilter(prev => ({
                                                    ...prev,
                                                    startDate: dateString,
                                                }))
                                            }}
                                        />
                                        <DatePicker 
                                            className="fieldDataProfit" 
                                            size="large" 
                                            placeholder="End Date"
                                            onChange={(date,dateString) => {
                                                setDatafilter(prev => ({
                                                    ...prev,
                                                    endDate: dateString,
                                                }))
                                            }}
                                        />
                                    </WrapperStatisticaldatemobile>
                                </div>
                            ) : statisticalType === "month" ? (
                                <div>
                                    <h5>Select Month</h5>
                                    <DatePicker picker="month" className="fieldDataProfit" size="large"
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
                                    <h5>Select Quarter</h5>
                                    <DatePicker picker="quarter" className="fieldDataProfit" size="large"
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
                                    <h5>Select Year</h5>
                                    <DatePicker picker="year" className="fieldDataProfit" size="large"
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
                                <h5>Select User for Statistics</h5>
                                <Select 
                                    className="fieldDataProfit" size="large"
                                    value={userSelected}
                                    onChange={(value) => setUserselected(value)}
                                >
                                    <Select.Option value="">
                                        All Users
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
                        scroll={{ x: 800 }}
                        dataSource={Datastatistical?.items} 
                        pagination={{current: Datastatistical?.pageCurrent,pageSize:Datastatistical?.limit,total: Datastatistical.totalitem}} 
                        onChange={handleTableChange}
                        style={{marginTop:"20px"}}/>
                        <div style={{display:"flex",justifyContent:"flex-end",marginTop:"20px"}}>
                            <h3>Total Revenue: {formatPrice(Datastatistical.totalprofit || 0)}</h3>
                        </div>
                </ProfitBody>
            </ProfitContainer>
        </WrapperProfit>
  );
}