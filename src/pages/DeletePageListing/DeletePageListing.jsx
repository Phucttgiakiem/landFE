import {useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { SearchOutlined,WarningTwoTone } from '@ant-design/icons';
import { Table,Space,Select,Modal,Button,Flex, Spin } from "antd";
import { Link } from 'react-router-dom';
import {useMessage} from "../../components/Message/Message";
import { useMutationHook } from "../../hooks/useMutationhook";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {setListingsDeleted,setPage,setSort} from "../../redux/slides/ListingSlide";
import * as ListingService from "../../services/ListingService";
import { WrapperDeletedListing, DeletedListingContainer, DeletedListingHeader, DeletedListingHeaderContent,
    SearchContainer, SearchButton,DeletedListingBody
} from './style'

const getColumns  = (handleRestoreorDelete) => [
    {
        title: 'Tên bất động sản',
        dataIndex: 'Title',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        sorter: true
    },
    {
        title: 'Ngày xóa',
        dataIndex: 'deletedAt',
        sorter: true
    },
    {
        title: 'Hành động',
        dataIndex: '',
        key: 'x',
        render: (_, record) => 
            <Space>
                <span style={{cursor: 'pointer'}} onClick={() => handleRestoreorDelete(record._id, "Khôi phục")}>Restore</span>
                <Link to={`/Detail-listing/${record._id}`} state={{ from: "trash" }}>Detail</Link>
                <Link to={`/Edit-listing/${record._id}`}>Delete</Link>
            </Space>
        
    }
]
export default function DeleteListingPage() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading,setLoading] = useState(false);
    const [loadingModal,setLoadingModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [typeAction,setTypeAction] = useState(null);
    const Listing = useSelector(state => state.listing);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const message = useMessage();
    const mutation = useMutationHook(
                ({ arrid, action }) => {
                    if (action === "Xóa") {
                        return ListingService.hardDeleteListing({ arrid });
                    } else if (action === "Khôi phục") {
                        return ListingService.restoreListing({ arrid });
                    }
                },{
                    onSuccess: () => {
                        setConfirmModal(false);
                        setLoadingModal(false);
                        message.success(`Thao tác ${typeAction} thành công`);
                        setSelectedRowKeys([]);
                        setTypeAction("");
                        fetchData();
                    },
                    onError: () => {
                        setConfirmModal(false);
                        setLoadingModal(false);
                        message.error(`Thao tác ${typeAction} thất bại`);
                        setTypeAction("");
                    }
                }
            );
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    }
    const handleRestoreorDelete = (arrId,typeAc) => {
        setLoading(true);
        const payload = {
            arrid: Array.isArray(arrId) ? arrId : [arrId],
            action: typeAction  || typeAc
        };
        if(typeAc) {
            setTypeAction(typeAc);
        }
        mutation.mutate(payload);
    }
    const handleActionSelected = () => {
        if(typeAction === null || typeAction === "") {
            message.warning("Vui lòng chọn hành động để áp dụng");
            return;
        }
        if(selectedRowKeys.length === 0) {
            message.warning("Vui lòng chọn ít nhất một tin đăng để "+typeAction);
            return;
        }  
        if(typeAction === "Xóa") {
            setConfirmModal(true);
            return;
        }else {
            handleRestoreorDelete(selectedRowKeys);
        }
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
    };
    const columns = getColumns(handleRestoreorDelete);
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
                const res = await ListingService.getAllDeletedListing(searchParams);
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
        },[Listing?.page,Listing?.sort]);
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
                    <div style={{ display: !loadingModal ? 'flex' : 'none', justifyContent: 'center', gap: '10px' }}>
                        <Space>
                            <Button 
                                size="large" 
                                onClick={() => setConfirmModal(false)}>
                                    Hủy
                            </Button>
                            <Button 
                                size="large" 
                                type="primary" 
                                danger 
                                onClick={() => { setLoadingModal(true); handleRestoreorDelete(selectedRowKeys,"Xóa")}}>
                                    Xác nhận
                            </Button>
                        </Space>
                    </div>
                }
            >
                <Space  style={{ display:'flex',flexDirection: 'column',minHeight:200,justifyContent: 'center' }} align="center">
                    {
                        !loadingModal ? (
                            <>
                                <WarningTwoTone twoToneColor="#eb2f2f" style={{ fontSize: '40px' }} />
                                <p style={{ textAlign: 'center',fontSize:"20px" }}>Việc này sẽ xóa bài đăng của bạn vĩnh viễn, bạn có chắc chắn muốn xóa không?</p>
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
                        <h2>Danh sách đã xóa</h2>
                    </DeletedListingHeader>
                    <DeletedListingHeaderContent>
                        <SearchContainer>
                                <SearchButton>
                                    <SearchOutlined/>
                                </SearchButton>
                                <input type="text" placeholder="Tìm kiếm tin đã xóa..."/>
                            </SearchContainer>
                    </DeletedListingHeaderContent>
                    <div style={{margin: ' 10px 20px', display: 'flex', gap: '10px'}}>
                        <Select
                            value={typeAction}
                            placeholder="--- lựa chọn ---"
                            style={{ width: 180 }}
                            options={[
                                { value: 'Xóa', label: 'Xóa' },
                                { value: 'Khôi phục', label: 'Khôi phục' },
                            ]}
                            size="large"
                            onChange={(value) => setTypeAction(value)}
                        />
                        <ButtonComponent 
                            textButton="Áp dụng" 
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
                        />
                    </DeletedListingBody>
                </DeletedListingContainer>
            </WrapperDeletedListing>
        </>
    )
}