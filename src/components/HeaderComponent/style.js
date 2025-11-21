
import styled from 'styled-components';
export const WrapperHeader = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 120px;
  background-color: #02CBE0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top:0;
  left:0;
  z-index:12;
  @media screen and (max-width: 1199px) {
      justify-content: center;
      padding: 10px 20px;
  }
`
export const WrapperAction = styled.div`
  display: flex;
  flex:1;
  flex-direction: row;
  align-items: center;
  justify-content:space-between;
  @media screen and (max-width: 1199px) {
     display:none;
  }
`
export const WrapperMenuMobile = styled.div`
  display:none;
  height:100%;
  font-size:1.5rem;
  color: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 20px;
  z-index:10;
  @media screen and (max-width: 1199px) {
    display:flex;
  }
`
export const WrapperLogoHeader = styled.span`
  width: max-content;
  .Image-logo {
    width: 4rem;
    height: 4rem;
  }
  @media screen and (max-width: 1199px) {
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .Image-logo { 
      width: 5rem;
      height: 5rem;
    }
  }
`

export const WrapperHeaderMenu = styled.ul`
    display:flex;
    justify-content: start;
    flex-direction: row;
    @media screen and (max-width: 1199px) {
        display:none;
    }
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
   @media screen and (max-width: 1199px) {
      &:after {
        content:"";
        height:0;
      }
   }
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
  @media screen and (max-width: 1199px) {
        display:none;
  }
`
// ------------------ the section below is for ipad and mobile view ------------------

export const MenuLeft = styled.div`
  display: none;
  flex-direction:column;
  align-items: center;
  position: fixed;
  top:0;
  left:0;
  width:40%;
  padding:1rem 0;
  height:100vh;
  background-color: #02CBE0;
  z-index: 12;
  transform: translateX(-100%);
  transition: transform 2s ease-in-out;
  will-change: transform;

  @media screen and (max-width: 1199px) {
    display: flex;
    
  }
  @media screen and (max-width: 767px) {
    width:100%;
  }
  /* Khi mở: trượt vào */
  ${({ open }) => open && `
    transform: translateX(0);
  `}

`
export const Backgroundfaded = styled.div`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 11;
    background-color: rgba(69, 69, 69, 0.5);
    transition: opacity 1s ease-in-out;
    pointer-events: none;
    opacity:0;
    ${({ open }) => open && `
      opacity: 1;
      pointer-events: auto;
    `}

    @media screen and (min-width: 768px) and (max-width: 1199px) {
        display:block;
    }
`
export const CloseMenuMobile = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 3rem;
  display: flex;
  justify-content: flex-end;
  align-items: start;
  font-size: 1.5rem;
  color: #fff;
  padding: 0px 1rem;
  @media screen and (min-width: 768px) and (max-width: 1199px) {
    display:none;
  }
`
export const WrapperControl = styled.div`
  width: 100%
  display: none;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0 1rem;
  @media screen and (max-width: 1199px) {
    display:flex;
    align-self: stretch;
    .btn-control {
      flex:1;
      height:3rem;
      font-size:1.1rem;
    }
  }
`

export const WrapperMainMenuLeft = styled.div`
  width: 100%;
  height: 12rem;
`
export const DropdownMenu = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;

  & > li:last-child {
    padding: 0 2rem 0 1rem;
    color: #fff;
    height: 3rem;
    display: none;
    align-items: center;
    font-size:18px;
    font-weight: 500;
    .icon-search {
      margin-right: 8px;}
    @media screen and (max-width: 767px) {
      display: flex;
    }
  }
`

export const MenuHeader = styled.div`
  width: 100%;
  height: 3rem;
  position: relative;
  .icon-dropdown {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    display:flex;
    align-items:center;
    justify-content:center;
    width:1.5rem;
    height:1.5rem;
    cursor:pointer;
    color:#fff;
    .dropdown-icon {
      transition: transform 0.5s ease;
      transform-origin: center;
    }

    &[arrowclick="true"] .dropdown-icon {
      transform: rotate(180deg);
    }
  }
`
export const ActiveIndicator = styled.div`
  position: absolute;
  right: -1rem;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: white;
  border-radius: 2px;
`
export const MenuHeaderLink = styled.a`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2rem 0 1rem;
  color: #fff;
  border-right: ${props => props.active === "is-active" ? "3px solid #fff" : "tranparent"};
  background-color: ${props => props.active === "is-active"  ? "rgba(30, 30, 30, 0.1)" : "transparent"};
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  .icon-sellland {
    margin-right: 8px;
  }
  
`
export const SubMenuDropdown = styled.ul`
  list-style: none;
  padding: 0;
`;
export const SubMenuLink = styled.a`
  height: 3rem;
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0 2rem 0 calc(1rem + 26px);
  display: flex;
  align-items: center;
  font-weight: 600;
  border-right: ${props => props.active ? "3px solid #fff" : "transparent"};
  background-color: ${props => props.active ? "rgba(30, 30, 30, 0.1)" : "transparent"};
`;


