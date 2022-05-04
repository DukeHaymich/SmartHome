import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../scripts/colors'
import { ControllerCard } from '../components/Card';
import { isDisabled } from 'react-native/Libraries/LogBox/Data/LogBoxData';
// import LinearGradient from 'react-native-linear-gradient';
import { MQTTContext } from '../scripts/MQTTProvider';
export default function FraudDetector() {
    const gradColorBG = [colors.controlBackground, colors.controlBackgroundLight];
    const gradColorOn = [colors.buttonOn, colors.buttonOnLight];
    const gradColorOff = [colors.buttonOff, colors.buttonOffLight];
    const gradColorDisabled = ['#2d3033', '#5e636b'];

    const {
        fraudDetector,
        setFraudDetector,
        publishFraudDetector
    } = useContext(MQTTContext);
    const status = fraudDetector;
    const colorList = [colors.neonGreen, colors.neonRed];
    const [tryTime, setTryTime] = useState(0);


    const toggleOnOff = () => {
        var data = (1 - fraudDetector.isOn);
        publishFraudDetector(data);
    }

    const handleAuto = () => { }


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
                setFraudDetector({
                    ...fraudDetector,
                    title: 'Không có kết nối!',
                });
            }
        }
    }, [tryTime]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.status}>
                <View style={[styles.iconContainer, { borderColor: colorList[1 - status.isOn], shadowColor: colorList[1 - status.isOn] }]}>
                    <MaterialCommunityIcons
                        name={!status.isOn ? 'shield-alert-outline' : 'shield-lock'}
                        size={144}
                        style={[styles.icon, { color: colorList[1 - status.isOn] }]}
                    />
                </View>
                <Text style={[styles.statusText, { color: colorList[1 - status.isOn] }]}>
                    {status.title}
                </Text>
            </View>
            <View style={styles.controlContainer}>
                {/* <ControllerCard
                    gradColor={gradColorBG}
                    onPress={handleAuto}
                    // disabled = {isDisabled}
                    icon={status.isAuto ? 'hand-paper' : 'cogs'}
                    title={status.isAuto ? 'Thủ công' : 'Tự động'}
                    style={{ color: '#fff', fontWeight: '900' }}
                /> */}
                <ControllerCard
                    gradColor={status.isAuto ? gradColorDisabled : (status.isOn ? gradColorOff : gradColorOn)}
                    onPress={toggleOnOff}
                    disabled={status.isAuto}
                    icon={'power-off'}
                    title={status.isAuto ? 'Mở / Tắt' : (status.isOn ? 'Tắt' : 'Mở')}
                    style={{ color: '#fff', fontWeight: '900' }}
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