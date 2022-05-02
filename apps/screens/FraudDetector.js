import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MqttService from '../core/services/MqttService';
import { colors } from '../scripts/colors'
import { ControllerCard } from '../components/Card';
import { isDisabled } from 'react-native/Libraries/LogBox/Data/LogBoxData';
// import LinearGradient from 'react-native-linear-gradient';

export default function FraudDetector() {
    // const [isOff, setOff] = useState(false);
    // const [isAuto, setAuto] = useState(true);
    const gradColorBG = [colors.controlBackground,colors.controlBackgroundLight];
    const gradColorOn = [colors.buttonOn, colors.buttonOnLight];
    const gradColorOff = [colors.buttonOff,colors.buttonOffLight];
    const gradColorDisabled = ['#2d3033','#5e636b'];

    const [status, setStatus] = useState({
        title: 'Đang tải...',
        isAuto: null,
        isOff: null,
    });
    const colorList = [colors.neonGreen, colors.neonRed];
    
    const onFraudDetectTopic = message => {
    };

    const onFraudConfigTopic = message => {
        if (message == 1) {
            setStatus({
                ...status,
                title: 'Đang hoạt động',
                isOff: 0,
            })
        }
        else {
            setStatus({
                ...status,
                title: 'Đang tắt',
                isOff: 1,
            })
        }
    };

    const handleAuto = () => {
        if (status.isAuto) {
            setStatus({
                ...status,
                isAuto: 0,
            })
        }
        else {
            setStatus({
                ...status,
                isAuto: 1,
            })
        }
    };

    const toggleOnOff = () => {
        var data = status.isOff.toString();
        MqttService.publishMessage('duke_and_co/feeds/action-bnotifyfraudbuzzer', data);
    }

    useEffect(() => {
        if (MqttService && MqttService.isConnected) {
            MqttService.subscribe('duke_and_co/feeds/visual-bwarningfraud', onFraudDetectTopic);
            MqttService.subscribe('duke_and_co/feeds/action-bnotifyfraudbuzzer', onFraudConfigTopic);
            MqttService.publishMessage('duke_and_co/feeds/visual-bwarningfraud/get', 'duke_n_co');
            MqttService.publishMessage('duke_and_co/feeds/action-bnotifyfraudbuzzer/get', 'duke_n_co');
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.status}>
                <View style={[styles.iconContainer,{ borderColor: colorList[status.isOff], shadowColor: colorList[status.isOff] }]}>
                    <MaterialCommunityIcons
                        name={status.isOff ? 'shield-alert-outline' : 'shield-lock'}
                        size={144}
                        style={[styles.icon,{ color: colorList[status.isOff] }]}
                    />
                </View>
                <Text style={[styles.statusText,{ color: colorList[status.isOff] }]}>
                    {status.title}
                </Text>
            </View>
            <View style={styles.controlContainer}>
                <ControllerCard
                    gradColor={gradColorBG}
                    onPress={handleAuto}
                    // disabled = {isDisabled}
                    icon={status.isAuto ? 'hand-paper': 'cogs'}
                    title={status.isAuto ? 'Thủ công' : 'Tự động'}
                    style={{color: '#fff', fontWeight: '900'}}
                />
                <ControllerCard
                    gradColor={status.isAuto ? gradColorDisabled : (status.isOff ? gradColorOn : gradColorOff ) }
                    onPress={toggleOnOff}
                    disabled = {status.isAuto}
                    icon = {'power-off'}
                    title = {status.isAuto ? 'Mở / Tắt' : (status.isOff ? 'Mở' : 'Tắt')}
                    style = {{color: '#fff', fontWeight: '900'}}
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
        borderColor: 'black',
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
        color: 'black',
    },
    controlContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',

        // backgroundColor: '',
    },
})