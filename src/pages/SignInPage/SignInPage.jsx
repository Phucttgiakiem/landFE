
import { WrapperContainerLeft,WrapperContainerRight, WrapperRememberandForgot,WrapperAnotherSignin,WrapperSignInPage } from "./style";
import {useState,useEffect} from 'react';
import { UserOutlined,LockOutlined} from '@ant-design/icons';
import logo from "../../assets/images/real_state.png";
import backgroundland from "../../assets/images/building_home.jpg";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Link,useNavigate } from 'react-router-dom';
import { Checkbox } from 'antd';
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationhook";
import Loading from "../../components/LoadingComponent/Loading";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

export default function SignInPage  ()  {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigateSignUp = (e) => {
    e.preventDefault();
    navigate("/sign-up");
  }
  const handleOnchangeEmail = (value) => {
    setEmail(value);
  }
  const handleOnchangePassword = (value) => {
    setPassword(value);
  }
  const handleSignIn = () => {
    mutation.mutate({email,password});
  }
  const mutation = useMutationHook(
      data => UserService.loginUser(data)
  );
  const {isPending,data,isSuccess,error} = mutation;

  useEffect(() => {
    if(isSuccess && !error){
      navigate("/");
      localStorage.setItem("access_token",JSON.stringify(data?.access_Token));
      if(data?.access_Token){
        const decoded = jwtDecode(data?.access_Token);
        if(decoded?.id){
          handleGetDetailsUser(decoded?.id,data?.access_Token); 
        }
      }
    }
    else if(error?.response?.data?.code === "EMAIL_NOT_VERIFIED"){
      localStorage.removeItem("access_token");
      navigate("/resend-verification?type=login");
    }
  },[isSuccess,error]);
  const handleGetDetailsUser = async (id,token) => {
    const res = await UserService.getDetailsUser(id,token);
    dispatch(updateUser({...res?.data,access_Token: token}));
  }
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',background:'rgba(0,0,0,0.53)',height: '100vh'}}>
      <WrapperSignInPage>
        <WrapperContainerLeft>
            <img src={backgroundland} alt="background land" style={{width: '100%',height:"100%", objectFit:'fill'}}/>
            <img src={logo} alt="logo" style={{position: 'absolute', top: '20px', left: '20px', width: '120px'}}/>
            <div style={{position: 'absolute', top: '20px', left: '160px', color:'rgba(21,71,132,1)'}}>
                <h4>Tìm nhà đất</h4>
                <h4>Batdongsan.com.vn dẫn lối</h4>
            </div>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <div>
              <h5>Xin chào bạn</h5>
              <h3>Đăng nhập để tiếp tục</h3>
              <InputForm placeholder={"Nhập địa chỉ email"} value={email} handleOnChange={handleOnchangeEmail} prefix={<UserOutlined/>} size={"large"} TypePassword={false} style={{marginBottom: "16px"}}/>
              <InputForm placeholder={"Mật khẩu"} size={"large"} value={password} handleOnChange={handleOnchangePassword} prefix={<LockOutlined/>} TypePassword={true}/>
              {error?.response?.data?.status === "error" && <span style={{ color: "red"}}>{error?.response?.data?.message}</span>}
              <Loading isLoading={isPending}>  
                <ButtonComponent 
                  disabled={!email.length || !password.length} 
                  className={`btn-login ${email.length && password.length ? 'active' : 'disabled'}`} 
                  size="large" 
                  textButton={"Đăng nhập"} 
                  styleButton={{width:"100%"}}
                  onClick={handleSignIn}
                />
              </Loading>
              <WrapperRememberandForgot>
                  <div>
                      <span onClick={() => navigate("/resend-verification?type=reset-password")}>Quên mật khẩu?</span>
                  </div>
              </WrapperRememberandForgot>
          </div>
          <div className="signup_member">
              <span>Chưa là thành viên? <Link rel="icon" onClick={(e) => handleNavigateSignUp(e)}>Đăng ký</Link> Tại đây</span>
          </div>
        </WrapperContainerRight>
      </WrapperSignInPage>
    </div>
  );
}