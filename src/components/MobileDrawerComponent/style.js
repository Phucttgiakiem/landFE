import styled from 'styled-components';


export const Mobiledrawer = styled.div`
    background-color: #02CBE0;
    position: fixed;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    
    width: 320px;
    max-width: 90%;
    height: 100vh;

    z-index: 20;
    transition: transform 0.3s ease;

    overflow-y: auto;
    padding: 20px;

    &.active {
        transform: translateX(0);
    }
    @media screen and (max-width: 768px) {
        width: 100vw;
    }
`
export const Draweroverlay = styled.div`
    width:100vw;
    height:100vh;
    position: fixed;
    top:0;
    left:0;
    z-index:19;
    background: rgba(0,0,0,0.5);
    opacity: 0;
    pointer-events: none;
    &.active{
        opacity: 1;
        pointer-events: auto;
    }
    @media screen and (max-width: 768px) {
        width: 0;
    }
`
export const Drawersection = styled.div`
    margin-top:25px;
`
export const DrawerTitle = styled.h3`
    color:#fff;
    font-size:16px;
    font-weight:bold;
    margin-bottom:15px;
`
export const DrawerList = styled.ul`
    list-style:none;
    padding:0;
    margin:0;
`
export const DrawerItem = styled.li`
    margin-bottom:10px;
`
export const DrawerParent = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    .drawer-link {
        display:flex;
        align-items:center;
        gap:10px;
        text-decoration:none;
        color:#fff;
        padding:10px 0;
        flex:1;
    }
    .drawer-link span:nth-child(2) {
        flex:1;
    }  
    .drawer-link.active {
        font-weight:bold;
    }
`
export const DrawerSubmenu = styled.ul`
    padding-left:25px;
    li {
        padding: 10px 0;
        list-style:none;
        
    }
    a {
        text-decoration:none;
        color:#fff;
    }
    .submenu-active {
        font-weight:bold;
    }
`
export const DrawerArrow = styled.span`
    cursor:pointer;
    transition: transform 0.3s;
    color:#fff;
    &.rotate {
        transform: rotate(180deg);
    }
`
export const DrawerClose = styled.div`
    display:flex;
    justify-content:flex-end;
    font-size:24px;
    cursor:pointer;
    color:#fff;
    
`
export const DrawerUser = styled.div`
    margin-top:20px;
`
export const DrawerNameuser = styled.div`
    width:100%;
    display:flex;
    gap: 10px;
    color:#fff;
    font-weight: bold;
    font-size: 20px;
`
export const DrawerAuth = styled.div`
    width:100%;
    height:2.5rem;
    display:flex;
    gap:10px;
    .btn-auth {
        width: 50%;
        text-align:center;
        text-decoration:none;
        font-size:18px;
        line-height: 2.5rem;
    }
    .btn-auth:first-child {
        background-color: red;
        color: #fff;
        border-radius: 0.5rem;
    }
    .btn-auth:last-child {
        background-color: #fff;
        color: #000;
         border-radius: 0.5rem;
    }
`
export const DrawerSearch = styled.div`
    margin-top:30px;
    display:flex;
    gap:10px;
    align-items:center;
`
export const DrawerLogout = styled.button`
    width:100%;
    margin-top:30px;
    height:45px;
    border:none;
    background: red;
    color:#fff;
    border-radius:8px;
    cursor:pointer;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    gap:10px;

`


