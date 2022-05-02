import React, { useContext, useReducer } from 'react';
import {
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
            activeOpacity={0.5}
            style={styles.button}
            onPress={props.onPress}
        >
            <View
                style={[
                    styles.iconContainer,
                    { backgroundColor: props.backgroundColor }
                ]}
            >
                <FontAwesome5
                    name={props.icon}
                    size={32}
                    color={props.color}
                    solid
                />
            </View>
            <Text style={styles.buttonText}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

export default function Account() {
    const { logout, theme } = useContext(AuthContext);
    const screen = useWindowDimensions();
    const avatar = require('../assets/images/Avatar.jpg')

    const switchMode = () => {

    }

    const [ dataController, setDataController ] = useReducer((state, action) => {
        switch (action.type) {
            case 'DARK-MODE': {
                theme.toggleDarkMode();
            }
            default: {
                return state;
            }
        }
    },
    [
        {
            icon: 'moon',
            color: colors.white,
            backgroundColor: colors.black,
            title: 'Chế độ ban đêm',
            onPress: () => {},
        },
        {
            icon: 'bell',
            color: colors.white,
            backgroundColor: colors.yellow,
            title: 'Thông báo',
            onPress: () => {},
        },
        {
            icon: 'question-circle',
            color: colors.white,
            backgroundColor: colors.blue,
            title: 'Hướng dẫn',
            onPress: () => {},
        },
        {
            icon: 'sign-out-alt',
            color: colors.white,
            backgroundColor: colors.red,
            title: 'Đăng xuất',
            onPress: logout,
        },
    ]);

    return (
        <View style={styles.screen}>
            <View style={styles.avatarContainer}>
                <Image
                    style={[
                        styles.avatar,
                        { width: 0.375*screen.width, height: 0.375*screen.width, }
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
                    ItemSeparatorComponent={()=>(
                        <View style={{ height: '11%' }}></View>
                    )}
                    contentContainerStyle={styles.controlList}
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
        fontWeight: 'bold',
        fontSize: 32,
        color: colors.BKDarkBlue,
    },
    controlContainer: {
        flex: 3,
        backgroundColor: colors.cloudBlue,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    controlList: {
        height: '100%',
        paddingVertical: 50,
        paddingHorizontal: 50,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    buttonText: {
        fontWeight: '600',
        fontSize: 26,
        color: colors.blue,
        marginLeft: 24,
    },
})