import { Button } from "antd";
const ButtonComponent = ({size,styleButton,styleTextButton,textButton,leftIcon,rightIcon,iconAction,...rest}) => {
    return (
        <Button
            size={size}
            style={styleButton}
            {...rest}
        >
            {leftIcon && <span>{leftIcon}</span>}
            <span style={styleTextButton}>{textButton}</span>
            {rightIcon && <span>{rightIcon}</span>}
            {iconAction && <>{iconAction}</>}
        </Button>
    )
}
export default ButtonComponent;