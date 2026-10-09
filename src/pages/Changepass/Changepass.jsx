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
                message.success("Password changed successfully!");
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
                    change password
                </ChangePassTitle>
                <ChangePassContent>
                    <Loading isLoading={isPending}>
                        <div>
                        <Progress percent={percent} type="line" strokeColor="#02CBE0"/>
                        </div>
                        <div>
                            <span>Old Password</span>
                            <InputForm type="password" placeholder="Enter old password" size={"large"} TypePassword={true} value={formdata.oldpassword} handleOnChange={(value) => handleChange("oldpassword", value)} style={{marginTop: "0.5rem"}}/>
                        </div>
                        <div>
                            <span>New Password</span>
                            <InputForm type="password" placeholder="Enter new password" size={"large"} TypePassword={true} value={formdata.newpassword} handleOnChange={(value) => handleChange("newpassword", value)} style={{marginTop: "0.5rem"}}/>
                            <span style={{color:"rgba(160, 160, 160, 0.59)",fontSize:"1rem", display:"block", marginTop:"0.5rem"}}>
                                Password must be 8-16 characters, including lowercase, uppercase, numbers, and special characters, no spaces, e.g., Abcd@1234
                            </span>
                        </div>
                        <div>
                            <span>Confirm New Password</span>
                            <InputForm type="password" placeholder="Confirm new password" size={"large"} TypePassword={true} value={formdata.confirmPassword} handleOnChange={(value) => handleChange("confirmPassword", value)} style={{marginTop: "0.5rem"}}/>
                        </div>
                    </Loading>
                </ChangePassContent>
                {
                    formdata.oldpassword && formdata.newpassword && formdata.confirmPassword &&
                    <ChangePassFooter>
                        <ButtonComponent color="primary" variant="solid" className="btn-success" textButton={'Cancel'} onClick={handleCancelChangePass}/>
                        <ButtonComponent color="danger" variant="solid" className="btn-success" textButton={'Update'} onClick={handleChangePass}/>
                    </ChangePassFooter>
                }
            </ChangePassContainer>
        </WrapperChangePass>
    )
}