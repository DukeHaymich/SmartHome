import React, { useEffect, useState } from 'react';
import { setCustomText } from 'react-native-global-props';
import { LogBox } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';

import Routes from './apps/routes/Routes';
import Splash from './apps/screens/Splash';
import AuthProvider from './apps/scripts/AuthProvider';
import DatabaseProvider from './apps/scripts/DatabaseProvider'
import { colors } from './apps/scripts/colors';


LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreLogs([
    "Warning: Can't perform a React state update on an unmounted component",
]);
LogBox.ignoreLogs([
    "AMQJS0011E Invalid state ",
]);


export default function App() {
    setCustomText({
        style: {
            fontSize: 16,
            fontFamily: 'Roboto',
            color: '#000',
        }
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    if (isLoading) {
        return (
            <Splash />
        )
    }

    return (
        <AuthProvider>
            <DatabaseProvider>
                <Routes />
                <Toast
                    config={toastConfig}
                />
            </DatabaseProvider>
        </AuthProvider>
    );
}

const toastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: colors.neonGreen }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontFamily: 'Roboto',
                fontSize: 20,
                fontWeight: '700'
            }}
            text2Style={{
                fontFamily: 'Roboto',
                fontSize: 16,
                fontWeight: '500',
                color: colors.darkGray,
            }}
        />
    )
}
