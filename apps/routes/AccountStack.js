import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Account from '../screens/Account';

const stack = createNativeStackNavigator();

export default function AccountStack() {
    return (
        <stack.Navigator>
            <stack.Screen
                name='Account'
                component={Account}
            />
        </stack.Navigator>
    )
}