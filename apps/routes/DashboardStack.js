import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Dashboard from '../screens/Dashboard';
import FraudDetector from '../screens/FraudDetector';
import LockDoor from '../screens/FraudDetector';

const stack = createNativeStackNavigator();

export default function DashboardStack() {
    return (
        <stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#1e93ff'},
            headerShown: false
        }}>
            <stack.Screen
                name='Dashboard'
                component={Dashboard}
            />
            <stack.Screen
                name='Chống trộm'
                component={FraudDetector}
            />
            <stack.Screen
                name='Khóa cửa'
                component={LockDoor}
            />
        </stack.Navigator>
    )
    
}