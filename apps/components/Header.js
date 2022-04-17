import React from "react";
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function Header({ navigation, title}) {
    
    const openDrawer = () => {
        navigation.openDrawer()
    }

    return (
        <View style={styles.container}>
            <MaterialIcons
                name='menu'
                size={35}
                style={styles.leftButton}
                onPress={openDrawer}
            />
            <Text style={styles.text}>
                {title}
            </Text>
            {/* Right button */}
        </View>
    )
}

Header.defaultProps = {
    title: "Trang nhà",
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 55,
        backgroundColor: '#1e93ff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 25,
        fontWeight: '600',
        letterSpacing: 1
    },
    leftButton: {
        position: 'absolute',
        left: 16,
        color: 'white',
    },
    rightButton: {

    }
});