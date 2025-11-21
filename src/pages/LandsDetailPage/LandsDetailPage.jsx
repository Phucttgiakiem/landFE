import LandDetailComponent from "../../components/LandDetailComponent/LandDetailComponent";
import landimage1 from "../../assets/images/20250904001841_bdbe_wm.jpg"
import {LandDetail} from "./style";
export default function LandsDetailPage () {
  return (
    <LandDetail>
      <h5>Trang chủ</h5>
      <LandDetailComponent arrImages={[landimage1,landimage1,landimage1,landimage1]}/>
    </LandDetail>
  )
}