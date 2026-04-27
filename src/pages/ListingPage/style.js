import styled from 'styled-components';
export const Listpanel = styled.div`
  width: calc(100% - 280px);
  position: absolute;
  z-index:4;
  height:max-content;
  margin:12rem auto 0;
  @media screen and (max-width: 1199px){
    width: calc(100% - 80px);
  }
  @media screen and (max-width: 767px) {
    width: calc(100% - 40px);
    margin:1.5rem auto 0;
  }
`