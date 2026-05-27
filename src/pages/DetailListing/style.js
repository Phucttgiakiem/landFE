import styled from "styled-components";

export const WrapperDetaillisting = styled.div`
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
export const DetailListingContainer = styled.div`
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
export const DetailListingHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #e3e3e3;
    box-sizing: border-box;
    h2 {
        margin: 0;
        padding: 20px;
    }
    @media screen and (max-width:1199px){
        padding: 20px;
        gap: 20px;
        h2 {
            padding: 0px;
        }
    }
`
export const DetailListingBody = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
`
export const WrapperImage = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    column-gap: 10px;
    row-gap: 10px;
    @media screen and (max-width:767px){
        grid-template-columns: repeat(2,1fr);
    }
`