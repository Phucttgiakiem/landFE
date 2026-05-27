import styled from 'styled-components';

export const OverlayIpad = styled.div`
    display: none;
    @media screen and (min-width: 768px) and (max-width: 1199px) {
        display: block;
        position: fixed;
        inset: 0;
        background-color: rgba(0,0,0,0.45);
        z-index: 14;
    }
`
export const RangeFilterWrapper = styled.div`
    position:absolute;
    top:2.2rem;
    z-index:6;
    background-color:white;
    width:25rem;
    height:22rem;
    display:flex;
    flex-direction: column;
    box-shadow:1px 2px 0.2rem 1px rgb(139, 139, 139); 
    border-radius:0.5rem;
    & > div:first-child {
        position:relative;
    }
    & > div:first-child span {
        position: absolute;
        font-size: 22px;
        cursor: pointer;
        top:50%;
        right: 20px;
        transform: translateY(-50%);
    }
    h3 {
        text-align: center;
        margin: 0;
        padding: 20px 0;
        color: rgb(91, 91, 91);
        font-weight: 500;
        border-bottom: 1px solid rgb(225, 225, 225)
    }
    @media screen and (min-width: 768px) and (max-width: 1199px) {
        position: fixed;
        z-index: 15;
        width:35rem;
        height:30rem;
        top:calc((100vh - 30rem)/2);
        left:calc((100vw - 35rem)/2);
    }
`
export const RangeFilterContentTop = styled.div`
    width: 100%;
    background-color:rgb(255, 255, 255);
    display: flex;
    padding: 1rem;
    flex-direction: column;
    box-sizing: border-box;
    gap: 2px;
    & > div {
        width: 100%;
        display:flex;
        flex-direction: row;
        margin-bottom: 10px;
        box-sizing: border-box;
    }
    & .inputprice {
        width: 40%;
    }
    & div:nth-child(2) span {
        display:flex;
        flex-direction: row;
        justify-content:center;
        align-item:center;
        width: 20%;
    }
    & div:first-child span {
        display:block;
        width: 50%;
    }
    & div:first-child > span:last-child {
        padding-left: 5rem;
    }
`
export const RangeFilterMainContent = styled.div`
    width: 100%;
    height: 5rem;
    overflow-y: scroll;
    overflow-x: hidden;
    flex:1;
    padding: 0 1rem;
    box-sizing: border-box;
    &::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 10px;
        border: 2px solid transparent; 
        background-clip: content-box;
        }
    & .list-option {
        display:flex;
        flex-direction: column;
        font-size: 20px;
        font-weight: 500;
        gap: 10px;
        margin-bottom: 8px;
        .ant-radio-wrapper {
            width: 100%;
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between; 
            align-items: center;
        }
        .ant-radio-wrapper span:last-child {
            flex: 1;
            margin: 0;
        }
    }
`
export const RangeFilterContentBottom = styled.div`
    width: 100%;
    border-top: 1px solid rgb(225, 225, 225);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    & .btn-apply {
        color: rgb(255, 255, 255);
        font-weight:500;
        background-color:#02CBE0;
        outline:none;
        border: none;
    }
    & .btn-apply:hover {
        background-color:#AFF5FA;
    }
`