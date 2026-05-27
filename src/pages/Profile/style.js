import styled from 'styled-components';

export const WrapperProfile = styled.div`
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
export const ProfileContainer = styled.div`
    width: 100%;
    min-height: 30rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    @media screen and (max-width: 1199px) {
        margin-top: 6.5rem;
        min-height:calc(100vh - 6.5rem - 40px)
    }
`;
export const ProfileTitle = styled.span`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    display: inline-block;
`
export const ProfileContent = styled.div`
    width: 100%;
    height: 100%;
`;
export const PanelField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 1rem;
    & > div {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        span {
            font-weight: 500;
            margin-bottom: 0.5rem;
            margin: 0;
        }
        span:last-child {
            margin-left: 0.5rem;
        }
        svg {
            font-size: 1.2rem;
        }
    }
`
export const ProfileFooter = styled.div`
    width: 100%;
    height: max-content;
    margin-top:2rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    .btn-success {
        font-weight: 500;
        font-size: 16px;
        width: 6rem;
        height: 2.5rem;
    }
`