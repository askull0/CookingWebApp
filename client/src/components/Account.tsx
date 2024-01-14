import React, {useEffect, useState} from 'react';
import type {MenuProps} from 'antd';
import {Dropdown, notification, Space} from 'antd';
import {useIsLogged} from '../hooks/useIsLogged';
import {useNavigate} from 'react-router-dom';
import {IconUserCircle} from "@tabler/icons-react";
import axios from "axios";


export const Account = () => {
    const isLogged = useIsLogged();
    const navigate = useNavigate();
    const [showLogoutNotification, setShowLogoutNotification] = useState(false);

    const handleClick = (path: string) => {
        navigate(path);
    };
    const handleLogout = async () => {
        try {
            await axios.post('/auth/logout');
            setShowLogoutNotification(true);
            setTimeout(() => {
                setShowLogoutNotification(false);
            }, 1000);
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


    useEffect(() => {
        if (showLogoutNotification) {
            openNotification();
        }
    }, [showLogoutNotification]);

    const openNotification = () => {
        notification.info({
            message: 'You have been logged out',
            duration: 3,
        });
    };

    return (
        <Dropdown menu={{items: menuItems}} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <IconUserCircle size={45}/>
                </Space>
            </a>
        </Dropdown>
    );
};
