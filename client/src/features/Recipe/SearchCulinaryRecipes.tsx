import {Input} from "antd";
import {SearchProps} from "antd/lib/input";
import {Space} from "antd/lib";


const {Search} = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

export const SearchCulinaryRecipes = () => {
    return (
        <div className="search">
            <Space direction="vertical">
                <Search placeholder="search culinary recipes" onSearch={onSearch} className="search-input"/>
            </Space>
        </div>
    );
};