
import { useFilters } from "../../hooks/useFiltershook";
import { useState,useMemo} from "react";
import { useLocation,useSearchParams, useParams } from "react-router-dom";
import {formatPriceToString} from "../../utils";
import { WrapperFilter,CounterFilter } from "./style";
import { FilterOutlined,DownOutlined,UpOutlined } from "@ant-design/icons";
import { Select } from "antd";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import RangeFilter from "../RangeFilter/RangeFilter";
import {formatNumberaddZero,formatNumberCodeCommuneZero} from "../../utils"
import FilterEnhanceComponent from "../FilterEnhanceComponent/FilterEnhanceComponent";
import {listPricesell,listPriceRent,listacreage} from "../../constant/MenuOption";

export default function FilterComponent ({ListProvince,ListWard}) {
    
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [openFilterEnhance,setOpenfilterenhance] = useState(false);
    const [searchParams,setSearchParams] = useSearchParams();
    const location = useLocation();
    const { query,setFilters,clearPrice,clearArea } = useFilters();

    const arr = location.pathname.split("/");
    const TypeProperty = arr[2] || "Nha-dat-ban";
    
    
    const formatPriceLabel = (query, type) => {
        const min = convertPrice(query.priceMin);
        const max = convertPrice(query.priceMax);
        if (min == null && max == null) return "Mức giá";
        if (min === 0 && max === 0) return "Thỏa thuận";
        if (max == null) return `Trên ${formatPriceToString(min)}`;
        if (min === 0) return `Dưới ${formatPriceToString(max)}`;
        return `${formatPriceToString(min)} - ${formatPriceToString(max)}`;
    };
    const formatAreaLabel = (query) => {
        const min = query.areaMin;
        const max = query.areaMax;

        if (min == null && max == null) return "Diện tích";

        if (max == null) return `Trên ${min} m²`;
        if (min == null) return `Dưới ${max} m²`;

        return `${min} - ${max} m²`;
    };
    
    const handleGetData = (value, filterType) => {
        if (filterType === "price") {
            setFilters({
                priceMin: value.min,
                priceMax: value.max
            });
        }

        if (filterType === "area") {
            setFilters({
                areaMin: value.min,
                areaMax: value.max
            });
        }
    };
    
    const handleGetProvince = (value) => {
        const province = value[0];

        setFilters({
            province,
            commune: undefined 
        });
    }
    const handleGetCommune = (value) => {
        setFilters({
            commune:value[0]
        })
    }
    const handleGetSort = (value) => {
        setFilters({
            sort: value
        });
    };
    const handleCloseRangeFilter = (value) => {
        setActiveDropdown(value);
    }
    const handleCloseFilterEnhance = (value) => {
        setOpenfilterenhance(value);
    }
    const formatAcreage = (value) => value + " m²";
    const convertPrice = (value) => {
        return value == null ? null : value * 1e6;
    };
    const {type,category} = useParams();
    const countFilters = useMemo(() => {
        const isValid = v => v !== null && v !== "";

    return [
            type,
            category,
            searchParams.get("province"),
            searchParams.get("commune"),
            searchParams.get("bedroom"),
            searchParams.get("bathroom"),
            searchParams.get("toilet"),
            isValid(searchParams.get("priceMin")) || isValid(searchParams.get("priceMax")),
            isValid(searchParams.get("areaMin")) || isValid(searchParams.get("areaMax")),
        ].filter(Boolean).length;
    }, [searchParams, category]);
    return (
        <>
            {openFilterEnhance && <FilterEnhanceComponent CloseDialog={handleCloseFilterEnhance}></FilterEnhanceComponent>}
            <WrapperFilter>
                <ButtonComponent 
                    size="middle" 
                    textButton="lọc" 
                    leftIcon={<FilterOutlined />} 
                    iconAction={ countFilters > 0 && <CounterFilter>{countFilters}</CounterFilter>}
                    onClick={() => setOpenfilterenhance(true)}
                />
                <div style={{ position: "relative" }}>
                    <ButtonComponent
                        size="middle"
                        textButton={ 
                            formatPriceLabel(query,TypeProperty)
                        }
                        rightIcon={activeDropdown === "price" ? <UpOutlined /> : <DownOutlined/>}
                        onClick={() =>
                            setActiveDropdown(
                                activeDropdown === "price" ? null : "price"
                            )
                        }
                    />

                    {activeDropdown === "price" && (
                        <div className="dropdown">
                            <RangeFilter 
                                typeDropdown="price" 
                                title="Khoảng giá" 
                                minLabel="Giá thấp nhất" 
                                maxLabel="Giá cao nhất"
                                presets={TypeProperty === "Nha-dat-ban" ? listPricesell : listPriceRent}
                                sliderMin={0}
                                sliderMax={TypeProperty === "Nha-dat-ban" ? 60000 : 100}
                                sliderStep={10}
                                onCloseFilter={handleCloseRangeFilter}
                                formatValue={formatPriceToString}
                                convertValue={convertPrice}
                                onGetData={handleGetData}
                                clearfilter={clearPrice}
                                queryMin={query?.priceMin}
                                queryMax={query?.priceMax}
                            />
                        </div>
                    )}
                </div>
                <div style={{ position: "relative" }}>
                    <ButtonComponent
                        size="middle"
                        textButton={
                            formatAreaLabel(query)
                        }
                        rightIcon={<DownOutlined />}
                        onClick={() =>
                            setActiveDropdown(
                                activeDropdown === "area" ? null : "area"
                            )
                        }
                    />
                    {activeDropdown === "area" && (
                        <div className="dropdown">
                            <RangeFilter 
                                 typeDropdown="area" 
                                 title="Diện tích" 
                                 minLabel="Diện tích nhỏ nhất" 
                                 maxLabel="Diện tích lớn nhất"  
                                 presets={listacreage} 
                                 sliderMin={0}
                                 sliderMax={500}
                                 sliderStep={5} 
                                 formatValue={formatAcreage}
                                 onCloseFilter={handleCloseRangeFilter}
                                 onGetData={handleGetData}
                                 clearfilter={clearArea}
                                 queryMin={query?.areaMin}
                                queryMax={query?.areaMax}
                            />
                        </div>
                    )}
                </div> 
                <Select 
                    loading={ListProvince.isloading} 
                    placeholder="Lựa chọn thành phố"
                    style={{flexGrow:2}} 
                    mode="multiple" 
                    value={query?.province
                        ? [formatNumberaddZero(query.province)]
                        : undefined}
                    maxCount={1} 
                    options={ListProvince.items}
                    onChange={handleGetProvince}
                />
                <Select 
                    loading={ListWard.isloading} 
                    placeholder="Lựa chọn phường xã"
                    style={{flexGrow:2}} 
                    value={query?.commune && query?.province ? [formatNumberCodeCommuneZero(query.commune)]: undefined}
                    mode="multiple" 
                    maxCount={1} 
                    options={ListWard.items}
                    onChange={handleGetCommune}
                    disabled={!query?.province}
                />
                <Select
                    placeholder="Sắp xếp theo"
                    style={{flexGrow:2}}
                    allowClear
                    options={
                        [
                            {value:"Price-ascend",label:"Giá tăng dần"},
                            {value:"Price-descend",label:"Giá giảm dần"},
                            {value:"createdAt-ascend",label:"Ngày mới nhất đến cũ nhất"},
                            {value:"createdAt-descend",label:"Ngày cũ nhất đến mới nhất"},
                        ]
                    }
                    onChange={handleGetSort}
                />
            </WrapperFilter>
        </>
    );
}