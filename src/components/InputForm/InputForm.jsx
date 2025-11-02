import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {useState} from 'react';

const InputForm = ({placeholder = "Nhập Text",size,prefix,TypePassword = true,...rests}) => {
    
    const [valueInput,setValueInput] = useState("");
    console.log(placeholder)
    return (
        TypePassword ? (
        <Input.Password
                prefix={prefix}
                placeholder={placeholder}
                size={size}
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                {...rests}
        /> ) :
        <Input prefix={prefix}
                placeholder={placeholder}
                size={size}
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                {...rests}
        />
    )
}

export default InputForm;