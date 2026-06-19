import styled from 'styled-components';

export const WrapperResendVerifyPage = styled.div`
    display:flex;
    flex-direction:row;
    width: 1000px; 
    height: 600px;
    border-radius: 6px;
    background-color: #fff; 
    overflow: hidden;
    @media screen and (max-width: 1199px) {
        width:100vw;
        height:100vh;
        border-radius: 0;
    }
`

export const WrapperContainerRight = styled.div`
    position: relative;
    width: 60%;
    & div h4 {
        margin-bottom:0px;
    }
    & div h4:last-child {
        margin-top: 0px;
    }
    @media screen and (max-width: 1199px) {
        width:0;
        display:none;
    }
`
export const WrapperContainerLeft = styled.div`
    width: 40%;
    height:100%;
    padding: 32px;
    display:flex;
    flex-direction:column;
    justify-content: flex-start;
    box-sizing:border-box;
    & h3 {
        margin-top: 0px;
        margin-bottom: 20px;
    }
    .btn-submit {
        font-weight:700;
        border:none;
        color:#fff;
        background-color: #02CBE0;
    } 
    .btn-submit:hover {
        background-color: rgba(2,232,244,2);
    }
    @media screen and (max-width: 1199px){
        width: 100vw;
        height: 100vh;
    }
`
export const WrapperLeftButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 16px;
    justify-content: space-between;
    .back-to-login {
        color: #02CBE0;
        cursor: pointer;
    }
`
export const WrapperInformationSuccess = styled.div`
    width: 100%;
    display: flex;
    flex-direction:row;
    gap: 16px;
    align-items: center;
`

