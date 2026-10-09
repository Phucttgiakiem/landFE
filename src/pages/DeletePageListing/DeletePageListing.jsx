import {useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { SearchOutlined,WarningTwoTone } from '@ant-design/icons';
import { Table,Space,Select,Modal,Button,Flex, Spin } from "antd";
import { useNavigate,useLocation } from 'react-router-dom';
import {useMessage} from "../../components/Message/Message";
import { useMutationHook } from "../../hooks/useMutationhook";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {setListingsDeleted,setPage,setSort} from "../../redux/slides/ListingSlide";
import * as ListingService from "../../services/ListingService";
import { WrapperDeletedListing, DeletedListingContainer, DeletedListingHeader, DeletedListingHeaderContent,
    SearchContainer, SearchButton,DeletedListingBody
} from './style'

const getColumns  = (openConfirmModal) => [
    {
        title: 'Title of listing',
        dataIndex: 'Title',
        width:400
    },
    {
        title: 'Date Created',
        dataIndex: 'createdAt',
        sorter: true,
        width:150
    },
    {
        title: 'Date Deleted',
        dataIndex: 'deletedAt',
        sorter: true,
        width:150
    },
    {
        title: 'Actions',
        dataIndex: '',
        key: 'x',
        width:200,
        render: (_, record) => 
            <Space>
                <span style={{cursor: 'pointer'}} onClick={() => openConfirmModal(record._id, "Khôi phục")}>Restore</span>
                <span style={{cursor: 'pointer'}} onClick={() => openConfirmModal(record._id,"Xóa")}>Delete</span>
            </Space>
        
    }
]
export default function DeleteListingPage() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedAction,setSelectedAction] = useState(null);
    const [pendingData,setPendingData] = useState({
        ids: [],
        action: ""
    })
    const [loading,setLoading] = useState(false);
    const [loadingModal,setLoadingModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const Listing = useSelector(state => state.listing);
    const user = useSelector(state => state.user);
    const location = useLocation();
    const token = localStorage.getItem("access_token");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const message = useMessage();
    const mutation = useMutationHook(
                ({ arrid, action }) => {
                    if (action === "Xóa") {
                        return ListingService.hardDeleteListing({ arrid,id:user.id,token,typedelete:"harddelete" });
                    } else if (action === "Khôi phục") {
                        return ListingService.restoreListing({ arrid,id:user.id,token });
                    }
                },{
                    onSuccess: () => {
                        setConfirmModal(false);
                        setLoadingModal(false);
                        message.success(`Thao tác ${pendingData.action} thành công`);
                        setSelectedRowKeys([]);
                        setPendingData({
                            ids: [],
                            action: ""
                        })
                        fetchData();
                    },
                    onError: () => {
                        setConfirmModal(false);
                        setLoadingModal(false);
                        message.error(`Thao tác ${pendingData.action} thất bại`);
                        setPendingData({
                            ids: [],
                            action: ""
                        })
                    }
                }
            );
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    }
    const executeAction = (ids, action) => {
        mutation.mutate({
            arrid: ids,
            action
        });
    };
    const openConfirmModal = (ids, action) => {
        setPendingData({
            ids:Array.isArray(ids) ? ids : [ids],
            action
        });
        setConfirmModal(true);
    };
    const handleActionSelected = () => {
        if(!selectedAction) {
            message.warning("Please select an action to continue");
            return;
        }
        if(selectedRowKeys.length === 0) {
            message.warning("Please select at least one listing to " + selectedAction);
            return;
        }  
        openConfirmModal(selectedRowKeys, selectedAction);
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        preserveSelectedRowKeys: true,
        selections: [
            {
                key: 'all',
                text: 'Select All',
                onSelect: (changeableRowKeys) => {
                    setSelectedRowKeys(prev => [
                    ...new Set([...prev, ...changeableRowKeys])
                    ]);
                }
            },
            {
                key: 'none',
                text: 'Deselect All',
                onSelect: (changeableRowKeys) => {
                    setSelectedRowKeys(prev => prev.filter(key => !changeableRowKeys.includes(key)));   
                }
            }
        ]
    };
    const columns = getColumns(openConfirmModal);
    const fetchData = async () => {
            try {
                setLoading(true);
    
                const searchParams = new URLSearchParams();
                searchParams.append("limit", Listing.limit);
                searchParams.append("page", Listing.page);
                searchParams.append("sort",
                    JSON.stringify({
                        ...Listing.sort
                    })
                )
                const res = await ListingService.getAllDeletedListing(searchParams,user.id,token);
                const {totalPage} = res.data;
                if (Listing.page > totalPage && totalPage > 0) {
                    dispatch(setPage({ pageCurrent: totalPage }));
                    return;
                }
                dispatch(setListingsDeleted({
                    data: res.data.data || [],
                    total: res.data.total,
                    totalPage: res.data.totalPage
                }));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // QUAN TRỌNG
            }
        };
        useEffect(() => {
            dispatch(setPage({ pageCurrent: 1 }));
        }, []);
        useEffect (() =>{
            fetchData();
        },[Listing?.page,Listing?.sort,user?.id]);
        const handleTableChange = (pagination,_,sorter) => {
            dispatch(setPage({pageCurrent: pagination.current}));
            dispatch(setSort({
                field: sorter.field,
                order: sorter.order
            }));
        }
    return (
        <>
            <Modal
                centered
                open={confirmModal}
                closable={false}
                width={500}
                footer={
                    !loadingModal && (<div style={{ display:'flex', justifyContent: 'center', gap: '10px' }}>
                        <Space>
                            <Button 
                                size="large" 
                                onClick={() => setConfirmModal(false)}>
                                    Cancel
                            </Button>
                            <Button 
                                size="large" 
                                type="primary" 
                                danger={pendingData.action === "Xóa"}
                                onClick={() => { setLoadingModal(true); executeAction(pendingData.ids,pendingData.action)}}>
                                    Confirm
                            </Button>
                        </Space>
                    </div>
                    )
                }
            >
                <Space  style={{ display:'flex',flexDirection: 'column',minHeight:200,justifyContent: 'center' }} align="center">
                    {
                        !loadingModal ? (
                            <>
                                <WarningTwoTone twoToneColor="#eb2f2f" style={{ fontSize: '40px' }} />
                                <p style={{ textAlign: 'center',fontSize:"20px" }}>{pendingData.action === "Xóa" 
                                ? "This will permanently delete the listing, are you sure?" 
                                : "Are you sure you want to restore this listing?"}</p>
                            </>
                        ): (
                            <Flex gap="middle" vertical>
                                <Flex gap="middle">
                                    <Spin tip="Loading ..." size="large"><div style={{padding: 50}}></div></Spin>
                                </Flex>
                            </Flex>
                        )
                    }
                </Space>
            </Modal>
            <WrapperDeletedListing>
                <DeletedListingContainer>
                    <DeletedListingHeader>
                        <h2>Deleted Listings</h2>
                        <ButtonComponent 
                            textButton={"Back"} 
                            size="large" 
                            color="cyan" 
                            variant="solid" 
                            onClick={() => navigate(`/manage-listing${location.search}`)}
                        />
                    </DeletedListingHeader>
                    <DeletedListingHeaderContent>
                        <SearchContainer>
                                <SearchButton>
                                    <SearchOutlined/>
                                </SearchButton>
                                <input type="text" placeholder="Search deleted listings..."/>
                            </SearchContainer>
                    </DeletedListingHeaderContent>
                    <div style={{margin: ' 10px 20px', display: 'flex', gap: '10px'}}>
                        <Select
                            value={selectedAction}
                            placeholder="--- Select ---"
                            style={{ width: 180 }}
                            options={[
                                { value: 'Xóa', label: 'Delete' },
                                { value: 'Khôi phục', label: 'Restore' },
                            ]}
                            size="large"
                            onChange={(value) => setSelectedAction(value)}
                        />
                        <ButtonComponent 
                            textButton="Apply" 
                            size="large"
                            color="danger" 
                            variant="outlined"
                            onClick={() => handleActionSelected()}
                            />
                    </div>
                    <DeletedListingBody>
                        <Table 
                            rowSelection={rowSelection}
                            columns={columns} 
                            rowKey={record => record._id} 
                            dataSource={Listing.listings.deleted} 
                            loading={loading} 
                            pagination={{current: Listing?.page,pageSize:Listing?.limit,total: Listing.totalPage}} 
                            onChange={handleTableChange} 
                            scroll={{ x: 900 }}   
                        />
                    </DeletedListingBody>
                </DeletedListingContainer>
            </WrapperDeletedListing>
        </>
    )
}