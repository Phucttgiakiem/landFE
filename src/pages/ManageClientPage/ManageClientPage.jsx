import {WrapperManageClient,ManageClientContainer,ManageClientHeader,ManageClientHeaderContent,
    SearchContainer,SearchButton,ManageClientBody
} from './style'
import {SearchOutlined} from '@ant-design/icons';
import { Space,Table } from 'antd';
import {getAllClient} from "../../services/UserService";
import { Link } from 'react-router-dom';
import {useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import {formatDateVN} from "../../utils";
const columns = [
    {
        title: 'Họ và tên',
        dataIndex: 'fullname',
    },
    {
        title: 'Điện thoại',
        dataIndex: 'phone',
    },
    {
        title: 'Ngày tham gia',
        dataIndex: 'createdAt',
        render: (value) => formatDateVN(value),

        // chỉ khai báo true để bật sort UI
        sorter: true,
    },
    {
        title: 'Ngày cập nhật gần đây',
        dataIndex: 'updatedAt',
        render: (value) => formatDateVN(value),
    },
    {
        title: 'Quyền',
        dataIndex: 'role',

        filters: [
            {
                text: 'Khách',
                value: 'user',
            },
            {
                text: 'Chủ bất động sản',
                value: 'sell-user',
            },
        ],
    },
    {
        title: 'Hành động',
        key: 'x',
        render: (_, record) => (
            <Space>
                <Link
                    to={`/Admin/DetailClient/${record._id}`}
                    state={{ from: "listings" }}
                >
                    Detail
                </Link>
            </Space>
        )
    }
]
export default function ManageClientPage () {
    const [listClient,setListclient] = useState({
        limit: 1,
        pageCurrent: 1,
        totalitem: 0,
        search: "",
        filter: [],
        sort: {},
        items: []
    });
    const [keyword,setKeyword] = useState("");
    const user = useSelector(state => state.user);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = {
                    limit: listClient.limit,
                    page: listClient.pageCurrent,
                    sort: JSON.stringify(listClient.sort),
                    filter: JSON.stringify(listClient.filter),
                    keyword: listClient.search
                }

                const result = await getAllClient(
                    user.access_Token,
                    data
                );

                setListclient(prev => ({
                    ...prev,
                    items: result.data,
                    totalitem: result.totalitem,
                }));

            } catch (err) {
                console.log(err);
            }
        }

        fetchData();

    }, [
        listClient.pageCurrent,
        listClient.limit,
        listClient.sort,
        listClient.filter,
        listClient.search
    ]);
    const handleTableChange = (pagination, filters, sorter) => {

        setListclient(prev => ({
            ...prev,

            pageCurrent: pagination.current,
            limit: pagination.pageSize,

            filter: filters.role || [],

            sort: {
                field: sorter.field,
                order: sorter.order
            }
        }))
    }
    return (
        <WrapperManageClient>
            <ManageClientContainer>
                <ManageClientHeader>
                    <h2>Quản lý người dùng</h2>
                    <ManageClientHeaderContent>
                        <SearchContainer>
                            <SearchButton onClick={() => setListclient(prev => ({...prev,search:keyword}))}>
                                <SearchOutlined/>
                            </SearchButton>
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm người dùng..." 
                                onChange={(e) => {
                                    if(e.target.value.trim() === "" && listClient.search === "") return;
                                    setKeyword(e.target.value.trim())}
                                }
                                />
                        </SearchContainer>
                    </ManageClientHeaderContent>
                </ManageClientHeader>
                <ManageClientBody>
                    <Table
                        columns={columns}
                        dataSource={listClient.items}
                        rowKey="_id"

                        pagination={{
                            current: listClient.pageCurrent,
                            pageSize: listClient.limit,
                            total: listClient.totalitem,
                        }}

                        onChange={handleTableChange}
                    />
                </ManageClientBody>
            </ManageClientContainer>
        </WrapperManageClient>
    )
}