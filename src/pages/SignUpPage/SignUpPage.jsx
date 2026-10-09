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
         newErrors.name = "please enter your full name"
      }
      if(!formdata.email.trim()){
         newErrors.email = "please enter your email"
      }else if(!checkEmail(formdata.email.trim())){
          newErrors.email = "Email is not in the correct format"
      }
      if(!formdata.phone.trim()){
         newErrors.phone = "please enter your phone number"
      }
      if(!formdata.address.trim()){
          newErrors.address = "please enter your address"
      }
      if(!formdata.password.trim()){
          newErrors.password = "please enter your password"
      }else if (!checkPass(formdata.password.trim())){
          newErrors.password = "Password is not in the correct format"
      }
      if(!formdata.confirmPassword.trim()){
          newErrors.confirmPassword = "please enter confirm password"
      }else if (formdata.confirmPassword !== formdata.password){
          newErrors.confirmPassword = "confirm password does not match password"
      }
      if(!formdata.typeuser){
          newErrors.typeuser = "please select one of the two account types"
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
                  <h4>Find Real Estate</h4>
                  <h4>Batdongsan.com.vn leads the way</h4>
              </div>
          </WrapperContainerLeft>
          <WrapperContainerRight>
            <div>
                <h5>Hello there!</h5>
                <h3>Sign up for a new account</h3>
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
                              placeholder={"Enter your full name"} 
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
                              placeholder={"Enter your email"} 
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
                              placeholder={"Enter your phone number"} 
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
                              placeholder={"Enter your address"} 
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
                              placeholder={"Enter your password"} 
                              status={errors.password ? "error" : ""}
                              size={"large"} 
                              prefix={<LockOutlined />} 
                              TypePassword={true} 
                              style={{marginRight: '10px'}} 
                              value={formdata.password} handleOnChange={handleOnChangePassword}/>
                              <span className="note-text">Password must be 8-16 characters long, 
                                including at least one uppercase letter, lowercase letter, number, 
                                and special character from this set @$!%*?&</span>
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
                              placeholder={"Re-enter password"} 
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
                                  <span>Seller</span>
                                </div>
                                <div className={`btn-choosetype ${formdata.typeuser === "user" ? "active" : ""}`} onClick={() => handleOnChangeTypeuser("user")}>
                                  <FontAwesomeIcon icon={faUser} />
                                  <span>Customer</span>
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
                          textButton={"Sign up"} 
                          styleButton={{width:"100%"}}
                          onClick={handleSignUp}
                          />
                      </Loading>
                    </>
                  )
                }
            </div>
            <div className="signup_member">
                <span>Already a member? <Link rel="icon" onClick={(e) => handleLogin(e)} >Sign in</Link> here</span>
            </div>
          </WrapperContainerRight>
        </WrapperSignUpPage>
      </div>
    );
  }