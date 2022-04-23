import React, { useEffect, useReducer } from 'react';
import {
    Button,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';

import MqttService from '../core/services/MqttService';

import { NumericCard, ControllerCard } from '../components/Card';
import { colors } from '../scripts/colors';



export default function Dashboard() {
    const screen = useWindowDimensions();

    const [ numericData, numericDataDispatch ] = useReducer((state, action) => {
        switch(action.type) {
            case 'TEMPERATURE':{
                var newState = JSON.parse(JSON.stringify(state));
                try {
                    var data = parseInt(action.data)
                    newState.temperature.data = data;
                } catch (e) {
                    console.warn(e)
                } finally {
                    return newState;
                }
            }
            case 'HUMIDITY': {
                var newState = JSON.parse(JSON.stringify(state));
                newState.humidity.data = action.data;
                return newState;
            }
            case 'GAS': {
                var newState = JSON.parse(JSON.stringify(state));
                var data = action.data;
                data = Math.round((data/1023*100 + Number.EPSILON)*10)/10;
                newState.gas.data = data;
                return newState;
            }
            default: {
                return state;
            }
        }
    },
    {
        temperature: {
            id: 0,
            title: 'Nhiệt độ',
            data: '__',
            unit: '°C'
        },
        humidity: {
            id: 1,
            title: 'Độ ẩm',
            data: '__',
            unit: '%'
        },
        gas: {
            id: 2,
            title: 'Nồng độ khí ga',
            data: '__',
            unit: '%'
        }
    })

    const [ devices, setDevices ] = useReducer((state, action) => {
        switch(action.type) {
            case 'DOOR-LOCK': {

            }
            case 'FRAUD-DETECTOR': {

            }
            case 'FIRE-ALARM': {

            }
            default: {
                return state;
            }
        }
    },
    {
        doorLock: {

        },
        fraudDetector: {
            
        },
        fireAlarm: {

        },
    })


    const onGasTopic = message => {
        numericDataDispatch({
            type: 'GAS',
            data: message
        })
    }
    const onTemperatureTopic = message => {
        numericDataDispatch({
            type: 'TEMPERATURE',
            data: message,
        });
    }
    const onHumidityTopic = message => {
        numericDataDispatch({
            type: 'HUMIDITY',
            data: message,
        });
    }
    const onFraudDetectTopic = message => {

    }
    const onFireDetectTopic = message => {

    }
    const onDoorLockTopic = message => {

    }
    const onFraudAlarmTopic = message => {

    }
    const onFireAlarmTopic = message => {
        
    }
    
    const mqttSuccessHandler = () => {
        MqttService.subscribe('duke_and_co/feeds/visual-igas', onGasTopic);
        MqttService.subscribe('duke_and_co/feeds/visual-ftemp', onTemperatureTopic);
        MqttService.subscribe('duke_and_co/feeds/visual-ihumid', onHumidityTopic);
        MqttService.subscribe('duke_and_co/feeds/visual-bwarningfraud', onFraudDetectTopic);
        MqttService.subscribe('duke_and_co/feeds/visual-bwarningfire', onFireDetectTopic);
        MqttService.subscribe('duke_and_co/feeds/action-bctrllockstate', onDoorLockTopic);
        MqttService.subscribe('duke_and_co/feeds/action-bnotifyfraudbuzzer', onFraudAlarmTopic);
        MqttService.subscribe('duke_and_co/feeds/action-bnotifyfirebuzzer', onFireAlarmTopic);
        // Get latest value
        MqttService.publishMessage('duke_and_co/feeds/visual-igas/get', 'duke_n_co');
        MqttService.publishMessage('duke_and_co/feeds/visual-ftemp/get', 'duke_n_co');
        MqttService.publishMessage('duke_and_co/feeds/visual-ihumid/get', 'duke_n_co');
        MqttService.publishMessage('duke_and_co/feeds/action-bctrllockstate/get', 'duke_n_co');
        MqttService.publishMessage('duke_and_co/feeds/action-bnotifyfraudbuzzer/get', 'duke_n_co');
        MqttService.publishMessage('duke_and_co/feeds/action-bnotifyfirebuzzer/get', 'duke_n_co');
    };
    
    const mqttConnectionLostHandler = () => {
        
    };
    
    useEffect(() => {
        if (MqttService && MqttService.isConnected) {
            MqttService.disconnect();
        }
        if (MqttService && !MqttService.isConnected) {
            MqttService.connect(
                mqttSuccessHandler,
                mqttConnectionLostHandler
            );
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.visualNumericData}>
                <FlatList
                    data={Object.values(numericData)}
                    horizontal={true}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <NumericCard screen={screen} {...item}/>}
                />
            </View>
            {/* <View styles={styles.graph}>
                <FlatList
                    data={devices}
                    renderItem={({item}) => <ControllerCard screen={screen} {...item}/>}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingBottom: 17 }}
                />
            </View> */}
            <View style={styles.controller}>
                <FlatList
                    data={devices}
                    renderItem={({item}) => <ControllerCard screen={screen} {...item}/>}
                    keyExtractor={item => item.id}
                    key = {2}
                    numColumns = {2}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: colors.background,
    },
    visualNumericData: {
        flex: 1,
        // backgroundColor: 'red',
    },
    graph: {
        flex: 2,
        // backgroundColor: 'black',
    },
    controller: {
        flex: 4,
        // backgroundColor: 'black',
    },
});
