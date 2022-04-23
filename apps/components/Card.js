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
            { width: 0.5*screen.width }
        ]}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{props.title}</Text>
            </View>
            <View style={[styles.content, styles.numeric]}>
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
            <View style={[styles.content, styles.controller]}>
                <Text style={styles.data}>{props.data}</Text>
                <Text style={styles.unit}>{props.unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        flex: 1,
        backgroundColor: 'red'
    },
    header: {
        height: 42,
        justifyContent: 'center',
    },
    headerText: {
        color: colors.BKLightBlue,
        fontFamily: 'Roboto',
        fontSize: 28,
        fontWeight: '500',
        marginLeft: 20
    },
    content: {
        justifyContent: 'center',
        flex: 1
    },
    description: {
        color: colors.lightBlue,
        fontFamily: 'Digital-7-Mono',
        textAlignVertical: 'bottom',
    },
    unit: {
        flex: 1,
        textAlign: 'left',
        marginLeft: 15,
        marginBottom: 4,
        fontSize: 64,
    },
    data: {
        flex: 2,
        textAlign: 'right',
        fontSize: 96,
    },
    numeric: {
        // height: '75%',
        // width: undefined,
        flexDirection: 'row',
    },
    controller: {
        // height: '75%',
        // width: undefined,
        // flexDirection: 'row',
    },
});

export { NumericCard, ControllerCard }