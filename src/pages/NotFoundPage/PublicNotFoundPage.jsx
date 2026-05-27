import React from "react";
import { Button, Result } from 'antd';
const NotFoundPage = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Trang bạn mở hiện không tồn tại"
            extra={<Button type="primary">Back Home</Button>}
        />
    )
}

export default NotFoundPage;