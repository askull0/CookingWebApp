import React from 'react';
import {DownOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Dropdown, Space} from 'antd';

const items: MenuProps['items'] = [
    {
        label: 'sign in',
        key: '0',
    },
    {
        label: 'My profile',
        key: '1',
    },
    /*    {
            label: 'My recipes',
            key: '1',
        },*/
    {
        type: 'divider',
    },
    {
        label: 'logout',
        key: '3',
    },
];

export const Account = () => (
    <Dropdown menu={{items}} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
            <Space>
                My account
                <DownOutlined/>
            </Space>
        </a>
    </Dropdown>
);

