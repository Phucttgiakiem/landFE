import { WrapperContainerLeft,WrapperContainerRight } from "./style";
import { UserOutlined} from '@ant-design/icons';
import logo from "../../assets/images/real_state.png";
import backgroundland from "../../assets/images/building_home.jpg";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Link } from 'react-router-dom';

export default function ForgotPassPage () {
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
                <h3>Đây là trang quên mật khẩu</h3>
                <InputForm placeholder={"Nhập địa chỉ email"} prefix={<UserOutlined />} size={"large"} TypePassword={false}/>
                <ButtonComponent className="btn-login" size="large" textButton={"Gửi mã"} styleButton={{width:"100%"}}/>
            </div>
            <div className="signup_member">
                <span>Quay lại <Link rel="icon" href="#" >Đăng nhập</Link> Tại đây</span>
            </div>
          </WrapperContainerRight>
        </div>
      </div>
    );
}