import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MqttService from '../core/services/MqttService';
import { colors } from '../scripts/colors'
import { ControllerCard } from '../components/Card';

export default function FraudDetector() {


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.status}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name='home-lock' // home-lock-open
                        size={144}
                        style={styles.icon}
                    />
                </View>
                <Text style={styles.statusText}>
                    Đang đóng
                </Text>
            </View>
            <View style={styles.controlContainer}>
                <ControllerCard
                    gradColor={['#f6ebe6', '#aee1f9']}
                    onPress={() => { }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BKDarkBlue,
    },
    status: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '55%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 10000,
        borderColor: colors.neon,
        borderWidth: 15,
        backgroundColor: colors.BKDarkBlue,
        shadowColor: colors.neon,
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
        marginBottom: 20
    },
    icon: {
        paddingBottom: 5,
        color: colors.neon,
    },
    statusText: {
        color: colors.neon,
        fontSize: 36,
        fontWeight: '700',
    },
    controlContainer: {
        flex: 2,
        // backgroundColor: 'red',
    },
})