import { WrapperFilter,CounterFilter } from "./style";
import { FilterOutlined,DownOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
export default function FilterComponent () {
    return (
        <div>
            <WrapperFilter>
                    <ButtonComponent 
                        size="middle" 
                        styleButton={{"marginRight":"1rem"}}
                        textButton="lọc" 
                        leftIcon={<FilterOutlined />} 
                        iconAction={<CounterFilter>2</CounterFilter>}/>
                    <ButtonComponent
                        size="middle"
                        styleButton={{"marginRight":"1rem"}}
                        textButton="Nhà riêng"
                        rightIcon={<DownOutlined />}
                    />
                    <ButtonComponent
                        size="middle"
                        styleButton={{"marginRight":"1rem"}}
                        textButton="Mức giá"
                        rightIcon={<DownOutlined />}
                    />
                    <ButtonComponent
                        size="middle"
                        styleButton={{"marginRight":"1rem"}}
                        textButton="Diện tích"
                        rightIcon={<DownOutlined />}
                    /> 
            </WrapperFilter>
        </div>
    );
}