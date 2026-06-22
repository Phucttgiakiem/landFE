import {DashboardUserTitle,DashboardUserBody,WrapperLandslist} from "./style";
import {useEffect,useState} from "react";
import {getDashboarduseroverview} from "../../services/DashboardService";
import SlickEffectComponent from "../SlickEffectComponent/SlickEffectComponent";
import CardsmallComponent from "../CardsmallComponent/CardsmallComponent";
import {formatDate,formatacreage } from "../../utils";
export default function DashboardUserComponent ({userinfo}){
    const [loadingSlickslide,setLoadingSlickslide] = useState(false);
    const [infoforyou,setInfoforyou] = useState({
        topfivepropertynew: [],
    })
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
            className={className}
            style={{ ...style,width: "35px",
                    height: "35px",
                    borderRadius: "20%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#02CBE0",
                     left: "20px", zIndex: 1 }}
            onClick={onClick}
            >
                
            </div>

        );
    }
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
            className={className}
            style={{ ...style, 
                    width: "35px",
                    height: "35px",
                    borderRadius: "20%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#02CBE0",
                    right: "20px",
                    zIndex: 1 }}
            onClick={onClick}
            >
                
            </div>
        );
    }
    useEffect(()=>{
        const fetchData = async () => {
            try {
                setLoadingSlickslide(true);
                const res = await getDashboarduseroverview(userinfo?.id);
                setInfoforyou({
                    topfivepropertynew:res.data?.topfivepropertynew,
                });
                setLoadingSlickslide(false)
            }catch(err){
                setInfoforyou({
                    topfivepropertynew:null,
                })
                setLoadingSlickslide(false)
            }
        }
        fetchData();
    },[userinfo?.id])
    return (
        <div>
            <DashboardUserTitle>
                <h4>Thông tin dành cho bạn</h4>
            </DashboardUserTitle>
            <DashboardUserBody>
                {
                    infoforyou.topfivepropertynew?.length > 0 && 
                    (<>
                        <div>
                            <h5>Bài đăng bạn có thể quan tâm</h5>
                        </div>
                        <WrapperLandslist className="slider-container">
                            <SlickEffectComponent
                            setting={{
                                dots: false,
                                infinite: true,
                                slidesToShow: 4,
                                slidesToScroll: 1,
                                arrows: true,
                                centerMode: false,
                                prevArrow:<SamplePrevArrow />,
                                nextArrow:<SampleNextArrow />,
                                responsive: [
                                    {
                                        breakpoint: 1024,
                                        settings: {
                                        slidesToShow: 3,
                                        slidesToScroll: 3,
                                        infinite: true,
                                        
                                        }
                                    },
                                    {
                                        breakpoint: 767,
                                        settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                        }
                                    },
                                ]
                            }}
                        >
                            {infoforyou.topfivepropertynew.map((item, index) => (
                                    <div key={item._id}>
                                        <CardsmallComponent 
                                            Id={item._id}
                                            loading={loadingSlickslide}
                                            Title={item.Title}
                                            Price={item.Price}
                                            Area={item.Address.Commune.name+" / "+item.Address.City.name}
                                            createdAt={formatDate(item.createdAt)}
                                            Img={
                                                <img
                                                src={item?.thumbnail}
                                                alt={`imagebuilding${index}`}
                                                className="image-land"
                                                />
                                            }
                                            Acreage={formatacreage(item.horizontal, item.vertical)}
                                            className="card-small-component"
                                        />
                                    </div>
                                    ))
                            }
                        </SlickEffectComponent>
                        </WrapperLandslist>
                    </>)
                }
                
            </DashboardUserBody>
        </div>
    )
}