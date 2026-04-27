import styled from 'styled-components';
//import { Image } from 'antd';
export const WrapperCard = styled.div`
    width: 100%;
    height: 18rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    border: 1px solid #b7b7b7ff;
    @media screen and (max-width: 767px) {
        flex-direction: column;
        height:max-content;
    }
    
`
export const LeftCard = styled.div`
    width: 30%;
    background-color: lightgray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    position: relative;
    overflow:hidden;
    @media screen and (max-width: 767px) {
        width: 100%;
        height: 20rem;
        border-bottom-left-radius:0px;
        border-top-right-radius:10px;
    }
`
export const RightCard = styled.div`
    width: 70%;
    padding: 1rem;
    box-sizing: border-box;
    @media screen and (max-width: 767px) {
        width: 100%;
    }
`

export const NewLogo = styled.img`
    width: 5rem;
    height: 5rem;
    position: absolute;
    top: -0.9rem;
    left: -0.9rem;
`
export const TitleCard = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
`
export const CardConfig = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
`
export const CardLocation = styled.div`
    margin-top: 1rem;

`
export const CardDescription = styled.div`
    position: relative;
    margin-top: 1rem;
    font-size: 1rem;
    color: rgba(174, 174, 174, 1);
    line-height: 1.5;
    max-height: calc(1.5em * 3); 
    overflow: hidden;

    &::after {
        content: "...";
        position: absolute;
        bottom: 0;
        right: 0;              

        white-space: nowrap;   

        padding-left: 10px;
        background: linear-gradient(to right, transparent, white 50%);
    }
`