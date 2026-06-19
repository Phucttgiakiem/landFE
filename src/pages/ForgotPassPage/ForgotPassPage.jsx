import { WrapperContainerLeft,WrapperContainerRight,Panelfield,WrapperForgetPass } from "./style";
import logo from "../../assets/images/real_state.png";
import backgroundland from "../../assets/images/building_home.jpg";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Link } from 'react-router-dom';
import { useSearchParams,useNavigate } from 'react-router-dom';
import { useMutationHook } from "../../hooks/useMutationhook";
import { useState,useEffect } from "react";
import {useMessage} from "../../components/Message/Message";
import * as UserService from "../../services/UserService";
export default function ForgotPassPage () {
    
    const [Verified,setVerified] = useState({});
    const [fielddata,setFielddata] = useState({
        newpass: "",
        confirmpass: "",
        email:Verified?.email,
    })
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const message = useMessage();
    const navigate = useNavigate();
    const mutation = useMutationHook(
        data => UserService.forgotpass(data)
    )
    const handleChangeNewpass = (value) => {
        setFielddata(prev => ({
            ...prev,
            newpass: value
        }))
    }
    const handleChangeConfirmpass = (value) => {
        setFielddata(prev => ({
            ...prev,
            confirmpass:value
        }))
    }
    const {isPending,isSuccess,error,data} = mutation;
    const handleForgotpass = () => {
        mutation.mutate({
            ...fielddata,
        email: Verified?.email});
    }
    useEffect(() => {
        if(isSuccess && !error) {
            
            message.success("Bạn có thể sử dụng mật khẩu mới để đăng nhập");
            setTimeout(()=>{
                navigate("/sign-in")
            },1500)
        }else if(error){
            message.error(error?.response?.data?.message);
        }
    },[isSuccess,error]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await UserService.verifyEmail(token);
                setVerified(res);
            } catch (error) {
                setVerified(error);
                console.log("error",error);
            }
        }
        fetchData();
    },[token])
    
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',background:'rgba(0,0,0,0.53)',height: '100vh'}}>
        <WrapperForgetPass>
          <WrapperContainerLeft>
              <img src={backgroundland} alt="background land" style={{width: '100%',height:"100%", objectFit:'fill'}}/>
              <img src={logo} alt="logo" style={{position: 'absolute', top: '20px', left: '20px', width: '120px'}}/>
              <div style={{position: 'absolute', top: '20px', left: '160px', color:'rgba(21,71,132,1)'}}>
                  <h4>Tìm nhà đất</h4>
                  <h4>Batdongsan.com.vn dẫn lối</h4>
              </div>
          </WrapperContainerLeft>
          <WrapperContainerRight>
                <h3>Để lấy lại mật khẩu, vui lòng nhập thông tin dưới đây</h3>
                {
                    Verified?.response?.data?.status !== "error" ? (
                        <>
                            <Panelfield>
                                <InputForm placeholder={"Nhập mật khẩu mới"} size={"large"}
                                status={error?.response.data?.field === "newpass" ? "error": ""} 
                                TypePassword={true} handleOnChange={handleChangeNewpass}
                                />
                                <span className="note-text">Mật khẩu phải có từ 8 đến 16 ký tự, bao gồm chữ cái hoa đầu chuỗi, 
                                chữ cái thường và số, ít nhất một ký tự đặc biệt trong nhóm này @$!%*?&</span>
                                {error?.response.data?.field === "newpass" && <span className="error-text">{error?.response.data?.message}</span>}
                            </Panelfield>
                            <Panelfield>
                                <InputForm placeholder={"Nhập lại mật khẩu mới"} size={"large"} 
                                 status={error?.response.data?.field === "confirmpass" ? "error": ""} 
                                TypePassword={true} handleOnChange={handleChangeConfirmpass}/>
                                {error?.response.data?.field === "confirmpass" && <span className="error-text">{error?.response.data?.message}</span>}
                            </Panelfield>
                            <ButtonComponent 
                                className="btn-submitforgotpass" 
                                size="large" 
                                textButton={"Gửi"} 
                                styleButton={{width:"100%"}}
                                onClick={handleForgotpass}
                            />
                        </>
                    ): <span style={{color:"rgb(238, 72, 72)"}}>{Verified?.response?.data?.message}</span>
                }
                <span>Quay lại <Link rel="icon" to="/sign-in" className="link-login">Đăng nhập</Link> Tại đây</span>
            
          </WrapperContainerRight>
        </WrapperForgetPass>
      </div>
    );
}