import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function SlickEffectComponent({setting,children}){
  return (
    <Slider
        {...setting}>
      {children}
    </Slider>
  );
};
