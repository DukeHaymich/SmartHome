import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";

import Dashboard from '../screens/Dashboard';
import Activity from '../screens/Activity';
import Account from '../screens/Account';


const drawer = createDrawerNavigator();

export default function Drawer() {
    return (
        <drawer.Navigator>
            <drawer.Screen
                name='Dashboard'
                component={Dashboard}
                />
            <drawer.Screen
                name='Activity'
                component={Activity}
                />
            <drawer.Screen
                name='Account'
                component={Account}
                />
        </drawer.Navigator>
    )
}