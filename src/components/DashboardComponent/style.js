import styled from "styled-components";

/* ------------------ style for seller --------------------- */
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
    & div:last-child {
        margin-top:20px;
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
    height:30rem;
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
