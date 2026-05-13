import {WrapperContract,ContractContainer,ContractHeader,ContractBody} from "./style"
import ContractVipcomponent from "../../components/ContractComponent/ContractVipcomponent"
export default function Contractpage () {
    return (
        <WrapperContract>
            <ContractContainer>
                <ContractHeader>
                    <h2>Quản lý hợp đồng</h2>
                </ContractHeader>
                <ContractBody>
                    <ContractVipcomponent/>
                </ContractBody>
            </ContractContainer>
        </WrapperContract>
    )
}