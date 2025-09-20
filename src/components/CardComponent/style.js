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
    overflow: hidden;
`
export const LeftCard = styled.div`
    width: 30%;
    background-color: lightgray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const RightCard = styled.div`
    width: 70%;
    padding: 1rem;
`
export const ImageCard = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;

`