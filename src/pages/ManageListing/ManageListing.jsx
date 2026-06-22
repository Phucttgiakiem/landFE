import { WrapperManageListing,ManageListingContainer,
    ManageListingHeader,ManageListingHeaderContent,SearchContainer
    ,SearchButton,TabsContainer,TabButton,ManageListingBody,Selectownerproperty,WrapperCreateandtrash } from "./style";
import {SearchOutlined,RestOutlined} from '@ant-design/icons';
import { Table,Space,Badge,Select} from "antd";
import { useNavigate,Link,useSearchParams } from "react-router-dom";
import {useEffect,useState} from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {useMessage} from "../../components/Message/Message";
import { useMutationHook } from "../../hooks/useMutationhook";
import * as ListingService from "../../services/ListingService";
import {getAllowner} from "../../services/UserService";
import {formatDateVN,formatPrice} from "../../utils";
import { useSelector,useDispatch } from "react-redux";
import {setListings,setPage,setSort,setFilter,setcountdeleted,setFilterClean} from "../../redux/slides/ListingSlide";
const tabsData = [
    {
        key: 'all',
        label: 'Tất cả',
        filter: {}
    },
    {
        key: 'hết hạn',
        label: 'Hết hạn',
        filter: {
            visibility_status: 'hết hạn'
        }
    },
    {
        key: 'công khai',
        label: 'Đang hiển thị',
        filter: {
            visibility_status: 'công khai'
        }
    },
    {
        key: 'chưa xác thực',
        label: 'Đang chờ duyệt',
        filter: {
            approval_status: 'chưa xác thực',
        }
    },
    {
        key: 'đã xác thực',
        label: 'Đã duyệt',
        filter: {
            approval_status: 'đã xác thực',
        }
    },
    {
        key: 'từ chối',
        label: 'Bị từ chối',
        filter: {
            approval_status: 'từ chối',
        }
    },
    {
        key: 'ẩn',
        label: 'Bị ẩn',
        filter: {
            visibility_status: 'ẩn',
        }
    },
    {
        key: 'bị khóa',
        label: 'Bị khóa',
        filter: {
            visibility_status: 'bị khóa',
        }
    }
]
const getColumns = (handleDelete,iduser,selectedowner) => [
    {
        title: 'Tên bất động sản',
        dataIndex: 'Title',
        width:400,
    },
    {
        title: 'Giá',
        dataIndex: 'Price',
        render: (value) => formatPrice(value),
        sorter: true,
        width:200,
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        render: (value) => formatDateVN(value),
        sorter: true,
        width:180
    },
    {
        title: 'Trạng thái',
        dataIndex: 'approval_status',
        width:150    
    },
    {
        title: 'Hành động',
        dataIndex: '',
        key: 'x',
        render: (_, record) => 
            <Space>
                {record?.User === iduser && <span style={{cursor: 'pointer'}} onClick={() => handleDelete(record._id)}>Delete</span>}
                <Link to={`/manage-listing/Edit-listing/${record._id}?owner=${selectedowner}`}>Edit</Link>
                <Link to={`/manage-listing/Detail-listing/${record._id}?owner=${selectedowner}`} state={{ from: "listings" }}>Detail</Link>
            </Space>,
        width:210
        
    }
]
export default function ManageListing() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [keywordfind,setKeywordfind] = useState("");
    const [loading,setLoading] = useState(false);
    const [listowner,setListowner] = useState([]);
    const user = useSelector(state => state.user);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedowner =
        searchParams.get("owner") ||
        `${user?.id}`;
    
    const Listing = useSelector(state => state.listing);
    const token = localStorage.getItem("access_token");
    const dispatch = useDispatch();
    const message = useMessage();
    const navigate = useNavigate();
    const mutation = useMutationHook(
            (data) => ListingService.softDeleteListing(data),
            {
                onSuccess: () => {
                    message.success("Đã chuyển tin đăng vào thùng rác");
                    fetchData();
                    
                },
                onError: () => {
                    message.error("Xóa tin đăng thất bại");
                    setLoading(false);
                }
            }
        );
    const handleDelete = (arrid) => {
        setLoading(true);
        if(Array.isArray(arrid)) {
            mutation.mutate({arrid: arrid,typedelete:'soft',token:token,id:user?.id});
        }else {
            mutation.mutate({arrid: [arrid],typedelete:'soft',token:token,id:user?.id});
        }
    };
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    }
    const handleDeleteSelected = () => {
        if(selectedRowKeys.length === 0) {
            message.warning("Vui lòng chọn ít nhất một tin đăng để xóa");
            return;
        }
        handleDelete(selectedRowKeys);
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        preserveSelectedRowKeys: true,
        selections: [
            {
                key: 'all',
                text: 'Chọn tất cả',
                onSelect: (changeableRowKeys) => {
                    setSelectedRowKeys(prev => [
                    ...new Set([...prev, ...changeableRowKeys])
                    ]);
                }
            },
            {
                key: 'none',
                text: 'Bỏ chọn tất cả',
                onSelect: (changeableRowKeys) => {
                    setSelectedRowKeys(prev => prev.filter(key => !changeableRowKeys.includes(key)));   
                }
            }
        ]
    }
    const columns = getColumns(handleDelete,user?.id,selectedowner);
    const fetchData = async () => {
        try {
            setLoading(true);

            const searchParams = new URLSearchParams();
            searchParams.append("limit", Listing.limit);
            searchParams.append("page", Listing.page);
            
            searchParams.append(
                "filter",
                JSON.stringify({
                    ...Listing.filter,
                    User:user.role !== "admin" ? user.id : selectedowner.split("-")[0]  
                })
            );
            searchParams.append("sort",
                JSON.stringify({
                    ...Listing.sort
                })
            )
            const res = await ListingService.getAllmeListing(searchParams);

            const totalPage = res.data.totalPage;

            if (Listing.page > totalPage && totalPage > 0) {
                dispatch(setPage({ pageCurrent: totalPage }));
                return;
            }
            dispatch(setListings({
                data: res.data.data || [],
                total: res.data.total,
                totalPage: res.data.totalPage
            }));
            dispatch(setcountdeleted(res.data.itemdeleted));

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const handleSearch = () => {
        dispatch(setFilter({
            ...Listing.filter,
            keyword: keywordfind ?? ""
        }));

        // reset page nếu cần
        if (Listing.page !== 1) {
            dispatch(setPage({ pageCurrent: 1 }));
        }
    };
    const normalizeFilters = (filters) => {
        const result = {};
        for (let key in filters) {
            if (filters[key]) {
                result[key] = filters[key][0];
            }else {
                result[key] = null; // reset filter
        }
        }
        return result;
    };
    
    useEffect(() => {
        dispatch(setPage({ pageCurrent: 1 }));
    }, []);
    useEffect (() =>{
        fetchData();
    },[Listing?.page,Listing?.filter,Listing?.sort,selectedowner,user?.id]);
    useEffect (() => {
        const fetchData = async () => {
            try {
                const response = await getAllowner(user?.access_Token);
                setListowner(response.owner);
            }catch(e){
                console.log(e)
            }
        }
        fetchData();
    },[user?.id,user?.role])
    const handleTableChange = (pagination,filters, sorter) => {
        dispatch(setPage({pageCurrent: pagination.current}));
        dispatch(setSort({
            field: sorter.field,
            order: sorter.order
        }));

        const tableFilter = normalizeFilters(filters);
        dispatch(setFilter({
            ...Listing.filter,                  
            ...tableFilter        
        }));
    }
    
    
    return (
            <WrapperManageListing>
                <ManageListingContainer>
                    <ManageListingHeader>
                        <h2>Quản lý tin đăng</h2>
                        <ManageListingHeaderContent>
                            <SearchContainer>
                                <SearchButton onClick={() => handleSearch()}>
                                    <SearchOutlined/>
                                </SearchButton>
                                <input 
                                    type="text" 
                                    placeholder="Tìm kiếm tin đăng..." 
                                    value={keywordfind}
                                    onChange={(e) => setKeywordfind(e.target.value)}
                                    />
                            </SearchContainer>
                            {
                                user?.role === "admin" &&
                                <Selectownerproperty>
                                    <Select
                                        placeholder="Chọn tên người đăng bài đăng"
                                        className="select-owner"
                                        variant="underlined"
                                        value={selectedowner}
                                        options={
                                            listowner.map(item => (
                                                {value:item._id,label:item.fullname+" - "+item.phone}
                                            ))
                                        }
                                        onChange={(value) => {
                                            setSearchParams(prev => {
                                                const params = new URLSearchParams(prev);

                                                if (!value) {
                                                    params.set(
                                                        "owner",
                                                        `${user?.id}`
                                                    );
                                                } else {
                                                    params.set("owner", value);
                                                }

                                                return params;
                                            });
                                        }}
                                        allowClear
                                    />
                                </Selectownerproperty>
                            }
                            
                            <WrapperCreateandtrash>
                                {
                                (selectedowner === user?.id || user?.role !== "admin") && 
                                    <Badge count={Listing.itemdeleted} className="btn-trash">
                                        <ButtonComponent 
                                            size="large" 
                                            textButton={<RestOutlined style={{fontSize: 24}}/>}
                                            onClick={() => { navigate(`/manage-listing/Delete-listing?owner=${selectedowner}`)}}    
                                        />
                                    </Badge>
                                }
                                <ButtonComponent 
                                    textButton="Tạo mới" 
                                    size="large" 
                                    color="danger" 
                                    variant="solid"
                                    onClick={() => navigate('/manage-listing/create-listing')}    
                                />
                            </WrapperCreateandtrash>
                        </ManageListingHeaderContent>
                        
                    </ManageListingHeader>
                    <TabsContainer>
                        {tabsData.map(tab => (
                            <TabButton 
                                key={tab.key} 
                                onClick={() => 
                                    {
                                        dispatch(setFilterClean({...tab.filter}));
                                        dispatch(setPage({ pageCurrent: 1 }));
                                        setActiveTab(tab.key);
                                }}
                                className={activeTab === tab.key ? 'active' : ''}
                                >
                                    {tab.label}
                            </TabButton>
                        ))}
                    </TabsContainer>
                   
                    <div style={{margin: ' 10px 20px'}}>
                            {
                                selectedowner.split("-")[0] === user?.id && (
                                    <ButtonComponent 
                                        textButton="Xóa tin đã chọn" 
                                        size="large"
                                        color="danger" 
                                        variant="outlined"
                                        onClick={handleDeleteSelected}
                                        />
                                )
                        }
                    </div>
                        
                    
                    <ManageListingBody>
                        <Table 
                            rowSelection={selectedowner.split("-")[0] === user?.id && rowSelection}
                            columns={columns} 
                            rowKey={record => record._id} 
                            dataSource={Listing.listings.active} 
                            loading={loading} 
                            pagination={{current: Listing?.page,pageSize:Listing?.limit,total: Listing.total}} 
                            onChange={handleTableChange}    
                            scroll={{ x: 1000 }}
                        />
                    </ManageListingBody>
                </ManageListingContainer>
            </WrapperManageListing>
    )
}