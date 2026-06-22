import styled from "styled-components";

export const CategoryOverlay = styled.div`
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    inset: 0;
    background: rgba(0, 0, 0, 0.5); 
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

`
export const CategoryDialog = styled.div`
    width: 600px;
    min-height: 20rem;
    background-color: white;
    padding: 15px;
    box-sizing:border-box;
    border-radius:1rem;
    @media screen and (max-width: 767px) {
        width: 80vw;
    }
`
export const Categoryheader = styled.div`
    width:100%;
    height: 3rem;
    margin-bottom: 2rem;
    box-sizing:border-box;
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    align-items:center;
    h2 {
        width:max-content;
        margin:0;
    }
`
export const Categorybody = styled.div`
    width: 100%;
    height: calc(100% - 5rem);
    display:flex;
    flex-direction:column;
    gap: 15px;
    .btn-submit {
        width: 8rem;
        background-color: #02CBE0;
        color:#fff;
        border:none;
        font-size:18px;
        font-weight: 400;
        &:hover {
            background-color: #85e2ec;
        }
    }
`