import {useState,useEffect,useMemo} from "react";
import { pdf } from "@react-pdf/renderer"
import { Descriptions} from 'antd';
import { useNavigate,useParams} from "react-router-dom";
import {getContractByIdnotiduser} from "../../services/ContractService";
import PreviewContractComponent from "../../components/previewContractComponent/previewContractComponent";
import {formatDateVN,formatNumber} from "../../utils";
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
                label: "Title",
                children: detailcontract.propertySnapshot.title,
                span: 3,
            },
            {
                key: 2,
                label: "Address",
                children: detailcontract.propertySnapshot.address,
                span: 2,
            },
            {
                key: 3,
                label: "Area",
                children: detailcontract.propertySnapshot.area,
                span: 1,
            },
            {
                key: 4,
                label: detailcontract.typeContract === "rent" ? "Rental Price" : "Sale Price",
                children: formatNumber(detailcontract.price) + " VND",
                span: 3,
            },
            {
                key: 5,
                label: "Tenant/Buyer Name",
                children: detailcontract.typeContract === "rent" ? detailcontract?.tenantSnapshot?.fullName : detailcontract?.buyerSnapshot?.fullName,
                span: 2,
            },
            {
                key: 6,
                label: "ID Number",
                children: detailcontract.typeContract === "rent" ? detailcontract?.tenantSnapshot?.idNumber : detailcontract?.buyerSnapshot?.idNumber,
                span: 2,
            },
            {
                key: 7,
                label: "Address of Tenant/Buyer",
                children: detailcontract.typeContract === "rent" ? detailcontract?.tenantSnapshot?.address : detailcontract?.buyerSnapshot?.address,
                span: 3,
            },
            {
                key: 8,
                label: "Contract Expiry",
                children: detailcontract?.rentalInfo?.startDate && detailcontract?.rentalInfo?.endDate ? `${formatDateVN(detailcontract.rentalInfo.startDate)} - ${formatDateVN(detailcontract.rentalInfo.endDate)}` : "N/A",
                span: 3,
            },
            {
                key: 9,
                label: "Deposit",
                children: detailcontract?.rentalInfo?.deposit ? formatNumber(detailcontract.rentalInfo.deposit) + " VND" : "N/A",
                span: 3,
            },
            {
                key: 10,
                label: "Transfer Date",
                children: detailcontract?.saleInfo?.transferDate ? formatDateVN(detailcontract?.saleInfo?.transferDate) : "N/A",
                span: 3,
            },
            {
                key: 11,
                label: "Payment Method",
                children: detailcontract?.saleInfo?.paymentMethod ? detailcontract.saleInfo.paymentMethod : "N/A",
                span: 1,
            },
            {
                key: 12,
                label: "Owner Name",
                children: detailcontract?.ownerSnapshot?.fullName,
                span: 2,
            },
            {
                key: 13,
                label: "ID Number",
                children: detailcontract?.ownerSnapshot?.idNumber,
                span: 3,
            },
            {
                key: 14,
                label: "Address of Owner",
                children: detailcontract?.ownerSnapshot?.address,
                span: 3,
            },
            {
                key: 15,
                label: "Contract Status",
                children: detailcontract?.status,
                span: 3,
            },
            {
                key: 16,
                label: "Contract Terms",
                children: detailcontract?.terms,
                span: 3,
            }
        ]
    })
    console.log("detailcontract",detailcontract)
    return (
        <WrapperDetailContract>
            <DetailContractContainer>
                <DetailContractHeader>
                    <h2>Detail Contract</h2>
                    <ButtonComponent 
                        textButton={"Back"} 
                        size="large" 
                        color="cyan" 
                        variant="solid" 
                        onClick={() => {user.role !== "user" ? navigate("/Contract") : navigate("/Contract-history")}}    
                    />
                    <ButtonComponent
                        textButton={"Download Contract"} 
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