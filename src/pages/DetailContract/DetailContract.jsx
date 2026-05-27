import {useState,useEffect,useMemo} from "react";
import { pdf } from "@react-pdf/renderer"
import { Descriptions, Badge, Spin,Tag} from 'antd';
import { useNavigate,useParams} from "react-router-dom";
import {getContractByIdnotiduser} from "../../services/ContractService";
import PreviewContractComponent from "../../components/previewContractComponent/previewContractComponent";
import {formatDateVN} from "../../utils";
import {WrapperDetailContract,DetailContractContainer,DetailContractHeader,DetailContractBody} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useSelector } from "react-redux";
export default function DetailContract() {
    const { id } = useParams();
    const [detailcontract, setDetailContract] = useState(null);
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    useEffect(()=>{
        const fetchDetailContract = async () => {
            try {
                const res = await getContractByIdnotiduser(id);
                setDetailContract(res.contract);
            } catch (error) {
                console.error("Error fetching detail contract:", error);
            }
        }
        fetchDetailContract();  
    },[id]);
    const handleDownloadContract = async () => {

        const blob = await pdf(
            <PreviewContractComponent
                contract={detailcontract}
            />
        ).toBlob()

        const url = URL.createObjectURL(blob)

        const link = document.createElement("a")

        link.href = url

        const date = new Date()
        link.download = `contract-${date.toISOString().split('T')[0]}.pdf`

        link.click()

        URL.revokeObjectURL(url)
    }
     // ================= DESCRIPTIONS ITEMS =================
    const items = useMemo(() => {
        if (!detailcontract) return [];
        return [
            {
                key: 1,
                label: "Tên bất động sản",
                children: detailcontract.propertySnapshot.title,
                span: 3,
            },
            {
                key: 2,
                label: "Địa chỉ",
                children: detailcontract.propertySnapshot.address,
                span: 2,
            },
            {
                key: 3,
                label: "Diện tích",
                children: detailcontract.propertySnapshot.area,
                span: 1,
            },
            {
                key: 4,
                label: detailcontract.typeContract === "rent" ? "Giá thuê" : "Giá bán",
                children: detailcontract.price + " VND",
                span: 3,
            },
            {
                key: 5,
                label: "Tên người thuê/mua",
                children: detailcontract.typeContract === "rent" ? detailcontract?.tenantSnapshot?.fullName : detailcontract?.buyerSnapshot?.fullName,
                span: 2,
            },
            {
                key: 6,
                label: "mã số căn cước công dân người thuê/mua",
                children: detailcontract.typeContract === "rent" ? detailcontract?.tenantSnapshot?.idNumber : detailcontract?.buyerSnapshot?.idNumber,
                span: 2,
            },
            {
                key: 7,
                label: "Địa chỉ thường trú người thuê/mua",
                children: detailcontract.typeContract === "rent" ? detailcontract?.tenantSnapshot?.address : detailcontract?.buyerSnapshot?.address,
                span: 3,
            },
            {
                key: 8,
                label: "Hạn hợp đồng",
                children: detailcontract?.rentalInfo?.startDate && detailcontract?.rentalInfo?.endDate ? `${formatDateVN(detailcontract.rentalInfo.startDate)} - ${formatDateVN(detailcontract.rentalInfo.endDate)}` : "N/A",
                span: 3,
            },
            {
                key: 9,
                label: "Tiền cọc",
                children: detailcontract?.rentalInfo?.deposit ? detailcontract.rentalInfo.deposit + " VND" : "N/A",
                span: 3,
            },
            {
                key: 10,
                label: "Ngày chuyển khoản",
                children: detailcontract?.saleInfo?.transferDate ? formatDateVN(detailcontract?.saleInfo?.transferDate) : "N/A",
                span: 3,
            },
            {
                key: 11,
                label: "Phương thức thanh toán",
                children: detailcontract?.saleInfo?.paymentMethod ? detailcontract.saleInfo.paymentMethod : "N/A",
                span: 1,
            },
            {
                key: 12,
                label: "Tên người lập đơn",
                children: detailcontract?.ownerSnapshot?.fullName,
                span: 2,
            },
            {
                key: 13,
                label: "mã số căn cước công dân người lập đơn",
                children: detailcontract?.ownerSnapshot?.idNumber,
                span: 3,
            },
            {
                key: 14,
                label: "Địa chỉ thường trú người lập đơn",
                children: detailcontract?.ownerSnapshot?.address,
                span: 3,
            },
            {
                key: 15,
                label: "Trạng thái hợp đồng",
                children: detailcontract?.status,
                span: 3,
            },
            {
                key: 16,
                label: "Điều khoản hợp đồng",
                children: detailcontract?.terms,
                span: 3,
            }
        ]
    })
    return (
        <WrapperDetailContract>
            <DetailContractContainer>
                <DetailContractHeader>
                    <h2>Chi tiết hợp đồng</h2>
                    <ButtonComponent 
                        textButton={"Quay lại"} 
                        size="large" 
                        color="cyan" 
                        variant="solid" 
                        onClick={() => {user.role !== "user" ? navigate("/Contract") : navigate("/Contract-history")}}    
                    />
                    <ButtonComponent
                        textButton={"Tải hợp đồng"} 
                        size="large" 
                        color="cyan" 
                        variant="solid"
                        onClick={handleDownloadContract}
                    />
                </DetailContractHeader>
                <DetailContractBody>
                    
                        <Descriptions bordered items={items} style={{ width: '100%' }} />
                    
                </DetailContractBody>
            </DetailContractContainer>
        </WrapperDetailContract>
    )
}