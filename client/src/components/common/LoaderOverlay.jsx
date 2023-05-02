import { Spin } from 'antd';
import React from 'react';
import Logo from '../../assets/logos/withText/docapp_dark.svg';

function LoadeerOverlay() {
    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <img src={Logo} alt="DOCAPP_Logo" />
            <h1 className="mb-60 mt-5 font-bold text-5xl border-b-4 border-primary rounded-lg pb-2">
                DOCCAPP
            </h1>
            <Spin size="large" />
        </div>
    );
}

export default LoadeerOverlay;
