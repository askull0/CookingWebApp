import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Routing} from "./features/Routing";
import './App.css';
import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {AuthProvider} from "./context/AuthProvider";

const theme = createTheme({
    /** Put your mantine theme override here */
});

function App() {
    return (
        <AuthProvider>
            <MantineProvider theme={theme}>
                <Notifications/>
                <BrowserRouter>
                    <Routing/>
                </BrowserRouter>
            </MantineProvider>
        </AuthProvider>
    );
}

export default App;


