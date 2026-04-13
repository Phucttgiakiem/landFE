
import { WrapperContainerLeft,WrapperContainerRight, WrapperRememberandForgot,WrapperAnotherSignin } from "./style";
import {useState,useEffect} from 'react';
import { UserOutlined,LockOutlined} from '@ant-design/icons';
import logo from "../../assets/images/real_state.png";
import backgroundland from "../../assets/images/building_home.jpg";
import GoogleIcon from "../../assets/images/google.png";
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
  const {isPending,data,isSuccess} = mutation;

  useEffect(() => {
    if(isSuccess && data?.status !== "error"){
      navigate("/");
      localStorage.setItem("access_token",JSON.stringify(data?.access_Token));
      if(data?.access_Token){
        const decoded = jwtDecode(data?.access_Token);
        if(decoded?.id){
          handleGetDetailsUser(decoded?.id,data?.access_Token); 
        }
      }
    }
  },[isSuccess]);
  const handleGetDetailsUser = async (id,token) => {
    const res = await UserService.getDetailsUser(id,token);
    dispatch(updateUser({...res?.data,access_Token: token}));
  }
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',background:'rgba(0,0,0,0.53)',height: '100vh'}}>
      <div style={{display:'flex',flexDirection:'row',width: '1000px', height: '600px', borderRadius: '6px',backgroundColor: '#fff', overflow: 'hidden'}}>
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
              {data?.status === "error" && <span style={{ color: "red"}}>{data?.message}</span>}
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
                      <span >
                          <Checkbox className="CheckOutlined" />
                      </span>
                      <span>Nhớ tài khoản</span>
                  </div>
                  <div>
                      <span>Quên mật khẩu?</span>
                  </div>
              </WrapperRememberandForgot>
              <WrapperAnotherSignin>
                  <div></div>
                  <div>
                      <div className="another_option">Hoặc</div>
                  </div>
              </WrapperAnotherSignin>
              <ButtonComponent 
                
                size="large" 
                leftIcon={<img src={GoogleIcon} alt="icon-google" width="16" height="16" 
                style={{display:"flex",flexDirection:"column",alignItems:'center'}} />} 
                textButton={"Đăng nhập với Google"} 
                styleButton={{width:"100%", marginTop:"1rem", display:"flex",flexDirection:"row",alignItems:"center"}}/>
          </div>
          <div className="signup_member">
              <span>Chưa là thành viên? <Link rel="icon" onClick={(e) => handleNavigateSignUp(e)}>Đăng ký</Link> Tại đây</span>
          </div>
        </WrapperContainerRight>
      </div>
    </div>
  );
}