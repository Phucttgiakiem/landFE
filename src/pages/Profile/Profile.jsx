import {WrapperProfile,ProfileContainer,ProfileTitle,ProfileContent,ProfileFooter,PanelField} from "./style";
import { EditOutlined } from '@ant-design/icons';
import {useMutationHook} from '../../hooks/useMutationhook';
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {useState,useEffect} from "react";
import { DatePicker } from "antd";
import {useSelector,useDispatch } from "react-redux";
import * as UserService from "../../services/UserService";
import {updateUser} from "../../redux/slides/userSlide";
import {useMessage} from "../../components/Message/Message";
import Loading from "../../components/LoadingComponent/Loading";
import dayjs from 'dayjs'
export default function Profile() {
    const message = useMessage();
    const user = useSelector(state => state.user);
    const token = localStorage.getItem("access_token");
    const [updatefieldform,setUpdatefieldform] = useState({
        editName:false,
        editPhone:false,
        editEmail:false,
        editAddress:false,
        editdateofbirth:false,
        editIdnumber:false,
        editidIssuedDate:false,
        editidIssuedPlace:false
    })
    const [formData,setFormdata] = useState({
        name: '',
        phone: '',
        email: '',
        address:'',
        dateofbirth: null,
        Idnumber:'',
        idIssuedDate: null,
        idIssuedPlace: '',
    })
    const mutation = useMutationHook(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    )
    const updateName = (value) => {
        setFormdata(prev => ({
            ...prev,
            name:value
        }))
    }
    const updatePhoneNumber = (value) => {
        setFormdata(prev => ({
            ...prev,
            phone:value
        }));
    }
    const updateEmail = (value) => {
        setFormdata(prev => ({
            ...prev,
            email:value
        }))
    }
    const updateAddress = (value) => {
        setFormdata(prev => ({
            ...prev,
            address:value
        }))
    }
    const updatedateofbirth = (value) => {
        setFormdata(prev => ({
            ...prev,
            dateofbirth:value
        }))
    }
    const updateIdnumber = (value) => {
        setFormdata(prev => ({
            ...prev,
            Idnumber:value
        }))
    }
    const updateidIssuedDate = (value) => {
        setFormdata(prev => ({
            ...prev,
            idIssuedDate:value
        }))
    }
    const updateidIssuedPlace = (value) => {
        setFormdata(prev => ({
            ...prev,
            idIssuedPlace:value
        }))
    }
    const dispatch = useDispatch()
    const { isPending, isSuccess, isError } = mutation
    const handleUpdateformdata = (value,type) => {
        if(type === "reset"){
            setFormdata({
                name: value?.name || '',
                phone: value?.phone || '',
                email: value?.email || '',
                address: value?.address || '',
                dateofbirth: value?.dateofbirth || '',
                Idnumber: value?.idNumber || '',
                idIssuedDate: value?.idIssuedDate || '',
                idIssuedPlace: value?.idIssuedPlace || '',
            })
        }else {
            setFormdata({
                name: value?.name,
                phone: value?.phone,
                email: value?.email,
                address: value?.address,
                dateofbirth: value?.dateofbirth,
                Idnumber: value?.idNumber,
                idIssuedDate: value?.idIssuedDate,
                idIssuedPlace:value?.idIssuedPlace,
            })
        }
    }
    const handleResetInput = () => {
        handleUpdateformdata(user,"reset");
    }
    useEffect(() => {
        handleUpdateformdata(user,"create");
    }, [user])
    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, ...formData ,access_token: token })

    }
    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
       // console.log("response: ",res);
        dispatch(updateUser({ ...res?.data, access_Token: token }))
    }
    useEffect(() => {
        if (isSuccess) {
            message.success("Update successful");
            handleGetDetailsUser(user?.id, user?.access_Token);
            
        } else if (isError) {
            message.error("Failed to update")
        }
        setUpdatefieldform({
            editName:false,
            editPhone:false,
            editEmail:false,
            editAddress:false,
            dateofbirth:false,
            Idnumber:false,
            idIssuedDate:false,
            idIssuedPlace:false
        })
    }, [isSuccess, isError]);
    return (
        <WrapperProfile>
            <ProfileContainer>
                <ProfileTitle>Manage Account</ProfileTitle>
                <Loading isLoading={isPending}>
                    <ProfileContent>
                        <h3>Personal Information</h3>
                        <PanelField>
                            <div>
                                <span>Full Name</span>
                                <EditOutlined onClick={() => setUpdatefieldform(prev=> ({
                                    ...prev,
                                    editName:!prev.editName
                                }))} />
                            </div>
                            <InputForm TypePassword={false} placeholder={"Enter full name"} disabled={!updatefieldform.editName} size={"large"} value={formData.name} handleOnChange={updateName} />
                        </PanelField>
                            <PanelField>
                                <div>
                                    <span>Phone Number</span>
                                    <EditOutlined onClick={() => setUpdatefieldform(prev => ({
                                        ...prev,
                                        editPhone:!prev.editPhone
                                    }))} />
                                </div>
                                <InputForm type="text" TypePassword={false} placeholder="Enter phone number" disabled={!updatefieldform.editPhone} size="large" value={formData.phone} handleOnChange={updatePhoneNumber}/>
                            </PanelField>
                            <PanelField>
                                <div>
                                    <span>Email</span>
                                    <EditOutlined onClick={() => setUpdatefieldform(prev => ({
                                        ...prev,
                                        editEmail: !prev.editEmail
                                    }))} />
                                </div>
                                <InputForm type="text" TypePassword={false} placeholder="Enter email" disabled={!updatefieldform.editEmail} size="large" value={formData.email} handleOnChange={updateEmail}/>
                            </PanelField>
                            <PanelField>
                                <div>
                                    <span>Address</span>
                                    <EditOutlined onClick={() => setUpdatefieldform(prev => ({
                                        ...prev,
                                        editAddress: !prev.editAddress
                                    }))} />
                                </div>
                                <InputForm type="text" TypePassword={false} placeholder="Enter address" disabled={!updatefieldform.editAddress} size="large" value={formData.address} handleOnChange={updateAddress}/>
                            </PanelField>
                            <PanelField>
                                <div>
                                    <span>Date of Birth</span>
                                    <EditOutlined onClick={() => setUpdatefieldform(prev => ({
                                        ...prev,
                                        editdateofbirth: !prev.editdateofbirth
                                    }))}/>
                                </div>
                                <DatePicker 
                                    size="large" 
                                    placeholder="Enter date of birth" 
                                    disabled={!updatefieldform.editdateofbirth} 
                                    format="DD/MM/YYYY"
                                    value={
                                        formData.dateofbirth
                                            ? dayjs(formData.dateofbirth)
                                            : null
                                    }
                                    onChange={(date) => updatedateofbirth(date ? date.toISOString() : null)}    
                                />
                            </PanelField>
                            <PanelField>
                                <div>
                                    <span>Identity Number</span>
                                    <EditOutlined onClick={() => setUpdatefieldform(prev => ({
                                        ...prev,
                                        editIdnumber:!prev.editIdnumber
                                    }))}/>
                                </div>
                                <InputForm type="text" TypePassword={false} placeholder="Enter identity number" size="large" disabled={!updatefieldform.editIdnumber} value={formData.Idnumber} handleOnChange={updateIdnumber}/>
                            </PanelField>
                            <PanelField>
                                <div>
                                    <span>Issued Date</span>
                                    <EditOutlined onClick={() => setUpdatefieldform(prev => ({
                                        ...prev,
                                        editidIssuedDate: !prev.editidIssuedDate
                                    }))}/>
                                </div>
                                <DatePicker 
                                    size="large" 
                                    placeholder="Enter issued date"
                                    disabled={!updatefieldform.editidIssuedDate}
                                    format="DD/MM/YYYY"
                                    value={
                                        formData.idIssuedDate
                                            ? dayjs(formData.idIssuedDate)
                                            : null
                                    }
                                    onChange={(date) =>
                                        updateidIssuedDate(
                                            date ? date.toISOString() : null
                                        )
                                    }
                                />
                            </PanelField>
                            <PanelField>
                                <div>
                                    <span>Issued Place</span>
                                    <EditOutlined onClick={() => setUpdatefieldform(prev => ({
                                        ...prev,
                                        editidIssuedPlace: !prev.editidIssuedPlace
                                    }))}/>
                                </div>
                                <InputForm type="text" TypePassword={false} placeholder="Enter issued place" size="large" disabled={!updatefieldform.editidIssuedPlace} value={formData.idIssuedPlace} handleOnChange={updateidIssuedPlace}/>
                            </PanelField>
                    </ProfileContent>
                </Loading>
                {
                    formData.name 
                    && formData.email 
                    && formData.phone 
                    && formData.address
                    && (formData.name !== user?.name
                    || formData.email !== user?.email
                    || formData.phone !== user?.phone
                    || formData.address !== user?.address 
                    || formData.Idnumber !== user?.idNumber
                    || formData.dateofbirth !== user?.dateofbirth
                    || formData.idIssuedDate !== user?.idIssuedDate
                    || formData.idIssuedPlace !== user?.idIssuedPlace
                    ) &&
                    <ProfileFooter>
                        <ButtonComponent color="primary" variant="solid" className="btn-success" textButton={'Cancel'} onClick={handleResetInput}/>
                        <ButtonComponent color="danger" variant="solid" className="btn-success" textButton={'Update'} onClick={handleUpdate}/>
                    </ProfileFooter>
                }
            </ProfileContainer>
        </WrapperProfile>
    )
};