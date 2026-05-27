import styled from "styled-components";

/* ------------------ style for seller --------------------- */
export const WrapperCardDashboard = styled.div`
    width: 100%;
    display:flex;
    flex-direction:row;
    align-items:center;
    margin:0;
    padding: 0 10px;
    gap: 10px;
    box-sizing:border-box;
    h5 {
        margin:0;
    }
    @media screen and (max-width:767px){
        flex-direction:column;
    }
`
export const DashboardSellerTitle = styled.div`
    width: 100%;
    height:3rem;
    h4 {
        margin: 0;
    }
`
export const DashboardSellerpropertybyMonth = styled.div`
    width: 100%;
    height:max-content;
`

export const DashboardChartWapper = styled.div`
    width: 45%;
    height: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;   
    align-items: stretch;         

    overflow: hidden;              

    h5 {
        margin-top: 10px;
        text-align: center;
    }
    @media screen and (max-width: 1199px) {
        width: 100%;
    }
`
/* ------------------ style for seller --------------------- */
/* ------------------ style for admin ---------------------- */
export const DashboardAdminTitle = styled.div`
    width: 100%;
    height:3rem;
    h4 {
        margin: 0;
    }
`
export const DashboardAdminpropertybyMonth = styled.div`
    width: 100%;
    height:max-content;
    & div > h5 {
        margin: 0;
    }
    & > div:last-child {
        margin-top:20px;
    }
`
export const ChartContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    margin-top:5rem;
    @media screen and (min-width:768px) and (max-width:1199px){
        flex-direction:column;
    }
    @media screen and (max-width:767px) {
        flex-direction:column;    
    }
`
/* ------------------ style for admin ---------------------- */
/* ------------------style for user ------------------------ */
export const DashboardUserTitle = styled.div`
    width: 100%;
    height:3rem;
    h4 {
        margin: 0;
    }
`
export const DashboardUserBody = styled.div`
    width: 100%;
    min-height:30rem;
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
/* ------------------style for user ------------------------ */
