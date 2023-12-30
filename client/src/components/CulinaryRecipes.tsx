import type {CSSProperties} from 'react';
import React, {useEffect, useState} from 'react';
import {CaretRightOutlined, ClockCircleOutlined} from '@ant-design/icons';
import type {CollapseProps} from 'antd';
import {Collapse, Rate, theme, Tooltip} from 'antd';
import {ActionIcon} from "@mantine/core";
import {SearchCulinaryRecipes} from "../features/Recipe/SearchCulinaryRecipes";
import {IconBaguette, IconBurger, IconEggs, IconFlame, IconTablePlus} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import {OpinionButton} from "./OpinionButton";
import axios from '../axios.js';


interface Recipe {
    id?: number;
    name: string;
    rating: number;
    description: string;
    reviews: number;
    totalTime: number;
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
}

export const CulinaryRecipes = () => {
    const {token} = theme.useToken();
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [searchFilter, setSearchFilter] = useState<string | null>(null);
    const [sortFilter, setSortFilter] = useState<string | null>(null);
    const [pickFilter, setPickFilter] = useState<string | null>(null);

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/recipes', {
                    params: {
                        search: searchFilter,
                        sort: sortFilter,
                        pick: pickFilter,
                    },
                });
                setRecipes(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [searchFilter, sortFilter, pickFilter]);

    const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => {
        return recipes.map((recipe, index) => ({
            key: `${index}`,
            label: (<b>{recipe.name}</b>),
            children: (
                <>
                    {recipe.description}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '10px',
                            marginBottom: '12px',
                        }}>
                        <span style={{margin: '0 14px'}}>
                        <IconFlame style={{marginRight: '5px', color: 'darkgreen'}} size="1rem"
                                   stroke={2}/>{recipe.calories} cal
                    </span>
                        <span style={{margin: '0 14px'}}>
                        <IconBurger style={{marginRight: '5px', color: 'darkgreen'}} size="1rem"
                                    stroke={2}/>{recipe.fat} g fat
                    </span>
                        <span style={{margin: '0 14px'}}>
                        <IconBaguette style={{marginRight: '5px', color: 'darkgreen'}} size="1rem"
                                      stroke={2}/>{recipe.carbs} g carbs
                    </span>
                        <span style={{margin: '0 14px'}}>
                        <IconEggs style={{marginRight: '5px', color: 'darkgreen'}} size="1rem"
                                  stroke={2}/>{recipe.protein} g protein
                    </span>

                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',}}>
                            <Rate disabled defaultValue={recipe.rating} style={{marginRight: '6px'}}/>
                            ({recipe.reviews})
                        </div>
                        <Tooltip title="Preparation time">
                            <ClockCircleOutlined style={{marginRight: '8px'}}/>
                            <span>{recipe.totalTime} min</span>
                        </Tooltip>
                        <OpinionButton data={{index, id: recipe.id}}/>
                    </div>
                </>
            ),
            style: panelStyle,
        }));
    };

    return (
        <div className="content">
            <div className="search">
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <SearchCulinaryRecipes setSearchFilter={setSearchFilter} setSortFilter={setSortFilter}
                                           setPickFilter={setPickFilter}/>
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