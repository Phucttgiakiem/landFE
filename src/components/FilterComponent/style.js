import styled from 'styled-components';
export const WrapperFilter = styled.div`
    width: calc(100% - 280px);
    height: max-content;
    margin: 0 140px 20px 140px;
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
    box-sizing: border-box;
    .filter-dropdown {
        position: relative;
        min-width: 140px;
        flex: 1;
    }
    .filter-dropdown > button{
        width: 100%;
    }
    @media screen and (min-width: 768px) and (max-width: 1199px) {
        width: calc(100% - 80px);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        margin: 0 40px 20px 40px;
        .filter-dropdown > button > .hide-icon-tablet {
            display: none;
        }
    }
    @media screen and (max-width: 767px) {
        width: calc(100% - 40px);
        margin: 0;

        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;

        & > * {
            display: none;
        }

        & > *:first-child,
        & > *:last-child {
            display: flex;
            width: 100%;
            min-width: 0;
        }
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
