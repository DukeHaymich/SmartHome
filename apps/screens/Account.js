import React, { useContext } from 'react';
import {
    Button,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { AuthContext } from '../scripts/AuthProvider';
import { colors } from '../scripts/colors';


function Controller(props) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress}
        >
            <FontAwesome5
                name={props.icon}
                size={28}
                color={props.color}
            />
            <Text style={styles.buttonText}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

export default function Activity() {
    const { logout } = useContext(AuthContext);
    const screen = useWindowDimensions();
    const avatar = require('../assets/images/Avatar.jpg')

    const dataController = [
        {
            icon: 'bell',
            color: 'red',
            title: 'Chế độ ban đêm',
            onPress: () => {},
        },
        {
            icon: 'bell',
            color: 'red',
            title: 'Thông báo',
            onPress: () => {},
        },
        {
            icon: 'sign-out-alt',
            color: 'red',
            title: 'Đăng xuất',
            onPress: logout,
        },
    ]

    return (
        <View style={styles.screen}>
            <View style={styles.avatarContainer}>
                <Image
                    style={[
                        styles.avatar,
                        { width: 0.35*screen.width, height: 0.35*screen.width, }
                    ]}
                    source={avatar}
                />
                <Text style={styles.name}>
                    Sơn Đại Gia
                </Text>
            </View>
            <View style={styles.controlContainer}>
                <FlatList
                    data={dataController}
                    renderItem={({item}) => <Controller {...item}/>}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.background,
        flex: 1,
    },
    avatarContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        borderRadius: 100,
    },
    name: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: 'bold',
        fontSize: 28,
        color: colors.BKDarkBlue,
    },
    controlContainer: {
        flex: 3,
        paddingHorizontal: '5%',
    },
    button: {
        flex: 1,
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 28,
        color: colors.BKDarkBlue,
    },
})