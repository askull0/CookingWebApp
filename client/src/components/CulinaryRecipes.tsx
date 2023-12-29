import type {CSSProperties} from 'react';
import React, {useEffect} from 'react';
import {CaretRightOutlined, ClockCircleOutlined} from '@ant-design/icons';
import type {CollapseProps} from 'antd';
import {Collapse, Rate, theme, Tooltip} from 'antd';
import {ActionIcon} from "@mantine/core";
import {SearchCulinaryRecipes} from "../features/Recipe/SearchCulinaryRecipes";
import {IconTablePlus} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import {OpinionButton} from "./OpinionButton";
import axios from 'axios';

const getRecipes = () => {
    axios.get('http://localhost:9000/recipes').then(res => {
        console.log(res)
    }).catch(error => {
        console.log(error)
    })
}
const text = `sth in the way`;
const getItems: (panelStyle: CSSProperties
) => CollapseProps['items'] = (panelStyle) => [
    {
        key: '1',
        label: 'This is panel header 1',
        children: (
            <>
                <p>{text}</p>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                    <Rate disabled defaultValue={2}/>
                    <Tooltip title="Preparation time">
                        <ClockCircleOutlined style={{marginRight: '10px'}}/>
                        <span>5 min</span>
                    </Tooltip>
                    <OpinionButton index={0}/>
                </div>

            </>
        ),
        style: panelStyle,
    },
    {
        key: '2',
        label: 'This is panel header 2',
        children: (
            <>
                <p>{text}</p>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                    <Rate disabled defaultValue={4}/>
                    <Tooltip title="Preparation time">
                        <ClockCircleOutlined style={{marginRight: '8px'}}/>
                        <span>50 min</span>
                    </Tooltip>
                    <OpinionButton index={1}/>

                </div>
            </>
        ),
        style: panelStyle,
    },
    {
        key: '3',
        label: 'This is panel header 3',
        children: (
            <>
                <p>{text}</p>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                    <Rate disabled defaultValue={5}/>
                    <Tooltip title="Preparation time">
                        <ClockCircleOutlined style={{marginRight: '8px'}}/>
                        <span>20 min</span>
                    </Tooltip>
                    <OpinionButton index={2}/>

                </div>
            </>
        ),
        style: panelStyle,

    },
];

export const CulinaryRecipes = () => {
    const {token} = theme.useToken();
    const navigate = useNavigate();

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };

    useEffect(() => {
        getRecipes();
    }, []);


    return (
        <div className="content">
            <div className="search">
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <SearchCulinaryRecipes/>
                </div>
                <ActionIcon onClick={() => navigate('/new')} className="icon" variant="filled" color="#027926"
                            size="lg"
                            radius="md"
                            aria-label="Settings">
                    <IconTablePlus style={{width: '70%', height: '70%'}} stroke={1.5}/>
                </ActionIcon>
            </div>

            <Collapse
                bordered={false}
                expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
                items={getItems(panelStyle)}
            />
        </div>
    );
};

