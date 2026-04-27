import axios from 'axios';
import { useEffect,useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import ListCardLoadingMediumComponent from '../../components/ListCardLoadingComponent/ListCardLoadingMediumComponent';
import { CardComponent } from '../../components/CardComponent/CardComponent';
import { Pagination } from 'antd';
import {Listpanel} from "./style";
import * as HomeService from '../../services/HomeService';
import {setFiltered,setPageFiltered,setLoadingFiltered} from '../../redux/slides/HomeSlide';

import { useFilters } from "../../hooks/useFiltershook";
import {formatNumberaddZero,formatPriceToString} from "../../utils"
const ListingPage = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const {type,category} = useParams();
    
    const sort = searchParams.get("sort");
    const {page,limit,items,total,isLoading} = useSelector(state => state.home.filtered);

    const { query } = useFilters();
    const [menuProvince,setMenuProvince] = useState({
        isloading: false,
        iserror: null,
        items: []
    });
    const [menuWard,setMenuward] = useState({
        isloading: false,
        iserror: null,
        items: []
    });
    
    console.log("query: ",query);
    const dispatch = useDispatch();
    
    const parseNumber = (val) => {
        if (val === null || val === "") return null;
        return Number(val);
    };
    const province = searchParams.get("province");
    const commune = searchParams.get("commune");
    const bathroom = parseNumber(searchParams.get("bathroom"));
    const bedroom = parseNumber(searchParams.get("bedroom"));
    const Toilet = parseNumber(searchParams.get("toilet"));
    const onChange = (page) => {
        dispatch(setPageFiltered(page));
    }
    
    useEffect(() => {
        const fetchData = async () => {
            dispatch(setLoadingFiltered(true));

            const filter = {
                type,
                category,
            };
            if (province != null) filter.province = province;
            if (commune != null) filter.commune = commune;
            if (bathroom != null) filter.bathroom = bathroom;
            if (bedroom != null) filter.bedroom = bedroom;
            if (Toilet != null) filter.Toilet = Toilet;
            if (query?.keyword) filter.keyword = query?.keyword;
            if (query.priceMin != null || query.priceMax != null) {
                filter.Price = {};
                if (query.priceMin != null) {
                    filter.Price.gte = Number(query.priceMin)*1000000;
                }
                if (query.priceMax != null) {
                    filter.Price.lte = Number(query.priceMax)*1000000;
                }
            }
            if (query.areaMin != null || query.areaMax != null) {
                filter.area = {};
                if(query.areaMin != null) {
                    filter.area.gte = Number(query.areaMin);
                }
                if(query.areaMax != null) {
                    filter.area.lte = Number(query.areaMax);
                }
            }

            const { data } = await HomeService.getListingFilter({
                page,
                limit,
                filter,
                sort
            });

            dispatch(setFiltered({ ...data }));
            dispatch(setLoadingFiltered(false));
        };

        fetchData();
    }, [
        page,
        limit,
        type,
        category,
        query, 
        province,
        bathroom,
        bedroom,
        Toilet,
        commune,
        sort,
        dispatch
    ]);
    useEffect(()=>{
        const fetchData = async () => {
            // call api province
            setMenuProvince(prev => ({ ...prev, isloading: true }));
            try {
                const res = await axios.get("https://production.cas.so/address-kit/2025-07-01/provinces");
               
                const provinces = res.data?.provinces.map(item => ({
                    value: item.code,
                    label: item.name
                })) || [];
                setMenuProvince(prev => ({
                    ...prev,
                    isloading:false,
                    items: provinces,
                }));
            } catch (e){
                console.log(e)
            }
            if(query?.province) {
                try {
                    setMenuward(prev => ({
                        ...prev,
                        isloading:true
                    }))
                    const res = await axios.get(`https://production.cas.so/address-kit/2025-07-01/provinces/${formatNumberaddZero(query?.province)}/communes`);
                    const wards = res.data?.communes.map(item => ({
                        value: item.code,
                        label: item.name
                    })) || [];
                    setMenuward(prev => ({
                        ...prev,
                        isloading:false,
                        items: wards,
                    }));
                } catch(e){
                    console.log(e);
                }

            }
        }
        fetchData();
    },[query?.province])
    return (
        <div style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <SearchComponent/>
            <FilterComponent ListProvince={menuProvince} ListWard={menuWard}/>
            <Listpanel>
                <div>
                    {
                        isLoading ?
                         <ListCardLoadingMediumComponent/> : 
                        items && items.length > 0 && 
                        items.map((vl,index) => (
                            <CardComponent 
                                idListing={vl._id}
                                Title={vl?.Title} 
                                Price={formatPriceToString(vl?.Price)}
                                Bedroom={vl?.bedroom}
                                Bathroom={vl?.bathroom}
                                Address={vl?.Address?.Commune?.name+" - "+vl?.Address?.City?.name}
                                Description={vl?.Description}
                                ImageCard={vl?.thumbnail}
                            />
                        ))
                    }
                </div>
                {
                    total > limit && 
                    <Pagination 
                        pageSize={limit}
                        total={total} 
                        current={page}
                        onChange={onChange} 
                        align="center" 
                        style={{margin:"3rem 0"}}
                    />
                }
                
            </Listpanel>
        </div>
    )
}
export default ListingPage;