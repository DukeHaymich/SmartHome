import React, { useContext, useEffect, useState } from 'react';
import { setCustomText } from 'react-native-global-props';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';

import LoginStack from './apps/routes/LoginStack';
import Drawer from './apps/routes/MenuDrawer';
import Splash from './apps/screens/Splash';
import AuthContextProvider, { AuthContext } from './apps/scripts/context';


LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

function Main(props) {
    const { auth } = useContext(AuthContext);

    return (
        <NavigationContainer>
            { auth.userToken == null
            ? <LoginStack/>
            : <Drawer/>
            }
        </NavigationContainer>
    )
}


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
        <AuthContextProvider>
            <Main/>
        </AuthContextProvider>
    );
}
