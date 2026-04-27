import styled from 'styled-components';
export const WrapperFilter = styled.div`
    width: calc(100% - 280px);
    height: max-content;
    margin: 0 140px;
    padding: 22px 0;
    position: absolute;
    z-index: 5;
    top: 6rem;
    left: 0;
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
    box-sizing: border-box;
    border-bottom: 1px solid #b7b7b7ff;
    @media screen and (min-width: 768px) and (max-width: 1199px) {
        width: calc(100% - 80px);
        margin: 0 40px;
    }
    @media screen and (max-width: 767px) {
        display:none;
    }
`
export const CounterFilter = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height: 1rem;
    background-color: red;
    border-radius: 15%;
    color: white;    
`
