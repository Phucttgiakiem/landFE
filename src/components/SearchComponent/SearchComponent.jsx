import { Col,Row } from "antd";
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import {WrapperSearch,WrapperInputsearch,InputSearch,InputNameCity
    ,WrapperArea,Itemlocation,BtnArrowDown,WrapperListcommune,Itemlistcommune,TextItemlistcommune} from "./style";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { SearchOutlined, DownOutlined,CloseCircleOutlined } from "@ant-design/icons";
export default function SearchComponent () {
    const [stateArea,setArea] = useState([]);
    const [showArea,setShowArea] = useState(false);
    const [showWard,setShowWard] = useState(false);
    const [area,setAreaSelect] = useState(null);
    const wrapperRef = useRef(null);
    const stylebtnsearch = {
        "margin": "auto 1rem",
        "font-size":"1rem",
        "font-weight":"bold"
    }
    const RemoveAreaselected = (code) => {
        const newarea = area.commune.filter(item => item.code !== code);
        setAreaSelect(prev => ({
            ...prev,
            commune: newarea
        }));
    }
    useEffect(() =>{
        const fetchdata = async () => {
            let data = null;
            let list = [];
            const regex = /^(?:Tỉnh|Thành phố)\s+(.+)$/i;

            if (area?.province?.code && showWard && !showArea) {
            // lấy communes của tỉnh đã chọn
                data = await axios.get(
                    `https://production.cas.so/address-kit/2025-07-01/provinces/${area.province.code}/communes`
                );
                const { communes } = data.data;
            
                list = communes.map((item) => {
                    const match = item.name.match(regex);
                    return {
                        code: item.code,
                        name: match ? match[1] : item.name,
                    };
                });
           
            } else {
            // lấy provinces
                data = await axios.get(
                    "https://production.cas.so/address-kit/2025-07-01/provinces"
                );
                    const { provinces } = data.data;
           
                    list = provinces.map((item) => {
                        const match = item.name.match(regex);
                        return {
                            code: item.code,
                            name: match ? match[1] : item.name,
                        };
                    });
            }

            setArea(list);
        };
        fetchdata();
    },[area,area?.province?.code,showArea,showWard]);
    useEffect(() => {
        function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setShowArea(false);
            setShowWard(false);
        }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    //console.log("kq ",area);
    return (
        <div>
            <WrapperSearch ref={wrapperRef} className={showArea || showWard ? "active" : ""}>
                <Col span={24}>
                    <WrapperInputsearch>
                        <span style={{"margin": "1rem"}}>
                            <SearchOutlined style={{"fontSize": "1.7rem"}}/>
                        </span>
                        <WrapperListcommune>
                            {
                                area && area?.commune?.length > 0 &&
                                area.commune.map((communeItem) => (
                                    <li style={{"display":"flex","alignItems":"center","marginRight":"0.3rem"}} key={communeItem.code}>
                                        <Itemlistcommune>
                                            {communeItem.name}
                                            <CloseCircleOutlined style={{"marginLeft":"0.5rem"}} onClick={() => RemoveAreaselected(communeItem.code)}/>
                                        </Itemlistcommune>
                                    </li>
                                ))
                            }
                        </WrapperListcommune>
                        <InputSearch type="text" name="" id="" placeholder="Đường song hành quốc lộ 20" 
                            onClick={()=>{if(area && area.province) {
                                setShowWard(true);
                                setShowArea(false);
                            }else {
                                setShowArea(true);
                                setShowWard(false);
                            }}}/>
                        <InputNameCity>
                            {area && area.province  ?  area.province.name : "Tất cả"}
                        </InputNameCity>
                        <BtnArrowDown onClick={() => setShowArea(!showArea)} className={showArea || showWard ? "open" : ""}>
                            <DownOutlined style={{"fontSize": "0.8rem"}}/>
                        </BtnArrowDown>
                        <ButtonComponent textButton={"Tìm kiếm"} color="danger" variant="solid" styleButton={stylebtnsearch}/>
                    </WrapperInputsearch>
                </Col>
                <Col span={24}>
                    { area && area?.commune?.length === 3 && <TextItemlistcommune>Tối đa ba lựa chọn phường hoặc xã</TextItemlistcommune>}
                </Col>
                <Col span={24}>
                    <WrapperArea className={showArea || showWard ? "show" : ""}>
                        <div>
                            {
                                showWard && !showArea ? <span style={{"fontWeight":"bold"}}>Danh sách phường xã</span> :
                                <span style={{"fontWeight":"bold"}}>Danh sách tỉnh thành</span>
                            }
                            <Row gutter={[8,8]} style={{"marginTop":"1.5rem"}}>
                                {
                                    stateArea.length > 0 ? (
                                        stateArea.map((item) =>(
                                            <Itemlocation onClick={() =>{
                                                if(showArea){
                                                    setAreaSelect({
                                                        commune: [],
                                                        province: {
                                                            code: item.code,
                                                            name: item.name
                                                        }
                                                    })
                                                    setShowArea(false);
                                                    setShowWard(true);
                                                }else {
                                                    setAreaSelect(prev => {
                                                        const alreadyExists = prev?.commune?.some(vl => vl.code === item.code);

                                                        return {
                                                        ...prev,
                                                        commune: alreadyExists
                                                            ? prev.commune // nếu đã tồn tại thì giữ nguyên
                                                            : [...(prev?.commune || []), { code: item.code, name: item.name }] // chưa có thì thêm mới
                                                        };
                                                    });
                                                    setShowWard(false); 
                                                    setShowArea(false);
                                                }
                                                
                                               
                                            }} span={6} key={item.code}>{item.name}</Itemlocation>
                                        ))
                                    ) :(
                                        <Col span={24}>không có dữ liệu</Col>
                                    )
                                }
                            </Row>
                        </div>
                    </WrapperArea>
                </Col>
            </WrapperSearch>
        </div>
    )
}