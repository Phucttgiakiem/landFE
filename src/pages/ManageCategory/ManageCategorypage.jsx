import {WrapperManageCategory,ManageCategoryContainer,ManageCategoryHeader,
    TabsContainer,TabButton,ManageCategoryBody
} from "./style";
import {WarningTwoTone} from '@ant-design/icons';
import { Table,Space,Modal,Button,Flex, Spin } from "antd";
import { useSelector,useDispatch } from "react-redux";
import {setCategorypage,setLoadingManage,setPage,setSort,setFilter,setFilterClean,setCategories,setLoading} from "../../redux/slides/CategorySlide";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import CategoryComponent from "../../components/CategoryComponent/CategoryComponent";
import {getAllCategoryforadmin,createCategory,updateCategory,deleteCategory,getCategory} from "../../services/CategoriesService";
import {formatDateVN} from "../../utils";
import { useEffect, useState } from "react";
import {useMessage} from "../../components/Message/Message";
const tabsData = [
    {
        key: 'all',
        label: 'Tất cả',
        filter: {}
    },
    {
        key: 'Nhà đất bán',
        label: 'Nhà đất bán',
        filter: {
            Type: "Nhà đất bán"
        }
    },
    {
        key: "Nhà đất cho thuê",
        label: "Nhà đất cho thuê",
        filter: {
            Type: "Nhà đất cho thuê"
        }
    }
]
const getColumns = (handleEditClick,openConfirmModal) => [
    {
        title: 'Tên Danh mục',
        dataIndex: 'Name',
        width:400,
    },
    {
        title: 'Loại danh mục',
        dataIndex: "Type",
        width: 150,
    },
    {
        title: 'Ngày tạo',
        dataIndex: "createdAt",
        render: (value) => formatDateVN(value),
        sorter: true,
        width: 150,
    },
    {
        title: "Ngày cập nhật",
        dataIndex: "updatedAt",
        render: (value) => formatDateVN(value),
        sorter: true,
        width: 150,
    },
    {
        title: "Hành động",
        dataIndex: '',
        key: 'x',
        render: (_, record) =>
            <Space>
                <span style={{cursor:"pointer"}} onClick={() => handleEditClick(record)}>Edit</span>
                <span  style={{cursor:"pointer"}} onClick={() => openConfirmModal(record._id)}>Delete</span>
            </Space>,
         width:210
    }
]
export default function ManageCategorypage () {
    const [pendingData,setPendingData] = useState("");
    const [loadingModal,setLoadingModal] = useState(false);
    const [loadingModalDelete,setLoadingModalDelete] = useState(false);
    const [loadingTable,setLoadingTable] = useState(false);
    const [open,setOpen] = useState(false);
    const [openModalDelete,setOpenModaldelete] = useState(false);
    const [selectedCategory,setSelectedCategory] = useState(null);
    const {item,page,limit,total,filter,sort} = useSelector(state => state.Category.ManageCategory)
    const [activeTab, setActiveTab] = useState('all');
    const message = useMessage();
    const dispatch = useDispatch();
    
    const fetchData = async () => {
            try {
                setLoadingTable(true);
                const searchParams = new URLSearchParams();
                searchParams.append("limit",limit);
                searchParams.append("page",page);
                
                searchParams.append(
                    "filter",
                    JSON.stringify({
                        ...filter,
                    })
                );
                searchParams.append("sort",
                    JSON.stringify({
                        ...sort
                    })
                )
                const res = await getAllCategoryforadmin(searchParams);
    
                const totalPage = res.data.totalPage;
    
                if (page > totalPage && totalPage > 0) {
                    dispatch(setPage({ pageCurrent: totalPage }));
                    return;
                }
                dispatch(setCategorypage({
                    data: res.data.data || [],
                    total: res.data.total,
                    totalPage: res.data.totalPage
                }));
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setLoadingManage(false));
                setLoadingTable(false);
            }
        };
    const handleCreateClick = () => {
        setSelectedCategory(null);
        setOpen(true);
    }
    const handleEditClick = (category) => {
        setSelectedCategory(category);
        setOpen(true);
    }
    const handlecreateCategory = async (payload) => {
        try {
            setLoadingModal(true);
            await createCategory(payload);
            message.success("Tạo mới danh mục thành công");
            setOpen(false);
            fetchData();
            updateCategoryheaderwebsite();
        } catch (error) {
            message.error(error.response.data.message);
        }finally {
            setLoadingModal(false);
        }
    };
    const openConfirmModal = (idrecord) => {
        setPendingData(idrecord);
        setOpenModaldelete(true);
    }
    const columns = getColumns(handleEditClick,openConfirmModal);
    const updateCategoryheaderwebsite = async() => {
        dispatch(setLoading(true));
        const {data} = await getCategory();
        dispatch(setCategories({...data}));
        dispatch(setLoading(false));
    }
    const handleupdateCategory = async (id, payload) => {
        try {
            setLoadingModal(true)
            await updateCategory(id, payload);
            message.success("Cập nhật danh mục thành công");
            setOpen(false);
            fetchData();
            updateCategoryheaderwebsite();
        } catch (error) {
            message.error(error.response.data.message);
        }finally {
            setLoadingModal(false);
        }
    };
    const handleDeleteCategory = async () => {
        try {
            await deleteCategory(pendingData);
            message.success("Xóa danh mục đã chọn thành công");
            fetchData();
            updateCategoryheaderwebsite();
        }catch(error){
            message.error(error.response.data.message);
        }finally {
            setLoadingModalDelete(false);
            setOpenModaldelete(false);
        }
    }
    useEffect(()=>{
        fetchData()
    },[page,filter,sort]);
    const handleTableChange = (pagination,filters, sorter) => {
            dispatch(setPage({pageCurrent: pagination.current}));
            dispatch(setSort({
                field: sorter.field,
                order: sorter.order
            }));
            dispatch(setFilter({
                ...filter,        
            }));
        }
    return (
        <>
            <CategoryComponent
                open={open}
                loading={loadingModal}
                onClose={() => setOpen(false)}
                category={selectedCategory}
                onCreate={handlecreateCategory}
                onUpdate={handleupdateCategory}
            />
            <Modal
                centered
                open={openModalDelete}
                closable={false}
                width={500}
                footer={
                    !loadingModalDelete && (<div style={{ display:'flex', justifyContent: 'center', gap: '10px' }}>
                        <Space>
                            <Button 
                                size="large" 
                                onClick={() => setOpenModaldelete(false)}>
                                    Hủy
                            </Button>
                            <Button 
                                size="large" 
                                type="primary" 
                                danger={true}
                                onClick={() => { setLoadingModalDelete(true); handleDeleteCategory(); }}>
                                    Xác nhận
                            </Button>
                        </Space>
                    </div>
                    )
                }
            >
                <Space  style={{ display:'flex',flexDirection: 'column',minHeight:200,justifyContent: 'center' }} align="center">
                    {
                        !loadingModalDelete ? (
                            <>
                                <WarningTwoTone twoToneColor="#eb2f2f" style={{ fontSize: '40px' }} />
                                <p style={{ textAlign: 'center',fontSize:"20px" }}>
                                        Việc này sẽ xóa vĩnh viễn danh mục, bao gồm các nội dung khác có liên kết với danh mục sẽ xóa
                                         bạn cần cân nhắc !!! </p>
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
            <WrapperManageCategory>
                <ManageCategoryContainer>
                    <ManageCategoryHeader>
                        <h2>Quản lý danh mục tin</h2>
                        <ButtonComponent 
                            textButton="Tạo mới" 
                            size="large" 
                            color="danger" 
                            variant="solid"   
                            onClick={() => handleCreateClick()}
                        />
                    </ManageCategoryHeader>
                    <TabsContainer>
                            {tabsData.map(tab => (
                                <TabButton 
                                    key={tab.key} 
                                    className={activeTab === tab.key ? 'active' : ''}
                                    onClick={() => {
                                        dispatch(setFilterClean({...tab.filter}));
                                        dispatch(setPage({ pageCurrent: 1 }));
                                        setActiveTab(tab.key);
                                    }}
                                    >
                                        {tab.label}
                                </TabButton>
                            ))}
                        </TabsContainer>
                        <ManageCategoryBody>
                            <Table
                                columns={columns}
                                loading={loadingTable}
                                rowKey={record => record._id}
                                dataSource={item} 
                                pagination={{current:page,pageSize:limit,total:total}} 
                                onChange={handleTableChange}
                                scroll={{ x: 900 }}
                            />
                        </ManageCategoryBody>
                </ManageCategoryContainer>
            </WrapperManageCategory>
        </>
        
    )
}