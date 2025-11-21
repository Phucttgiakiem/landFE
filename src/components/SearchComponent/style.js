import { Row,Col } from "antd";
import styled from 'styled-components';
export const WrapperArea = styled.div`
  width: 100%;
  display:none;
  padding:0px;
  margin: 20px 0 20px ;
  height: 25rem;
  overflow-y: auto;
  overflow-x: hidden;
  &.show {
    display: block;
  }
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin-bottom: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccccccff;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-button {
    display: none; /* cái nút trên/dưới */
  }
`
export const WrapperSearch = styled(Row)`
  width: calc(100% - 240px);
  margin: 1.2rem auto 5px;
  padding: 0 20px;
  background-color: white;
  position: absolute;
  z-index: 4;
  top: 0;
  right: 0;
  left: 0;
  &.active {
    box-shadow: 0.15rem 0.15rem 5px rgba(98, 98, 98, 1), 
                -0.15rem 0.15rem 5px rgba(98,98,98,1);
    border-radius: 8px;
    
  }
  @media screen and (min-width:768px) and (max-width: 1199px) {
    width: calc(100% - 40px);
  }
  
  @media screen and (max-width:767px){
    display:none;
  }
  
`
export const WrapperInputsearch = styled.div`
  width:100%;
  height:3.5rem;
  margin: 20px 0;
  background-color: #f2f2f2;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
 
`
export const InputSearch = styled.input`
  border:none;
  height:60%;
  font-size:1rem;
  flex-grow:1;
  margin: auto 5px;
  outline:none;
  background-color:transparent;

`
export const InputNameCity = styled.div`
  height:60%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  font-size:1rem;
  margin:auto 0;
`

export const ContentArea = styled.div`
  display: flex;
  flexDirection: row;
  flex-wrap: wrap;
`
export const Itemlocation = styled(Col)`
  height: 2.5rem;
  line-height: 2.5rem;
  font-weight: 400;
  &:hover {
    background-color: rgba(194, 194, 194, 1);
    cursor: pointer;
  }
`
export const BtnArrowDown = styled.span`
  margin: 1rem;
  display:flex; 
  alignItems:center;
  transition: transform 0.3s ease; 
  transform: rotate(0deg);

  &.open {
    transform: rotate(180deg);
  }
  &:hover  {
    transform: rotate(0deg);
  }
  
`
export const WrapperListcommune = styled.ul`
  height: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
export const Itemlistcommune = styled.span`
  height: 80%;
  width: max-content;
  padding: 0 1rem;
  background-color: #d9d9d9;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  
`
export const TextItemlistcommune = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  margin: 20px;
  color: #f01a1aff;
`
