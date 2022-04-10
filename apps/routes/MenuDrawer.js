import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";

import Dashboard from '../screens/Dashboard';
import Activity from '../screens/Activity';
import Account from '../screens/Account';
import CustomDrawer from '../components/CustomDrawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const drawer = createDrawerNavigator();

export default function Drawer() {
    return (
        <drawer.Navigator 
            drawerContent={props => <CustomDrawer {...props}/>}
            screenOptions={{
                drawerLabelStyle: {marginLeft: -25, fontFamily: 'Nunito-Medium', fontSize: 18},
                drawerActiveTintColor: '#fff',
                drawerActiveBackgroundColor: '#016BD9',
                drawerInactiveTintColor: '#333'
            }}            
        >
            <drawer.Screen
                name='Trang nhà'
                component={Dashboard}
                options={{
                    drawerIcon: ({color}) => (<MaterialIcons name = 'home' size={25} color= {color}/>)
                }}
                />
            <drawer.Screen
                name='Nhật ký hoạt động'
                component={Activity}
                options={{
                    drawerIcon: ({color}) => (<MaterialIcons name = 'history' size={25} color= {color}/>)
                }}
                />
            <drawer.Screen
                name='Tài khoản'
                component={Account}
                options={{
                    drawerIcon: ({color}) => (<MaterialIcons name = 'person' size={25} color= {color}/>)
                }}
                />
        </drawer.Navigator>
    )
}