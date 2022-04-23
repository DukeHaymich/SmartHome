import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { colors } from "../scripts/colors";


function NumericCard(props) {
    const screen = props.screen;
    return (
        <View style={[
            styles.container,
            { width: 0.5*screen.width, height: '100%' }
        ]}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{props.title}</Text>
            </View>
            <View style={styles.content}>
                <Text style={[styles.description, styles.data]}>{props.data}</Text>
                <Text style={[styles.description, styles.unit]}>{props.unit}</Text>
            </View>
        </View>
    )
}

function ControllerCard(props) {
    const screen = props.screen;
    return (
        <View style={[
            styles.container,
            { width: screen.width, height: 0.25*screen.height }
        ]}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{props.title}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.data}>{props.data}</Text>
                <Text style={styles.unit}>{props.unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#E3F0FF',
        // borderColor: colors.primary,
        // borderWidth: 3,
        alignSelf: 'center',
        borderRadius: 10,
    },
    header: {
        height: 42,
        // backgroundColor: '#1E93FF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
    },
    headerText: {
        color: colors.BKLightBlue,
        fontFamily: 'Roboto',
        fontSize: 28,
        fontWeight: '500',
        marginLeft: 20,
    },
    content: {
        height: '75%',
        width: undefined,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'black',
    },
    description: {
        height: '100%',
        width: undefined,
        color: '#fff',
        fontFamily: 'Digital-7-Mono',
        fontSize: 64,
        textAlignVertical: 'bottom',
    },
    unit: {
        textAlign: 'left',
        marginLeft: 15,
        flex: 1
    },
    data: {
        flex: 2,
        textAlign: 'right',
    },

});

export { NumericCard, ControllerCard }