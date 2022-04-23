import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { colors } from '../scripts/colors';


function NumericCard(props) {
    const screen = props.screen;
    return (
        <View style={[
            styles.container,
            { width: 0.5*screen.width }
        ]}>
            <View style={styles.headerNumeric}>
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
        <TouchableOpacity
            activeOpacity={0.75}
            style={[
                styles.container,
                styles.btn
            ]
        }>
            {/* Icon goes here */}
            <FontAwesome5
                name={props.icon}
                size={64}
                style={styles.icon}
            />
            <Text style={styles.label}>{props.title}</Text>
        </TouchableOpacity>
    )
} 

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        flex: 1,
    },
    headerNumeric: {
        height: 42,
        justifyContent: 'center',
        // backgroundColor: 'red'
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
    label: {
        fontFamily: 'Roboto',
        // position: 'absolute',
    },
    icon: {
        color: colors.BKDarkBlue,
    },
    btn: {
        backgroundColor: '#1488DB',
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 15, 
        margin: 10
    }
});

export { NumericCard, ControllerCard }