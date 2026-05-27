import styled from "styled-components";

export const CardContainer = styled.div`
    width:25rem;
    height: 10rem;
    border-radius:1rem;
    box-shadow:2px 2px 5px grey, 
            -2px 0px 5px grey;
    padding:10px;
    color:#fff;
    font-size:18px;
    text-align:center;  
    line-height:10rem;  
    @media screen and (max-width: 767px){
        width: 100%;
        height: 5rem;
        line-height: 5rem;
    }
`