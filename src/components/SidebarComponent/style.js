import styled from 'styled-components';

export const WrapperSidebar = styled.div`
    box-sizing: border-box;
    position:fixed;
    z-index:4;
    width: 300px;
    height: 100vh;
    background-color: #fff;
    padding: 20px 0;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
`
export const UserSection = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    padding:0 20px;
    width: 100%;
    gap: 10px;
    span {
        width: 70px;
        height: 70px;
        overflow: hidden;
        border-radius: 50%;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`;
export const Listfunction = styled.ul`
    margin: 1rem 0;
    padding: 0;
    list-style:none;
    height: auto;
    overflow: visible;
    li {
        display: block;
        height: auto;
        span:first-child {
            display:block;
            width:2.5rem;
            height: 2.5rem;
            line-height: 2.5rem;
            text-align:center;
            font-size: 1.3rem;
        }
        div {
            box-sizing: border-box;
            padding: 0 20px;
            display:flex;
            flex-direction:row;
            align-items:center;
            gap:10px;
            width: 100%;
            height: 3rem;
            span:nth-child(2){
                flex-grow: 1;
            }
            .down_submenu svg{
                font-size: 1rem;
                transform: rotate(-90deg);
                transition: transform 0.3s ease;
            }
            .down_submenu.rotate svg {
                transform: rotate(0deg);
            }
        }
    }
    li > div:hover {
        background-color: rgba(233, 233, 233, 1);
        cursor: pointer;
    }
    /* ============================= */
  /* MENU KHÔNG CÓ SUBMENU */
  /* ============================= */
  li > div.no-submenu.selected {
    background-color: rgba(235, 235, 235, 1);
    color: #02CBE0;
    border-left: 4px solid #02CBE0;
    padding-left: 16px;
  }

  /* ============================= */
  /* MENU CÓ SUBMENU (CHỈ ĐỔI MÀU CHỮ) */
  /* ============================= */
  li > div.has-submenu.selected {
    background-color: transparent;
    border-left: none;
    font-weight: normal;
    color: #02CBE0;
  }
`
export const SubMenufunction = styled.ul`
    list-style: none;
    padding:0;
    li {
        padding: 0 0 0 calc(2.5rem + 32px);
        line-height: 3rem;
    }
    li:hover {
        background-color: rgba(233, 233, 233, 1);
        cursor: pointer;
    }
    li.selected {
        background-color: rgba(235, 235, 235, 1);
        border-left: 4px solid #02CBE0;
        padding-left: calc(2.5rem + 28px);
    }
`