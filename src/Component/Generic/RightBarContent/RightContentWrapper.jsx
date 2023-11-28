import React from 'react'
import { Layout } from 'antd';
const { Content } = Layout;

function RightContentWrapper(props) {
    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: props.padding ? props.padding : 24,
                minHeight: 280,
                background: '#f5f5f5'
            }}
            className='content_container'
        >
            {props.children}
        </Content>
    )
}

export default RightContentWrapper