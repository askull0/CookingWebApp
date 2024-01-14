import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Space } from 'antd';
import { PopConfirm } from './PopConfirm';
import { IconBaguette, IconBurger, IconEggs, IconFlame } from '@tabler/icons-react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { showNotification } from '@mantine/notifications';

const showCustomNotification = (color: string, title: string, message: string) => {
  const notification = showNotification({
    color,
    title,
    message,
  });
};

interface Recipe {
  id: number;
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

export const MyRecipes = () => {
  const [recipesTab, setRecipes] = useState<Recipe[]>([]);

  //pobieranie z bazy przepisow uzytkownika
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('/users/recipes', {
      });
      setRecipes(response.data);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to load your recipes')
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const IconText = ({ myIcon, count }: { myIcon:React.FC; count: number }) => (
    <Space>
      {React.createElement(myIcon)}
      {count}
    </Space>
  );

  const Description = ({text, time, rating}:{text: string, time: number, rating: {rate: number, reviews:number}}) => {
    return(
      <div className = "list-recipe-description">
        {text}
        <span>
        <ClockCircleOutlined style={{marginRight: '8px'}}/>
        {time + " min"}
        </span>
        {"Rating: " + rating.rate + " ("+rating.reviews +" reviews)"}
      </div>
    )
  }

  async function handleDelete(id: number) {
    try {
      const response = await axios.delete(`/users/recipes/${id}`)
      if (response.status != 200) {
        showCustomNotification('red','Error','Failed to delete your recipe');
      } else {
        setRecipes(recipesTab.filter(item => item.id !== id));
        showCustomNotification('green','Success','Recipe sucesfully deleted');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <List
      itemLayout="horizontal"
      dataSource={recipesTab}
      renderItem={(item: Recipe) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText myIcon={IconFlame} count={item.calories} key="list-calories" />,
            <IconText myIcon={IconBurger} count={item.fat} key="list-fat" />,
            <IconText myIcon={IconBaguette} count={item.carbs} key="list-carbs" />,
            <IconText myIcon={IconEggs} count={item.protein} key="list-protein" />,
            <PopConfirm onClick={() => handleDelete(item.id)} toDelete={"recipe"}></PopConfirm>
          ]}>
          <List.Item.Meta
            title={item.name}
            description={<Description
              text={item.description}
              time={item.totalTime}
              rating={{rate:item.rating, reviews:item.reviews}}/>}
          />

        </List.Item>
      )}

    />

  );
};