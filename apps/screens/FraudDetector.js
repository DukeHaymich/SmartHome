import React, {useState} from 'react';
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
import LinearGradient from 'react-native-linear-gradient';

export default function FraudDetector() {
    const [isDisabled, setDisabled] = useState(true);
    const gradColor = [colors.buttonOn,colors.buttonOnLight];
    const gradColorDisabled = [colors.buttonOff, colors.buttonOffLight];
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                    colors={[colors.controlBackground, colors.controlBackgroundLight]}
                    style={styles.container}
                    useAngle={true}
                    angle={30}
                    angleCenter={{ x: 0.5, y: 0.5}}
            >
            
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
                        gradColor={!isDisabled ? gradColorDisabled : gradColor }
                        onPress={() => {setDisabled(!isDisabled)}}
                        disabled = {!isDisabled}
                        title = 'Thủ công'
                    />
                    <ControllerCard
                        gradColor={isDisabled ? gradColorDisabled : gradColor}
                        onPress={() => {setDisabled(!isDisabled)}}
                        disabled = {isDisabled}
                        title = 'Tự động'
                    />
                </View>
            
        </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.w,
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
        flexDirection: 'row',
        justifyContent: 'center'

        // backgroundColor: 'red',
    },
})