import styled from 'styled-components';

export const WrapperContainerLeft = styled.div`
    position: relative;
    width: 60%;
    & div h4 {
        margin-bottom:0px;
    }
    & div h4:last-child {
        margin-top: 0px;
    }
`
export const WrapperContainerRight = styled.div`
    width: 40%;
    padding: 32px;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    & h5 {
        margin-bottom:0px;
        margin-top:0px;
    }
    & h3 {
        margin-top: 0px;
        margin-bottom: 20px;
    }
    .btn-login {
        margin-top: 24px;
        background-color:#c0c0c0;
        color:#fff;
        font-weight:700;
        border:none
    }
    .btn-login.active {
        background-color: #02CBE0;
    }
    .btn-login.active:hover {
        background-color: rgba(2,232,244,2);
    }

    .btn-login.disabled:hover {
        
        background-color: #c0c0c0;
    }
    & .signup_member {
        display: flex;
        flex-direction: row;
        justify-content: center;
        & span a {
            text-decoration:none;
            color: #02CBE0;
            font-weight: bold
        }
    }
`
export const WrapperSignup = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 15rem;
`
export const Signupcontainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0,0,0,0.2);
        border-radius: 10px;
    }
`
export const WrapperRememberandForgot = styled.div`
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    
    .ant-checkbox:hover .ant-checkbox-inner {
        border-color: #d9d9d9 
    }
    .ant-checkbox-checked .ant-checkbox-inner {
        background-color: #02CBE0;
        border-color: #02CBE0;
    }


    & div:first-child {
        display: flex;
        flex-direction: row;
    }
    & div:first-child span {
        margin-right: 2px;
    }
    & div:last-child  span{
        color: #02CBE0;
    }
    & div span {
        cursor: pointer;
    }
`;
export const WrapperAnotherSignin = styled.div`
  width: 100%;
  height: 24px;
  margin-top:2rem;
  display:flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  & div:first-child {
    width: 100%;
    height: 1px;
    background-color: rgb(242, 242, 242);
  }
  & div:last-child {
    position: absolute;
    top: 0px;
    left: calc(50% - 24px);
    height: 24px;
    width: 49px;
    padding: 0px 8px;
    background-color: rgb(255, 255, 255);
    .another_option {
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        color: rgb(153, 153, 153);
    }
  }
`
