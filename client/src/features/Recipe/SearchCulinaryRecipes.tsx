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
  const scrollDown = () => {
    window.scrollTo({
      top: window.scrollY + 700,
      behavior: 'smooth'
    });
  }

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        setSearchFilter(value);
        scrollDown();
    };

    return (
        <div>
            <div className="search-for-recipes">
                <Space direction="vertical">
                    <Search placeholder="search for culinary recipes" onSearch={onSearch} className="search-input"/>
                </Space>
              <Filters setSortFilter={setSortFilter} setPickFilter={setPickFilter}/>
            </div>

        </div>
    );
};
