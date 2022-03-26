import React from "react";
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default function Header(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {props.title}
            </Text>
        </View>
    )
}

Header.defaultProps = {
    title: "Trang nhà",
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: '#1e93ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 25,
        fontWeight: '600'
    }
});