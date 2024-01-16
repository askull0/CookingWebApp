import React from 'react';
import {Button, Form, Input, message, notification} from 'antd';
import {Link, useNavigate} from "react-router-dom";
import {login} from "./api/login";

type FieldType = {
    login: string;
    password: string;
};

export const LogInPage = () => {
    const navigate = useNavigate();
    const openLoginNotification = () => {
        notification.success({
            message: 'Login successful',
            description: '',
        });
    };
    const handleSubmit = async (data: FieldType) => {
        try {
            await login(data.login, data.password);
            openLoginNotification();
            navigate('/recipe');
        } catch (error) {
            message.error('Login failed');
        }
    }
    return (
        <div className="content" style={{height: '75vh'}}>
            <h2>Sign in</h2>
            <Form
                className="sign-in"
                name="basic"
                style={{maxWidth: 450, margin: 'auto'}}
                onFinish={(values) => handleSubmit(values)}
                autoComplete="off"
            >

                <Form.Item<FieldType>
                    label="Email"
                    name="login"
                    rules={[{required: true, message: 'Please input your email!'}]}
                >
                    <Input placeholder="Enter your email"/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password placeholder="Enter your password"/>
                </Form.Item>

                <Form.Item
                    className="sign-in"
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

                <Form.Item
                    className="sign-in"
                >
                    Don't have an account? <Link to="/register">Register now</Link>
                </Form.Item>
            </Form>
        </div>
    );
};
