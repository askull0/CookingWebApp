import {Input} from "antd";
import {SearchProps} from "antd/lib/input";
import {Space} from "antd/lib";
import {Filters} from "./Filters";
import React, {useState} from "react";


const {Search} = Input;

interface SearchCulinaryRecipesProps {
    setSearchFilter: React.Dispatch<React.SetStateAction<string | null>>;
    setSortFilter: React.Dispatch<React.SetStateAction<string | null>>;
    setPickFilter: React.Dispatch<React.SetStateAction<string | null>>;
}

export const SearchCulinaryRecipes: React.FC<SearchCulinaryRecipesProps> = ({
                                                                                setSearchFilter,
                                                                                setSortFilter,
                                                                                setPickFilter
                                                                            }) => {
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        setSearchFilter(value);
    };

    return (
        <div>
            <div className="search">
                <Space direction="vertical">
                    <Search placeholder="search culinary recipes" onSearch={onSearch} className="search-input"/>
                </Space>
            </div>
            <Filters setSortFilter={setSortFilter} setPickFilter={setPickFilter}/>
        </div>
    );
};
