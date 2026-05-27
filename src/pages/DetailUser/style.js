import styled from "styled-components";

export const WrapperDetailClient = styled.div`
    width: calc(100% - 300px);
    box-sizing: border-box;
    margin-left: 300px;
    padding: 20px;
    background-color: #e3e3e3;
    min-height: calc(100vh - 90px);
`;
export const DetailClientContainer = styled.div`
    width: 100%;
    min-height: 30rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    
`
export const DetailClientHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #e3e3e3;
    h2 {
        margin: 0;
        padding: 20px;
    }
`
export const DetailClientBody = styled.div`
    width: 100%;
    height: 100%;
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
`