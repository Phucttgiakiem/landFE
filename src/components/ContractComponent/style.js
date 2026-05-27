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
export const WrapperRangerPickernotmobile = styled.div`
    display:flex;
    gap: 10px;
    @media screen and (max-width: 767px){
        display:none;
    }
`
export const WrapperRangerPickermobile = styled.div`
    display:flex;
    flex-direction:column;
    gap: 10px;
    width: 100%;
    box-sizing: border-box;
    @media screen and (min-width: 786px){
        display:none;
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
    @media screen and (max-width: 767px){
        display:grid;
        grid-template-columns: repeat(3, 1fr);
        gap:10px;
        justify-items: stretch; 
        align-items: stretch;
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

    box-sizing: border-box;

    &:hover {
        background-color: #f1f1f1;
    }

    &.active {
        background-color: #02CBE0;
        color: #fff;
    }

    @media screen and (max-width: 767px){
        width: 100%;
        height: 3rem;
        min-width: 0;
        padding: 0 5px;
        
    }
`