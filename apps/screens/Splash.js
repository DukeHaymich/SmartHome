import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    SafeAreaView
} from 'react-native';


export default function Activity(props) {
    return (
        <SafeAreaView style={styles.screen}>
            <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>
                SMART HOME
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: '33%',
        height: undefined,
        aspectRatio: 1,
        alignSelf: 'center',
    },
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        fontFamily: 'Roboto',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50,
    },
    title: {
        fontSize: 45,
        color: '#003CD7',
        fontFamily: 'PaytoneOne-Regular',
        alignSelf: 'center'
    }
});