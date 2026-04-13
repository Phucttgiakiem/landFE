import {WrapperProfile,ProfileContainer,ProfileTitle,ProfileContent,ProfileFooter} from "./style";
import { EditOutlined } from '@ant-design/icons';
import {useMutationHook} from '../../hooks/useMutationhook';
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {useState,useEffect} from "react";
import {useSelector,useDispatch } from "react-redux";
import * as UserService from "../../services/UserService";
import {updateUser} from "../../redux/slides/userSlide";
import {useMessage} from "../../components/Message/Message";
import Loading from "../../components/LoadingComponent/Loading";
export default function Profile() {
    const [editName,setEditName] = useState(false);
    const [editPhone,setEditPhone] = useState(false);
    const [editEmail,setEditEmail] = useState(false);
    const [editAddress,setEditAddress] = useState(false);
    const message = useMessage();
    const user = useSelector(state => state.user);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [address,setAddress] = useState('');
    const mutation = useMutationHook(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    )
    const dispatch = useDispatch()
    const { isPending, isSuccess, isError } = mutation
    const handleResetInput = () => {
        setName(user.name || '');
        setPhone(user.phone || '');
        setEmail(user.email || '');
        setAddress(user.address || '');
    }
    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
    }, [user])
    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, email, name, phone, address, access_token: user?.access_Token })

    }
    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_Token: token }))
    }
    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_Token);
            
        } else if (isError) {
            message.error()
        }
        setEditName(false);
        setEditPhone(false);
        setEditEmail(false);
        setEditAddress(false);
    }, [isSuccess, isError])
    return (
        <WrapperProfile>
            <ProfileContainer>
                <ProfileTitle>Quản lý tài khoản</ProfileTitle>
                <Loading isLoading={isPending}>
                    <ProfileContent>
                        <h3>Thông tin cá nhân</h3>
                        <div>
                                <div>
                                    <span>Họ và tên</span>
                                    <EditOutlined onClick={() => setEditName(!editName)} />
                                </div>
                                <InputForm TypePassword={false} placeholder={"Nhập họ và tên"} disabled={!editName} size={"large"} value={name} handleOnChange={setName} />
                            </div>
                            <div>
                                <div>
                                    <span>Số điện thoại</span>
                                    <EditOutlined onClick={() => setEditPhone(!editPhone)} />
                                </div>
                                <InputForm type="text" TypePassword={false} placeholder="Nhập số điện thoại" disabled={!editPhone} size="large" value={phone} handleOnChange={setPhone}/>
                            </div>
                            <div>
                                <div>
                                    <span>Email</span>
                                    <EditOutlined onClick={() => setEditEmail(!editEmail)} />
                                </div>
                                <InputForm type="text" TypePassword={false} placeholder="Nhập email" disabled={!editEmail} size="large" value={email} handleOnChange={setEmail}/>
                            </div>
                            <div>
                                <div>
                                    <span>Địa chỉ</span>
                                    <EditOutlined onClick={() => setEditAddress(!editAddress)} />
                                </div>
                                <InputForm type="text" TypePassword={false} placeholder="Nhập địa chỉ" disabled={!editAddress} size="large" value={address} handleOnChange={setAddress}/>
                            </div>
                    </ProfileContent>
                </Loading>
                {
                    name 
                    && email 
                    && phone 
                    && address
                    && (name !== user?.name
                    || email !== user?.email
                    || phone !== user?.phone
                    || address !== user?.address ) &&
                    <ProfileFooter>
                        <ButtonComponent color="primary" variant="solid" className="btn-success" textButton={'Hủy'} onClick={handleResetInput}/>
                        <ButtonComponent color="danger" variant="solid" className="btn-success" textButton={'cập nhật'} onClick={handleUpdate}/>
                    </ProfileFooter>
                }
            </ProfileContainer>
        </WrapperProfile>
    )
};