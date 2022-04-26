import React, {useCallback, useState} from 'react';
import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { color } from 'react-native-reanimated';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { colors } from '../scripts/colors';
import LinearGradient from 'react-native-linear-gradient';

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
    const navigation = props.navigation;
    const [ isPressed, setPressed] = useState(false);
    const handlePressIn = useCallback(() => {
        setPressed(true);
    }, [setPressed]);
    const handlePressOut = useCallback(() => {
        setPressed(false);
    }, [setPressed]);
    const handlePress = () => {
        navigation.navigate(props.title);
    }
    const gradColor = isPressed ? ['#f6ebe6', '#aee1f9'] : ['#aee1f9','#f6ebe6']
    return (
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            // onPress={handlePress}
        >
            <View style = {styles.outerBtn}>
                <LinearGradient 
                    colors={gradColor} 
                    style={styles.btn}
                    useAngle = {true}
                    angle = {145}
                    angleCenter = {{x : 0.5, y: 0.5 }}
                >
                    <FontAwesome5
                        name={props.icon}
                        size={50}
                        style={styles.icon}
                    />
                    <Text style={styles.label}>{props.title}</Text>
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
        fontFamily: 'Nunito-Medium',
        fontSize: 20,
        // fontWeight: '600'
        marginTop: 5
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
        shadowColor: '#6682b0',
        aspectRatio: 1,
        margin: 20,
        elevation: 15
    },
});

export { NumericCard, ControllerCard }