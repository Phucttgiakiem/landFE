import styled from "styled-components";

export const WrapperDashboard = styled.div`
    width: calc(100% - 300px);
    box-sizing: border-box;
    margin-left: 300px;
    padding: 20px;
    background-color: #e3e3e3;
    min-height: calc(100vh - 90px);
    @media screen and (max-width: 1199px) {
        width: 100%;
        margin-left: 0;
        margin-top: 6.2rem;
    }
`;
export const DashboardContainer = styled.div`
    width: 100%;
    min-height: 30rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
`
export const DashboardHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    border-bottom: 1px solid #eaeaea;
    h2 {
        margin: 0;
        padding: 20px;
    }
`
export const DashboardBody = styled.div`
    width: 100%;
    height: max-content;
    padding: 0 20px 20px 20px;
    box-sizing: border-box;
`