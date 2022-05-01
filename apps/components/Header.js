import React from "react";
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { colors } from "../scripts/colors";


export default function Header({navigation, title, isHome}) {
    return (
        <View style={styles.container}>
            {
                isHome?
                <MaterialIcons
                    name='menu'
                    size={35}
                    style={styles.leftButton}
                    onPress={() => navigation.openDrawer()}
                />
                :
                <MaterialIcons
                    name='arrow-back-ios'
                    size={35}
                    style={styles.leftButton}
                    onPress={() => navigation.goBack()}
                />

            }
            <Text style={styles.text}>
                {title}
            </Text>
            {/* Right button */}
        </View>
    )
}

Header.defaultProps = {
    title: "Trang nhà",
    isHome: true
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 55,
        backgroundColor: colors.background,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: colors.primary,
        fontSize: 25,
        fontWeight: '700',
        letterSpacing: 1
    },
    leftButton: {
        position: 'absolute',
        left: 16,
        color: colors.primary,
    },
    rightButton: {
        position: 'absolute',
        right: 16,
        color: colors.primary,
    }
});