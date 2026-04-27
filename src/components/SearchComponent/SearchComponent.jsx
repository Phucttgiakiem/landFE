// import { Col, Row } from "antd";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useFilters } from "../../hooks/useFiltershook";
// import {
//   WrapperSearch,
//   WrapperInputsearch,
//   InputSearch,
//   InputNameCity,
//   WrapperArea,
//   Itemlocation,
//   BtnArrowDown,
//   WrapperList,
//   Itemlist,
//   Featureanother
// } from "./style";
// import ButtonComponent from "../ButtonComponent/ButtonComponent";
// import {
//   SearchOutlined,
//   DownOutlined,
//   CloseCircleOutlined,
// } from "@ant-design/icons";

// export default function SearchComponent() {
//   // mode: null | "province" | "ward"
//   const [mode, setMode] = useState(null);

//   // list hiển thị
//   const [areaList, setAreaList] = useState([]);

//   // giá trị đã chọn
//   const [selected, setSelected] = useState({
//     province: null,
//     commune: null,
//   });
//   const [keyword, setKeyword] = useState("");
//   const {query,setFilters} = useFilters();
//   const wrapperRef = useRef(null);

  
//   const stylebtnsearch = {
//     margin: "auto 1rem",
//     fontSize: "1rem",
//     fontWeight: "bold",
//   };

//   //  remove commune
//   const removeCommune = () => {
//     setSelected((prev) => ({
//       ...prev,
//       commune: null,
//     }));
//   };

//   //  fetch data (có cache đơn giản)
//   const cacheRef = useRef({
//     provinces: null,
//     communes: {},
//   });
//   const handleSearch = () => {
//     const querys = {
//         keyword: keyword.trim(),
//         provinceCode: selected.province?.code || null,
//         communeCode: selected.commune?.code || null,
//     };
//     setKeyword('');
//     setFilters({...querys});
//   }
//   useEffect(() => {
//     const fetchData = async () => {
//       const regex = /^(?:Tỉnh|Thành phố)\s+(.+)$/i;

//       //  LOAD PROVINCES
//       if (mode === "province") {
//         if (cacheRef.current.provinces) {
//           setAreaList(cacheRef.current.provinces);
//           return;
//         }

//         const res = await axios.get(
//           "https://production.cas.so/address-kit/2025-07-01/provinces"
//         );

//         const list = res.data.provinces.map((item) => {
//           const match = item.name.match(regex);
//           return {
//             code: item.code,
//             name: match ? match[1] : item.name,
//           };
//         });

//         cacheRef.current.provinces = list;
//         setAreaList(list);
//       }

//       //  LOAD COMMUNES
//       if (mode === "ward" && selected.province?.code) {
//         const provinceCode = selected.province.code;

//         if (cacheRef.current.communes[provinceCode]) {
//           setAreaList(cacheRef.current.communes[provinceCode]);
//           return;
//         }

//         const res = await axios.get(
//           `https://production.cas.so/address-kit/2025-07-01/provinces/${provinceCode}/communes`
//         );

//         const list = res.data.communes.map((item) => {
//           const match = item.name.match(regex);
//           return {
//             code: item.code,
//             name: match ? match[1] : item.name,
//           };
//         });

//         cacheRef.current.communes[provinceCode] = list;
//         setAreaList(list);
//       }
//     };

//     if (mode) fetchData();
//   }, [mode, selected.province?.code]);

//   //  click outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         setMode(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <WrapperSearch ref={wrapperRef} className={mode ? "active" : ""}>
//       <Col span={24}>
//         <WrapperInputsearch>
//           <span style={{ margin: "1rem" }}>
//             <SearchOutlined style={{ fontSize: "1.7rem" }} />
//           </span>

//           {/*  Commune selected */}
//           <WrapperList style={{flexGrow: query?.keyword ? 1: 0}}>
//             {selected.commune && (
//               <li
//                 key={selected.commune.code}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   marginRight: "0.3rem",
//                 }}
//               >
//                 <Itemlist>
//                   {selected.commune.name}
//                   <CloseCircleOutlined
//                     style={{ marginLeft: "0.5rem" }}
//                     onClick={removeCommune}
//                   />
//                 </Itemlist>
//               </li>
//             )}
//           </WrapperList>

