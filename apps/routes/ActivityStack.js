import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Activity from '../screens/Activity';
import DeviceLog from '../screens/DeviceLog';
import LoginLog from '../screens/LoginLog';
import Header from '../components/Header';

const stack = createNativeStackNavigator();

export default function ActivityStack() {
    return (
        <stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#1e93ff'},
        }}>
            <stack.Screen
                name='Activity'
                component={Activity}
                options={({navigation}) => {
                    return{
                        header: () => <Header
                            navigation={navigation}
                            title='Nhật ký hoạt động'
                        />
                    }
                }}
            />
            <stack.Screen
                name='Nhật ký thiết bị'
                component={DeviceLog}
                options={({navigation}) => {
                    return{
                        header: () => <Header
                            navigation={navigation}
                            title='Nhật ký thiết bị'
                            isHome={false}
                        />
                    }
                }}
            />
            <stack.Screen
                name='Nhật ký đăng nhập'
                component={LoginLog}
                options={({navigation}) => {
                    return{
                        header: () => <Header
                            navigation={navigation}
                            title='Nhật ký đăng nhập'
                            isHome={false}
                        />
                    }
                }}
            />
        </stack.Navigator>
    )
}