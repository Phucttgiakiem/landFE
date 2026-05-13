import {DashboardUserTitle,DashboardUserBody,WrapperLandslist} from "./style";
import {useEffect,useState} from "react";
import {getDashboarduseroverview} from "../../services/DashboardService";
import SlickEffectComponent from "../SlickEffectComponent/SlickEffectComponent";
import CardsmallComponent from "../CardsmallComponent/CardsmallComponent";
import {formatDate,formatacreage } from "../../utils";
export default function DashboardUserComponent ({userinfo}){
    const [infoforyou,setInfoforyou] = useState({
        totalpropertyislike: 0,
        topfivepropertynew: [],
    })
    const handleUpdatelike = (idproperty, status) => {
        setInfoforyou(prev => ({
            totalpropertyislike: status ? prev.totalpropertyislike + 1 : prev.totalpropertyislike - 1,
            topfivepropertynew: prev.topfivepropertynew.map(item =>
            item._id === idproperty
                ? { ...item, isFavorite: status }
                : item
            )
        }));
    };
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
                const res = await getDashboarduseroverview(userinfo?.id);
                console.log(res);
                setInfoforyou({
                    totalpropertyislike: res.data?.totalpropertyislike,
                    topfivepropertynew:res.data?.topfivepropertynew,
                });

            }catch(err){
                setInfoforyou({
                    totalpropertyislike: 0,
                    topfivepropertynew:null,
                })
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
                <div>
                    <h5>Số bài đăng đã like: {infoforyou.totalpropertyislike}</h5>
                </div>
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
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                initialSlide: 2
                                }
                            },
                            {
                                breakpoint: 766,
                                settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                                }
                            }
                        ]
                    }}
                >
                    {infoforyou.topfivepropertynew?.length > 0 && infoforyou.topfivepropertynew.map((item, index) => (
                            <div key={item._id}>
                                <CardsmallComponent 
                                    Id={item._id}
                                    loading={false}
                                    Title={item.Title}
                                    Price={item.Price}
                                    likeCard={item.isFavorite}
                                    handlelike={handleUpdatelike}
                                    Area={item.Address.Commune.name+" / "+item.Address.City.name}
                                    createdAt={formatDate(item.createdAt)}
                                    Login={userinfo}
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
            </DashboardUserBody>
        </div>
    )
}