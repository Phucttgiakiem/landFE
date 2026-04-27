
import {useState,useEffect} from 'react';
import { InputNumber,Slider,Radio } from "antd";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { ArrowRightOutlined,CloseOutlined } from "@ant-design/icons";
import {RangeFilterWrapper,RangeFilterContentTop,RangeFilterMainContent,RangeFilterContentBottom} from "./style"

export default function RangeFilter({
  title,
  minLabel,
  maxLabel,
  value,
  onChange,
  presets,
  onCloseFilter,
  formatValue,
  convertValue,
  onGetData,
  sliderMin,
  sliderMax,
  sliderStep,
  typeDropdown,
  clearfilter,
  queryMin,
  queryMax
}) {
  
  const [rangeUI, setRangeUI] = useState([sliderMin,sliderMax]);
  const [valueInputGroup, setValueInputGroup] = useState({min:null,max:null});
  const [radioValue, setRadioValue] = useState(null);
  const toReal = (val) => (convertValue ? convertValue(val) : val);


  const handleSetRadioGroup = (vlmin,vlmax) => {
      const option = presets.find(i => i.min === vlmin && i.max === vlmax);
      setRadioValue(option?.key ?? "all");
  }
  const handleUILabel = (e) => {
    const key = e.target.value
    const {min, max} = presets.find(i => i.key === key) || {};

    setRadioValue(e.target.value); 

    setRangeUI([min ?? sliderMin, max ?? sliderMax]);

    setValueInputGroup({
      min: min != null ? min : null,
      max: max != null ? max : null
    });
  };
  const clearControlUI = () => {
    setRangeUI([sliderMin,sliderMax]);
    setValueInputGroup({min:null,max:null});
    setRadioValue("all");
  }
  const handleSliderChange = (values) => {
    setRangeUI(values);
    setValueInputGroup({
      min:values[0],
      max:values[1]
    })
    handleSetRadioGroup(values[0],values[1])
  }
  const findPresetMatch = (range) => {
    return presets.findIndex(item => {
      

      return (
        (item.min ?? sliderMin) === range[0] &&
        (item.max ?? sliderMax) === range[1]
      );
    });
  };
  const arrangevalue = (a,b) => {
        if (a < b || !b) return { min: a, max: b };
        else return {min:b,max:a};
        
  }
  useEffect(() => {
    if (queryMin == null && queryMax == null) return;

    setValueInputGroup({
      min: queryMin ?? null,
      max: queryMax ?? null
    });

    setRangeUI([
      queryMin ?? sliderMin,
      queryMax ?? sliderMax
    ]);

    handleSetRadioGroup(queryMin,queryMax);
  }, [queryMin, queryMax]);
  useEffect(() => {
    if (!queryMin && !queryMax) {
      setRangeUI([sliderMin, sliderMax]);
      setValueInputGroup({ min: null, max: null });
      setRadioValue("all");
    }
  }, [typeDropdown]);
  return (
    <RangeFilterWrapper>
      <div>
        <h3>{title}</h3>
        <CloseOutlined onClick={() => onCloseFilter(null)}/>
      </div>
      <RangeFilterContentTop>
          <div>
              <span>
              {valueInputGroup.min === null 
                ? minLabel
                :"Từ: " + formatValue(toReal(valueInputGroup.min))}
            </span>

            <span>
              {valueInputGroup.max === null
                ? maxLabel
                :"Đến: " + formatValue(toReal(valueInputGroup.max))}
            </span>
          </div>
          <div>
              <InputNumber size="large"  min={0} max={99999} value={valueInputGroup.min}
                placeholder='Từ'
                onChange={(val) => {
                  if (val > 99999) return;
                  const newRange = [val,rangeUI[1]];
                  setRangeUI(newRange);
                  setValueInputGroup({
                    min: val,
                    max: valueInputGroup.max
                  });
                  handleSetRadioGroup(val,valueInputGroup.max);
                }} className="inputprice"/>
              <ArrowRightOutlined />
              <InputNumber size="large" value={valueInputGroup.max} min={0} max={99999}
                placeholder='Đến'
                onChange={(val) => {
                  if (val > 99999) return;
                  const newRange = [rangeUI[0],val];

                  setRangeUI(newRange);

                  setValueInputGroup({
                    min: valueInputGroup.min,
                    max: val
                  });
                  handleSetRadioGroup(valueInputGroup.min,val);
                }}
                 className="inputprice"
              />
          </div>
          <div>
              <Slider
                range
                value={rangeUI}
                onChange={handleSliderChange}
                min={sliderMin}
                max={sliderMax}
                step={sliderStep}
                style={{width: "100%"}}
              />
          </div>
      </RangeFilterContentTop>

      <RangeFilterMainContent>
        <Radio.Group block 
              options={presets.map(item => ({
                ...item,
                value: item.key
              }))} value={radioValue} onChange={(e)=> handleUILabel(e)} className="list-option"/>
      </RangeFilterMainContent>
      <RangeFilterContentBottom>
        <span onClick={() => {clearfilter();clearControlUI(); }}>Đặt lại</span>
        <ButtonComponent textButton={"Áp dụng"} size="large" className="btn-apply" 
          onClick={() => {
          const found = findPresetMatch(rangeUI);

          setRadioValue(found ? found.key : null);
          
          const {min,max} = arrangevalue(valueInputGroup.min,valueInputGroup.max);
          onGetData({
            min: min,
            max: max
          }, typeDropdown);
        }}
        />
      </RangeFilterContentBottom>
    </RangeFilterWrapper>
  );
}