import React from "react";
import { Button, Result } from 'antd';
const NotFoundPage = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="The page you are looking for does not exist."
            extra={<Button type="primary">Back Home</Button>}
        />
    )
}

export default NotFoundPage;