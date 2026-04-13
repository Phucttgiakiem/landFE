import styled from 'styled-components';

export const WrapperHeadofHomepage = styled.div`
    width:100%;
    margin:0;
    padding:0;
    position:relative;
`
export const WrapperSlider = styled.div`
    width:100%;
    margin: 0;
    position: relative;
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
        color: rgba(177, 177, 177, 1); /* màu mặc định */;
        opacity:1 !important
    }

    .slick-dots li.slick-active button:before {
        color: #ffffffff /* màu khi dot đang active */
    }
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
  text-align: center;
  list-style: none;
  line-height: 3rem;
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
  height: 15rem;
  overflow-y:auto;
  background-color:#fff;
  margin-top:0.5rem;
  border-radius:10px;
  display:none;
  &::-webkit-scrollbar {
    width: 0.4rem;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(200, 200, 200, 1);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    margin: 0.5rem 0px;
    }
`
export const WrapperSearchlist = styled.ul`
  width:100%;
  padding: 10px;
  display:flex;
  flex-direction:column;

  li {
    list-style:none;
    padding:8px 12px;
    cursor:pointer;
    display:flex;
    flex-direction: row;
    align-items: center;
  }
  li:hover {
    background-color:rgba(218, 218, 218, 1);
  }
`
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
  margin:40px 120px 40px;
  min-height:525px;
  @media screen and (max-width: 1199px) {
    margin:40px 20px 40px;
  }
`
export const WrapperLandslist = styled.div`
  margin-top:20px;
  overflow-x: hidden;

  .slick-track {
    margin-left: 0 !important;
  }
  .slick-slide > div {
    margin: 0 12px;
  }

  .slick-list {
    width: 100%;
    height: 24rem;
    padding: 0;
    margin: 0 -12px;
    overflow: visible;
  }
  
  .image-land {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
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