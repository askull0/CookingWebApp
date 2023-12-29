import {useForm} from '@mantine/form';
import {PasswordInput, Group, Button, Box, TextInput} from '@mantine/core';

export const RegisterPage = () => {
    const form = useForm({
        initialValues: {
            password: '',
            confirmPassword: '',
            username: '',
        },

        validate: {
            username: (value) => (value.length < 3 ? 'Username must have at least 3 letters' : null),
            confirmPassword: (value, values) =>
                value !== values.password ? 'Passwords did not match' : null,
        },
    });

    return (
        <div className="content">
            <Box maw={340} mx="auto" className="sign-in">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput
                        label="Username"
                        placeholder="Enter your username"
                        {...form.getInputProps('username')}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Password"
                        {...form.getInputProps('password')}
                    />
                    <PasswordInput
                        mt="sm"
                        label="Confirm password"
                        placeholder="Confirm password"
                        {...form.getInputProps('confirmPassword')}
                    />
                    <Group mt="md" style={{justifyContent: 'center'}}>
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Box>
        </div>
    );
}