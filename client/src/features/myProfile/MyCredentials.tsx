import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Card, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';


interface Credentials{
  firstName: string,
  lastName: string,
  email: string,
}

export const MyCredentials = () => {
  const [myCred, setCred] = useState<Credentials>();

  const fetchCred = async () => {
    try {
      const response = await axios.get('/users/me', {
      });
      setCred(response.data)
    } catch (error) {
      console.log(error);
      throw new Error('Failed to load your credentials')
    }
  };

  useEffect(() => {
    fetchCred();
  }, []);


  return (
    <div>
      <Space direction="vertical" size={16}>
        <Card className="card-credentials" title="About me" extra={<Avatar icon={<UserOutlined/>} />} style={{ width: 300 }}>
          <p> <b>Email</b>: {myCred?.email}</p>
          <p> <b>Name</b>: {myCred?.firstName}</p>
          <p> <b>Surname</b>: {myCred?.lastName}</p>
        </Card>
      </Space>
    </div>
    );
};