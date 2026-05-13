import { WrapperContainerLeft,WrapperContainerRight,WrapperAnotherSignin,WrapperSignup,Signupcontainer,WrapperTypeUser } from "./style";
import {IdcardOutlined,LockOutlined} from '@ant-design/icons';
import { faUsers,faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/images/real_state.png";
import backgroundland from "../../assets/images/building_home.jpg";
import GoogleIcon from "../../assets/images/google.png";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import Loading from "../../components/LoadingComponent/Loading";
import { Link,useNavigate } from 'react-router-dom';
import { useMutationHook } from "../../hooks/useMutationhook";
import * as UserService from "../../services/UserService";
import { useMessage } from "../../components/Message/Message";
import {useState,useEffect} from 'react';
export default function SignUpPage () {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [typeuser,setTypeuser] = useState(null);
  const message = useMessage();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/sign-in");
  }
  const handleOnChangeName = (value) => {
    setName(value);
  }
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  }
  const handleOnChangePhone = (value) => {
    setPhone(value);
  }
  const handleOnChangeAddress = (value) => {
    setAddress(value);
  }
  const handleOnChangePassword = (value) => {
    setPassword(value);
  }
  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  }
  const handleSignUp = () => {
      mutation.mutate(
        {
          email, 
          password,
          fullname: name,
          confirmPassword,
          phone,
          address,
          typeuser
        }
      );
    }
    const mutation = useMutationHook(
        data => UserService.signupUser(data)
    );
    const {isPending,data,isSuccess,isError} = mutation;
    useEffect(() => {
      if(isSuccess) {
        message.success();
        navigate("/sign-in");
      }else if(isError) {
        message.error();
      }
    },[isSuccess,isError]);
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
                <h3>Đăng ký tài khoản mới</h3>
                <WrapperSignup>
                  <Signupcontainer>
                      <InputForm placeholder={"Nhập họ tên"} size={"large"} prefix={<IdcardOutlined />} TypePassword={false} style={{marginRight: '10px'}} value={name} handleOnChange={handleOnChangeName}/>
                      <InputForm placeholder={"Nhập địa chỉ email"} size={"large"} prefix={<IdcardOutlined />} TypePassword={false} style={{marginRight: '10px'}} value={email} handleOnChange={handleOnChangeEmail} />
                      <InputForm placeholder={"Nhập số điện thoại"} size={"large"} prefix={<IdcardOutlined />} TypePassword={false} style={{marginRight: '10px'}} value={phone} handleOnChange={handleOnChangePhone}/>
                      <InputForm placeholder={"Nhập địa chỉ"} size={"large"} prefix={<IdcardOutlined />} TypePassword={false} style={{marginRight: '10px'}} value={address} handleOnChange={handleOnChangeAddress}/>
                      <InputForm placeholder={"Nhập password"} size={"large"} prefix={<LockOutlined />} TypePassword={true} style={{marginRight: '10px'}} value={password} handleOnChange={handleOnChangePassword}/>
                      <InputForm placeholder={"Nhập lại password"} size={"large"} prefix={<LockOutlined />} TypePassword={true} style={{marginRight: '10px'}} value={confirmPassword} handleOnChange={handleOnChangeConfirmPassword}/>
                      <WrapperTypeUser>
                          <div className={`btn-choosetype ${typeuser === "sell-user" ? "active" : ""}`} onClick={()=> setTypeuser(prev => prev === "sell-user" ? null : "sell-user") }>
                            <FontAwesomeIcon icon={faUsers} />
                            <span>Bên bán</span>
                          </div>
                          <div className={`btn-choosetype ${typeuser === "user" ? "active" : ""}`} onClick={() => setTypeuser(prev => prev === "user" ? null : "user")}>
                            <FontAwesomeIcon icon={faUser} />
                            <span>Khách</span>
                          </div>
                      </WrapperTypeUser>
                  </Signupcontainer>
                </WrapperSignup>
                {data?.status === "ERR" && <span style={{ color: "red"}}>{data?.message}</span>}
                <Loading isLoading={isPending}> 
                  <ButtonComponent 
                    disabled={!name.length || !email.length || !phone.length || !address.length || !password.length || !confirmPassword.length}
                    className={`btn-login ${!name.length || !email.length || !phone.length || !address.length || !password.length || !confirmPassword.length || !typeuser ?'disabled' : 'active'}`} 
                    size="large" 
                    textButton={"Đăng ký"} 
                    styleButton={{width:"100%"}}
                    onClick={handleSignUp}
                    />
                </Loading>
                <WrapperAnotherSignin>
                    <div></div>
                    <div>
                        <div className="another_option">Hoặc</div>
                    </div>
                </WrapperAnotherSignin>
                <ButtonComponent size="large" 
                  leftIcon={<img src={GoogleIcon} alt="icon-google" width="16" height="16" 
                  style={{display:"flex",flexDirection:"column",alignItems:'center'}} />} 
                  textButton={"Đăng ký tài khoản với Google"} 
                  styleButton={{width:"100%", marginTop:"1rem", display:"flex",flexDirection:"row",alignItems:"center"}}/>
            </div>
            <div className="signup_member">
                <span>Bạn là thành viên? <Link rel="icon" onClick={(e) => handleLogin(e)} >Đăng nhập</Link> Tại đây</span>
            </div>
          </WrapperContainerRight>
        </div>
      </div>
    );
  }