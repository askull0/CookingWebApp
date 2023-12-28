import type {CSSProperties} from 'react';
import React, {useState} from 'react';
import {CaretRightOutlined, ClockCircleOutlined} from '@ant-design/icons';
import type {CollapseProps} from 'antd';
import {Collapse, theme, Tooltip} from 'antd';
import {ActionIcon, Rating} from "@mantine/core";
import {SearchCulinaryRecipes} from "../features/Recipe/SearchCulinaryRecipes";
import {IconTablePlus} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";


const text = `sth in the way`;
const getItems: (panelStyle: CSSProperties,
                 values: number[],
                 setValues: React.Dispatch<React.SetStateAction<number[]>>
) => CollapseProps['items'] = (panelStyle, values, setValues) => [
    {
        key: '1',
        label: 'This is panel header 1',
        children: (
            <>
                <p>{text}</p>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                    <Rating value={values[0]} onChange={(value) => setValues([value, values[1], values[2]])}/>
                    <Tooltip title="Preparation time">
                        <ClockCircleOutlined style={{marginRight: '10px'}}/>
                        <span>5 min</span>
                    </Tooltip>
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
                    <Rating value={values[1]} onChange={(value) => setValues([values[0], value, values[2]])}/>
                    <Tooltip title="Preparation time">
                        <ClockCircleOutlined style={{marginRight: '8px'}}/>
                        <span>50 min</span>
                    </Tooltip>
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
                    <Rating value={values[2]} onChange={(value) => setValues([values[0], values[1], value])}/>
                    <Tooltip title="Preparation time">
                        <ClockCircleOutlined style={{marginRight: '8px'}}/>
                        <span>20 min</span>
                    </Tooltip>
                </div>
            </>
        ),
        style: panelStyle,

    },
];

export const CulinaryRecipes = () => {
    const {token} = theme.useToken();
    const [values, setValues] = useState([0, 0, 0]);

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };

    const navigate = useNavigate();
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
                items={getItems(panelStyle, values, setValues)}
            />
        </div>
    );
};

