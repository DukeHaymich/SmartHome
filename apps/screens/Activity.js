import React, { useContext } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { colors } from '../scripts/colors';


function LogOption(props) {
    return (
        <TouchableOpacity
            style={styles.optionContainer}
            onPress={props.onPress}
            activeOpacity={0.5}
        >
            <MaterialCommunityIcons
                name={props.icon}
                size={42}
                color={colors.BKDarkBlue}
                style={styles.icon}
            />
            <View style={styles.optionText}>
                <Text style={styles.optionHeading}>
                    {props.heading}
                </Text>
                <Text style={styles.optionInfo}>
                    {props.info}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default function Activity() {
    const options = {
        login: {
            onPress: () => {},
            icon: 'key',
            heading: 'Hoạt động đăng nhập',
            info: 'Xem lại lịch sử đăng nhập tài khoản ở các thiết bị của bạn.',
        },
        device: {
            onPress: () => {},
            icon: 'cellphone-information',
            heading: 'Hoạt động của thiết bị',
            info: 'Xem lịch sử hoạt động của các thiết bị IOT.',
        },
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.infoContainer}>
                <Text
                    style={styles.heading}
                >
                    Chào mừng đến với Nhật ký hoạt động
                </Text>
                <Text style={styles.info}>
                    Nhật ký hoạt động là nơi để bạn xem lịch sử đăng nhập của tài khoản và xem lại hoạt động của các thiết bị IOT.
                </Text>
            </View>
            <View style={styles.controlContainer}>
                <FlatList
                    data={Object.values(options)}
                    renderItem={({ item }) => <LogOption {...item}/>}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: colors.background,
    },
    infoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingBottom: 20,
    },
    heading: {
        fontSize: 20.2,
        fontWeight: '700',
        color: colors.BKDarkBlue,
    },
    info: {
        textAlign: 'justify',
        marginHorizontal: 21,
        fontSize: 16,

    },
    controlContainer: {
        flex: 5,
    },
    optionContainer: {
        flexDirection: 'row',
        marginHorizontal: 12,
        paddingVertical: 15,
    },
    icon: {
        paddingTop: 5,
    },
    optionText: {
        marginLeft: 12,
        marginRight: 27,
        justifyContent: 'space-between',
    },
    optionHeading: {
        fontWeight: '700',
        fontSize: 19,
        color: colors.BKDarkBlue,
    },
    optionInfo: {
        color: colors.black,
    },
})