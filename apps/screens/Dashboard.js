import React, { useEffect, useReducer } from 'react';
import {
    Button,
    FlatList,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';

import MqttService from '../core/services/MqttService';

import Header from '../components/Header';
import Card from '../components/Card';



export default function Dashboard() {
    const data = [
        {
            id: 0,
            title: 'Khóa cửa',
            content: [
                {
                    icon: 'lock-outline',
                    description: 'Đang đóng'
                }
            ]
        },
        {
            id: 1,
            title: 'Hệ thống chống trộm',
            content: [
                {
                    icon: 'notifications-none',
                    description: 'Bình thường'
                },
                {
                    icon: 'lock-outline',
                    description: 'Đang hoạt động'
                }
            ]
        },
        {
            id: 2,
            title: 'Nồng độ khí gas',
            content: [
                {
                    icon: 'lock-outline',
                    description: '0% (Bình thường)'
                }
            ]
        },
        {
            id: 3,
            title: 'Nhiệt độ và độ ẩm',
            content: [
                {
                    icon: 'device-thermostat',
                    description: '0°C'
                },
                {
                    icon: 'waves',
                    description: '0%'
                }
            ]
        }
    ]

    const deviceIndex = {
        doorLock: 0,
        fraudBuzz: 1,
        gasSensor: 2,
        temperatureSensor: 3,
        humiditySensor: 3,
        fraudAlarm: 1,
    }

    const [ hiddenState, hiddenStateDispatch ] = useReducer((state, action) => {
        switch (action.type) {
            case 'GAS-ALARM':
                return {
                    ...state,
                    gasAlarm: parseInt(action.data)
                }
            default:
                return state;
        }
    },
    {
        gasAlarm: 0
    });
    
    const [ devices, devicesDispatch ] = useReducer((state, action) => {
        switch (action.type) {
            case 'UPDATE-GAS': {
                const gasThreshold = 600;
                var newState = JSON.parse(JSON.stringify(state));
                const data = parseInt(action.data);
                const desc = (data >= gasThreshold) // (hiddenState.gasAlarm === 1)
                    ? " (Vượt ngưỡng an toàn!)"
                    : " (Bình thường)";
                newState[action.index].content[0].description
                    = Math.round((data/1023*100 + Number.EPSILON)*10)/10
                    + "%" + desc
                    ;
                
                return newState;
            }
            case 'UPDATE-TEMPERATURE': {
                var newState = JSON.parse(JSON.stringify(state));
                const data = action.data;
                newState[action.index].content[0].description
                    = Math.round((parseInt(data) + Number.EPSILON)*10)/10
                    + "°C"
                    ;
                    
                return newState;
            }
            case 'UPDATE-HUMIDITY': {
                var newState = JSON.parse(JSON.stringify(state));
                const data = action.data;
                newState[action.index].content[1].description
                    = data + "%"
                    ;
                    
                return newState;
            }
            case 'UPDATE-DOOR-LOCK': {
                var newState = JSON.parse(JSON.stringify(state));
                const data = action.data;
                newState[action.index].content[0]
                    = (data === 0)
                    ? {
                        icon: 'lock-open',
                        description: 'Đang mở'
                    }
                    : {
                        icon: 'lock-outline',
                        description: 'Đang đóng'
                    }
                
                return newState;
            }
            case 'UPDATE-FRAUD-DETECT': {
                var newState = JSON.parse(JSON.stringify(state));
                if (newState[action.index].content[1].description === 'Đang hoạt động') {
                    const data = action.data;
                    newState[action.index].content[0]
                        = (data === 0)
                        ? {
                            icon: 'notifications-none',
                            description: 'Bình thường'
                        }
                        : {
                            icon: 'notifications-active',
                            description: 'Có dấu hiệu đột nhập!'
                        }
                }
                
                return newState;
            }
            case 'UPDATE-FRAUD-ALARM': {
                var newState = JSON.parse(JSON.stringify(state));
                const data = action.data;
                newState[action.index].content[1]
                    = (data === 0)
                    ? {
                        icon: 'notifications-none',
                        description: 'Bình thường'
                    }
                    : {
                        icon: 'notifications-active',
                        description: 'Có dấu hiệu đột nhập!'
                    }
                
                return newState;
            }
            default:
                return state;
        }
    },
        data
    );


    const onGasTopic = message => {
        devicesDispatch({
            type: 'UPDATE-GAS',
            data: message,
            index: deviceIndex.gasSensor
        });
    }
    const onTemperatureTopic = message => {
        devicesDispatch({
            type: 'UPDATE-TEMPERATURE',
            data: message,
            index: deviceIndex.temperatureSensor
        });
    }
    const onHumidityTopic = message => {
        devicesDispatch({
            type: 'UPDATE-HUMIDITY',
            data: message,
            index: deviceIndex.humiditySensor
        });
    }
    const onFraudDetectTopic = message => {
        devicesDispatch({
            type: 'UPDATE-FRAUD-DETECT',
            data: message,
            index: deviceIndex.fraudBuzz
        });
    }
    const onFireDetectTopic = message => {
        hiddenStateDispatch({
            type: 'GAS_ALARM',
            data: message
        });
    }
    const onDoorLockTopic = message => {
        devicesDispatch({
            type: 'UPDATE-DOOR-LOCK',
            data: message,
            index: deviceIndex.doorLock
        });
    }
    const onFraudAlarmTopic = message => {
        devicesDispatch({
            type: 'UPDATE-FRAUD-ALARM',
            data: message,
            index: deviceIndex.fraudAlarm
        });
    }
    const onFireAlarmTopic = message => {
        // hiddenStateDispatch({
        //     type: 'GAS_ALARM',
        //     data: message
        // });
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
            <Header title='Trang nhà'/>
            <View style={styles.listCard}>
                <FlatList
                    data={devices}
                    renderItem={({item}) => <Card {...item}/>}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingBottom: 17 }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
    },
    listCard: {
        flex: 1,
    }
});
