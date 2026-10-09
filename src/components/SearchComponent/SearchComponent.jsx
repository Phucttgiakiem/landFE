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
  
  // 🔥 sync keyword from URL
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
              placeholder="Enter keyword to search"
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
              textButton={"Search"}
              color="danger"
              variant="solid"
              styleButton={{
                margin: "auto 1rem",
                fontSize: "1rem",
                fontWeight: "bold"}}
              onClick={() => handleSearch()}
              className="btn-search-property"
            />
        </WrapperInputsearch>
    </WrapperSearch>
  );
}