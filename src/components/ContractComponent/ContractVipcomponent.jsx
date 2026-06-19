import {ContractHeaderContent,ContractVipContainer,TabsContainer,TabButton,WrapperRangerPickernotmobile,WrapperRangerPickermobile} from "./style";
import { Space,DatePicker,Table } from "antd"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {formatDateVN} from "../../utils";
import { Link,useNavigate } from "react-router-dom"
import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {getAllContract} from "../../services/ContractService";
import {setContract,setPage,setSort,setFilter,resetFilter} from "../../redux/slides/ContractSlide";
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
const tabsData = [
    {
        key: 'all',
        label: 'Tất cả',
    },
    {
        key: 'Sale',
        label: 'Bán',
        field: 'typeContract',
        value: 'sale',
    },
    {
        key: 'Rent',
        label: 'Cho thuê',
        field: 'typeContract',
        value: 'rent',
        
    },
    {
        key: 'Mới tạo',
        label: 'Mới tạo',
        field: 'status',
        value: 'mới tạo'
    },
    {
        key: 'đã ký',
        label: 'đã ký',
        field: 'status',
        value: 'đã ký'
    },
    {
        key: 'hủy',
        label: 'hủy',
        field: 'status',
        value: 'hủy'
    },
]
const getColumns = (role,iduser) => [
    {
        title: 'Tên bất động sản',
        dataIndex: ['propertySnapshot', 'title'],
        width: 300
    },
    {
        title: 'Ngày tạo hợp đồng',
        dataIndex: 'createdAt',
        render: (value) => formatDateVN(value),
        sorter: true,
        width: 100
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status', 
        width: 100   
    },
    {
        title: 'Hành động',
        dataIndex: '',
        key: 'x',
        render: (_, record) => 
            <Space>
                {role !== "user" && iduser === record.ownerId && <Link to={`/Contract/Edit/${record._id}`}>Edit</Link>}
                <Link to={`/Contract/Detail/${record._id}`}>Detail</Link>
            </Space>,
        width: 100
        
    }
]
export default function ContractVipcomponent () {
    const [isloading, setLoading] = useState(false);
    
    const [filterdate, setFilterDate] = useState({
        startDate: null,
        endDate: null,
    });
    const contracts = useSelector(state => state.contract);
    const user = useSelector(state => state.user);
    const columns = getColumns(user?.role,user?.id);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const fetchData = async () => {
            try {
                setLoading(true);
    
                const searchParams = new URLSearchParams();
                searchParams.append("limit", contracts.limit);
                searchParams.append("page", contracts.page);
                
                searchParams.append(
                    "filter",
                    JSON.stringify({
                        ...contracts.filter,
                    })
                );
                searchParams.append("sort",
                    JSON.stringify({
                        ...contracts.sort
                    })
                )
                const res = await getAllContract(searchParams,user?.id,user?.role);
    
                const totalPage = res.totalPage;
    
                if (contracts.page > totalPage && totalPage > 0) {
                    dispatch(setPage({ pageCurrent: totalPage }));
                    return;
                }
                dispatch(setContract({
                    data: res.arrcontract || [],
                    total: res.total,
                    totalPage: res.totalPages
                }));
    
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
    };
    const handleTableChange = (pagination,_, sorter) => {
            dispatch(setPage({pageCurrent: pagination.current}));
            dispatch(setSort({
                field: sorter.field,
                order: sorter.order
            }));
            dispatch(setFilter({
                ...contracts.filter,
            }));
    }
    useEffect(() => {
            dispatch(setPage({ pageCurrent: 1 }));
    }, []);
    useEffect (() =>{
        fetchData();
    },[contracts?.page,contracts?.filter,contracts?.sort])
    return (
        <ContractVipContainer>
            <ContractHeaderContent>
                <WrapperRangerPickernotmobile>
                    <RangePicker 
                        value={[
                            filterdate.startDate
                            ? dayjs(filterdate.startDate, "DD/MM/YYYY")
                            : null,
                            filterdate.endDate
                            ? dayjs(filterdate.endDate, "DD/MM/YYYY")
                            : null
                        ]}
                        format="DD/MM/YYYY"size="large" 
                        onChange={(date,dateStrings) => {
                            if (!date || !dateStrings?.[0]) {
                                setFilterDate({
                                    startDate: null,
                                    endDate: null,
                                });
                                return;
                            }

                            setFilterDate({
                                startDate: dateStrings[0],
                                endDate: dateStrings[1],
                            });
                        }}
                        allowClear
                    />
                    
                    <ButtonComponent 
                        textButton="Tìm" 
                        size="large" 
                        color="danger" 
                        variant="solid"  
                        onClick={() => {

                            const newFilter = {
                                ...contracts.filter,
                            };

                            // có chọn ngày mới add createdAt
                            if (filterdate.startDate || filterdate.endDate) {
                                newFilter.createdAt = {
                                    gte: filterdate.startDate,
                                    lte: filterdate.endDate,
                                };
                            } else {
                                // xoá filter ngày
                                delete newFilter.createdAt;
                            }

                            dispatch(setFilter(newFilter));
                            dispatch(setPage({ pageCurrent: 1 }));
                        }}
                    />
                </WrapperRangerPickernotmobile>
                <WrapperRangerPickermobile>
                    <DatePicker value={
                            filterdate.startDate
                            ? dayjs(filterdate.startDate, "DD/MM/YYYY")
                            : null}
                        format="DD/MM/YYYY" size='large' placeholder="startDate" style={{width:"100%"}} 
                    allowClear onChange={(date, dateString) => {
                        if (
                            filterdate.endDate &&
                            dayjs(dateString, "DD/MM/YYYY").isAfter(
                                dayjs(filterdate.endDate, "DD/MM/YYYY")
                            )
                        ) {
                            setFilterDate({
                                startDate: dateString,
                                endDate: null,
                            });
                            return;
                        }

                        setFilterDate(prev => ({
                            ...prev,
                            startDate: dateString
                        }));
                    }}/>
                    <DatePicker value={
                            filterdate.endDate
                            ? dayjs(filterdate.endDate, "DD/MM/YYYY")
                            : null} format="DD/MM/YYYY" size='large' placeholder="endDate" style={{width:"100%"}} allowClear
                        onChange={(date, dateString) => {

                            if (
                                filterdate.startDate &&
                                dayjs(dateString, "DD/MM/YYYY").isBefore(
                                    dayjs(filterdate.startDate, "DD/MM/YYYY")
                                )
                            ) {
                                return;
                            }

                            setFilterDate(prev => ({
                                ...prev,
                                endDate: dateString
                            }));
                        }}
                    />
                    <div style={{display:"flex",flexDirection:"row",gap:10}}>
                        <ButtonComponent 
                            textButton="Tìm" 
                            size="large" 
                            color={filterdate.startDate && filterdate.endDate ? "danger" : "default"} 
                            variant={filterdate.startDate && filterdate.endDate ? "solid": "filled"}  
                            styleButton={{width:"50%"}}
                            onClick={() => {
                                const newFilter = {
                                    ...contracts.filter,
                                };

                                // có chọn ngày mới add createdAt
                                if (filterdate.startDate || filterdate.endDate) {
                                    newFilter.createdAt = {
                                        gte: filterdate.startDate,
                                        lte: filterdate.endDate,
                                    };
                                } else {
                                    // xoá filter ngày
                                    delete newFilter.createdAt;
                                }

                                dispatch(setFilter(newFilter));
                                dispatch(setPage({ pageCurrent: 1 }));
                            }}
                            disabled={!filterdate.startDate || !filterdate.endDate}
                        />
                        <ButtonComponent 
                            textButton="Clear Date" 
                            size="large"   
                            styleButton={{width:"50%",backgroundColor:"#9900ff",color:"#ffffff"}}
                            onClick={() => setFilterDate({startDate:null,endDate:null})}
                        />
                    </div>
                    
                </WrapperRangerPickermobile>
                {
                    user?.role !== "user" && 
                    <ButtonComponent 
                        textButton="Tạo mới" 
                        size="large" 
                        className="btn-create"
                        onClick={() => navigate("/Contract/Create")}
                    />
                }
                
            </ContractHeaderContent>
            <TabsContainer>
                {tabsData.map(tab => (
                    <TabButton 
                        key={tab.key} 
                       onClick={() => {

                            const multiFields = [
                                "typeContract",
                                "status"
                            ];

                            // ALL
                            if (tab.key === "all") {

                                dispatch(resetFilter());

                                dispatch(setPage({
                                    pageCurrent: 1
                                }));

                                setFilterDate({
                                    startDate: null,
                                    endDate: null,
                                });

                                return;
                            }

                            const isMultiField =
                                multiFields.includes(tab.field);

                            // clone filter
                            const newFilter = {
                                ...contracts.filter
                            };

                            // check selected
                            const isSelected = isMultiField
                                ? (
                                    contracts.filter[tab.field] || []
                                ).includes(tab.value)
                                : contracts.filter[tab.field] === tab.value;

                            // REMOVE
                            if (isSelected) {

                                if (isMultiField) {

                                    const currentValues = [
                                        ...(contracts.filter[tab.field] || [])
                                    ];

                                    const updatedValues =
                                        currentValues.filter(
                                            item => item !== tab.value
                                        );

                                    // hết value => xoá field
                                    if (updatedValues.length > 0) {

                                        newFilter[tab.field] =
                                            updatedValues;

                                    } else {

                                        delete newFilter[tab.field];
                                    }

                                } else {

                                    delete newFilter[tab.field];
                                }

                            } else {

                                // ADD
                                if (isMultiField) {

                                    const currentValues =
                                        contracts.filter[tab.field] || [];

                                    newFilter[tab.field] = [
                                        ...new Set([
                                            ...currentValues,
                                            tab.value
                                        ])
                                    ];

                                } else {

                                    newFilter[tab.field] =
                                        tab.value;
                                }
                            }

                            dispatch(setFilter(newFilter));

                            dispatch(setPage({
                                pageCurrent: 1
                            }));
                        }}
                        className={
                                tab.key === "all"

                                ? Object.keys(contracts.filter).length === 0
                                    ? "active"
                                    : ""

                                : (
                                    contracts.filter[tab.field] || []
                                ).includes(tab.value)

                                    ? "active"
                                    : ""
                            }
                        >
                            {tab.label}
                    </TabButton>
                ))}
            </TabsContainer>
            <Table 
                columns={columns} 
                loading={isloading}
                rowKey={record => record._id}   
                dataSource={contracts.contract}
                pagination={{current: contracts.page,pageSize: contracts.limit,total: contracts.total}} 
                onChange={handleTableChange}
                scroll={{ x: 800 }}
            />
        </ContractVipContainer>
    )
}