import React, { useEffect, useState } from 'react';
import { setCustomText } from 'react-native-global-props';
import { LogBox } from 'react-native';

import Routes from './apps/routes/Routes';
import Splash from './apps/screens/Splash';
import AuthProvider from './apps/scripts/AuthProvider';


LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);


export default function App() {
    setCustomText({style: {
        fontSize: 16,
        fontFamily: 'Roboto',
        color: '#000',
    }});

    const [ isLoading, setIsLoading ] = useState(true);
    
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    if (isLoading) {
        return (
            <Splash/>
        )
    }

    return (
        <AuthProvider>
            <Routes/>
        </AuthProvider>
    );
}
