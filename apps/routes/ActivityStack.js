import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Activity from '../screens/Activity';

const stack = createNativeStackNavigator();

export default function ActivityStack() {
    return (
        <stack.Navigator>
            <stack.Screen
                name='Activity'
                component={Activity}
            />
        </stack.Navigator>
    )
}