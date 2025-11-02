
import { WrapperContainerLeft,WrapperContainerRight, WrapperRememberandForgot,WrapperAnotherSignin } from "./style";
import { UserOutlined,LockOutlined} from '@ant-design/icons';
import logo from "../../assets/images/real_state.png";
import backgroundland from "../../assets/images/building_home.jpg";
import GoogleIcon from "../../assets/images/google.png";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Link } from 'react-router-dom';
import { Checkbox } from 'antd';
export default function SignInPage  ()  {
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
              <InputForm placeholder={"Nhập email hoặc số điện thoại"} prefix={<UserOutlined/>} size={"large"} TypePassword={false} style={{marginBottom: "16px"}}/>
              <InputForm placeholder={"Mật khẩu"} size={"large"} prefix={<LockOutlined/>} TypePassword={true}/>
              <ButtonComponent className="btn-login" size="large" textButton={"Đăng nhập"} styleButton={{width:"100%"}}/>
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
              <ButtonComponent size="large" 
                leftIcon={<img src={GoogleIcon} alt="icon-google" width="16" height="16" 
                style={{display:"flex",flexDirection:"column",alignItems:'center'}} />} 
                textButton={"Đăng nhập với Google"} 
                styleButton={{width:"100%", marginTop:"1rem", display:"flex",flexDirection:"row",alignItems:"center"}}/>
          </div>
          <div className="signup_member">
              <span>Chưa là thành viên? <Link rel="icon" href="#" >Đăng ký</Link> Tại đây</span>
          </div>
        </WrapperContainerRight>
      </div>
    </div>
  );
}