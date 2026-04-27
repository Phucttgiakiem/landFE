import { Skeleton } from "antd"
export default function ListCardLoadingMediumComponent ({numberitem = 6}) {
    return (
        <>
            <style>
                {
                `
                    .wrapper-cardmedium {
                        width: 100%;
                        height: 18rem;
                        margin-bottom: 2rem;
                        display: flex;
                        flex-direction: row;
                        border-radius: 10px;
                        border: 1px solid #b7b7b7ff;
                        @media screen and (max-width: 767px) {
                            flex-direction: column;
                            height:max-content;
                        }
                    } 
                    .leftcardmedium {
                        width: 30%;
                        display:flex;
                        flex-direction:row;
                        justify-content:center;

                        border-top-left-radius: 10px;
                        border-bottom-left-radius: 10px;
                        overflow:hidden;
                        @media screen and (max-width: 767px) {
                            width: 100%;
                            height: 20rem;
                            border-bottom-left-radius:0px;
                            border-top-right-radius:10px;
                        }
                    }  
                    /* Fix thằng cha */
                    .ant-skeleton.ant-skeleton-element {
                        display: block !important;
                        width: 100% !important;
                    }

                    /* Fix thằng con */
                    .ant-skeleton-image {
                        width: 100% !important;
                        height: 100% !important;
                        border-top-right-radius:0;
                        border-bottom-right-radius: 0;
                    }
                    .ant-skeleton-image-svg {
                        
                        width: 120px;
                        height: 120px;
                    }
                    .rightcardmedium {
                        width: 70%;
                        padding: 1rem;
                        box-sizing: border-box;
                        @media screen and (max-width: 767px) {
                            width: 100%;
                        }
                    } 
                `   
                }
            </style>
          {
            Array(numberitem).fill(null).map((_, index) => (
                <div key={index} className="wrapper-cardmedium">
                    <div className="leftcardmedium">
                        <Skeleton.Image shape="square" active={true}/>
                    </div>
                    <div className="rightcardmedium">
                        <Skeleton active={true} paragraph={{rows: 5}}/>
                    </div>
                </div>
            ))
          }
        
        </>
        
    )
}