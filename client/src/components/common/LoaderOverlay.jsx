import { Spin } from 'antd';
import React from 'react';

function LoadeerOverlay() {
    return (
        <div className="flex h-screen justify-center items-center bg-base-100">
            <Spin size="large" />
        </div>
    );
}

export default LoadeerOverlay;
