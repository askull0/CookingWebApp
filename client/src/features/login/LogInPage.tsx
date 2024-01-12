import React from 'react';
import {Button, Form, Input} from 'antd';
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "@mantine/form";
import {login} from "./api/login";
import {loginErrorNotification} from "./notifications";

type FieldType = {
    //  firstname: string;
    login: string;
    password: string;
};

export const LogInPage = () => {
    const navigate = useNavigate();
    const form = useForm<FieldType>({
        initialValues: {
            //firstname: "",
            login: "",
            password: ""
        }
    })
    const handleSubmit = async (data: FieldType) => {
        try {
            await login(/*data.firstname,*/ data.login, data.password);
            navigate('/recipe');
        } catch (error) {
            loginErrorNotification();
        }
    }
    return (
        <div className="content">
            <h2>Sign in</h2>
            <Form
                className="sign-in"
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 500, margin: 'auto'}}
                onFinish={(values) => handleSubmit(values)}
                autoComplete="off"
            >
                {/*  <Form.Item<FieldType>
                    label="First Name"
                    name="firstname"
                    rules={[{required: true, message: 'Please input your first name!'}]}
                >
                    <Input placeholder="Enter your first name"/>
                </Form.Item>*/}

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
                    wrapperCol={{offset: 8, span: 16}}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

                <Form.Item
                    className="sign-in"
                    wrapperCol={{offset: 8, span: 16}}
                >
                    Don't have an account? <Link to="/register">Register now</Link>
                </Form.Item>
            </Form>
        </div>
    );
};
