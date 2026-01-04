import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
//import {useState} from 'react';

const InputForm = ({placeholder = "Nhập Text",size,prefix,TypePassword = true,...rests}) => {
    
    // const [valueInput,setValueInput] = useState("");
    const handleOnChangeInput = (e) => {
        rests.handleOnChange(e.target.value);
    }
    return (
        TypePassword ? (
        <Input.Password
                prefix={prefix}
                placeholder={placeholder}
                size={size}
                // value={valueInput}
                onChange={handleOnChangeInput}
                value={rests.value}
                iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                {...rests}
        /> ) :
        <Input prefix={prefix}
                placeholder={placeholder}
                size={size}
                // value={valueInput}
                onChange={handleOnChangeInput}
                value={rests.value}
                {...rests}
        />
    )
}

export default InputForm;