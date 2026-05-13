import styled from "styled-components";

export const ContractVipContainer = styled.div`
    width: 100%;
    min-height: 30rem;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    flex-direction: column;
`
export const ContractHeaderContent = styled.div`
    width: 100%;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    flex-direction: row;
    justify-content:space-between;
    gap: 20px;
    padding: 0;
    .btn-create {
        background-color:#02CBE0;
        color:#fff;
        border-color:#02CBE0;
        &:hover {
            background-color:rgb(110, 217, 239);
            border-color:rgb(110, 217, 239);
        }
    }
`
export const TabsContainer = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: row;
    padding: 20px 0px 20px;
    gap: 20px;
    box-sizing: border-box;
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

`