import React, { useCallback, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    useWindowDimensions,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { colors } from '../scripts/colors';
import LinearGradient from 'react-native-linear-gradient';

function NumericCard(props) {
    const screen = useWindowDimensions();
    return (
        <View style={[
            styles.container,
            { width: 0.5 * screen.width }
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

function ControllerCard({style, ...props}) {
    const [isPressed, setPressed] = useState(false);
    const handlePressIn = useCallback(() => {
        setPressed(true);
    }, [setPressed]);
    const handlePressOut = useCallback(() => {
        setPressed(false);
    }, [setPressed]);
    const handlePress = props.onPress
    const gradColorReverse = props.gradColor.slice().reverse();
    const gradColor = (isPressed ? props.gradColor : gradColorReverse);//
    return (
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            disabled={props.disabled === null ? false : props.disabled}
        >
            <View style={styles.outerBtn}>
                <LinearGradient
                    colors={gradColor}
                    style={styles.btn}
                    useAngle={true}
                    angle={145}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                >
                    <FontAwesome5
                        name={props.icon}
                        size={50}
                        style={[styles.icon, style]}
                        solid={true}
                    />
                    <Text style={[styles.label, style]}>{props.title}</Text>
                </LinearGradient>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        // borderRadius: 10,
        flex: 1,

    },
    headerNumeric: {
        height: 42,
        // backgroundColor: 'red'
    },
    headerText: {
        color: colors.BKLightBlue,
        fontFamily: 'Nunito-Medium',
        fontSize: 28,
        marginLeft: 20
    },
    content: {
        justifyContent: 'center',
        flex: 1
    },
    description: {
        color: colors.BKLightBlue,
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
        // fontFamily: 'Nunito-SemiBold',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 5,
    },
    icon: {
        color: colors.BKLightBlue,
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        borderRadius: 25,
    },
    outerBtn: {
        width: 150,
        borderRadius: 25,
        shadowColor: 'black',
        aspectRatio: 1,
        margin: 20,
        elevation: 10
    },
});

export { NumericCard, ControllerCard }