import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NativeHeadlessJsTaskSupport from 'react-native/Libraries/ReactNative/NativeHeadlessJsTaskSupport';
import { ControllerCard } from '../components/Card';

import MqttService from '../core/services/MqttService';
import { colors } from '../scripts/colors'




export default function LockDoor() {
    const [status, setStatus] = useState({
        title: 'Đang tải...',
        isOn: null,
    });
    const [tryTime,setTryTime] = useState(0);

    const onDoorLockTopic = message => {
        if (message == 1) {
            setStatus({
                title: 'Đang khóa',
                isOn: 1,
            })
        }
        else {
            setStatus({
                title: 'Đang mở',
                isOn: 0,
            })
        }
    };

    useEffect(() => {
        try {
            if (MqttService && MqttService.isConnected) {
                MqttService.subscribe('duke_and_co/feeds/action-bctrllockstate', onDoorLockTopic);
                MqttService.publishMessage('duke_and_co/feeds/action-bctrllockstate/get', 'duke_n_co');
            }
            else throw new Error("Not connected");
        } catch (error) {
            setTimeout(()=> {
               setTryTime((prev)=>Math.min(prev+1,5))
            }, 5000);
            if (tryTime == 5) {
                setStatus({
                    ...status,
                    title: 'Không có kết nối!',
                });
            }
            console.log(tryTime);
        }
    }, [tryTime]);
    const iconHomeLock = ['home-lock-open', 'home-lock'];
    const colorList = [colors.neonRed, colors.neonGreen];
    const handlePress = () => {
        var data = (1 - status.isOn).toString();
        MqttService.publishMessage('duke_and_co/feeds/action-bctrllockstate', data);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.status}>
                <View style={[styles.iconContainer, { borderColor: colorList[status.isOn], shadowColor: colorList[status.isOn] }]}>
                    <MaterialCommunityIcons
                        name={iconHomeLock[status.isOn]} // home-lock-open
                        size={144}
                        style={[styles.icon, { color: colorList[status.isOn] }]}
                    />
                </View>
                <Text style={[styles.statusText, { color: colorList[status.isOn] }]}>
                    {status.title}
                </Text>
            </View>
            <View style={styles.controlContainer}>
                <ControllerCard
                    gradColor={[colors.controlBackground, colors.controlBackgroundLight]}
                    onPress={handlePress}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.controlBackground,
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
        borderWidth: 15,
        backgroundColor: colors.controlBackground,
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
        marginBottom: 20
    },
    icon: {
        paddingBottom: 5,
    },
    statusText: {
        fontSize: 36,
        fontWeight: '700',
    },
    controlContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center'
        // backgroundColor: 'red',
    },
})