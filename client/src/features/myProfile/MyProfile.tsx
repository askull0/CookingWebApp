import React from 'react';
import './myprofile.css';
import { CommentOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { MyComments } from './MyComments';
import { MyRecipes } from './MyRecipes';
import { MyCredentials } from './MyCredentials';


export const MyProfile = () => {
  const tabsData = [
    { Icon: ProfileOutlined, Content: MyRecipes, Label: 'Recipes' },
    { Icon: CommentOutlined, Content: MyComments, Label: 'Comments'  },
    { Icon: UserOutlined, Content: MyCredentials, Label: 'Profile' },
  ];

  return (
    <div className="main-content">
      <h2 className="myprofile-title-h2">Your account</h2>
      <Tabs className="main-tab"
        defaultActiveKey="2"
        items={tabsData.map((tab, i) => {
          const id = String(i + 1);
          return {
            key: id,
            label: tab.Label,
            children: React.createElement(tab.Content),
            icon: <tab.Icon />,
          };
        })}
      />
    </div>
  );
};