//           {/*  Input */}
//           {!query?.keyword && (
//             <InputSearch
//               placeholder="Đường song hành quốc lộ 20"
//               value={keyword}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 if (value.startsWith(" ")) return;
//                 setKeyword(value);
//               }}
//               onClick={() => {
//                 if (selected.province) {
//                   setMode("ward");
//                 } else {
//                   setMode("province");
//                 }
//               }}
//             />
//           )}

          
//           <Featureanother>
//             {/*  Province name */}
//             <InputNameCity>
//               {selected.province?.name || "Tất cả"}
//             </InputNameCity>

//             {/*  Arrow */}
//             <BtnArrowDown
//               onClick={() => setMode("province")}
//               className={mode ? "open" : ""}
//             >
//               <DownOutlined style={{ fontSize: "0.8rem" }} />
//             </BtnArrowDown>

//             <ButtonComponent
//               textButton={"Tìm kiếm"}
//               color="danger"
//               variant="solid"
//               styleButton={stylebtnsearch}
//               onClick={() => handleSearch()}
//             />
//           </Featureanother>
          
//         </WrapperInputsearch>
//       </Col>

//       {/*  Dropdown */}
//       <Col span={24}>
//         <WrapperArea className={mode ? "show" : ""}>
//           <div>
//             <span style={{ fontWeight: "bold" }}>
//               {mode === "ward"
//                 ? "Danh sách phường xã"
//                 : "Danh sách tỉnh thành"}
//             </span>

//             <Row gutter={[8, 8]} style={{ marginTop: "1.5rem" }}>
//               {areaList.length > 0 ? (
//                 areaList.map((item) => (
//                   <Itemlocation
//                     key={item.code}
//                     span={6}
//                     onClick={() => {
//                       //  chọn tỉnh
//                       if (mode === "province") {
//                         setSelected({
//                           province: item,
//                           commune: null,
//                         });
//                         setMode("ward");
//                       }

//                       //  chọn phường
//                       else {
//                         setSelected((prev) => ({
//                           ...prev,
//                           commune: item,
//                         }));
//                         setMode(null);
//                       }
//                     }}
//                   >
//                     {item.name}
//                   </Itemlocation>
//                 ))
//               ) : (
//                 <Col span={24}>không có dữ liệu</Col>
//               )}
//             </Row>
//           </div>
//         </WrapperArea>
//       </Col>
//     </WrapperSearch>
//   );
// }

import { useState, useEffect } from "react";
import { useFilters } from "../../hooks/useFiltershook";
import {
  WrapperSearch,
  WrapperInputsearch,
  InputSearch,
  WrapperInputWithClear
} from "./style";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import {
  SearchOutlined,CloseOutlined
} from "@ant-design/icons";
export default function SearchComponent() {
  
  const [keyword, setKeyword] = useState("");

  const { query, setFilters } = useFilters();
  
  // 🔥 sync keyword từ URL
  useEffect(() => {
    setKeyword(query?.keyword || "");
  }, [query?.keyword]);

  

  // search
  const handleSearch = () => {
    if(!keyword.trim()) return;
    setFilters({
      ...query,
      keyword: keyword.trim(),
    });
  };

 
  return (
    <WrapperSearch>
        <WrapperInputsearch>
          <span style={{ margin: "1rem" }}>
            <SearchOutlined style={{ fontSize: "1.7rem" }} />
          </span>
          <WrapperInputWithClear>
            <InputSearch
              placeholder="Đường song hành quốc lộ 20"
              value={keyword}
              onChange={(e) => {
                const value = e.target.value;
                if (value.startsWith(" ")) return;
                setKeyword(value);
              }}
            />
            {
              keyword !== "" && <span className="btn-clears" onClick={()=> {setFilters({...query,keyword: null}); setKeyword("")}}>
              <CloseOutlined />
            </span>
            }
            
          </WrapperInputWithClear>
            
            <ButtonComponent
              textButton={"Tìm kiếm"}
              color="danger"
              variant="solid"
              styleButton={{
                margin: "auto 1rem",
                fontSize: "1rem",
                fontWeight: "bold"}}
              onClick={() => handleSearch()}
            />
        </WrapperInputsearch>
    </WrapperSearch>
  );
}