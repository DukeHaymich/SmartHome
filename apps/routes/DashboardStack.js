import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../screens/Dashboard';

const stack = createNativeStackNavigator();

export default function DashboardStack() {
    <stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: '#1e93ff'}
    }}>
        <stack.Screen
            name='Dashboard'
            component={Dashboard}
        />
    </stack.Navigator>
}