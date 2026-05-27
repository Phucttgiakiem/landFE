import {WrapperDetailClient,DetailClientContainer,DetailClientHeader,DetailClientBody} from "./style";
import {getDetailUserforAdmin} from "../../services/UserService";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {useState,useEffect,useMemo} from "react";
import { useSelector } from "react-redux";
import {useParams,useNavigate} from "react-router-dom";
import {Spin,Descriptions} from "antd"
export default function DetailUserpage (){
    const { id } = useParams();
    const user = useSelector(state => state.user);
    const [detailclient,setDetailClient] = useState({});
    const navigate = useNavigate();
    const formatDate = (date) => {
        if (!date) return "N/A";

        const d = new Date(date);

        // kiểm tra invalid date
        if (isNaN(d.getTime())) return "N/A";

        // nếu là 1/1/1970
        if (d.getTime() === 0) return "N/A";

        return d.toLocaleString("vi-VN");
    };  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getDetailUserforAdmin(id,user.access_Token);
                setDetailClient(result.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[id]);
    const items = useMemo(() => {
        if(!detailclient) return [];
        return [
            {
                key: "1",
                label: "Họ & tên",
                children: detailclient.fullname
            },
            {
                key: "2",
                label: "Email",
                children: detailclient.email
            },
            {
                key: "3",
                label: "Điện thoại",
                children: detailclient.phone
            },
            {
                key: "4",
                label: "Địa chỉ",
                span: 2,
                children: detailclient.address
            },
            {
                key: "5",
                label: "Ngày sinh",
                children: formatDate(detailclient.dateOfBirth)
            },
            {
                key: "6",
                label: "Số căn cước công dân",
                children: detailclient.idNumber || "N/A"
            },
            {
                key: "7",
                label: "Ngày tạo",
                children: formatDate(detailclient.idIssuedDate)
            },
            {
                key: "8",
                label: "Đơn vị cung cấp",
                span: 3,
                children: detailclient.idIssuedPlace || "N/A"
            }
        ]
    },[detailclient])
    return (
        <WrapperDetailClient>
            <DetailClientContainer>
                <DetailClientHeader>
                    <h2>Chi tiết thông tin tài khoản</h2>
                    <ButtonComponent 
                        textButton={"Quay lại"} 
                        size="large" 
                        color="cyan" 
                        variant="solid" 
                        onClick={() => navigate('/Admin/ManageClient')}
                        />
                </DetailClientHeader>
                <DetailClientBody>
                    {/* {loading ? (
                        <Spin size="large"/>
                        ) : (
                        <Descriptions bordered items={items} />
                    )} */}
                    <Descriptions layout="vertical" items={items}/>
                </DetailClientBody>
            </DetailClientContainer>
        </WrapperDetailClient>
    )
}