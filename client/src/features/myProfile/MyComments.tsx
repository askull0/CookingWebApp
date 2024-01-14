import React, { useEffect, useState } from 'react';
import './myprofile.css';
import { MessageOutlined } from '@ant-design/icons';
import { Avatar, List } from 'antd';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';
import { PopConfirm } from './PopConfirm';


interface Comment {
  author: {
    firstName: string,
    lastName: string
    id: number,
  },
  recipes:{
    name: string,
    id: number,
  }
  id:number,
  text: string,
  publishedDate: Date
}

export const MyComments = () => {
  const [commentsTab, setComments] = useState<Comment[]>([]);

  //pobieranie z bazy komentarzy
  const fetchComments = async () => {
    try {
      const response = await axios.get('/comments/user', {
      });
      setComments(response.data);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to load your comments')
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);


  async function handleDelete(id: number) {
    try {
      const response = await axios.delete(`/comments/${id}`)
      if(response.status != 200){
        showNotification({
        color: 'red',
        title: 'Error',
        message: 'Failed to delete your comment',
      })}
      else{
        setComments(commentsTab.filter(item => item.id !== id));
        showNotification({
        color: 'green',
        title: 'Success',
        message: 'Comment sucesfully deleted',
      })
      }
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <List
      itemLayout="horizontal"
      dataSource={commentsTab}
      renderItem={(item: Comment) => (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar icon={<MessageOutlined />} />}
            title={item.recipes.name  + "\t(" + new Date(item.publishedDate).toLocaleString() + ")"}
            description={item.text}
          />
          <PopConfirm onClick={() => handleDelete(item.id)} toDelete={"comment"}/>
        </List.Item>
      )}

    />

  );
};