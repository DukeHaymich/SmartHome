import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useState } from 'react';

import Dashboard from '../screens/Dashboard';
import FraudDetector from '../screens/FraudDetector';
import LockDoor from '../screens/LockDoor';
import Header from '../components/Header';
const stack = createNativeStackNavigator();

export default function DashboardStack() {
    return (
        <stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#1e93ff' },
        }}>
            <stack.Screen
                name='Dashboard'
                component={Dashboard}
                options={({ navigation }) => {
                    return {
                        header: () => <Header
                            navigation={navigation}
                            title='Trang nhà'
                        />
                    }
                }}
            />
            <stack.Screen
                name='Chống trộm'
                component={FraudDetector}
                options={({ navigation }) => {
                    return {
                        header: () => <Header
                            navigation={navigation}
                            title='Cài đặt chống trộm'
                            isHome={false}
                        />
                    }
                }}
            />
            <stack.Screen
                name='Khóa cửa'
                component={LockDoor}
                options={({ navigation }) => {
                    return {
                        header: () => <Header
                            navigation={navigation}
                            title='Cài đặt khóa cửa'
                            isHome={false}
                        />
                    }
                }}
            />
        </stack.Navigator>
        // </ControllerContext.Provider>
    )

}