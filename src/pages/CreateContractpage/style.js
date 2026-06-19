import styled from "styled-components";

export const WrapperCreateContract = styled.div`
    width: calc(100% - 300px);
    box-sizing: border-box;
    margin-left: 300px;
    padding: 20px;
    background-color: #e3e3e3;
    min-height: calc(100vh - 90px);
    @media screen and (max-width: 1199px) {
        width: 100%;
        margin-left: 0;
        min-height: 100vh;
    }
`
export const CreateContractContainer = styled.div`
    width: 100%;
    min-height: 30rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 1199px) {
        margin-top: 6.5rem;
        min-height:calc(100vh - 6.5rem - 40px)
    }
`
export const CreateContractHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid #e3e3e3;
    h2 {
        width: max-content;
        margin: 0;
        padding: 20px;
    }
    @media screen and (max-width:1199px){
        padding: 20px;
        gap:10px;
        h2 {
            padding: 0;
        }
    }
`
export const CreateContractBody = styled.div`
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display:flex;
    flex-direction:column;
    gap:10px;
`
export const CreateContractFooter = styled.div`
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display:flex;
    flex-direction:row;
    gap:10px;
`
export const MainContentofContract = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:20px;
    & > div {
        width:100%;
    }
`
export const WrapperDatecreateContractipad = styled.div`
    width:100%;
    height:max-content;
    @media screen and (max-width: 767px){
        display:none;
    }
`
export const WrapperDatecreateContractmobile = styled.div`
    width:100%;
    height:max-content;
    display:flex;
    flex-direction:row;
    gap:5px;
    @media screen and (min-width: 768px){
        display:none;
    }
`
