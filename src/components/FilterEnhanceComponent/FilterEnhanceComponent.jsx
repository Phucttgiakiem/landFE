import axios from "axios";
import { useState,useEffect } from "react";
import { useParams,useSearchParams,useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Select,Input,InputNumber,Checkbox,Spin,Empty  } from "antd";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import {FilterPersonalpageContainer, FilterPersonalpageWrapper,FilterPersonalpageHeader
    ,FilterPersonalpageContent,FilterPersonalItem,FilterPersonalItemTitle,FilterPersonalItemContent,
    DetailTypeListingWrapper,WrapperInputSearch,Wrapperlistselect,Listselectitem,FilterEnhancepageFooter
} from "./style";
import * as CatagoryService from "../../services/CategoriesService";
import {formatNumberaddZero} from "../../utils"
import {listPricesell,listPriceRent,listacreage} from "../../constant/MenuOption";
import {getProvinces,getCommunes} from "../../services/AddressService";
export default function FilterEnhanceComponent ({CloseDialog}) {
    const [listProvince,setListProvince] = useState({
        isloading: false,
        items: []
    })
    const [listCatagory,setListingcatagory] = useState({
        isloading: false,
        items: []
    });
    const [listCommune,setListcommune] = useState({
        isloading:false,
        items: []
    })
    const [keywordCity,setKeywordcity] = useState("");
    const [keywordCommune,setKeywordCommune] = useState("");
    const [keywordCatagory,setKeywordCatagory] = useState("");
    const [searchParams,setSearchParams] = useSearchParams();

    const {type,category} = useParams();
    const appliedFilters = {
        type,
        category: category || undefined,
        priceMin:searchParams.get("priceMin"),
        priceMax:searchParams.get("priceMax"),
        province:searchParams.get("province"),
        commune:searchParams.get("commune"),
        areaMin:searchParams.get("areaMin"),
        areaMax:searchParams.get("areaMax"),
        bathroom:searchParams.get("bathroom"),
        bedroom:searchParams.get("bedroom"),
        toilet:searchParams.get("toilet"),
    }
    const [tempFilters, setTempFilters] = useState(appliedFilters);
    const navigate = useNavigate();
    const listOption = tempFilters.type === "Sale-property" ? listPricesell : listPriceRent;
    
    const handleSetRadioGroup = (vlmin, vlmax,list) => {
        const numone = vlmin == null || vlmin === "" ? null : +vlmin;
        const numsecond = vlmax == null || vlmax === "" ? null : +vlmax;

        return list.find(i => i.min === numone && i.max === numsecond);
    };
    
    const handleChangeTypeCatagory = (typeCategory) => {
        setTempFilters(prev => ({
            ...prev,
            type:typeCategory
        }))
    }
    const handleChangeDetailCatagory = (Catagory) => {
        setTempFilters(prev => ({
            ...prev,
            category:prev.category === Catagory ? undefined : Catagory
        }))
    }
    const handleSetprovincechecked = (value) => {
        setTempFilters(prev => ({
            ...prev,
            province: prev.province === value ? null : value,
            commune: null
        }));

    }
    const filteredCities = keywordCity
        ? (listProvince.items || []).filter(item =>
            item.label.toLowerCase().includes(keywordCity.toLowerCase())
            )
        : (listProvince.items || []);
    const filteredCommune = keywordCommune
        ? (listCommune.items || []).filter(item=>
            item.label.toLowerCase().includes(keywordCommune.toLowerCase())
            )
        : (listCommune.items || []);
    const filteredCatagory = keywordCatagory
        ? (listCatagory.items || []).filter(item => 
            item.Name.toLowerCase().includes(keywordCatagory.toLowerCase())
            )
        : (listCatagory.items || [])
    const handleSetcommunechecked = (value) => {
        setTempFilters(prev => ({
            ...prev,
            commune:prev.commune === value ? null : value
        }))
    }
    const handleSetPriceSelected = (value) => {
        const {min,max} = listOption.find(i=> i.key === value);
        setTempFilters(prev => ({
            ...prev,
            priceMin: min,
            priceMax: max
        }))
    }
    const handleSetAcreageSelected = (value) => {
        const {min,max} = listacreage.find(i => i.key === value);
        setTempFilters(prev => ({
            ...prev,
            areaMin: min,
            areaMax: max
        }))
    }
    const handleApply = () => {
        const params = new URLSearchParams();

        if (tempFilters?.priceMin || tempFilters?.priceMin === 0) params.set("priceMin", tempFilters?.priceMin);
        if (tempFilters?.priceMax || tempFilters?.priceMax === 0) params.set("priceMax", tempFilters?.priceMax);
        if (tempFilters?.areaMin) params.set("areaMin", tempFilters.areaMin);
        if (tempFilters?.areaMax) params.set("areaMax",tempFilters?.areaMax);
        if (tempFilters?.province) params.set("province", tempFilters?.province);
        if (tempFilters?.commune) params.set("commune",tempFilters?.commune);
        if (tempFilters?.bathroom) params.set("bathroom",tempFilters?.bathroom);
        if (tempFilters?.bedroom) params.set("bedroom",tempFilters?.bedroom);
        if (tempFilters?.toilet) params.set("toilet",tempFilters?.toilet);

        const newCategory = tempFilters?.category;
        const newtype = tempFilters?.type;
        const basePath = newCategory
            ? `/listing/${newtype}/${newCategory}`
            : `/listing/${newtype}`;
        CloseDialog(false);
        navigate({
            pathname: basePath,
            search: params.toString()
        });
    };
    const handleResetFilter = () => {
        const newtype = "Sale-property";

        setTempFilters({
            type: newtype,
            category: undefined,
            priceMin: undefined,
            priceMax: undefined,
            province: undefined,
            commune: undefined,
            areaMin: undefined,
            areaMax: undefined,
            bathroom: undefined,
            bedroom: undefined,
            toilet: undefined,
        });

        navigate({
            pathname: `/listing/${newtype}`,
            search: ""
        });
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                setListingcatagory({
                    isloading:true,
                    items:[]
                })
                const {data} = await CatagoryService.getCategorywithtypelisting(tempFilters?.type);
                setListingcatagory({
                    isloading:false,
                    items: data?.data
                });
            } catch(e){
                setListingcatagory({
                    isloading:false,
                    items: []
                });
                console.log(e);
            }
        }
        fetchData()
    },[tempFilters?.type]);
    useEffect(()=> {
        const fetchData= async () => {
            try {
                setListProvince({
                    isloading: true,
                    items: []
                })
                const res = await getProvinces();
                const provinces = res.data?.provinces.map(item => ({
                    value: item.code,
                    label: item.name
                })) || [];
                setListProvince({
                    isloading:false,
                    items: provinces
                })
            }catch(e) {
                setListProvince({
                    isloading:false,
                    items:[]
                })
            }
        }
        fetchData();
    },[])
    useEffect(() => {
        if(!tempFilters?.province) {
            setListcommune({
                isloading:false,
                items:[]
            })
            return;
        }
        const fetchData = async () => {
            try {
                setListcommune({
                    isloading:true,
                    items:[]
                });
                const res = await getCommunes(formatNumberaddZero(tempFilters?.province));
                const wards = res.data?.communes.map(item => ({
                        value: item.code,
                        label: item.name
                    })) || [];
                setListcommune({
                    isloading:false,
                    items:wards
                })
            }catch(e){
                setListcommune({
                    isloading:false,
                    items:[]
                })
            }
        }
        fetchData();
    },[tempFilters?.province])
    console.log("filteredCatagory: ",filteredCatagory);
    return (
        <FilterPersonalpageContainer>
            <FilterPersonalpageWrapper>
                <FilterPersonalpageHeader>
                    <h3>Filter</h3>
                    <CloseOutlined onClick={() => CloseDialog(false)}/>
                </FilterPersonalpageHeader>
                <FilterPersonalpageContent>
                    <FilterPersonalItem>
                        <FilterPersonalItemTitle>
                            <h4>Type property</h4>
                        </FilterPersonalItemTitle>
                        <FilterPersonalItemContent>
                            <Select style={{ width: '100%' }} 
                                placeholder="Select property type" 
                                value={tempFilters?.type}
                                size={"middle"} 
                                onChange={(value)=>
                                    handleChangeTypeCatagory(value)
                                }>
                                <Select.Option value="Sale-property">Sell property</Select.Option>
                                <Select.Option value="Rental-property">Rent property</Select.Option>
                            </Select>
                            <WrapperInputSearch>
                                <Input 
                                    type="text" 
                                    placeholder="Search property name" 
                                    value={keywordCatagory}
                                    onChange={(e) =>{
                                        let value = e.target.value;
                                        setKeywordCatagory(value);
                                    }}
                                    onKeyDown={(e) => {
                                        const isSpace = e.key === " ";
                                        const value = e.currentTarget.value;

                                        if (isSpace && (value === "" || value.endsWith(" "))) {
                                        e.preventDefault();
                                        }
                                    }}
                                />
                                {
                                    keywordCatagory !== "" && 
                                    <FontAwesomeIcon 
                                        icon={faCircleXmark}
                                        style={{ position: "absolute", 
                                            top: "50%", 
                                            right: "0.5rem", 
                                            zIndex: 3, 
                                            transform:"translateY(-50%)", 
                                            color:"#d9d9d9"
                                        }}
                                        onClick={() => setKeywordCatagory("")}
                                    />
                                }
                            </WrapperInputSearch>
                            
                            <DetailTypeListingWrapper>
                                {
                                    listCatagory.isloading ? <Spin/> : (
                                        filteredCatagory?.length > 0 ? 
                                        <ul>
                                            {
                                                filteredCatagory?.map((item,index) =>(
                                                    <li key={item._id} onClick={() => handleChangeDetailCatagory(item.NameSlug)}><Checkbox checked={tempFilters?.category && tempFilters?.category === item.NameSlug} /> <span>{item.Name}</span></li>
                                                ))
                                            }
                                        </ul> :
                                        <div style={{flexGrow: 1}}>
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        </div>
                                    )
                                }
                                
                            </DetailTypeListingWrapper>
                        </FilterPersonalItemContent>
                    </FilterPersonalItem>
                    <FilterPersonalItem>
                        <FilterPersonalItemTitle>
                            <h4>City</h4>
                        </FilterPersonalItemTitle>
                        <FilterPersonalItemContent>
                            <WrapperInputSearch>
                                <Input 
                                    type="text" 
                                    placeholder="Search city" 
                                    value={keywordCity}
                                    onChange={(e) =>{
                                        let value = e.target.value;
                                        setKeywordcity(value);
                                    }}
                                    onKeyDown={(e) => {
                                        const isSpace = e.key === " ";
                                        const value = e.currentTarget.value;

                                        if (isSpace && (value === "" || value.endsWith(" "))) {
                                        e.preventDefault();
                                        }
                                    }}
                                />
                                {
                                    keywordCity !== "" && 
                                    <FontAwesomeIcon 
                                        icon={faCircleXmark}
                                        style={{ position: "absolute", 
                                            top: "50%", 
                                            right: "0.5rem", 
                                            zIndex: 3, 
                                            transform:"translateY(-50%)", 
                                            color:"#d9d9d9"
                                        }}
                                        onClick={() => setKeywordcity("")}
                                    />
                                }
                                
                            </WrapperInputSearch>
                            <DetailTypeListingWrapper>
                                {
                                    listProvince.isloading ? <Spin/> : (
                                        filteredCities?.length > 0 ? 
                                        <ul>
                                            {
                                                filteredCities?.map((item,index) => (
                                                    <li key={item.value} onClick={() => handleSetprovincechecked(item.value)}><Checkbox checked={tempFilters?.province && tempFilters?.province === item.value}/> <span>{item.label}</span></li>
                                                ))
                                            }
                                        </ul> :
                                        <div style={{flexGrow: 1}}>
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        </div>
                                    )
                                }
                                
                            </DetailTypeListingWrapper>
                        </FilterPersonalItemContent>
                    </FilterPersonalItem>
                    <FilterPersonalItem>
                        <FilterPersonalItemTitle>
                            <h4>Ward/ Commune</h4>
                        </FilterPersonalItemTitle>
                        <FilterPersonalItemContent>
                            <WrapperInputSearch>
                                <Input 
                                    type="text" 
                                    placeholder="Search ward/commune" 
                                    value={keywordCommune}
                                    onChange={(e) =>{
                                        let value = e.target.value;
                                        setKeywordCommune(value);
                                    }}
                                    onKeyDown={(e) => {
                                        const isSpace = e.key === " ";
                                        const value = e.currentTarget.value;

                                        if (isSpace && (value === "" || value.endsWith(" "))) {
                                        e.preventDefault();
                                        }
                                    }}
                                    disabled={!tempFilters?.province}/>
                                    {
                                        keywordCommune !== "" && 
                                        <FontAwesomeIcon 
                                            icon={faCircleXmark}
                                            style={{ position: "absolute", 
                                                top: "50%", 
                                                right: "0.5rem", 
                                                zIndex: 3, 
                                                transform:"translateY(-50%)", 
                                                color:"#d9d9d9"
                                            }}
                                            onClick={() => setKeywordCommune("")}
                                        />
                                    }
                            </WrapperInputSearch>
                            <DetailTypeListingWrapper >
                                {
                                    listCommune.isloading ? <Spin/> : 
                                        filteredCommune?.length > 0 ?
                                        <ul>
                                            {
                                                filteredCommune?.map((item,index) => (
                                                    <li key={item.value} onClick={() => handleSetcommunechecked(item.value)}><Checkbox checked={tempFilters?.commune && tempFilters?.commune === item.value}/> <span>{item.label}</span></li>
                                                ))
                                            }
                                        </ul> :
                                        (
                                            <div style={{flexGrow: 1}}>
                                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                            </div>
                                        )
                                }
                            </DetailTypeListingWrapper>
                        </FilterPersonalItemContent>
                    </FilterPersonalItem>
                    <FilterPersonalItem>
                        <FilterPersonalItemTitle>
                            <h4>Price Range (VND)</h4>
                        </FilterPersonalItemTitle>
                        <FilterPersonalItemContent>
                            <h5>Choose manual input or select</h5>
                            <h6 style={{margin:0, color:"red"}}>Note: Numbers entered will be multiplied by 1 million</h6>
                            <InputNumber value={Number(tempFilters?.priceMin)} min={0} placeholder="Enter minimum price" style={{width:"100%"}} onChange={(value) => {
                                setTempFilters(prev => (
                                    {
                                        ...prev,
                                        priceMin:value
                                    }))
                            }}/>
                            <InputNumber value={Number(tempFilters?.priceMax)} min={0} placeholder="Enter maximum price" style={{width:"100%"}} onChange={(value) => {
                                setTempFilters(prev => (
                                    {
                                        ...prev,
                                        priceMax:value
                                    }))
                            }}/>
                            <Select style={{ width: '100%' }} placeholder="Choose price range" size={"middle"}
                                    value={handleSetRadioGroup(tempFilters?.priceMin,tempFilters?.priceMax,listOption)?.key}
                                    onChange={(value) => {
                                    handleSetPriceSelected(value);
                                }}
                            >
                                {
                                    tempFilters.type === "Sale-property" ? 
                                    (
                                        listPricesell.map((item,index) => (
                                            <Select.Option key={item.key} value={item.key}>{item.label}</Select.Option>
                                        ))
                                    ) : (
                                        listPriceRent.map((item,index) => (
                                            <Select.Option key={item.key} value={item.key}>{item.label}</Select.Option>
                                        ))
                                    )
                                }
                            </Select>
                        </FilterPersonalItemContent>
                    </FilterPersonalItem>
                    <FilterPersonalItem>
                        <FilterPersonalItemTitle>
                            <h4>Area</h4>
                        </FilterPersonalItemTitle>
                        <FilterPersonalItemContent>
                            <h5>Choose manual input or select</h5>
                            <Input type="number" value={Number(tempFilters?.areaMin)} placeholder="Minimum area" onChange={(e) => {
                                setTempFilters(prev => (
                                    {
                                        ...prev,
                                        areaMin:e.target.value
                                    }))
                            }}/>
                            <Input type="number" value={Number(tempFilters?.areaMax)} placeholder="Maximum area"  onChange={(e) => {
                                setTempFilters(prev => (
                                    {
                                        ...prev,
                                        areaMax:e.target.value
                                    }))
                            }}/>
                            <Select style={{ width: '100%' }} placeholder="Choose area range" size={"middle"}
                                    value={handleSetRadioGroup(tempFilters?.areaMin,tempFilters?.areaMax,listacreage)?.key}
                                    onChange={(value) => {
                                    handleSetAcreageSelected(value);
                                }}
                            >
                                {
                                    listacreage.map((item,index) => (
                                        <Select.Option key={item.label} value={item.key}>{item.label}</Select.Option>
                                    ))
                                }
                            </Select>
                        </FilterPersonalItemContent>
                    </FilterPersonalItem>
                    <FilterPersonalItem>
                        <FilterPersonalItemTitle>
                            <h4>Number of Bedrooms</h4>
                        </FilterPersonalItemTitle>
                        <FilterPersonalItemContent>
                            <Wrapperlistselect>
                                {[1,2,3,4,5, `>5`].map((item) => (
                                    <Listselectitem
                                        key={item}
                                        onClick={() =>{
                                            setTempFilters(prev => (
                                                {
                                                    ...prev,
                                                    bedroom:prev?.bedroom === String(item) ? null : String(item)
                                                }))
                                        }}
                                        className={tempFilters.bedroom === String(item) ? "active" : ""}
                                    >
                                        {item}
                                    </Listselectitem>
                                ))}
                            </Wrapperlistselect>
                        </FilterPersonalItemContent>
                    </FilterPersonalItem>
                    <FilterPersonalItem>
                        <FilterPersonalItemTitle>
                            <h4>Number of Bathrooms</h4>
                        </FilterPersonalItemTitle>
                        <FilterPersonalItemContent>
                            <Wrapperlistselect>
                                {[1,2,3,4,5, `>5`].map((item) => (
                                    <Listselectitem
                                        key={item}
                                        onClick={() =>{
                                            setTempFilters(prev => (
                                                {
                                                    ...prev,
                                                    bathroom:prev?.bathroom === String(item) ? null : String(item)
                                                }))
                                        }}
                                        className={tempFilters.bathroom === String(item) ? "active" : ""}
                                    >
                                        {item}
                                    </Listselectitem>
                                ))}
                            </Wrapperlistselect>
                        </FilterPersonalItemContent>
                    </FilterPersonalItem>
                    <FilterPersonalItem>
                        <FilterPersonalItemTitle>
                            <h4>Number of Toilets</h4>
                        </FilterPersonalItemTitle>
                        <FilterPersonalItemContent>
                            <Wrapperlistselect>
                                {[1,2,3,4,5, `>5`].map((item) => (
                                    <Listselectitem
                                        key={item}
                                        onClick={() =>{
                                            setTempFilters(prev => (
                                                {
                                                    ...prev,
                                                    toilet:prev?.toilet === String(item) ? null : String(item)
                                                }))
                                        }}
                                        className={tempFilters.toilet === String(item) ? "active" : ""}
                                    >
                                        {item}
                                    </Listselectitem>
                                ))}
                            </Wrapperlistselect>
                        </FilterPersonalItemContent>
                    </FilterPersonalItem>
                </FilterPersonalpageContent>
                <FilterEnhancepageFooter>
                    <ButtonComponent textButton={"Reset"} size="medium" variant="text" color="default" onClick={() => handleResetFilter()}/>
                    <ButtonComponent textButton={"Apply"} size="medium" className="btn-apply" onClick={() => handleApply()}/>
                </FilterEnhancepageFooter>
            </FilterPersonalpageWrapper>
        </FilterPersonalpageContainer>
    )
}