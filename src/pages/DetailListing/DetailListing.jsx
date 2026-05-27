import {useState,useEffect,useMemo} from "react";
import DOMPurify from "dompurify";
import { Descriptions, Badge, Spin,Tag,Image} from 'antd';
import axios from 'axios';
import { useNavigate,useParams,useLocation } from "react-router-dom";
import {WrapperDetaillisting,DetailListingContainer,DetailListingHeader,DetailListingBody,WrapperImage} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as ListingService from "../../services/ListingService";
import * as ImageService from "../../services/ImageService";
export default function DetailListing() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [urlimage,seturlimage] = useState([]);
    //const [provinces, setProvinces] = useState([]);
    //const [communes, setCommunes] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const from = location.state?.from;
    const navigate = useNavigate();
    // ================= FORMAT =================
    const formatCurrency = (value) => {
        if (!value) return "0 VND";
        return new Intl.NumberFormat("vi-VN").format(value) + " VND";
    };

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

    // ================= FETCH PROVINCES (1 LẦN) =================
    /* useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const res = await axios.get(
                    "https://production.cas.so/address-kit/2025-07-01/provinces"
                );
                setProvinces(res.data.provinces);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProvinces();
    }, []); */

    // ================= FETCH COMMUNES KHI CÓ CityID =================
    /* useEffect(() => {
        if (!data?.Address?.CityID) return;

        const fetchCommunes = async () => {
            try {
                const res = await axios.get(
                    `https://production.cas.so/address-kit/2025-07-01/provinces/${data.Address.CityID}/communes`
                );
                setCommunes(res.data.communes);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCommunes();
    }, [data?.Address?.CityID]); */

    // ================= DERIVED DATA (KHÔNG ASYNC) =================
    /* const provinceName = useMemo(() => {
        return (
            provinces.find(
                (p) => p.code === data?.Address?.CityID
            )?.name || ""
        );
    }, [provinces, data?.Address?.CityID]);

    const communeName = useMemo(() => {
        return (
            communes.find(
                (c) => c.code === data?.Address?.CommuneID
            )?.name || ""
        );
    }, [communes, data?.Address?.CommuneID]); */

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
                label: "Mô tả",
                span: 3,
                children: <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data?.Description || "")
                    }}
                />,
            },
            {
                key: "9",
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
        if (from === "trash") {
            navigate("/Delete-listing");
        } else {
            navigate("/manage-listing");
        }
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