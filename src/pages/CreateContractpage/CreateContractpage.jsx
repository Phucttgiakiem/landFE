import {WrapperCreateContract,CreateContractContainer,CreateContractHeader,
    CreateContractBody,MainContentofContract,
    CreateContractFooter,WrapperDatecreateContractipad,WrapperDatecreateContractmobile
} from "./style"
import {useState,useEffect} from "react";
import { useSelector } from "react-redux";
import { useMutationHook } from "../../hooks/useMutationhook";
import {useMessage} from "../../components/Message/Message";
import { useNavigate } from "react-router-dom";
import {Select,InputNumber,DatePicker,Input} from "antd"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"
import {getinfoforCreatecontract,createContract} from "../../services/ContractService";
import dayjs from 'dayjs';
import Loading from "../../components/LoadingComponent/Loading";
const { RangePicker } = DatePicker;
export default function CreateContractpage () {
    const [listuser,setListuser] = useState([]);
    const [listproperty,setListproperty] = useState([]);
    const [errors,setErrors] = useState({});
    const token = localStorage.getItem("access_token");
    const message = useMessage();
    const [dataCreateContract,setDatacreatecontract] = useState({
        typecontract: null,
        idproperty:null,
        titleproperty:null,
        areaproperty:null,
        addressproperty:null,
        idtenant:null,
        fullnametenant:null,
        idNumbertenant:null,
        addresstenant:null,
        idbuyer:null,
        fullnamebuyer:null,
        idNumberbuyer:null,
        addressbuyer:null,
        fullnameowner:null,
        idNumberowner:null,
        addressowner:null,
        price:null,
        deposit:null,
        startdate:null,
        enddate:null,
        paymentMethod:null,
        transferDate:null,
        statusContract:null,
        term:null
    })
    const user = useSelector(state => state.user);
    const mutation = useMutationHook(
              data => createContract(data)
          );
    const {isPending,isError,isSuccess,error} = mutation;
    const navigate = useNavigate();
    const validate = () => {
        let newErrors = {};

        if(!dataCreateContract.typecontract){
            newErrors.typecontract = "Vui lòng chọn loại hợp đồng"
        }
        if(!dataCreateContract.idproperty){
            newErrors.idproperty = "Vui lòng chọn bất động sản"
        }
        if(!dataCreateContract.idNumberowner){
            newErrors.idNumberowner = "Vui lòng nhập số căn cước công dân chủ sở hữu"
        }
        if(dataCreateContract.idNumberowner && !handleCheckIDNumber(dataCreateContract.idNumberowner)){
            newErrors.idNumberowner = "Vui lòng nhập số căn cước công dân đủ 12 số"
        }
        if(!dataCreateContract.statusContract){
            newErrors.statusContract = "Vui lòng chọn trạng thái hợp đồng"
        }
        
        if(dataCreateContract.typecontract === "rent"){    
            if(!dataCreateContract.idtenant){
                newErrors.idtenant = "Vui lòng chọn người thuê"
            }
            if(!dataCreateContract.idNumbertenant){
                newErrors.idNumbertenant = "Vui lòng nhập căn cước công dân người thuê"
            }
            if(dataCreateContract.idNumbertenant && !handleCheckIDNumber(dataCreateContract.idNumbertenant)){
                newErrors.idNumbertenant = "Vui lòng nhập số căn cước công dân người thuê đủ 12 số"
            }
            if(!dataCreateContract.startdate || !dataCreateContract.enddate){
                newErrors.errdate = "Vui lòng nhập đủ thông tin thời hạn hợp đồng"
            }
            if(!dataCreateContract.deposit){
                newErrors.deposit = "Vui lòng nhập đủ số tiền cọc"
            }
        }else {
            if(!dataCreateContract.idbuyer){
                newErrors.idbuyer = "Vui lòng chọn người mua"
            }
            if(!dataCreateContract.idNumberbuyer){
                newErrors.idNumberbuyer = "Vui lòng nhập số căn cước công dân người mua"
            }
            if(dataCreateContract.idNumberbuyer && !handleCheckIDNumber(dataCreateContract.idNumberbuyer)){
                newErrors.idNumberbuyer = "Vui lòng nhập số căn cước công dân người mua đủ 12 số"
            }
            if(!dataCreateContract.paymentMethod){
                newErrors.paymentMethod = "Vui lòng chọn phương thức thanh toán"
            }
            if(!dataCreateContract.transferDate){
                newErrors.transferDate = "Vui lòng chọn ngày chuyển khoản"
            }
        }
        if(!dataCreateContract.price){
            newErrors.price = "Vui lòng nhập giá thỏa thuận"
        }
        return newErrors;
    }
    const handleAddvalueDatecreateContractonmobile = (value,key,errDate) => {
        setDatacreatecontract(prev => {
            const created = {
                ...prev,
                [key]: value
            };

            if (
                created.startdate &&
                created.enddate &&
                errDate in errors
            ) {
                setErrors(prevErrors => {
                    const newErrors = { ...prevErrors };
                    delete newErrors[errDate];
                    return newErrors;
                });
            }

            return created;
        });
    }
    const handleAddvalueinformdata = (value, key) => {
        setDatacreatecontract(prev => {
            // RangePicker
            if (Array.isArray(value)) {
            return {
                ...prev,
                startdate: value[0] || null,
                enddate: value[1] || null
            };
            }

            // Property
            if (key === "idproperty") {
            if (!value) {
                return {
                ...prev,
                idproperty: null,
                titleproperty: null,
                price: null,
                addressproperty: null,
                areaproperty: null
                };
            }

            const item = listproperty.find(i => i._id === value);
            if (!item) return prev;

            return {
                ...prev,
                idproperty: value,
                titleproperty: item.Title,
                price: item.Price,
                addressproperty:
                item.Address.numberhouse + " - " +
                item.Address.Commune.name + " - " +
                item.Address.City.name,
                areaproperty: item.horizontal + "x" + item.vertical + "m²"
            };
            }

            // Tenant / Buyer
            if (key === "idtenant" || key === "idbuyer") {
            if (!value) {
                return {
                ...prev,
                idtenant: null,
                fullnametenant: null,
                idNumbertenant: null,
                addresstenant: null,
                idbuyer: null,
                fullnamebuyer: null,
                idNumberbuyer: null,
                addressbuyer: null
                };
            }

            const guest = listuser.find(i => i._id === value);
            if (!guest) return prev;

            if (prev.typecontract === "rent") {
                return {
                ...prev,
                idtenant: guest._id,
                fullnametenant: guest.fullname,
                idNumbertenant: guest.idNumber || null,
                addresstenant: guest.address || null,
                idbuyer: null,
                fullnamebuyer: null,
                idNumberbuyer: null,
                addressbuyer: null
                };
            }

            return {
                ...prev,
                idtenant: null,
                fullnametenant: null,
                idNumbertenant: null,
                addresstenant: null,
                idbuyer: guest._id,
                fullnamebuyer: guest.fullname,
                idNumberbuyer: guest.idNumber || null,
                addressbuyer: guest.address || null
            };
            }

            // Default
            return {
            ...prev,
            [key]: value
            };
        });

        // clear error
        if (key in errors) {
            setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[key];
            return newErrors;
            });
        }
    };

    const handleCheckIDNumber = (idnumber) => {
        const vl = idnumber.trim();
        if(vl.length < 12 || vl.length > 12) return false;
        return true;
    }

    const handleCreateContract = () => {
        const newErrors = validate();

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return;
        }
        mutation.mutate({userid:user.id,token:token,formdata:{...dataCreateContract}});
    }
    const handleResetContract = () => {
        setDatacreatecontract(prev => ({
            ...prev,
            idproperty:null,
            titleproperty:null,
            areaproperty:null,
            addressproperty:null,
            idtenant:null,
            fullnametenant:null,
            idNumbertenant:null,
            addresstenant:null,
            idbuyer:null,
            fullnamebuyer:null,
            idNumberbuyer:null,
            addressbuyer:null,
            price:null,
            deposit:null,
            startdate:null,
            enddate:null,
            paymentMethod:null,
            transferDate:null,
            statusContract:null,
            term:null
        }))
    }
    useEffect(() => {
        if (!user?.id) return;
        const fetchData = async () => {
            const data = await getinfoforCreatecontract(user?.id);
            setListuser(data?.data?.arrguest);
            setListproperty(data?.data?.arrproperty);
            
            setDatacreatecontract(prev => ({
                ...prev,
                fullnameowner:user.name,
                idNumberowner:user.idnumber,
                addressowner:user.address,
            }))
        }
        fetchData();
    },[user?.id,user.name,user.idnumber,user.address]);
    useEffect(() => {
        if (isSuccess) {
            message.success("tạo mới hợp đồng thành công !");
            setTimeout(()=>{
                navigate('/Contract');
            },2000)
        } 
        if (isError) {

            message.error(
                error?.response?.data?.message || 
                "tạo mới hợp đồng thất bại!"
            );
        }
    },[isSuccess,isError])
    const formatNumber = (value) => {
        const [start, end] = `${value}`.split('.') || [];
        const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return `${end ? `${v}.${end}` : `${v}`}`;
    };
    return (
        <WrapperCreateContract>
            <CreateContractContainer>
                <CreateContractHeader>
                    <h2>Tạo hợp đồng mới</h2>
                    <ButtonComponent textButton={"Quay lại"} size="large" color="cyan" variant="solid" onClick={()=> navigate("/Contract")}/>
                </CreateContractHeader>
                <Loading isLoading={isPending}> 
                    <CreateContractBody>
                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                            <h5 style={{margin:"0 0 10px 0"}}>Lựa chọn hợp đồng</h5>
                            <Select 
                                placeholder="--------- Lựa chọn ----------"
                                value={dataCreateContract.typecontract}
                                size="large"
                                options={[
                                    {value: "sale",label:"hợp đồng bán"},
                                    {value: "rent",label:"hợp đồng thuê"},
                                ]}
                                onChange={(value) =>{
                                    handleAddvalueinformdata(value,"typecontract");
                                    handleResetContract();
                                }}
                                allowClear
                            />
                            {
                                errors.typecontract && (
                                    <span style={{ color: "red", marginBottom: 10 }}>
                                        {errors.typecontract}
                                    </span>
                                )
                            }
                        </div>
                        <MainContentofContract>
                            <div>
                                <h5 style={{margin:"0 0 10px 0"}}>Chọn bất động sản</h5>
                                <Select 
                                    placeholder="--------- Lựa chọn ----------"
                                    size="large"
                                    style={{width:"100%"}}
                                    value={dataCreateContract.idproperty}
                                    onChange={(value) => handleAddvalueinformdata(value,"idproperty")}
                                    allowClear
                                >
                                    {listproperty
                                        ?.filter(item => {
                                            if (dataCreateContract.typecontract === "rent") return item.Catalog === "Nhà đất cho thuê";
                                            if (dataCreateContract.typecontract === "sale") return item.Catalog === "Nhà đất bán";
                                            return false;
                                        })
                                        .map(item => (
                                            <Select.Option key={item._id} value={item._id}>
                                            {item.Title}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                                {
                                    errors.idproperty && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.idproperty}
                                        </span>
                                    )
                                }
                            </div>
                            {
                                dataCreateContract.typecontract === "rent" ? (
                                    <div>
                                        <h5 style={{margin:"0 0 10px 0"}}>Chọn người thuê</h5>
                                        <Select 
                                            placeholder="--------- Lựa chọn trong danh sách ----------"
                                            value={dataCreateContract.idtenant}
                                            size="large"
                                            style={{width:"100%"}}
                                            onChange={(value) => handleAddvalueinformdata(value,"idtenant")}
                                            allowClear
                                        >
                                            {
                                                listuser.map(item => (
                                                    <Select.Option key={item._id} value={item._id}>
                                                        {item.fullname + " - " + item.phone}
                                                    </Select.Option>
                                                ))
                                            }
                                        </Select>
                                        {
                                            errors.idtenant && (
                                                <span style={{ color: "red", marginBottom: 10 }}>
                                                    {errors.idtenant}
                                                </span>
                                            )
                                        }
                                    </div>
                                ) : dataCreateContract.typecontract === "sale" && (
                                    <div>
                                        <h5 style={{margin:"0 0 10px 0"}}>Chọn người mua</h5>
                                        <Select 
                                            placeholder="--------- Lựa chọn trong danh sách ----------"
                                            value={dataCreateContract.idbuyer}
                                            size="large"
                                            style={{width:"100%"}}
                                            onChange={(value) => handleAddvalueinformdata(value,"idbuyer")}
                                            allowClear
                                        >
                                            {
                                                listuser.map(item => (
                                                    <Select.Option key={item._id} value={item._id}>
                                                        {item.fullname + " - " + item.phone}
                                                    </Select.Option>
                                                ))
                                            }
                                        </Select>
                                        {
                                            errors.idbuyer && (
                                                <span style={{ color: "red", marginBottom: 10 }}>
                                                    {errors.idbuyer}
                                                </span>
                                            )
                                        }
                                    </div>
                                )
                            }
                            
                            <div>
                                <h5 style={{margin:"0 0 10px 0"}}>Giá {dataCreateContract.typecontract === "rent" ? "thuê" : "bán"}</h5>
                                    
                                    
                                        <InputNumber 
                                            min={0} 
                                            placeholder="Nhập giá thỏa thuận" 
                                            formatter={formatNumber}
                                            value={dataCreateContract.price} 
                                            parser={(value) => value?.toString().replace(/,/g, '')}
                                            prefix="VND" 
                                            size="large" 
                                            style={{width:"100%"}}
                                            onChange={(value) => {console.log(value); handleAddvalueinformdata(value,"price")}}
                                        />
                                        {
                                            errors.price && (
                                                <span style={{ color: "red", marginBottom: 10 }}>
                                                    {errors.price}
                                                </span>
                                            )
                                        }
                                    
                                
                                
                            </div>
                            
                            {
                                dataCreateContract.typecontract === "rent" ? (
                                    <>
                                        <div>
                                            <h5 style={{margin:"0 0 10px 0"}}>Tiền cọc</h5>
                                            <InputNumber min={0} value={dataCreateContract.deposit} onChange={(value) => handleAddvalueinformdata(value,"deposit")} prefix="VND" size="large" style={{width:"100%"}} placeholder="Nhập số tiền đặt cọc"/>
                                            {
                                                errors.deposit && (
                                                    <span style={{ color: "red", marginBottom: 10 }}>
                                                        {errors.deposit}
                                                    </span>
                                                )
                                            }
                                        </div>
                                        <div>
                                            <h5 style={{margin:"0 0 10px 0"}}>Ngày bắt đầu hợp đồng có hiệu lực và hết hiệu lực</h5>
                                            <WrapperDatecreateContractipad>
                                                <RangePicker size="large" style={{width:"100%"}}
                                                    value={[
                                                        dataCreateContract.startdate
                                                        ? dayjs(dataCreateContract.startdate)
                                                        : null,
                                                        dataCreateContract.enddate
                                                        ? dayjs(dataCreateContract.enddate)
                                                        : null
                                                    ]}
                                                    format="DD/MM/YYYY"
                                                    onChange={(date,dateStrings) => {
                                                        const value = [
                                                            date?.[0]?.toISOString() || null,
                                                            date?.[1]?.toISOString() || null
                                                        ];
                                                        handleAddvalueinformdata(value,"errdate")
                                                    }}
                                                    allowClear
                                                />
                                            </WrapperDatecreateContractipad>
                                            <WrapperDatecreateContractmobile>
                                                <DatePicker 
                                                    value={dataCreateContract?.startdate ? dayjs(dataCreateContract?.startdate) : null}
                                                    onChange={(date,dateString) => {
                                                        handleAddvalueDatecreateContractonmobile(
                                                            date ? date.toISOString() : null,"startdate","errdate")
                                                    }}
                                                    format="DD/MM/YYYY"
                                                    placeholder="Ngày bắt đầu"
                                                    style={{width:"100%"}}
                                                    allowClear
                                                />
                                                <DatePicker 
                                                    value={dataCreateContract?.enddate ? dayjs(dataCreateContract?.enddate) : null}
                                                    onChange={(date,dateString) => {
                                                        handleAddvalueDatecreateContractonmobile(
                                                            date ? date.toISOString() : null,"enddate","errdate")
                                                    }}
                                                    format="DD/MM/YYYY"
                                                    placeholder="Ngày kết thúc"
                                                    style={{width:"100%"}}
                                                    allowClear
                                                />
                                            </WrapperDatecreateContractmobile>
                                            {
                                                errors.errdate && (
                                                    <span style={{ color: "red", marginBottom: 10 }}>
                                                        {errors.errdate}
                                                    </span>
                                                )
                                            }
                                        </div>
                                        <fieldset style={{ border: "1px solid #ccc", padding: "16px",borderRadius:"8px" }}>
                                            <legend>Thông tin người thuê</legend>
                                            <div>
                                                <h5 style={{margin:"0 0 10px 0"}}>Họ và tên</h5>
                                                <Input size="large" style={{width:"100%"}} placeholder="Nhập họ tên người thuê" value={dataCreateContract.fullnametenant} disabled/>
                                            </div>
                                            <div>
                                                <h5 style={{margin:"0 0 10px 0"}}>Căn cước công dân</h5>
                                                <Input size="large" style={{width:"100%"}} placeholder="Nhập số căn cước công dân người thuê" 
                                                    onChange={(e) => {
                                                        if(e.target.value === " ") return;
                                                        handleAddvalueinformdata(e.target.value,"idNumbertenant");
                                                    }} 
                                                    value={dataCreateContract.idNumbertenant}/>
                                                {
                                                    errors.idNumbertenant && (
                                                        <span style={{ color: "red", marginBottom: 10 }}>
                                                            {errors.idNumbertenant}
                                                        </span>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                <h5 style={{margin:"0 0 10px 0"}}>Địa chỉ</h5>
                                                <Input size="large" style={{width:"100%"}} placeholder="Nhập địa chỉ cư trú hiện tại người thuê" value={dataCreateContract.addresstenant} disabled/>
                                            </div>
                                        </fieldset>
                                    </>
                                ) : dataCreateContract.typecontract === "sale" && (
                                    <>
                                        <div>
                                            <h5 style={{margin:"0 0 10px 0"}}>Phương thức thanh toán</h5>
                                            <Select 
                                                placeholder="chọn phương thức thanh toán"
                                                size="large"
                                                style={{width:"100%"}}
                                                value={dataCreateContract.paymentMethod}
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
                                        <div>
                                            <h5 style={{margin:"0 0 10px 0"}}>Ngày thanh toán</h5>
                                            <DatePicker size="large" style={{width:"100%"}}
                                                value={dataCreateContract.transferDate
                                                    ? dayjs(dataCreateContract.transferDate, "DD/MM/YYYY")
                                                    : null}
                                                format="DD/MM/YYYY"
                                                onChange={(date,dateString) => handleAddvalueinformdata(dateString,"transferDate")}
                                            />
                                            {
                                                errors.transferDate && (
                                                    <span style={{ color: "red", marginBottom: 10 }}>
                                                        {errors.transferDate}
                                                    </span>
                                                )
                                            }
                                        </div>
                                        
                                        <fieldset style={{ border: "1px solid #ccc", padding: "16px",borderRadius:"8px" }}>
                                            <legend>Thông tin người mua</legend>
                                            <div>
                                                <h5 style={{margin:"0 0 10px 0"}}>Họ và tên</h5>
                                                <Input size="large" style={{width:"100%"}} placeholder="Nhập họ tên người mua" value={dataCreateContract.fullnamebuyer} disabled/>
                                            </div>
                                            <div>
                                                <h5 style={{margin:"0 0 10px 0"}}>Căn cước công dân</h5>
                                                <Input size="large" style={{width:"100%"}} onChange={(e) => {
                                                    if(e.target.value === " ") return;
                                                    handleAddvalueinformdata(e.target.value,"idNumberbuyer");
                                                }} placeholder="Nhập số căn cước công dân người mua" value={dataCreateContract.idNumberbuyer}/>
                                                {
                                                    errors.idNumberbuyer && (
                                                        <span style={{ color: "red", marginBottom: 10 }}>
                                                            {errors.idNumberbuyer}
                                                        </span>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                <h5 style={{margin:"0 0 10px 0"}}>Địa chỉ</h5>
                                                <Input size="large" style={{width:"100%"}} placeholder="Nhập địa chỉ cư trú hiện tại người mua" value={dataCreateContract.addressbuyer} disabled/>
                                            </div>
                                        </fieldset>
                                    </>
                                )   
                            }
                            
                            <fieldset style={{ border: "1px solid #ccc", padding: "16px",borderRadius:"8px" }}>
                                <legend>Thông tin chủ sở hữu</legend>
                                <div>
                                    <h5 style={{margin:"0 0 10px 0"}}>Họ và tên</h5>
                                    <Input size="large" style={{width:"100%"}} value={dataCreateContract.fullnameowner} disabled/>
                                </div>
                                <div>
                                    <h5 style={{margin:"0 0 10px 0"}}>Căn cước công dân</h5>
                                    <Input size="large" placeholder="Nhập số căn cước công dân" style={{width:"100%"}} 
                                        onChange={(e) => {
                                            if(e.target.value === " ") return;
                                            handleAddvalueinformdata(e.target.value,"idNumberowner");
                                        }} value={dataCreateContract.idNumberowner} allowClear/>
                                    {
                                        errors.idNumberowner && (
                                            <span style={{ color: "red", marginBottom: 10 }}>
                                                {errors.idNumberowner}
                                            </span>
                                        )
                                    }
                                </div>
                                <div>
                                    <h5 style={{margin:"0 0 10px 0"}}>Địa chỉ</h5>
                                    <Input size="large" style={{width:"100%"}} value={dataCreateContract.addressowner} disabled/>
                                </div>
                            </fieldset>
                            <fieldset style={{ border: "1px solid #ccc", padding: "16px",borderRadius:"8px" }}>
                                <legend>Thông tin bất động sản</legend>
                                <div>
                                    <h5 style={{margin:"0 0 10px 0"}}>Tiêu đề</h5>
                                    <Input size="large" style={{width:"100%"}} 
                                        placeholder="Nhập tiêu đề bất động sản" 
                                        value={dataCreateContract.titleproperty}
                                        disabled
                                    />
                                </div>
                                <div>
                                    <h5 style={{margin:"0 0 10px 0"}}>Diện tích</h5>
                                    <Input size="large" style={{width:"100%"}}
                                        placeholder="Nhập diện tích bất động sản"
                                        value={dataCreateContract.areaproperty}
                                        disabled
                                    />
                                </div>
                                <div>
                                    <h5 style={{margin:"0 0 10px 0"}}>Địa chỉ</h5>
                                    <Input size="large" style={{width:"100%"}}
                                        placeholder="Nhập địa chỉ bất động sản"
                                        value={dataCreateContract.addressproperty}
                                        disabled
                                    />
                                </div>
                            </fieldset>
                            <div>
                                <h5 style={{margin:"0 0 10px 0"}}>Điều khoản</h5>
                                <Input.TextArea size="large" style={{width:"100%"}} 
                                    placeholder="Nhập điều khoản" 
                                    onChange={(e)=> handleAddvalueinformdata(e.target.value,"term")}/>
                            </div>
                            <div>
                                <h5 style={{margin:"0 0 10px 0"}}>Trạng thái hợp đồng</h5>
                                <Select 
                                    placeholder="chọn trạng thái hợp đồng"
                                    size="large"
                                    style={{width:"100%"}}
                                    value={dataCreateContract.statusContract}
                                    options={[
                                        {value:"mới tạo",label:"mới tạo"},
                                        {value: "đã ký",label:"đã ký"},
                                        {value:"xong",label:"hoàn thành"},
                                        {value:"hủy",label:"hủy",disabled:true}
                                    ]}
                                    onChange={(value) => handleAddvalueinformdata(value,"statusContract")}
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
                    </CreateContractBody>
                    <CreateContractFooter>
                        <ButtonComponent textButton={"Tạo mới"} size="large" type="primary" onClick={handleCreateContract}/>
                        <ButtonComponent textButton={"Hủy"} size="large" color="default" variant="solid"/>
                    </CreateContractFooter>
                </Loading>
                
            </CreateContractContainer>
        </WrapperCreateContract>
    )
}