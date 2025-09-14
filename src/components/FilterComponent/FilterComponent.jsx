import { WrapperFilter } from "./style";
import { FilterOutlined } from "@ant-design/icons";
export default function FilterComponent () {
    return (
        <div>
            <WrapperFilter>
                <div>
                    <FilterOutlined/>
                    <span>Lọc</span>
                    <span>0</span>
                </div>
            </WrapperFilter>
        </div>
    );
}