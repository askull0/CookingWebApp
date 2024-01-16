import {useForm} from '@mantine/form';
import {PasswordInput, Group, Button, Box, TextInput} from '@mantine/core';
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import axios from "axios";
import {login} from "../login/api/login";
import {message} from "antd";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: {
            password: (value) => (value.length < 8 ? 'Password must have at least 8 characters' : null),
            confirmPassword: (value, values) =>
                value !== values.password ? 'Passwords did not match' : null,
            firstName: (value) => (value.length === 0 ? 'First name is required' : null),
            lastName: (value) => (value.length === 0 ? 'Last name is required' : null),
            email: (value) =>
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : null,
        },
    });

    const handleSubmit = async () => {
        try {
            const {firstName, lastName, email, password} = form.values;
            const response = await axios.post('/users', {firstName, lastName, email, password});
            await login(email, password);
            message.success('You have been successfully registered.')
            navigate('/');

        } catch (error) {
            console.error('Registration error:', error);
            message.error('User with this email already exist');
        }
    };
    return (
        <div className="content">
            <h2>Create an account</h2>
            <Box maw={340} mx="auto" className="sign-in">
                <form onSubmit={form.onSubmit(() => handleSubmit())}>
                    <TextInput
                        label="First Name"
                        placeholder="Enter your first name"
                        {...form.getInputProps('firstName')}
                        style={{marginBottom: '16px'}}
                    />

                    <TextInput
                        label="Last Name"
                        placeholder="Enter your last name"
                        {...form.getInputProps('lastName')}
                        style={{marginBottom: '16px'}}
                    />

                    <TextInput
                        label="Email"
                        placeholder="Enter your email"
                        {...form.getInputProps('email')}
                        style={{marginBottom: '16px'}}
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Password"
                        {...form.getInputProps('password')}
                        style={{marginBottom: '16px'}}
                    />

                    <PasswordInput
                        mt="sm"
                        label="Confirm password"
                        placeholder="Confirm password"
                        {...form.getInputProps('confirmPassword')}
                        style={{marginBottom: '24px'}}

                    />

                    <Group mt="md" style={{justifyContent: 'center'}}>
                        <Button type="submit" style={{backgroundColor: 'green'}}>Submit</Button>
                    </Group>
                </form>
                <p style={{textAlign: 'center', marginTop: '16px'}}>
                    Already have an account? <Link to="/SignIn">Log in!</Link>
                </p>
            </Box>
        </div>
    );
};
