import styled from 'styled-components';

export const WrapperForgetPass = styled.div`
    display:flex;
    flex-direction:row;
    width:1000px; 
    height:600px; 
    border-radius:6px;
    background-color:#fff;
    overflow:hidden;
    @media screen and (max-width: 1199px) {
        width:100vw;
        height:100vh;
        border-radius: 0;
    }
`

export const WrapperContainerLeft = styled.div`
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
export const WrapperContainerRight = styled.div`
    width: 40%;
    padding: 32px;
    display:flex;
    flex-direction:column;
    gap: 16px;
    & h3 {
        margin: 0px;
    }
    & > span {
        display:block;
        text-align: center;
        .link-login {
            text-decoration:none;
            color:#02cbe0;
        }
    }
    
    .btn-submitforgotpass {
        margin-top: 24px;
        background-color:#02CBE0;
        color:#fff;
        font-weight:700;
        border:none
    }
    .btn-submitforgotpass:hover {
        border:none;
        background-color: rgba(2,232,244,2)
    }
    @media screen and (max-width: 1199px){
        width: 100vw;
        height: 100vh;
    }
`
export const Panelfield = styled.div`
    display:flex;
    flex-direction: column;
    gap: 10px;
    .note-text, .error-text {
        dipslay:block;
        width: 100%;
        font-size: 12px;
    }
    .note-text {
        color: rgb(158, 158, 158);
    }
    .error-text {
        color: rgb(238, 72, 72)
    }
`
