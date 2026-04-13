import styled from "styled-components";

export const WrapperManageListing = styled.div`
    width: calc(100% - 300px);
    box-sizing: border-box;
    margin-left: 300px;
    padding: 20px;
    background-color: #e3e3e3;
    min-height: calc(100vh - 90px);
`;
export const ManageListingContainer = styled.div`
    width: 100%;
    min-height: 30rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    
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
        margin-left: auto;
        cursor: pointer;
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
export const ManageListingBody = styled.div`
    width: 100%;
    padding: 0 20px 20px 20px;
    box-sizing: border-box;
`