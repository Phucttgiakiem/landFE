import { WrapperContainerLeft,WrapperContainerRight,
  WrapperSignup,Signupcontainer,WrapperTypeUser,
  WrapperSignUpPage,PanelField,WrapperInformationSuccess } from "./style";
import {IdcardOutlined,LockOutlined} from '@ant-design/icons';
import { faUsers,faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/images/real_state.png";
import backgroundland from "../../assets/images/building_home.jpg";
import Icon_success from "../../assets/images/icons_success.png";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import Loading from "../../components/LoadingComponent/Loading";
import { Link,useNavigate } from 'react-router-dom';
import { useMutationHook } from "../../hooks/useMutationhook";
import * as UserService from "../../services/UserService";
import { useMessage } from "../../components/Message/Message";
import {useState,useEffect} from 'react';
export default function SignUpPage () {
 
  const [errors,setErrors] = useState({});
  const [formdata,setFormdata] = useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
      typeuser: null,
  })
  const checkEmail = (email) => {
      const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return reg.test(email);
  }
  const checkPass = (pass) => {
      const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?=\S+$).{8,16}$/
      return reg.test(pass);
  }
  const message = useMessage();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/sign-in");
  }
  const validate = () => {
      let newErrors = {};
      if(!formdata.name.trim()){
         newErrors.name = "Vui lòng nhập họ tên"
      }
      if(!formdata.email.trim()){
         newErrors.email = "Vui lòng nhập email"
      }else if(!checkEmail(formdata.email.trim())){
          newErrors.email = "Email không đúng định dạng"
      }
      if(!formdata.phone.trim()){
         newErrors.phone = "Vui lòng nhập số điện thoại"
      }
      if(!formdata.address.trim()){
          newErrors.address = "Vui lòng nhập địa chỉ"
      }
      if(!formdata.password.trim()){
          newErrors.password = "Vui lòng nhập password"
      }else if (!checkPass(formdata.password.trim())){
          newErrors.password = "Mật khẩu không đúng định dạng"
      }
      if(!formdata.confirmPassword.trim()){
          newErrors.confirmPassword = "Vui lòng nhập Confirmpassword"
      }else if (formdata.confirmPassword !== formdata.password){
          newErrors.confirmPassword = "confirmpassword không khớp với password"
      }
      if(!formdata.typeuser){
          newErrors.typeuser = "Vui lòng chọn một trong hai loại tài khoản"
      }
      return newErrors;
  }
  const handleOnChangeName = (value) => {
      setFormdata(prev => ({
          ...prev,
          name: value
      }));
      if(errors.name){
          setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.name;
                return newErrors;
          });
      }
  }
  const handleOnChangeEmail = (value) => {
      setFormdata(prev => ({
          ...prev,
          email: value
      }));
      if(errors.email){
          setErrors((prev) => {
              const newErrors = {...prev};
              delete newErrors.email;
              return newErrors;
          })
      }
  }
  const handleOnChangePhone = (value) => {
      setFormdata(prev => ({
        ...prev,
        phone: value
      }));
      if(errors.phone){
          setErrors(prev => {
            const newErrors = {...prev};
            delete newErrors.phone;
            return newErrors;
          })
      }
  }
  const handleOnChangeAddress = (value) => {
      setFormdata(prev => ({
          ...prev,
          address: value
      }));
      if(errors.address){
          setErrors(prev => {
              const newErrors = {...prev};
              delete newErrors.address;
              return newErrors;
          })
      }
  }
  const handleOnChangePassword = (value) => {
      setFormdata(prev => ({
          ...prev,
          password: value
      }));
      if(errors.password){
          setErrors(prev => {
            const newErrors = {...prev};
            delete newErrors.password;
            return newErrors;
          })
      }
  }
  const handleOnChangeConfirmPassword = (value) => {
      setFormdata(prev => ({
          ...prev,
          confirmPassword:value
      }));
      if(errors.confirmPassword){
          setErrors(prev => {
            const newErrors = {...prev};
            delete newErrors.confirmPassword;
            return newErrors;
          })
      }
  }
  const handleOnChangeTypeuser = (value) => {
      setFormdata(prev => ({
          ...prev,
          typeuser: prev.typeuser === value ? null : value
      }));
      if(errors.typeuser){
          setErrors(prev => {
              const newErrors = {...prev};
              delete newErrors.typeuser;
              return newErrors;
          })
      }
  }
  
    const mutation = useMutationHook(
        data => UserService.signupUser(data)
    );
    const {isPending,data,isSuccess,isError,error} = mutation;
    const handleSignUp = () => {
      const newErrors = validate();
        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return;
        }
      mutation.mutate(
        {...formdata}
      );
    }
    useEffect(() => {
      if(isSuccess) {
        console.log(data);
        message.success(`${data?.message}`);
      }else if(isError) {
        setErrors({[error?.response?.data?.errorfield]:error?.response?.data.message});
        message.error(error?.response?.data.message);
      }
    },[isSuccess,isError,data,error]);
  return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',background:'rgba(0,0,0,0.53)',height: '100vh'}}>
        <WrapperSignUpPage>
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
                {
                  data ? 
                  <WrapperInformationSuccess>
                        <img src={Icon_success} alt="icon success" style={{width: '40px', height: '40px'}}/>
                        <span style={{ color: "green", marginBottom: "8px",margin: 0 }}>{data?.message}</span>
                    </WrapperInformationSuccess> : (
                    <>
                      <WrapperSignup>
                        <Signupcontainer>
                          <PanelField>
                            <InputForm 
                              placeholder={"Nhập họ tên"} 
                              size={"large"} 
                              status={errors.name ? "error" : ""}
                              prefix={<IdcardOutlined />} 
                              TypePassword={false} 
                              style={{marginRight: '10px'}} 
                              value={formdata.name} 
                              handleOnChange={handleOnChangeName}
                            />
                            {
                              errors.name && (
                                  <span style={{ color: "red", marginBottom: 10 }}>
                                      {errors.name}
                                  </span>
                              )
                            }            
                          </PanelField>
                          <PanelField>
                            <InputForm 
                              placeholder={"Nhập địa chỉ email"} 
                              size={"large"} 
                              status={errors.email ? "error" : ""}
                              prefix={<IdcardOutlined />} 
                              TypePassword={false} 
                              style={{marginRight: '10px'}} 
                              value={formdata.email} 
                              handleOnChange={handleOnChangeEmail} />
                            {
                              errors.email && (
                                  <span style={{ color: "red", marginBottom: 10 }}>
                                      {errors.email}
                                  </span>
                              )
                            } 
                          </PanelField>
                          <PanelField>
                            <InputForm 
                              placeholder={"Nhập số điện thoại"} 
                              size={"large"} 
                              status={errors.phone ? "error": ""}
                              prefix={<IdcardOutlined />} 
                              TypePassword={false} 
                              style={{marginRight: '10px'}} 
                              value={formdata.phone} handleOnChange={handleOnChangePhone}/>
                            {
                              errors.phone && (
                                  <span style={{ color: "red", marginBottom: 10 }}>
                                      {errors.phone}
                                  </span>
                              )
                            }
                          </PanelField>
                          <PanelField>
                            <InputForm 
                              placeholder={"Nhập địa chỉ"} 
                              status={errors.address ? "error" : ""}
                              size={"large"} 
                              prefix={<IdcardOutlined />} 
                              TypePassword={false} 
                              style={{marginRight: '10px'}} 
                              value={formdata.address} handleOnChange={handleOnChangeAddress}/>
                            {
                              errors.address && (
                                  <span style={{ color: "red", marginBottom: 10}}>
                                      {errors.address}
                                  </span>
                              )
                            }
                          </PanelField>
                          <PanelField>
                            <InputForm 
                              placeholder={"Nhập password"} 
                              status={errors.password ? "error" : ""}
                              size={"large"} 
                              prefix={<LockOutlined />} 
                              TypePassword={true} 
                              style={{marginRight: '10px'}} 
                              value={formdata.password} handleOnChange={handleOnChangePassword}/>
                              <span className="note-text">Mật khẩu phải có từ 8 đến 16 ký tự, bao gồm chữ cái hoa đầu chuỗi, 
                                      chữ cái thường và số, ít nhất một ký tự đặc biệt trong nhóm này @$!%*?&</span>
                            {
                              errors.password && (
                                  <span style={{ color: "red", marginBottom: 10}}>
                                      {errors.password}
                                  </span>
                              )
                            }
                          </PanelField>
                          <PanelField>
                            <InputForm 
                              placeholder={"Nhập lại password"} 
                              status={errors.confirmPassword ? "error": ""}
                              size={"large"} 
                              prefix={<LockOutlined />} 
                              TypePassword={true} 
                              style={{marginRight: '10px'}} 
                              value={formdata.confirmPassword} handleOnChange={handleOnChangeConfirmPassword}/>
                            {
                              errors.confirmPassword && (
                                  <span style={{ color: "red", marginBottom: 10}}>
                                      {errors.confirmPassword}
                                  </span>
                              )
                            }
                          </PanelField>
                          <PanelField>
                            <WrapperTypeUser>
                                <div className={`btn-choosetype ${formdata.typeuser === "sell-user" ? "active" : ""}`} onClick={()=> handleOnChangeTypeuser("sell-user") }>
                                  <FontAwesomeIcon icon={faUsers} />
                                  <span>Bên bán</span>
                                </div>
                                <div className={`btn-choosetype ${formdata.typeuser === "user" ? "active" : ""}`} onClick={() => handleOnChangeTypeuser("user")}>
                                  <FontAwesomeIcon icon={faUser} />
                                  <span>Khách</span>
                                </div>
                            </WrapperTypeUser>
                            {
                              errors.typeuser && (
                                  <span style={{ color: "red", marginBottom: 10}}>
                                      {errors.typeuser}
                                  </span>
                              )
                            }
                          </PanelField>
                        </Signupcontainer>
                      </WrapperSignup>
                      <Loading isLoading={isPending}> 
                        <ButtonComponent 
                          className={`btn-signup`} 
                          size="large" 
                          textButton={"Đăng ký"} 
                          styleButton={{width:"100%"}}
                          onClick={handleSignUp}
                          />
                      </Loading>
                    </>
                  )
                }
            </div>
            <div className="signup_member">
                <span>Bạn là thành viên? <Link rel="icon" onClick={(e) => handleLogin(e)} >Đăng nhập</Link> Tại đây</span>
            </div>
          </WrapperContainerRight>
        </WrapperSignUpPage>
      </div>
    );
  }