import React, { createContext, useState } from 'react';
// import { Alert } from 'react-native';

import MqttService from '../core/services/MqttService';

/* Authentication */
export const MQTTContext = createContext();

export default function MQTTProvider({ children }) {
    const [today, setToday] = useState(new Date());
    const [temperature, setTemperature] = useState({
        id: 0,
        title: 'Nhiệt độ',
        data: '__',
        unit: '°C',
    });
    const [humidity, setHumidity] = useState({
        id: 1,
        title: 'Độ ẩm',
        data: '__',
        unit: '%',
    });
    const [gas, setGas] = useState({
        title: 'Nồng độ khí ga',
        data: [0],
        time: [today.toLocaleTimeString()],
        unit: '%',
    });
    const [doorLock, setDoorLock] = useState({
        title: 'Đang tải...',
        isOn: null,
    });
    const [fraudDetector, setFraudDetector] = useState({
        title: 'Đang tải...',
        isAuto: null,
        isOn: null,
    });
    const [fraudWarning, setFraudWarning] = useState({
        title: 'Đang tải...',
        isOn: null,
    })

    const onTemperatureTopic = message => {
        setTemperature((state) => {
            var newState = JSON.parse(JSON.stringify(state));
            try {
                newState.data = parseInt(message);
            } catch (e) {
                console.warn(e);
            } finally {
                return newState;
            }
        });
    };
    const onHumidityTopic = message => {
        setHumidity((state) => {
            var newState = JSON.parse(JSON.stringify(state));
            try {
                newState.data = Math.round(parseInt(message));
            } catch (e) {
                console.warn(e)
            } finally {
                return newState;
            }
        });
    };

    const onGasTopic = message => {
        setGas((state) => {
            var newState = JSON.parse(JSON.stringify(state));
            setToday(new Date());
            var time = today.toLocaleTimeString();
            var data = Math.round((parseInt(message) / 1023) * 1000 + Number.EPSILON) / 10;
            if (newState.data.length >= 5) {
                newState.data.shift();
                newState.time.shift();
            }
            newState.data = [...newState.data, data];
            newState.time = [...newState.time, time];
            return newState;
        });
    };
    const onFireDetectorTopic = message => {
        // topicHelper(updateF, message);
    };
    const onFireAlarmTopic = message => {
        // topicHelper(updateF, message);
    };
    const onDoorLockTopic = message => {
        setDoorLock((state) => {
            var newState = state;
            if (message == 1) {
                newState = {
                    title: 'Đang khóa',
                    isOn: 1,
                }
            } else if (message == 0) {
                newState = {
                    title: 'Đang mở',
                    isOn: 0,
                }
            }
            return newState;
        });
    }
    const onFraudDetectorTopic = message => {
        setFraudDetector((state) => {
            var newState = state;
            if (message == 1) {
                newState = {
                    title: 'Đang hoạt động',
                    isOn: 1,
                }
            }
            else if (message == 0) {
                newState = {
                    title: 'Đang tắt',
                    isOn: 0,
                }
            }
            return newState;
        });
    };
    const onFraudAlarmTopic = message => {
        setFraudWarning((state) => {
            var newState = state;
            if (message == 1) {
                newState = {
                    ...state,
                    title: 'Có dấu hiệu đột nhập',
                    isOn: 1,
                }
            }
            else if (message == 0) {
                newState = {
                    ...state,
                    title: 'Bình thường',
                    isOn: 0,
                }
            }
            return newState;
        });
    };

    const fetchLatestData = () => {
        MqttService.publishMessage('duke_and_co/feeds/visual-igas/get', 'duke_n_co');
        MqttService.publishMessage('duke_and_co/feeds/visual-ftemp/get', 'duke_n_co');
        MqttService.publishMessage('duke_and_co/feeds/visual-ihumid/get', 'duke_n_co');
        // MqttService.publishMessage('duke_and_co/feeds/visual-bwarningfire/get', 'duke_n_co');
        // MqttService.publishMessage('duke_and_co/feeds/action-bnotifyfirebuzzer/get', 'duke_n_co');
        MqttService.publishMessage('duke_and_co/feeds/action-bctrllockstate/get', 'duke_n_co');
        MqttService.publishMessage('duke_and_co/feeds/visual-bwarningfraud/get', 'duke_n_co');
        MqttService.publishMessage('duke_and_co/feeds/action-bnotifyfraudbuzzer/get', 'duke_n_co');
    }

    const mqttSuccessHandler = () => {
        MqttService.subscribe('duke_and_co/feeds/visual-ftemp', onTemperatureTopic);
        MqttService.subscribe('duke_and_co/feeds/visual-ihumid', onHumidityTopic);
        MqttService.subscribe('duke_and_co/feeds/visual-igas', onGasTopic);
        // MqttService.subscribe('duke_and_co/feeds/visual-bwarningfire', onFireAlarmTopic);
        // MqttService.subscribe('duke_and_co/feeds/action-bnotifyfirebuzzer', onFireDetectorTopic);
        MqttService.subscribe('duke_and_co/feeds/action-bctrllockstate', onDoorLockTopic);
        MqttService.subscribe('duke_and_co/feeds/visual-bwarningfraud', onFraudAlarmTopic);
        MqttService.subscribe('duke_and_co/feeds/action-bnotifyfraudbuzzer', onFraudDetectorTopic);
        fetchLatestData();
    };

    const publishDoorLock = (data) => {
        MqttService.publishMessage('duke_and_co/feeds/action-bctrllockstate', data.toString());
    }
    const publishFraudDetector = (data) => {
        MqttService.publishMessage('duke_and_co/feeds/action-bnotifyfraudbuzzer', data.toString());
    }

    const mqttConnectionLostHandler = () => {
        // Alert.alert(
        //     'Lỗi!',
        //     'Mất kết nối đến server!',
        //     [{
        //         text: 'Thử lại',
        //         onPress: () => {
        //             if (MqttService && !MqttService.isConnected) {
        //                 MqttService.connect(mqttSuccessHandler, mqttConnectionLostHandler)
        //             }
        //         }
        //     }],
        //     { cancelable: true }
        // );
    };

    const connect = (username = null, password = null) => {
        if (MqttService && !MqttService.isConnected) {
            MqttService.connect(mqttSuccessHandler, mqttConnectionLostHandler, username, password);
            return;
        }
        if (MqttService && MqttService.isConnected) {
            MqttService.disconnect();
            setTimeout(() => {
                if (MqttService && !MqttService.isConnected) {
                    MqttService.connect(mqttSuccessHandler, mqttConnectionLostHandler, username, password);
                }
            }, 5000);
            return;
        }
    }

    const disconnect = () => {
        if (MqttService && MqttService.isConnected) {
            MqttService.disconnect();
            return;
        }
    }

    return (
        <MQTTContext.Provider
            value={{
                temperature: temperature,
                humidity: humidity,
                gas: gas,
                doorLock: doorLock,
                setDoorLock: setDoorLock,
                fraudDetector: fraudDetector,
                setFraudDetector: setFraudDetector,
                fraudWarning: fraudWarning,
                publishDoorLock: publishDoorLock,
                publishFraudDetector: publishFraudDetector,
                fetchLatestData: fetchLatestData,
                connect: connect,
                disconnect: disconnect,
                isConnected: MqttService.isConnected,
            }}
        >
            {children}
        </MQTTContext.Provider>
    );
}
