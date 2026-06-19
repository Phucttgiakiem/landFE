import {WrapperVerifyEmail,WrapperContainerLeft,WrapperContainerRight,WrapperInformationSuccess} from "./style";
import logo from "../../assets/images/real_state.png";
import Icon_success from "../../assets/images/icons_success.png";
import backgroundland from "../../assets/images/building_home.jpg";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {useEffect, useState} from 'react';
import {useNavigate,useSearchParams} from 'react-router-dom';
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationhook";
export default function VerifyEmailPage () {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const mutation = useMutationHook(
        data => UserService.verifyEmail(data)
    )
    const {isPending,isSuccess,data,error} = mutation;
    const handleVerifyEmail = () => {
        mutation.mutate(token);
    }
    useEffect(() => {
        if(token){
            handleVerifyEmail();
        }   
    },[token]);
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',background:'rgba(0,0,0,0.53)',height: '100vh'}}>
            <WrapperVerifyEmail>
                <WrapperContainerLeft>
                    <h3>Xác thực qua email</h3>
                    {
                        isPending ? (
                            <span>Đang xác thực email...</span>
                        ) : error ? (
                            <span style={{ color: "red", marginBottom: "8px",margin: 0 }}>{error?.response?.data?.message}</span>
                        ) : isSuccess ? (
                            <WrapperInformationSuccess>
                                <img
                                    src={Icon_success}
                                    alt="success"
                                    style={{ width: "40px", height: "40px" }}
                                />
                                <span style={{ color: "green" }}>
                                    {data?.message}
                                </span>
                            </WrapperInformationSuccess>
                        ) : (
                            <span style={{ color: "red" }}>
                                Liên kết xác thực không hợp lệ
                            </span>
                        )
                    }
                    <ButtonComponent 
                        size="large"
                        className={`btn-prevlogin active`} 
                        textButton={"Quay lại trang đăng nhập"} 
                        styleButton={{width:"max-content", marginTop: "24px"}}
                        onClick={() => navigate('/sign-in')}
                    />
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <img src={backgroundland} alt="background land" style={{width: '100%',height:"100%", objectFit:'fill'}}/>
                    <img src={logo} alt="logo" style={{position: 'absolute', top: '20px', left: '20px', width: '120px'}}/>
                    <div style={{position: 'absolute', top: '20px', left: '160px', color:'rgba(21,71,132,1)'}}>
                        <h4>Tìm nhà đất</h4>
                        <h4>Batdongsan.com.vn dẫn lối</h4>
                    </div>
                </WrapperContainerRight>
            </WrapperVerifyEmail>
        </div>
    )
}