import React, { useContext } from 'react';
import {
    Button,
    StyleSheet,
    View
} from 'react-native';

import { AuthContext } from '../scripts/AuthProvider';

export default function Activity(props) {
    const { logout } = useContext(AuthContext);
    return (
        <View>
            <Button
                title='Đăng xuất'
                onPress={logout}
            />
        </View>
    )
}