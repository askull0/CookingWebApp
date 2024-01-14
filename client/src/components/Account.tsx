import React from 'react';
import {DownOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Dropdown, Space} from 'antd';
import {useIsLogged} from '../hooks/useIsLogged';
import {useNavigate} from 'react-router-dom';
import {IconUserCircle} from "@tabler/icons-react";
import axios from "axios";


export const Account = () => {
    const isLogged = useIsLogged();
    const navigate = useNavigate();

    const handleClick = (path: string) => {
        navigate(path);
    };
    const handleLogout = async () => {
        try {
            await axios.post('/auth/logout');
            navigate('/recipe');
        } catch (error) {
            console.error('Błąd podczas wylogowywania:', error);
        }
    };

    const items: MenuProps['items'] = [
        {
            label: 'sign in',
            key: '0',
            onClick: () => handleClick('/login'),
        },
    ];

    const items_logged: MenuProps['items'] = [
        {
            label: 'My account',
            key: '0',
            onClick: () => handleClick('/myprofile'),
        },
        {
            type: 'divider',
        },
        {
            label: 'logout',
            key: '1',
            onClick: handleLogout,
        },
    ];

    const menuItems = isLogged ? items_logged : items;

    return (
        <Dropdown menu={{items: menuItems}} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <IconUserCircle/>
                    <DownOutlined/>
                </Space>
            </a>
        </Dropdown>
    );
};
