import styled from "styled-components";

export const WrapperManageCategory = styled.div`
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
export const ManageCategoryContainer = styled.div`
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
export const ManageCategoryHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    border-bottom: 1px solid #eaeaea;
    box-sizing:border-box;
    padding: 20px;
    h2 {
        margin: 0;
    }
    @media screen and (max-width: 767px) {
        h2 {
            font-size: 18px;
        }
    }
`
export const TabsContainer = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: row;
    padding: 5px 20px 20px;
    gap: 20px;
    box-sizing: border-box;
    @media screen and (min-width: 768px) and (max-width:1199px){
        display: grid;
        grid-template-columns: repeat(4,1fr);
    }
    @media screen and (max-width: 767px){
        display: grid;
        grid-template-columns: repeat(2,1fr);
    }
`
export const TabButton = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
    height: 2.5rem;
    padding: 0 20px;
    border-radius: 15rem;
    border: 1px solid #1d1d1d;
    cursor: pointer;
    &:hover {
        background-color: #f1f1f1;
    }
    &.active {
        background-color: #02CBE0;
        color: #fff;
    }
    @media screen and (max-width:1199px){
        width: 95%;
        min-width: 0;
        padding: 0 5px;
    }
`
export const ManageCategoryBody = styled.div`
    width: 100%;
    padding: 0 20px 20px 20px;
    box-sizing: border-box;
`