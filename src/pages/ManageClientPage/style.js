import styled from "styled-components";

export const WrapperManageClient = styled.div`
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
`;
export const ManageClientContainer = styled.div`
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
export const ManageClientHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    h2 {
        margin: 0;
        padding: 20px;
    }
`
export const ManageClientHeaderContent = styled.div`
    width: 100%;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    flex-direction: row;
    gap: 20px;
    border-top: 1px solid #eaeaea;
    padding: 20px 20px 0;
`
export const SearchContainer = styled.div`
    width: 25rem;
    height: 3rem;
    display: flex;
    flex-direction: row;
    border-radius: 15rem;
    border: 1px solid #1d1d1d;
    input {
        width: calc(100% - 6rem);
        height: 70%;
        margin: auto 0;
        font-size: 1rem;
        border: none;
        outline: none;
        background-color: transparent;
    }
`
export const SearchButton = styled.span`
    width: 3rem;
    height: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-left-top-radius: 15rem;
    border-left-bottom-radius: 15rem;
    cursor: pointer;
    svg {
        font-size: 1.5rem;}
`
export const ManageClientBody = styled.div`
    width: 100%;
    padding: 0 20px 20px 20px;
    box-sizing: border-box;
`