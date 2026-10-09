import { PieChartOutlined,MenuOutlined,SettingOutlined,RiseOutlined, } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup,faFolder } from '@fortawesome/free-solid-svg-icons';

export const listPricesell = [
    {key:'all',label: "All Prices", min:null,max:null },
    {key:"under - 500",label: "Below 500 million",min: 0, max: 500 },
    {key:"500 - 800",label: "500 - 800 million",min: 500, max:800 },
    {key:"800 - 1000",label: "800 million - 1 billion",min: 800, max: 1000 },
    {key: "1000 - 2000",label: "1 - 2 billion",min:1000,max:2000 },
    {key: "2000 - 3000",label: "2 - 3 billion",min:2000,max:3000 },
    {key: "3000 - 5000",label: "3 - 5 billion",min:3000,max:5000 },
    {key: "5000 - 7000",label: "5 - 7 billion",min:5000,max:7000 },
    {key:"7000 - 10000",label: "7 - 10 billion",min:7000,max:10000 },
    {key: "10000 - 20000",label: "10 - 20 billion",min:10000,max:20000 },
    {key: "20000 - 30000",label: "20 - 30 billion",min:20000,max:30000 },
    {key: "30000 - 40000",label: "30 - 40 billion",min:30000,max:40000 },
    {key: "40000 - 60000",label: "40 - 60 billion",min:40000,max:60000 },
    {key: "over - 60000",label: "over 60 billion",min:60000,max:null },
    {key:"deal",label: "Negotiable",min:0,max:0},
];
export const listPriceRent = [
    {key:"all",label: "All Price Ranges",min:null,max:null},
    {key:"under - 1",label: "Under 1 million",min:0,max:1},
    {key:"1 - 3",label: "1 - 3 million",min: 1, max: 3},
    {key:"3 - 5",label: "3 - 5 million",min: 3, max: 5},
    {key: "5 - 10",label: "5 - 10 million",min:5,max: 10},
    {key: " 10 - 40",label: "10 - 40 million",min:10,max:40},
    {key: " 40 - 70",label: "40 - 70 million",min:40,max:70},
    {key: "70 - 100",label: "70 - 100 million",min:70,max:100},
    {key: "over - 100",label: "Over 100 million",min:100,max:null},
    {key: "deal",label: "Negotiable",min:0,max: 0},
]
export const listacreage = [
    {key:"all",label: "All Areas",min:null,max:null},
    {key:"under - 30",label: "Under 30 m²",min:0,max:30},
    {key:"30 - 50",label: "30 - 50 m²", min: 30,max:50},
    {key: "50 - 80",label: "50 - 80 m²",min:50,max:80},
    {key:"80 - 100",label: "80 - 100 m²",min:80,max:100},
    {key:"100 - 150",label: "100 - 150 m²",min:100,max:150},
    {key:"150 - 200",label: "150 - 200 m²",min:150,max:200},
    {key:"200 - 250",label: "200 - 250 m²",min:200,max:250},
    {key:"250 - 300",label: "250 - 300 m²",min:250,max:300},
    {key:"300 - 500",label: "300 - 500 m²",min:300,max:500},
    {key:"over - 500",label: "Over 500 m²",min:500,max:null},
]
export const MenuSidebar = [
    {
        label: "Dashboard",
        path: "/Dashboard",
        icon: <PieChartOutlined />,
        roles: ["user","sell-user","admin"]
    },
    {
        label: "Manage Listings",
        path: "/manage-listing",
        icon: <MenuOutlined/>,
        roles: ["sell-user","admin"]
    },
    {
        label: "Manage Contracts",
        path: "/Contract",
        icon : <FontAwesomeIcon icon={faUserGroup}/>,
        roles: ["sell-user","admin"]
    },
    {
        label: "Manage Categories",
        path: "/Admin/ManageCategory",
        icon: <FontAwesomeIcon icon={faFolder}/>,
        roles: ["admin"]
    },
    {
        label: "Contract History",
        path: "/Contract-history",
        icon : <FontAwesomeIcon icon={faUserGroup}/>,
        roles: ["user"]
    },
    {
        label: "Account",
        icon: <SettingOutlined />,
        roles: ["user","sell-user","admin"],
        children: [
            {
                label: "Personal Information",
                path: "/profile-user",
                roles: ["user","sell-user","admin"],
            },
            {
                label: "Change Password",
                path: "/Change-password",
                roles: ["user","sell-user","admin"]
            },
            {
                label: "Manage Users",
                path: "/Admin/ManageClient",
                roles: ["admin"],
            }
        ],
    },
    {
        label: "Revenue Statistics",
        icon: <RiseOutlined/>,
        roles: ["sell-user","admin"],
        children: [
            {
                label: "Revenue Statistics",
                path: "/Profit",
                roles: ["admin","sell-user"]
            }
        ]
    }
]