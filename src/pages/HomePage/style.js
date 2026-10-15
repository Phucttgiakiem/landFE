import styled from 'styled-components';

export const WrapperHeadofHomepage = styled.div`
    width:100%;
    margin:0;
    padding:0;
    position:relative;
    @media screen and (max-width: 1199px) {
      margin-top:6rem;
    }
`
export const WrapperSlider = styled.div`
    width:100%;
    margin: 0;
    /* position: relative;
    overflow: hidden;
    .slick-dots {
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
        display: flex !important;
        justify-content: center;
        z-index: 4;
        
    }
    .slick-dots li button:before {
        font-size: 8px;
        color: rgba(177, 177, 177, 1); 
        opacity:1 !important
    }

    .slick-dots li.slick-active button:before {
        color: #ffffffff 
    } */
`

export const WrapperSearch = styled.div`
  width: 40rem;
  height: 8rem;
  background-color: rgba(34, 34, 34, 1);
  top:10%;
  left:calc(100%/2 - 20rem);
  border-radius: 15px;
  position: absolute;
  z-index:5;

  @media screen and (max-width: 767px) {
    display:none;
  }
  ul {
    width: 100%;
    height:3rem;
    display:flex;
    justify-content: center;
    align-item:center;
    margin:0;
    padding:0;
  }
`
export const MenuItem = styled.li`
  min-width: 6rem;
  list-style: none;
  line-height: 3rem;
  text-align: center;
  color: #fff;
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ $active }) => ($active ? '100%' : '0%')};
    height: 2px;
    background-color: rgba(255, 255, 255, 1);
    transition: width 0.3s ease;
  }

  &:hover {
    background-color: rgba(36, 36, 36, 1);
  }
`;
export const SearchboxContent = styled.div`
  padding: 16px 24px 0;
`
export const SearchboxHeader = styled.div`
  width:100%;
  height: 3rem;
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  align-item:center;
  background-color: #ffffffff;
  border-radius: 10px;
  .input-searchbox {
    flex:1;
    margin: calc(3rem/2 - 1rem) 0.8rem;
    position:relative;
    display: block;
    box-sizing: border-box;
    input {
      width:calc(100% - 2rem);
      height:1.8rem;
      font-size:1.1rem;
      outline:none;
      border:none;
      background-color: transparent;
    }
    .closeItemoutlined {
      position:absolute;
      top:50%;
      right:0rem;
      transform: translateY(-50%);
      font-size:1.2rem;
      color:rgba(199, 199, 199, 1);
      cursor:pointer;
    }
  }
  .icon-search {
    font-size:1.6rem;
    margin-left:0.8rem;
  }
  .btn-searchbox {
    width: 7rem;
    .btn-search {
      width: 6rem;
      height: 2rem;
      margin:calc(3rem/2 - 1rem) 0.8rem 0px 0px;
      color:#fff;
      background-color:rgba(54, 201, 217, 1);
    }
  }
  .btn-search:hover {
    color:#fff;
    background-color:rgba(152, 235, 245, 1);
    border:none;
    outline:none
  }
`
export const Searchboxdropdown = styled.div`
  width: calc(40rem - 48px);
  max-height: 15rem;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
  margin-top: 0.5rem;
  border-radius: 10px;

  padding: 0.5rem 0;

  box-shadow: 0 4px 12px rgba(0,0,0,0.1);

  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(200, 200, 200, 1);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const SearchItem = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  box-sizing:border-box;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: rgba(240, 240, 240, 1);
  }
`;

export const SearchIconWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.15rem;
  .icon-searchitem {
    font-size: 1rem;
    color: #32c5d2;
  }
`;

export const SearchContent = styled.div`
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #222;
  word-break: break-word;
`;

export const EmptySearch = styled.div`
  padding: 1rem;
  font-size: 0.95rem;
  color: #777;
`;
export const MenuItemSearchleft = styled.div`
  margin-right: 10px;
  .icon-searchitem {
    font-size:1.2rem;
    color:rgba(54, 201, 217, 1);
  }
`
export const MenuItemSearchright = styled.div`
  font-size: 0.9rem;
  span {
    margin-right: 5px;
  }
`
export const WrapperContentHomepage = styled.div`
  max-width: 1440px; 
  margin: 40px auto;  
  padding: 0 120px;    
  min-height: 525px;
  box-sizing: border-box;

  @media screen and (max-width: 1199px) {
    padding: 0 20px;   
  }

  @media screen and (max-width: 768px) {
    padding: 0 10px;   
  }
`
export const WrapperLandslist = styled.div`
  margin-top: 20px;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;

  .slick-slider {
    position: relative;
    display: block;
    box-sizing: border-box;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-user-select: none;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
  }

  .slick-list {
    position: relative;
    display: block;
    overflow: hidden;
    margin: 0;
    padding: 0;
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  .slick-track {
    position: relative;
    top: 0;
    left: 0;
    display: flex !important;
    margin-left: auto;
    margin-right: auto;
  }

  .slick-slide {
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;
    
    /* Ép mỗi item con nhận đúng không gian trên mobile */
    > div {
      margin: 0 8px;
    }
  }

  .slick-slide.slick-active {
    display: block;
  }

`;
export const WrapperPlacespecial = styled.div`
  width:100%;
  height: 30rem;
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    "place1 place1 place2 place3"
    "place1 place1 place4 place5";
  gap: 25px;

  @media screen and (max-width: 1199px) {
    height: 150rem;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-template-areas:
      "place1"
      "place2"
      "place3"
      "place4"
      "place5";
  }
  @media screen and (max-width: 767px) {
    height: 100rem;
  }
`