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
            newErrors.typecontract = "Please select contract type"
        }
        if(!dataCreateContract.idproperty){
            newErrors.idproperty = "Please select real estate"
        }
        if(!dataCreateContract.idNumberowner){
            newErrors.idNumberowner = "Please enter the owner's ID number"
        }
        if(dataCreateContract.idNumberowner && !handleCheckIDNumber(dataCreateContract.idNumberowner)){
            newErrors.idNumberowner = "Please enter a valid 12-digit ID number"
        }
        if(!dataCreateContract.statusContract){
            newErrors.statusContract = "Please select contract status"
        }
        
        if(dataCreateContract.typecontract === "Rental"){    
            if(!dataCreateContract.idtenant){
                newErrors.idtenant = "Please select the tenant"
            }
            if(!dataCreateContract.idNumbertenant){
                newErrors.idNumbertenant = "Please enter the tenant's ID number"
            }
            if(dataCreateContract.idNumbertenant && !handleCheckIDNumber(dataCreateContract.idNumbertenant)){
                newErrors.idNumbertenant = "Please enter a valid 12-digit ID number"
            }
            if(!dataCreateContract.startdate || !dataCreateContract.enddate){
                newErrors.errdate = "Please enter the contract duration"
            }
            if(!dataCreateContract.deposit){
                newErrors.deposit = "Please enter the deposit amount"
            }
        }else {
            if(!dataCreateContract.idbuyer){
                newErrors.idbuyer = "Please select the buyer"
            }
            if(!dataCreateContract.idNumberbuyer){
                newErrors.idNumberbuyer = "Please enter the buyer's ID number"
            }
            if(dataCreateContract.idNumberbuyer && !handleCheckIDNumber(dataCreateContract.idNumberbuyer)){
                newErrors.idNumberbuyer = "Please enter a valid 12-digit ID number"
            }
            if(!dataCreateContract.paymentMethod){
                newErrors.paymentMethod = "Please select the payment method"
            }
            if(!dataCreateContract.transferDate){
                newErrors.transferDate = "Please select the transfer date"
            }
        }
        if(!dataCreateContract.price){
            newErrors.price = "Please enter the agreed price"
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

            if (prev.typecontract === "Rental") {
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
            message.success("Contract created successfully!");
            setTimeout(()=>{
                navigate('/Contract');
            },2000)
        } 
        if (isError) {

            message.error(
                error?.response?.data?.message || 
                "Failed to create contract!"
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
                    <h2>Create New Contract</h2>
                    <ButtonComponent textButton={"Back"} size="large" color="cyan" variant="solid" onClick={()=> navigate("/Contract")}/>
                </CreateContractHeader>
                <Loading isLoading={isPending}> 
                    <CreateContractBody>
                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"10px"}}>
                            <h5 style={{margin:"0 0 10px 0"}}>Contract Type</h5>
                            <Select 
                                placeholder="--------- Select ----------"
                                value={dataCreateContract.typecontract}
                                size="large"
                                options={[
                                    {value: "Sale",label:"Sale Contract"},
                                    {value: "Rental",label:"Rent Contract"},
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
                                <h5 style={{margin:"0 0 10px 0"}}>Select Property</h5>
                                <Select 
                                    placeholder="--------- Select ----------"
                                    size="large"
                                    style={{width:"100%"}}
                                    value={dataCreateContract.idproperty}
                                    onChange={(value) => handleAddvalueinformdata(value,"idproperty")}
                                    allowClear
                                >
                                    {listproperty
                                        ?.filter(item => {
                                            if (dataCreateContract.typecontract === "Rental") return item.Catalog === "Rental";
                                            if (dataCreateContract.typecontract === "Sale") return item.Catalog === "Sale";
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
                                dataCreateContract.typecontract === "Rental" ? (
                                    <div>
                                        <h5 style={{margin:"0 0 10px 0"}}>Select Tenant</h5>
                                        <Select 
                                            placeholder="--------- Select from the list ----------"
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
                                ) : dataCreateContract.typecontract === "Sale" && (
                                    <div>
                                        <h5 style={{margin:"0 0 10px 0"}}>Select Buyer</h5>
                                        <Select 
                                            placeholder="--------- Select from the list ----------"
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
                                <h5 style={{margin:"0 0 10px 0"}}>{dataCreateContract.typecontract === "Rental" ? "Rental" : "Selling"} price</h5>
                                    
                                    
                                        <InputNumber 
                                            min={0} 
                                            placeholder="Enter the agreed price" 
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
                                dataCreateContract.typecontract === "Rental" ? (
                                    <>
                                        <div>
                                            <h5 style={{margin:"0 0 10px 0"}}>Deposit</h5>
                                            <InputNumber min={0} value={dataCreateContract.deposit} onChange={(value) => handleAddvalueinformdata(value,"deposit")} prefix="VND" size="large" style={{width:"100%"}} placeholder="Enter the deposit amount"/>
                                            {
                                                errors.deposit && (
                                                    <span style={{ color: "red", marginBottom: 10 }}>
                                                        {errors.deposit}
                                                    </span>
                                                )
                                            }
                                        </div>
                                        <div>
                                            <h5 style={{margin:"0 0 10px 0"}}>Contract Period</h5>
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
                                                    placeholder="date start"
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
                                                    placeholder="date end"
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
                                            <legend>Tenant Information</legend>
                                            <div>
                                                <h5 style={{margin:"0 0 10px 0"}}>Full Name</h5>
                                                <Input size="large" style={{width:"100%"}} placeholder="Enter tenant's full name" value={dataCreateContract.fullnametenant} disabled/>
                                            </div>
                                            <div>
                                                <h5 style={{margin:"0 0 10px 0"}}>National ID</h5>
                                                <Input size="large" style={{width:"100%"}} placeholder="Enter tenant's national ID" 
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
                                                <h5 style={{margin:"0 0 10px 0"}}>Address</h5>
                                                <Input size="large" style={{width:"100%"}} placeholder="Enter tenant's current address" value={dataCreateContract.addresstenant} disabled/>
                                            </div>
                                        </fieldset>
                                    </>
                                ) : dataCreateContract.typecontract === "Sale" && (
                                    <>
                                        <div>
                                            <h5 style={{margin:"0 0 10px 0"}}>Payment Method</h5>
                                            <Select 
                                                placeholder="Select payment method"
                                                size="large"
                                                style={{width:"100%"}}
                                                value={dataCreateContract.paymentMethod}
                                                options={[
                                                    {value:"Transfer",label:"Transfer"},
                                                    {value: "Cash",label:"Cash"},
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
                                            <h5 style={{margin:"0 0 10px 0"}}>Payment Date</h5>
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
                                            <legend>Buyer Information</legend>
                                            <div>
                                                <h5 style={{margin:"0 0 10px 0"}}>Full Name</h5>
                                                <Input size="large" style={{width:"100%"}} placeholder="Enter buyer's full name" value={dataCreateContract.fullnamebuyer} disabled/>
                                            </div>
                                            <div>
                                                <h5 style={{margin:"0 0 10px 0"}}>ID Number</h5>
                                                <Input size="large" style={{width:"100%"}} onChange={(e) => {
                                                    if(e.target.value === " ") return;
                                                    handleAddvalueinformdata(e.target.value,"idNumberbuyer");
                                                }} placeholder="Enter buyer's ID number" value={dataCreateContract.idNumberbuyer}/>
                                                {
                                                    errors.idNumberbuyer && (
                                                        <span style={{ color: "red", marginBottom: 10 }}>
                                                            {errors.idNumberbuyer}
                                                        </span>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                <h5 style={{margin:"0 0 10px 0"}}>Address</h5>
                                                <Input size="large" style={{width:"100%"}} placeholder="Enter buyer's current address" value={dataCreateContract.addressbuyer} disabled/>
                                            </div>
                                        </fieldset>
                                    </>
                                )   
                            }
                            
                            <fieldset style={{ border: "1px solid #ccc", padding: "16px",borderRadius:"8px" }}>
                                <legend>Owner Information</legend>
                                <div>
                                    <h5 style={{margin:"0 0 10px 0"}}>Full Name</h5>
                                    <Input size="large" style={{width:"100%"}} value={dataCreateContract.fullnameowner} disabled/>
                                </div>
                                <div>
                                    <h5 style={{margin:"0 0 10px 0"}}>ID Number</h5>
                                    <Input size="large" placeholder="Enter owner's ID number" style={{width:"100%"}} 
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
                                    <h5 style={{margin:"0 0 10px 0"}}>Address</h5>
                                    <Input size="large" style={{width:"100%"}} value={dataCreateContract.addressowner} disabled/>
                                </div>
                            </fieldset>
                            <fieldset style={{ border: "1px solid #ccc", padding: "16px",borderRadius:"8px" }}>
                                <legend>Property Information</legend>
                                <div>
                                    <h5 style={{margin:"0 0 10px 0"}}>Title</h5>
                                    <Input size="large" style={{width:"100%"}} 
                                        placeholder="Enter property title" 
                                        value={dataCreateContract.titleproperty}
                                        disabled
                                    />
                                </div>
                                <div>
                                    <h5 style={{margin:"0 0 10px 0"}}>Area</h5>
                                    <Input size="large" style={{width:"100%"}}
                                        placeholder="Enter property area"
                                        value={dataCreateContract.areaproperty}
                                        disabled
                                    />
                                </div>
                                <div>
                                    <h5 style={{margin:"0 0 10px 0"}}>Address</h5>
                                    <Input size="large" style={{width:"100%"}}
                                        placeholder="Enter property address"
                                        value={dataCreateContract.addressproperty}
                                        disabled
                                    />
                                </div>
                            </fieldset>
                            <div>
                                <h5 style={{margin:"0 0 10px 0"}}>Terms and Conditions</h5>
                                <Input.TextArea size="large" style={{width:"100%"}} 
                                    placeholder="Enter terms and conditions" 
                                    onChange={(e)=> handleAddvalueinformdata(e.target.value,"term")}/>
                            </div>
                            <div>
                                <h5 style={{margin:"0 0 10px 0"}}>Contract Status</h5>
                                <Select 
                                    placeholder="Select contract status"
                                    size="large"
                                    style={{width:"100%"}}
                                    value={dataCreateContract.statusContract}
                                    options={[
                                        {value:"new",label:"Newly Created"},
                                        {value: "signed",label:"Signed"},
                                        {value:"completed",label:"Completed"},
                                        {value:"cancelled",label:"Cancelled",disabled:true}
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
                        <ButtonComponent textButton={"Create New"} size="large" type="primary" onClick={handleCreateContract}/>
                        <ButtonComponent textButton={"Cancel"} size="large" color="default" variant="solid"/>
                    </CreateContractFooter>
                </Loading>
                
            </CreateContractContainer>
        </WrapperCreateContract>
    )
}