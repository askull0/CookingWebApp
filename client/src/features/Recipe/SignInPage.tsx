import React from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import {Link} from "react-router-dom";

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

export const SignInPage = () => {
    return (
        <div className="content">
            <Form className="sign-in"
                  name="basic"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  style={{maxWidth: 500, margin: 'auto'}}
                  initialValues={{remember: true}}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input placeholder="Enter your username"/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password placeholder="Enter your password"/>
                </Form.Item>

                <Form.Item<FieldType>
                    className="sign-in"
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{offset: 8, span: 16}}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    className="sign-in"
                    wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
                <Form.Item
                    className="sign-in"
                    wrapperCol={{offset: 8, span: 16}}>
                    Don't have an account? <Link to="/register">Register now</Link>
                </Form.Item>
            </Form>

        </div>
    );
};
