import styled from "styled-components";

export const WrapperDetailContract = styled.div`
    width: calc(100% - 300px);
    box-sizing: border-box;
    margin-left: 300px;
    padding: 20px;
    background-color: #e3e3e3;
    min-height: calc(100vh - 90px);
    @media screen and (max-width: 1199px) {
        width: 100%;
        margin-left: 0;
        
    }
`;
export const DetailContractContainer = styled.div`
    width: 100%;
    min-height: 30rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 1199px) {
        margin-top: 6.2rem;
        min-height: calc(100vh - 6.2rem - 40px);
    }
`
export const DetailContractHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #e3e3e3;
    box-sizing: border-box;
    gap: 10px;
    h2 {
        margin: 0;
        padding: 20px;
    }
     @media screen and (max-width: 767px){
        display: grid;
        padding:20px;
        grid-template-columns: repeat(2,1fr);

        gap: 10px;

        h2 {
            grid-column: 1 / 3;
            padding: 0;
            text-align:center;
        }
    }
`
export const DetailContractBody = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
`