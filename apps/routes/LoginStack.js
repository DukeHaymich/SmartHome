import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';

const stack = createNativeStackNavigator();

export default function LoginStack() {
    return (
        <stack.Navigator>
            <stack.Screen
                name='Login'
                component={Login}
            />
        </stack.Navigator>
    )
}