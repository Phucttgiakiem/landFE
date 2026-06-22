import {WrapperUpdateContract,UpdateContractContainer,UpdateContractHeader,
    UpdateContractBody,MainContentofContract,
    UpdateContractFooter,WrapperDatecreateContractipad,WrapperDatecreateContractmobile
} from "./style"
import { Input,InputNumber,DatePicker,Select } from "antd";
import {useState,useEffect} from "react";
import { useSelector } from "react-redux";
import { useMutationHook } from "../../hooks/useMutationhook";
import {useMessage} from "../../components/Message/Message";
import dayjs from 'dayjs'
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useParams,useNavigate } from "react-router-dom";
import { getContractById,updateContract } from "../../services/ContractService";
import Loading from "../../components/LoadingComponent/Loading";
import {formatNumber} from "../../utils"
export default function EditContractpage() {
    const { id } = useParams();
    const [contractoriginal, setContractoriginal] = useState(null);
    const [editedContract, setEditedContract] = useState(null);
    const [errors,setErrors] = useState({});
    const token = localStorage.getItem("access_token");
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const message = useMessage();
    const mutation = useMutationHook(
        data => updateContract(data)
    );
    const {isPending,isError,isSuccess,error} = mutation;
    const validate = () => {
        let newErrors = {};
        if(!editedContract.idNumberowner){
            newErrors.idNumberowner = "Vui lòng nhập số căn cước công dân chủ sở hữu"
        }
        if(editedContract.idNumberowner && !handleCheckIDNumber(editedContract.idNumberowner)){
            newErrors.idNumberowner = "Vui lòng nhập số căn cước công dân đủ 12 số"
        }
        if(!editedContract.statusContract){
            newErrors.statusContract = "Vui lòng chọn trạng thái hợp đồng"
        }
        
        if(editedContract.typecontract === "rent"){    
            if(!editedContract.idNumbertenant){
                newErrors.idNumbertenant = "Vui lòng nhập căn cước công dân người thuê"
            }
            if(editedContract.idNumbertenant && !handleCheckIDNumber(editedContract.idNumbertenant)){
                newErrors.idNumbertenant = "Vui lòng nhập số căn cước công dân người thuê đủ 12 số"
            }
            if(!editedContract.startdate || !editedContract.enddate){
                newErrors.errdate = "Vui lòng nhập đủ thông tin thời hạn hợp đồng"
            }
            if(!editedContract.deposit){
                newErrors.deposit = "Vui lòng nhập đủ số tiền cọc"
            }
        }else {
            if(!editedContract.idNumberbuyer){
                newErrors.idNumberbuyer = "Vui lòng nhập số căn cước công dân người mua"
            }
            if(editedContract.idNumberbuyer && !handleCheckIDNumber(editedContract.idNumberbuyer)){
                newErrors.idNumberbuyer = "Vui lòng nhập số căn cước công dân người mua đủ 12 số"
            }
            if(!editedContract.paymentMethod){
                newErrors.paymentMethod = "Vui lòng chọn phương thức thanh toán"
            }
            if(!editedContract.transferDate){
                newErrors.transferDate = "Vui lòng chọn ngày chuyển khoản"
            }
        }
        return newErrors;
    }
    const handleCheckIDNumber = (idnumber) => {
        const vl = idnumber.trim();
        if(vl.length < 12 || vl.length > 12) return false;
        return true;
    }
    const handleAddvalueDatecreateContractonmobile = (value,key,errDate) => {
        setEditedContract(prev => {
            const updated = {
                ...prev,
                [key]: value
            };

            if (updated.startdate && updated.enddate && errDate in errors) {
                setErrors(prevErrors => {
                    const newErrors = { ...prevErrors };
                    delete newErrors[errDate];
                    return newErrors;
                });
            }

            return updated;
        });
    }
    const handleAddvalueinformdata = (value,key) => {
        setEditedContract(prev => {
            if (Array.isArray(value)) {
                return {
                    ...prev,
                    startdate: value[0] || null,
                    enddate: value[1] || null
                };
            }
            return {
                ...prev,
                [key]: value
            };
        })
        if (key in errors) {
            setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[key];
            return newErrors;
            });
        }
    }
    const handleResetForm = () => {
        setEditedContract({
            idcontract: contractoriginal?._id || null,
            idproperty: contractoriginal?.listingId || null,
            ownerId: contractoriginal?.ownerId || null,
            typecontract: contractoriginal?.typeContract || null,
            titleproperty: contractoriginal?.propertySnapshot?.title || null,
            areaproperty: contractoriginal?.propertySnapshot?.area || null,
            addressproperty: contractoriginal?.propertySnapshot?.address || null,
            fullnametenant: contractoriginal?.tenantSnapshot?.fullName || null,
            idNumbertenant: contractoriginal?.tenantSnapshot?.idNumber || null,
            addresstenant: contractoriginal?.tenantSnapshot?.address || null,
            fullnamebuyer: contractoriginal?.buyerSnapshot?.fullName || null,
            idNumberbuyer: contractoriginal?.buyerSnapshot?.idNumber || null,
            addressbuyer: contractoriginal?.buyerSnapshot?.address || null,
            fullnameowner: contractoriginal?.ownerSnapshot?.fullName || null,
            idNumberowner: contractoriginal?.ownerSnapshot?.idNumber || null,
            addressowner: contractoriginal?.ownerSnapshot.address || null,
            price: contractoriginal?.price || null,
            deposit:contractoriginal?.rentalInfo?.deposit || null,
            startdate:contractoriginal?.rentalInfo?.startDate || null,
            enddate:contractoriginal?.rentalInfo?.endDate || null,
            paymentMethod:contractoriginal?.saleInfo?.paymentMethod || null,
            transferDate:contractoriginal?.saleInfo?.transferDate || null,
            statusContract:contractoriginal?.status || null,
            term:contractoriginal?.terms || null
        })
        setErrors({});
    }
    const handleUpdateContract = () => {
        const newErrors = validate();

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return;
        }
        editedContract.token = token;
        editedContract.id = user.id;
        mutation.mutate(editedContract);
    }
    useEffect(() => {
        const fetchContract = async () => {
            try {
                const data = await getContractById(id,user.id);
                setContractoriginal(data.contract);
                setEditedContract({
                    idcontract: data.contract?._id || null,
                    idproperty: data.contract?.listingId || null,
                    typecontract: data.contract?.typeContract || null,
                    ownerId: data.contract?.ownerId || null,
                    titleproperty: data.contract?.propertySnapshot?.title || null,
                    areaproperty: data.contract?.propertySnapshot?.area || null,
                    addressproperty: data.contract?.propertySnapshot?.address || null,
                    fullnametenant: data.contract?.tenantSnapshot?.fullName || null,
                    idNumbertenant: data.contract?.tenantSnapshot?.idNumber || null,
                    addresstenant: data.contract?.tenantSnapshot?.address || null,
                    fullnamebuyer: data.contract?.buyerSnapshot?.fullName || null,
                    idNumberbuyer: data.contract?.buyerSnapshot?.idNumber || null,
                    addressbuyer: data.contract?.buyerSnapshot?.address || null,
                    fullnameowner: data.contract?.ownerSnapshot?.fullName || null,
                    idNumberowner: data.contract?.ownerSnapshot?.idNumber || null,
                    addressowner: data.contract?.ownerSnapshot.address || null,
                    price: data.contract?.price || null,
                    deposit:data.contract?.rentalInfo?.deposit || null,
                    startdate:data.contract?.rentalInfo?.startDate || null,
                    enddate:data.contract?.rentalInfo?.endDate || null,
                    paymentMethod:data.contract?.saleInfo?.paymentMethod || null,
                    transferDate:data.contract?.saleInfo?.transferDate || null,
                    statusContract:data.contract?.status || null,
                    term:data.contract?.terms || null
                });
            } catch (error) {
                console.error("Error fetching contract:", error);
            }
        };

        fetchContract();
    }, [id,user.id]);
    useEffect(() => {
        if (isSuccess) {
            message.success("cập nhật hợp đồng thành công !");
            setTimeout(()=>{
                navigate("/Contract");
            },2000)
        } 
        if (isError) {
            message.error(
                error?.response?.data?.message || 
                "tạo mới hợp đồng thất bại!"
            );
        }
    },[isSuccess,isError])
    return (
        <WrapperUpdateContract>
            <UpdateContractContainer>
                <UpdateContractHeader>
                    <h2>Chỉnh sửa hợp đồng</h2>
                    <ButtonComponent textButton={"Quay lại"} size="large" color="cyan" variant="solid" onClick={() => navigate("/Contract")}/>
                </UpdateContractHeader>
                <Loading isLoading={isPending}>
                    <UpdateContractBody>
                        <MainContentofContract>
                            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                <h5 style={{margin:"0 0 10px 0"}}>Loại hợp đồng</h5>
                                <Input value={editedContract?.typecontract} disabled size="large"/>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                <h5 style={{margin:"0 0 10px 0"}}>Tên mặt bằng, nhà ở</h5>
                                <Input value={editedContract?.titleproperty} disabled size="large"/>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                <h5 style={{margin:"0 0 10px 0"}}>Địa chỉ mặt bằng, nhà ở</h5>
                                <Input value={editedContract?.addressproperty} disabled size="large"/>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                <h5 style={{margin:"0 0 10px 0"}}>Diện tích mặt bằng, nhà ở</h5>
                                <Input value={editedContract?.areaproperty} disabled size="large"/>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                <h5 style={{margin:"0 0 10px 0"}}>Giá {editedContract?.typecontract === "rent" ? "thuê" : "mua"} mặt bằng, nhà ở</h5>
                                <InputNumber value={editedContract?.price} prefix="VND" formatter={formatNumber} disabled size="large" style={{width: "100%"}}/>
                            </div>
                            {
                                editedContract?.typecontract === "rent" ? (
                                    <>
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                            <h5 style={{margin:"0 0 10px 0"}}>Tên người thuê</h5>
                                            <Input value={editedContract?.fullnametenant} disabled size="large"/>
                                        </div>
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                            <h5 style={{margin:"0 0 10px 0"}}>Số căn cước công dân</h5>
                                            <Input value={editedContract?.idNumbertenant} allowClear
                                                onChange={(e) => {
                                                    if(e.target.value === " ") return;
                                                    handleAddvalueinformdata(e.target.value,"idNumbertenant");
                                                }} 
                                                style={{width:"100%"}} placeholder="Nhập số căn cước công dân người thuê"
                                                size="large"
                                            />
                                            {
                                                errors.idNumbertenant && (
                                                    <span style={{ color: "red", marginBottom: 10 }}>
                                                        {errors.idNumbertenant}
                                                    </span>
                                                )
                                            }
                                        </div>
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                            <h5 style={{margin:"0 0 10px 0"}}>Địa chỉ cư trú</h5>
                                            <Input value={editedContract?.addresstenant} disabled size="large"/>
                                        </div>
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                            <h5 style={{margin:"0 0 10px 0"}}>Tiền đặt cọc</h5>
                                            <InputNumber min={0} size="large" value={editedContract?.deposit} onChange={(value) => handleAddvalueinformdata(value,"deposit")} prefix="VND" style={{width:"100%"}} placeholder="Nhập số tiền đặt cọc"/>
                                            {
                                                errors.deposit && (
                                                    <span style={{ color: "red", marginBottom: 10 }}>
                                                        {errors.deposit}
                                                    </span>
                                                )
                                            }
                                        </div>
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                            <h5 style={{margin:"0 0 10px 0"}}>Ngày bắt đầu và kết thúc hợp đồng</h5>
                                            <WrapperDatecreateContractipad>
                                                <DatePicker.RangePicker
                                                        value={[
                                                            editedContract?.startdate ? dayjs(editedContract.startdate) : null,
                                                            editedContract?.enddate ? dayjs(editedContract.enddate) : null
                                                        ]}
                                                    
                                                    format="DD/MM/YYYY"
                                                    onChange={(date,dateStrings) => {
                                                        const value = [
                                                            date?.[0]?.toISOString() || null,
                                                            date?.[1]?.toISOString() || null
                                                        ];
                                                        handleAddvalueinformdata(value,"errdate")
                                                    }}
                                                    style={{width:"100%"}}
                                                    size="large"
                                                    allowClear
                                                />
                                            </WrapperDatecreateContractipad>
                                            <WrapperDatecreateContractmobile>
                                                <DatePicker 
                                                    value={editedContract?.startdate ? dayjs(editedContract.startdate) : null}
                                                    onChange={(date,dateString) => {
                                                        handleAddvalueDatecreateContractonmobile(date ? date.toISOString() : null,"startdate","errdate")
                                                    }}
                                                    format="DD/MM/YYYY"
                                                    placeholder="Ngày bắt đầu"
                                                    style={{width:"100%"}}
                                                    size="large"
                                                    allowClear
                                                />
                                                <DatePicker 
                                                    value={editedContract?.enddate ? dayjs(editedContract.enddate) : null}
                                                    format="DD/MM/YYYY"
                                                    onChange={(date,dateString) => {
                                                        handleAddvalueDatecreateContractonmobile(date ? date.toISOString() : null,"enddate","errdate")
                                                    }}
                                                    placeholder="Ngày kết thúc"
                                                    style={{width:"100%"}}
                                                    size="large"
                                                    allowClear
                                                />
                                            </WrapperDatecreateContractmobile>
                                            {
                                                errors.errdate && (
                                                    <span style={{ color: "red", marginBottom: 10 }}>
                                                        {JSON.stringify(errors.errdate)}
                                                    </span>
                                                )
                                            }
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                            <h5 style={{margin:"0 0 10px 0"}}>Tên người mua</h5>
                                            <Input value={editedContract?.fullnamebuyer} disabled size="large"/>
                                        </div>
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                            <h5 style={{margin:"0 0 10px 0"}}>Số căn cước công dân</h5>
                                            <Input size="large" value={editedContract?.idNumberbuyer} onChange={(e) => handleAddvalueinformdata(e.target.value,"idNumberbuyer")} style={{width:"100%"}} placeholder="Nhập số căn cước công dân người mua" allowClear/>
                                            {
                                                errors.idNumberbuyer && (
                                                    <span style={{ color: "red", marginBottom: 10 }}>
                                                        {errors.idNumberbuyer}
                                                    </span>
                                                )
                                            }
                                        </div>
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                            <h5 style={{margin:"0 0 10px 0"}}>Địa chỉ cư trú</h5>
                                            <Input size="large" value={editedContract?.addressbuyer} disabled/>
                                        </div>
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                            <h5 style={{margin:"0 0 10px 0"}}>Phương thức thanh toán</h5>
                                            <Select 
                                                placeholder="chọn phương thức thanh toán"
                                                size="large"
                                                style={{width:"100%"}}
                                                value={editedContract?.paymentMethod}
                                                options={[
                                                    {value:"chuyển khoản",label:"Chuyển khoản"},
                                                    {value: "tiền mặt",label:"tiền mặt"},
                                                ]}
                                                onChange={(value) => handleAddvalueinformdata(value,"paymentMethod")}
                                                allowClear
                                            />
                                            {
                                                errors.paymentMethod && (
                                                    <span style={{ color: "red", marginBottom: 10 }}>
                                                        {errors.paymentMethod}
                                                    </span>
                                                )
                                            }
                                        </div>
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                            <h5 style={{margin:"0 0 10px 0"}}>Ngày chuyển khoản</h5>
                                            <DatePicker size="large" style={{width:"100%"}}
                                                value={editedContract?.transferDate
                                                    ? dayjs(editedContract?.transferDate)
                                                    : null}
                                                format="DD/MM/YYYY"
                                                onChange={(date) =>
                                                    handleAddvalueinformdata(
                                                        date ? date.toISOString() : null,
                                                        "transferDate"
                                                    )
                                                }
                                            />
                                            {
                                                errors.transferDate && (
                                                    <span style={{ color: "red", marginBottom: 10 }}>
                                                        {errors.transferDate}
                                                    </span>
                                                )
                                            }
                                        </div>
                                    </>
                                )
                            }
                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                <h5 style={{margin:"0 0 10px 0"}}>Tên người lập hợp đồng</h5>
                                <Input value={editedContract?.fullnameowner} disabled size="large"/>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                <h5 style={{margin:"0 0 10px 0"}}>Số căn cước công dân</h5>
                                <Input size="large" value={editedContract?.idNumberowner} onChange={(e) => handleAddvalueinformdata(e.target.value,"idNumberowner")} placeholder="Nhập số căn cước công dân" allowClear/>
                                {
                                    errors.idNumberowner && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.idNumberowner}
                                        </span>
                                    )
                                }
                            </div>
                            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                <h5 style={{margin:"0 0 10px 0"}}>Địa chỉ cư trú</h5>
                                <Input size="large" value={editedContract?.addressowner} disabled/>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                <h5 style={{margin:"0 0 10px 0"}}>Điều khoản hợp đồng</h5>
                                <Input.TextArea size="large" value={editedContract?.term} onChange={(e)=> handleAddvalueinformdata(e.target.value,"term")} allowClear/>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                                <h5 style={{margin:"0 0 10px 0"}}>Tình trạng hợp đồng</h5>
                                <Select 
                                    placeholder="chọn trạng thái hợp đồng"
                                    size="large"
                                    style={{width:"100%"}}
                                    value={editedContract?.statusContract}
                                    onChange={(value) => handleAddvalueinformdata(value,"statusContract")}
                                    options={[
                                        {value:"mới tạo",label:"mới tạo",disabled:contractoriginal?.status === "xong" || contractoriginal?.status === "hủy"},
                                        {value: "đã ký",label:"đã ký",disabled:contractoriginal?.status === "xong" || contractoriginal?.status === "hủy"},
                                        {value:"xong",label:"hoàn thành",disabled:contractoriginal?.status === "hủy"},
                                        {value:"hủy",label:"hủy",disabled:contractoriginal?.status === "mới tạo" || contractoriginal?.status === "đã ký"},
                                    ]}
                                    
                                    allowClear
                                />
                                {
                                    errors.statusContract && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.statusContract}
                                        </span>
                                    )
                                }
                            </div>
                        </MainContentofContract>
                    </UpdateContractBody>
                    <UpdateContractFooter>
                        <ButtonComponent textButton={"Cập nhật"} size="large" type="primary" onClick={handleUpdateContract}/>
                        <ButtonComponent textButton={"Hủy"} size="large" color="default" variant="solid" onClick={handleResetForm}/>
                    </UpdateContractFooter>
                </Loading>
            </UpdateContractContainer>
        </WrapperUpdateContract>
    )
}