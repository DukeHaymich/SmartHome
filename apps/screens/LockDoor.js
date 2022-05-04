import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ControllerCard } from '../components/Card';


import { colors } from '../scripts/colors'
import { MQTTContext } from '../scripts/MQTTProvider';

export default function LockDoor() {
    const {
        doorLock,
        setDoorLock,
        publishDoorLock,
        fetchLatestData,
        isConnected,
    } = useContext(MQTTContext);
    const [tryTime, setTryTime] = useState(0);
    const status = doorLock;

    useEffect(() => {
        try {
            if (isConnected) {
                fetchLatestData();
                return;
            }
            else {
                throw new Error("Not connected");
            }
        } catch (error) {
            setTimeout(() => {
                setTryTime((prev) => Math.min(prev + 1, 5))
            }, 5000);
            if (tryTime == 5) {
                setDoorLock({
                    ...doorLock,
                    title: 'Không có kết nối!',
                });
            }
        }
    }, [tryTime]);
    const iconHomeLock = ['home-lock-open', 'home-lock'];
    const colorList = [colors.neonRed, colors.neonGreen];
    const gradColorOn = [colors.buttonOn, colors.buttonOnLight];
    const gradColorOff = [colors.buttonOff, colors.buttonOffLight];
    const handlePress = () => {
        var data = (1 - status.isOn).toString();
        publishDoorLock(data);
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
                    gradColor={status.isOn ? gradColorOff : gradColorOn}
                    onPress={handlePress}
                    icon={'key'}
                    style={{ color: '#fff', fontWeight: '900' }}
                    title={status.isOn ? 'Mở khóa' : 'Đóng khóa'}
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