import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DashboardStack from '../routes/DashboardStack';
import Activity from '../screens/Activity';
import Account from '../screens/Account';
import CustomDrawer from '../components/CustomDrawer';
import Header from '../components/Header';

const drawer = createDrawerNavigator();

export default function Drawer() {
    return (
        <drawer.Navigator 
            drawerContent={props => <CustomDrawer {...props}/>}
            screenOptions={{
                drawerLabelStyle: {marginLeft: -25, fontFamily: 'Nunito-Medium', fontSize: 18},
                drawerActiveTintColor: '#fff',
                drawerActiveBackgroundColor: '#016BD9',
                drawerInactiveTintColor: '#333',
                headerShadowVisible: false,
            }}            
        >
            <drawer.Screen
                name='Trang nhà'
                component={DashboardStack}
                options={({ navigation }) => {
                    return {
                        drawerIcon: ({color}) => (<MaterialIcons name = 'home' size={25} color= {color}/>),
                        headerShown: false
                    }
                }}
                />
            <drawer.Screen
                name='Nhật ký hoạt động'
                component={Activity}
                options={ ({ navigation }) => {
                    return {
                        drawerIcon: ({color}) => (<MaterialIcons name = 'history' size={25} color= {color}/>),
                        header: () => <Header
                            navigation={navigation}
                            title='Nhật ký hoạt động'
                        />,
                    }
                }}
                />
            <drawer.Screen
                name='Tài khoản'
                component={Account}
                options={ ({ navigation }) => {
                    return {
                        drawerIcon: ({color}) => (<MaterialIcons name = 'person' size={25} color= {color}/>),
                        header: () => <Header
                                navigation={navigation}
                                title='Tài khoản'
                        />,
                    }
                }}
                />
        </drawer.Navigator>
    )
}