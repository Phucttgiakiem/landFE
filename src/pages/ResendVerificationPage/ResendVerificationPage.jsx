import { WrapperResendVerifyPage,WrapperContainerLeft,WrapperContainerRight,WrapperLeftButton,WrapperInformationSuccess } from "./style";
import logo from "../../assets/images/real_state.png";
import Icon_success from "../../assets/images/icons_success.png";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import backgroundland from "../../assets/images/building_home.jpg";
import {useState} from 'react';
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationhook";
import {useNavigate,useSearchParams} from 'react-router-dom';
export default function ResendVerificationPage () {
    const [email,setEmail] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");
    
    const mutation = useMutationHook(
        data => UserService.authenemail(data)
    )
    const {isPending,isSuccess,error,data} = mutation;
    const handleOnchangeEmail = (value) => {
        setEmail(value);
    }
    const handleResendVerification = () => {
        mutation.mutate({email,type});
    }
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',background:'rgba(0,0,0,0.53)',height: '100vh'}}>
            <WrapperResendVerifyPage>
                <WrapperContainerLeft>
                    <h3>Xác thực qua email</h3>
                    {
                        data ? (
                            <WrapperInformationSuccess>
                                <img src={Icon_success} alt="icon success" style={{width: '40px', height: '40px'}}/>
                                <span style={{ color: "green", marginBottom: "8px",margin: 0 }}>{data?.message}</span>
                            </WrapperInformationSuccess>
                        ) : (
                            <>
                                <InputForm status={error?.response?.data?.status === 'error' ? 'error' : undefined} placeholder="Nhập email của bạn" label="Email" size="large" TypePassword={false} handleOnChange={handleOnchangeEmail}/>
                                {error?.response?.data?.status === 'error' && (
                                    <span style={{ color: "red", marginTop: "8px" }}>{error?.response?.data?.message}</span>
                                )}
                                <WrapperLeftButton>
                                    <ButtonComponent 
                                        size="large"
                                        className={`btn-submit`} 
                                        textButton={"Gửi"} 
                                        onClick={handleResendVerification}
                                    />
                                    <span className="back-to-login" onClick={() => navigate('/sign-in')}>
                                        Quay lại đăng nhập
                                    </span>
                                </WrapperLeftButton>
                            </>
                        )
                    }
                    
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <img src={backgroundland} alt="background land" style={{width: '100%',height:"100%", objectFit:'fill'}}/>
                    <img src={logo} alt="logo" style={{position: 'absolute', top: '20px', left: '20px', width: '120px'}}/>
                    <div style={{position: 'absolute', top: '20px', left: '160px', color:'rgba(21,71,132,1)'}}>
                        <h4>Tìm nhà đất</h4>
                        <h4>Batdongsan.com.vn dẫn lối</h4>
                    </div>
                </WrapperContainerRight>
            </WrapperResendVerifyPage>
        </div>
    )
}