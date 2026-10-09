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
        title: 'Full Name',
        dataIndex: 'fullname',
        width:290,
    },
    {
        title: 'Phone Number',
        dataIndex: 'phone',
        width:200,
    },
    {
        title: 'Join Date',
        dataIndex: 'createdAt',
        render: (value) => formatDateVN(value),
        width:250,
        sorter: true,
    },
    {
        title: 'Last Updated',
        dataIndex: 'updatedAt',
        render: (value) => formatDateVN(value),
        width:250,
    },
    {
        title: 'Permissions',
        dataIndex: 'role',
        width: 150,
        filters: [
            {
                text: 'client',
                value: 'user',
            },
            {
                text: 'Owner',
                value: 'sell-user',
            },
        ],
    },
    {
        title: 'Actions',
        key: 'x',
        width:260,
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
                    <h2>Manage Clients</h2>
                    <ManageClientHeaderContent>
                        <SearchContainer>
                            <SearchButton onClick={() => setListclient(prev => ({...prev,search:keyword}))}>
                                <SearchOutlined/>
                            </SearchButton>
                            <input 
                                type="text" 
                                placeholder="Search clients..." 
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
                        scroll={{ x: 950 }}
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