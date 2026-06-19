import {useState,useEffect,useMemo} from "react";
import DOMPurify from "dompurify";
import { Descriptions, Badge, Spin,Tag,Image} from 'antd';
import { useNavigate,useParams,useLocation } from "react-router-dom";
import {WrapperDetaillisting,DetailListingContainer,DetailListingHeader,DetailListingBody,WrapperImage} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as ListingService from "../../services/ListingService";
import * as ImageService from "../../services/ImageService";
export default function DetailListing() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [urlimage,seturlimage] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    // ================= FORMAT =================
    const formatCurrency = (value) => {
        if (!value) return "0 VND";
        return new Intl.NumberFormat("vi-VN").format(value) + " VND";
    };
    const isDefaultDate = (date) => new Date(date).getTime() === 0;
    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toLocaleString("vi-VN");
    };

    // ================= FETCH LISTING =================
    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await ListingService.getListing(id);
                setData(res.data.data);
                const res2 = await ImageService.getAllImage(id);
                seturlimage(res2.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [id]);


    // ================= DESCRIPTIONS ITEMS =================
    const items = useMemo(() => {
        if (!data) return [];

        return [
            {
                key: "1",
                label: "Tên bất động sản",
                children: data.Title,
            },
            {
                key: "2",
                label: "Giá",
                children: formatCurrency(data.Price),
            },
            {
                key: "3",
                label: "Diện tích",
                children: `${
                    Number(data.horizontal) * Number(data.vertical) || 0
                } m²`,
            },
            {
                key: "4",
                label: "Địa chỉ",
                children: `${data?.Address?.numberhouse || ""} - ${data?.Address?.Commune.name} - ${data?.Address?.City.name}`,
            },
            {
                key: "5",
                label: "Tình trạng",
                children: (
                    <Badge 
                        status= {
                            data?.approval_status === "chưa xác thực" 
                            ? "processing" : data?.approval_status === "đã xác thực" ?
                            "success" : "error"
                        }
                        text={data?.approval_status}
                    />
                ),
                span: 3
            },
            {
                key: "6",
                label: "Trạng thái",
                children: (
                    <Tag 
                        color={
                            data?.visibility_status === "công khai" 
                            ? "success" : data?.visibility_status === "ẩn" ?
                            "warning": data?.visibility_status === "bị khóa" ?
                            "error" : "default"
                        }
                    >{data?.visibility_status}</Tag>
                ),
            },
            {
                key: "7",
                label: "Ngày tạo",
                children: formatDate(data.createdAt),
                span: 3
            },
            {
                key: "8",
                label: "Ngày cập nhật gần nhất",
                children: formatDate(data.updatedAt),
                span: 1
            },
            {
                key: "9",
                label: "Ngày hết hạn",
                children: isDefaultDate(data.ExpiredAt) ? "Chưa có thông tin" : formatDate(data.ExpiredAt),
                span: 2
            },
            {
                key: "10",
                label: "Mô tả",
                span: 3,
                children: <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data?.Description || "")
                    }}
                />,
            },
            {
                key: "11",
                label: "Hình ảnh",
                span: 3,
                children: <WrapperImage>
                    {urlimage?.length > 0 &&
                        urlimage.map(item => (
                            <Image
                            key={item._id}
                            src={item.URL}

                            />
                        ))
                    }
                </WrapperImage>
            }
        ];
    }, [data,urlimage]);
    const handleBack = () => {
        navigate(`/manage-listing${location.search}`);
    };
    return (
        <WrapperDetaillisting>
            <DetailListingContainer>
                <DetailListingHeader>
                    <h2>Chi tiết thông tin bất động sản</h2>
                    <ButtonComponent 
                        textButton={"Quay lại"} 
                        size="large" 
                        color="cyan" 
                        variant="solid" 
                        onClick={() => handleBack()}/>
                </DetailListingHeader>
                <DetailListingBody>
                    {loading ? (
                        <Spin size="large"/>
                        ) : (
                        <Descriptions bordered items={items} />
                    )}
                </DetailListingBody>
            </DetailListingContainer>
        </WrapperDetaillisting>
    )
}