import {showNotification} from '@mantine/notifications';


export const registerErrorNotification = () => {
    showNotification({
        color: 'red',
        title: 'Error',
        message: "User with this email already exist",
    })
}