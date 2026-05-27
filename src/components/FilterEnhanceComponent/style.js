import styled from "styled-components";

export const FilterPersonalpageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #3e3e3e8b;
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    
`
export const FilterPersonalpageWrapper = styled.div`
    width: 35vw;
    height: 75vh;
    background-color: #fff;
    border-radius: 10px;
    @media screen and (min-width: 768px) and (max-width: 1199px) {
        width: 70vw;
    }
    @media screen and (max-width: 767px) {
        width: 100vw;
        height: 100vh;
    }
`
export const FilterPersonalpageHeader = styled.div`
    width: 100%;
    height: 10%;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    span {
        font-size: 20px;
        font-weight: 700;
        cursor: pointer;
    }
`
export const FilterPersonalpageContent = styled.div`
    width: 100%;
    height:80%;
    overflow-y: auto;
    overflow-x: hidden;
`
export const FilterEnhancepageFooter = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    padding: 0 20px;
    box-sizing:border-box;
    .btn-apply {
        color: #fff;
        background-color:#02CBE0 !important;
        border:none;
    }
    .btn-apply:active {
        background-color:#49f5f5 !important;
    }
`
export const FilterPersonalItem = styled.div`
    width: 100%;
    height: max-content;
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-sizing: border-box;
`
export const FilterPersonalItemTitle = styled.div`
    width: 100%;
    height: 30px; 
    h4 {
        margin: 0;}
`
export const FilterPersonalItemContent = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: 5px;
    h5 {
        margin: 0;}
`

export const DetailTypeListingWrapper = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    background-color: white;
    
    ul {
        width: 100%;
        flex: 1;
        list-style: none;
        padding: 0;
        margin: 0;
        li {
            width: 100%;
            height: 35px;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0 10px;
            box-sizing: border-box;
            gap: 5px;
            
            .ant-checkbox-checked .ant-checkbox-inner {
                background-color: #02CBE0;
                border-color: #02CBE0;
                }

            .ant-checkbox-wrapper:hover .ant-checkbox-inner,
            .ant-checkbox:hover .ant-checkbox-inner {
                border-color: #02CBE0;
                }

            .ant-checkbox-checked::after {
                border: 1px solid #02CBE0;
                }
            span {
                font-size: 17px;
                font-weight: 400;
                font-family: 'Roboto', sans-serif;
                color: #333;
            }
        }
    }
`
export const WrapperInputSearch = styled.div`
    width: 100%;
    position: relative;
`
export const Wrapperlistselect = styled.ul`
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    display:flex;
    flex-direction:row;
    gap: 5px;
`
export const Listselectitem = styled.li`
    width: 2.5rem;
    height: 2.5rem;
    font-size: 20px;
    border: 2px solid #d9d9d9;
    border-radius: 100%;
    color: #d9d9d9;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    cursor: pointer;
    &:not(.active):hover {
        color: #02CBE0;
        background-color: #d9d9d9;
    }

    &.active {
        color: white;
        background-color: #02CBE0;
        border-color: #02CBE0;
    }
    
`
