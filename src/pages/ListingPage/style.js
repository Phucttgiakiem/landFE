import styled from 'styled-components';
export const Wrapperproperty = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  @media screen and (max-width: 1199px) { 
    margin-top: 7rem;
  }
`
export const Listpanel = styled.div`
  width: calc(100% - 280px);
  margin:0 auto;
  @media screen and (max-width: 1199px){
    width: calc(100% - 80px);
  }
  @media screen and (max-width: 767px) {
    width: calc(100% - 40px);
    margin:1.5rem auto 0;
  }
`
