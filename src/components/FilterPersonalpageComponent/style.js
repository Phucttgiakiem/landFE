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
    gap: 5px;
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
