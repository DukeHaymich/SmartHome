import React, { useMemo, useState } from 'react';
import { setCustomText } from 'react-native-global-props';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';

import LoginStack from './apps/routes/LoginStack';
import Drawer from './apps/routes/MenuDrawer';
import { AuthContext } from './apps/scripts/context';


LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

export default function App() {
    setCustomText({style: {
        fontSize: 16,
        fontFamily: 'Roboto',
        color: '#000',
    }});

    const [ isKeepLoggedIn, setIsKeepLoggedIn ] = useState(false);

    //*** Contexts ***//
    const authContext = useMemo(() => {
        return {
            login: () => {
                setIsKeepLoggedIn(true);
            },
            logout: () => {
                setIsKeepLoggedIn(false);
            }
        }
    }, [])

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                { isKeepLoggedIn
                ? <Drawer/>
                : <LoginStack/>
                }
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
