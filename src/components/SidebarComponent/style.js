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
    @media screen and (max-width: 1199px) {
        display:none;
    }
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
export const Listfunction = styled.div`
    margin: 1rem 0;
    padding: 0;
    list-style:none;
    height: auto;
    overflow: visible;
    .arrow {
        display: inline-block;
        transition: transform 1s ease;
    }
    .arrow.open {
        transform: rotate(180deg); 
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