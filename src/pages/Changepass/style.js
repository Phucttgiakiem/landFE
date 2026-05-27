import styled from 'styled-components';

export const WrapperChangePass = styled.div`
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
export const ChangePassContainer = styled.div`
    width: 100%;
    min-height: 30rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    @media screen and (max-width: 1199px) {
        margin-top: 6.5rem;
        min-height:calc(100vh - 6.5rem - 40px)
    }
`;
export const ChangePassTitle = styled.span`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    display: inline-block;
`
export const ChangePassContent = styled.div`
    width: 100%;
    height: max-content;
    div ~ div {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
    }
`
export const ChangePassFooter = styled.div`
    width: 100%;
    height: 3rem;
    margin-top:2rem;
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    justify-content: flex-end;
    align-items: end;
    gap: 10px;
    .btn-success {
        font-weight: 500;
        font-size: 16px;
        width: 6rem;
        height: 2.5rem;
    }
`;

