import styled from "styled-components";

export const WrapperManageListing = styled.div`
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
export const ManageListingContainer = styled.div`
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
export const ManageListingHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    h2 {
        margin: 0;
        padding: 20px;
    }
`
export const ManageListingHeaderContent = styled.div`
    width: 100%;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    flex-direction: row;
    gap: 20px;
    border-top: 1px solid #eaeaea;
    padding: 20px 20px 0;
    .btn-trash {
        cursor: pointer;
    }
    @media screen and (min-width:768px) and (max-width: 1199px){
        display:grid;
        grid-template-columns: repeat(2,1fr);
        grid-template-rows: repeat(2,1fr);
    }
    @media screen and (max-width: 767px){
        flex-direction: column;
    }
`
export const Selectownerproperty = styled.div`
    width:25rem;
    height: 3rem;
    border-radius: 15rem;
    border: 1px solid #1d1d1d;
    box-sizing: border-box;
    padding: 0rem 1rem;
    display:flex;
    flex-direction:column;
    justify-content: center;
    .select-owner {
        width:calc(25rem - 2rem);
        height: 2.6rem;
    }
    .select-owner > .ant-select-selector {
        border-style: none;
    }
    @media screen and (max-width: 767px){
        width: 100%;
        .select-owner {
            width:calc(100% - 2rem);
            
        }
        & > .ant-select {
            width: 100%;
        }
    }
`
export const WrapperCreateandtrash = styled.div`
    height: 3rem;
    flex-grow: 1;
    gap: 20px;
    display:flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items:center;
    @media screen and (max-width: 767px){
        width: 100%;
    }
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
    @media screen and (min-width: 768px) and (max-width:1199px){
        width: 100%;
        grid-column: 1 / 3;
    }
    @media screen and (max-width: 767px){
        width: 100%;
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
export const FilterButton = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 6rem;
    height: 3rem;
    border-radius: 15rem;
    border: 1px solid #1d1d1d;
    font-size: 1.2rem;
    font-weight: 500;
    cursor: pointer;
    gap: 5px;

    &:hover {
        background-color: #f1f1f1;
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
    border-bottom: 1px solid #eaeaea;
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
export const ManageListingBody = styled.div`
    width: 100%;
    padding: 0 20px 20px 20px;
    box-sizing: border-box;
`