import { Row } from "antd";
import styled from 'styled-components';
export const WrapperHeader = styled(Row)`
  width: 100vw;
  padding: 10px 120px;
  background-color: #02CBE0;
`
export const WrapperTextHeader = styled.span`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align:left;
`
export const WrapperHeaderMenu = styled.ul`
    display:flex;
    justify-content: start;
    flex-direction: row;
`
export const HeaderLinkSubMenu = styled.a`
    height: 3rem;
    padding: 0 20px;
    line-height: 3rem;
    display: block;
    color: #fff;
    text-decoration: none;
    font-size:16px;
    font-weight: 500;
`
export const WrapperHeaderSubMenu = styled.ul`
    position: absolute;
    display:none;
    width: max-content;
    top: calc(100% + 0.3rem);
    padding: 0;
    list-style: none;
    background-color: #02CBE0;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    z-index: 10;
    &:hover {
        opacity: 1;
    }
`
export const HeaderMenuItemsubMenu = styled.li`
    width: 100%;
    border-bottom: 1px solid #ccc;
    &:first-child {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    &:last-child {
      border-bottom: none;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    &:hover {
      background-color: rgba(54, 201, 217, 1);
    }
    &:active {
      background-color: rgba(0, 166, 185, 1)
    }
`

export const HeaderMenuItem = styled.li`
    list-style: none;
    margin-right: 20px;
    font-size: 16px;
    font-weight: 500;
    position: relative;

    &:hover ${WrapperHeaderSubMenu} {
        display: block;
    }
    
  &::after {
    content: "";
    position: absolute;
    height: 0.15rem;
    top:2.2rem;
    width: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    transition: width 0.3s;
  }

  &:hover::after {
    width: 100%;
  }

  ${({ $active }) =>
    $active &&
    `
    &::after {
      width: 100%;
    }
  `}
`
export const HeaderLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  min-width: 5rem;
  font-weight: 500;
  padding: 10px;
  display: inline-block;
  cursor: pointer;
  line-height:100%;
`
export const WrapperHeaderAccount = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin: 1rem 0;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top:10px;
    right: calc(5rem + 20px);
    width: 1px;
    height:50%;
    background-color: #fff;
  }
`