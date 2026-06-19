import {useState,useEffect} from "react";
import { WrapperChangePass,ChangePassContainer,ChangePassTitle,ChangePassContent,ChangePassFooter } from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import {useSelector,useDispatch } from "react-redux";
import * as UserService from "../../services/UserService";
import {useMutationHook} from '../../hooks/useMutationhook';
import {updateUser} from "../../redux/slides/userSlide";
import {useMessage} from "../../components/Message/Message";
import Loading from "../../components/LoadingComponent/Loading";
import {Progress} from "antd";
export default function Changepass() {
    const [percent, setPercent] = useState(0);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    const token = localStorage.getItem("access_token");
    const [formdata, setFormdata] = useState({
        oldpassword: "",
        newpassword: "",
        confirmPassword: ""
    });
    const message = useMessage();
    const mutation = useMutationHook(
            (data) => UserService.changePassword(data)
    )
    const { isPending, isSuccess, isError,error } = mutation
    const handleChange = (name, value) => {
        setFormdata(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleChangePass = () => {
        mutation.mutate({ 
            id: user?.id, 
            oldpass: formdata.oldpassword, 
            newpass: formdata.newpassword, 
            confirmpass: formdata.confirmPassword,
            access_token:token 
         })
    }
    const handleCancelChangePass = () => {
        setFormdata({
            oldpassword: "",
            newpassword: "",
            confirmPassword: ""
        });
        setPercent(0);
    }
    const handleGetDetailsUser = async (id, token) => {
            const res = await UserService.getDetailsUser(id, token)
            dispatch(updateUser({ ...res?.data, access_Token: token }))
    }
    useEffect(()=> {
        const filledFields = Object.values(formdata)
        .filter(value => value.trim() !== "").length;
        setPercent(Math.round((filledFields / 3) * 100));
    },[formdata]);
    useEffect(() => {
            if (isSuccess) {
                message.success("Đổi mật khẩu thành công!");
                handleGetDetailsUser(user?.id, token);
            } else if (isError) {
                message.error(error?.response?.data?.message);
            }
            setFormdata({
                oldpassword: "",
                newpassword: "",
                confirmPassword: ""
            });
            setPercent(0);
        }, [isSuccess, isError])
    return (
        <WrapperChangePass>
            <ChangePassContainer>
                <ChangePassTitle>
                    Đổi mật khẩu
                </ChangePassTitle>
                <ChangePassContent>
                    <Loading isLoading={isPending}>
                        <div>
                        <Progress percent={percent} type="line" strokeColor="#02CBE0"/>
                        </div>
                        <div>
                            <span>Mật khẩu cũ</span>
                            <InputForm type="password" placeholder="Nhập mật khẩu cũ" size={"large"} TypePassword={true} value={formdata.oldpassword} handleOnChange={(value) => handleChange("oldpassword", value)} style={{marginTop: "0.5rem"}}/>
                        </div>
                        <div>
                            <span>Mật khẩu mới</span>
                            <InputForm type="password" placeholder="Nhập mật khẩu mới" size={"large"} TypePassword={true} value={formdata.newpassword} handleOnChange={(value) => handleChange("newpassword", value)} style={{marginTop: "0.5rem"}}/>
                            <span style={{color:"rgba(160, 160, 160, 0.59)",fontSize:"1rem", display:"block", marginTop:"0.5rem"}}>
                                Mật khẩu phải có từ 8 đến 16 ký tự, bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt, không chứa khoảng trắng, ví dụ: Abcd@1234
                            </span>
                        </div>
                        <div>
                            <span>Xác nhận mật khẩu mới</span>
                            <InputForm type="password" placeholder="Xác nhận mật khẩu mới" size={"large"} TypePassword={true} value={formdata.confirmPassword} handleOnChange={(value) => handleChange("confirmPassword", value)} style={{marginTop: "0.5rem"}}/>
                        </div>
                    </Loading>
                </ChangePassContent>
                {
                    formdata.oldpassword && formdata.newpassword && formdata.confirmPassword &&
                    <ChangePassFooter>
                        <ButtonComponent color="primary" variant="solid" className="btn-success" textButton={'Hủy'} onClick={handleCancelChangePass}/>
                        <ButtonComponent color="danger" variant="solid" className="btn-success" textButton={'cập nhật'} onClick={handleChangePass}/>
                    </ChangePassFooter>
                }
            </ChangePassContainer>
        </WrapperChangePass>
    )
}