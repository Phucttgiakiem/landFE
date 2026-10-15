import {DashboardUserTitle,DashboardUserBody} from "./style";
import {useEffect,useState} from "react";
import {getDashboarduseroverview} from "../../services/DashboardService";
import {EmblaCarousel} from "../../components/EmblaCarousel/EmblaCarousel";
import CardsmallComponent from "../CardsmallComponent/CardsmallComponent";
import {formatDate,formatacreage,formatPriceToString } from "../../utils";
export default function DashboardUserComponent ({userinfo}){
    const [loadingSlickslide,setLoadingSlickslide] = useState(false);
    const [infoforyou,setInfoforyou] = useState({
        topfivepropertynew: [],
    })
    
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
                <h4>Information you might be interested in</h4>
            </DashboardUserTitle>
            <DashboardUserBody>
                {
                    infoforyou.topfivepropertynew?.length > 0 && 
                    (
                        <EmblaCarousel              
                            slideSpacing="20px"
                            hiddenArrow={infoforyou.topfivepropertynew?.length > 4}
                        >
                            {infoforyou.topfivepropertynew.map((item, index) => (
                                    <div key={item._id}>
                                        <CardsmallComponent 
                                            Id={item._id}
                                            loading={loadingSlickslide}
                                            Title={item.Title}
                                            Price={formatPriceToString(item.Price)}
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
                        </EmblaCarousel>
                            
                       
                    )
                }
                
            </DashboardUserBody>
        </div>
    )
}