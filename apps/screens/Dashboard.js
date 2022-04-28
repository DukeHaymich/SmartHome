import React, { useEffect, useState, useReducer } from 'react';
import {
    Button,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
    TouchableWithoutFeedback
} from 'react-native';
import {
    LineChart
} from "react-native-chart-kit";

import FlashMessage,{ showMessage } from "react-native-flash-message";
import MqttService from '../core/services/MqttService';

import { NumericCard, ControllerCard } from '../components/Card';
import { colors } from '../scripts/colors';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';



export default function Dashboard({navigation}) {
    const screen = useWindowDimensions();
    const [ today, setToday ] = useState(new Date());
    const [sectorColor, setSectorColor] = useState("rgba(0, 0, 0, 1)");
    const [checkData, setCheckData] = useState(false);
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
    })
    const [ gas, setGas ] = useReducer((state, action) => {
        switch(action.type) {
            case 'GAS': {
                var newState = JSON.parse(JSON.stringify(state));
                var data = action.data;
                setToday(new Date());
                var time = today.toLocaleTimeString();
                data = Math.round((data/1023*100 + Number.EPSILON));
                if (newState.data.length >= 5){
                    newState.data.shift();
                    newState.time.shift();
                }
                newState.data = [...newState.data, data];
                
                newState.time = [...newState.time, time];
                return newState;
            }
            default: {
                return state;
            }
        }
    }, {
        title: 'Nồng độ khí ga',
        data: [0],
        time: [today.toLocaleTimeString()],
        unit: '%'
    })
    useEffect(()=>{
        var set = new Set(gas.data);
        if (set.size === 1){
            setCheckData(true);
        }
        else{
            setCheckData(false);
        }
        if (gas.data[gas.data.length-1] >= 40){
            setSectorColor('rgba(255, 0, 0, 1)');
        }
        else{
            setSectorColor('rgba(0, 0, 0, 1)');
        }
    },[gas])

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
            id: 0,
            title: 'Khóa cửa',
            icon: 'door-open',
        },
        fraudDetector: {
            id: 1,
            title: 'Chống trộm',
            icon: 'user-shield',
        },
    })

    const onGasTopic = message => {
        setGas({
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
            <View style = {{marginVertical: 5, marginHorizontal:10}}> 
                <Text style = {[styles.headerText,{opacity: 0.5}]}>Xin chào!</Text>
                <Text style = {[styles.headerText,{fontWeight: '700', fontSize: 23}]}>Sơn Đại Gia</Text>
            </View> 
            
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
            <View style={styles.graph}>
                <Text style = {[styles.headerText,{alignSelf: 'center', fontSize: 28, color: colors.BKLightBlue}]}>Nồng độ khí gas</Text>
                <LineChart
                    // onDataPointClick={({value, getColor}) =>
                    //     showMessage({
                    //         message: `${value}`,
                    //         description: 'You selected this value',
                    //         backgroundColor: getColor(0.9)
                    //     })
                    // }
                    data={{
                        labels: gas.time,
                        datasets: [
                            {
                                data: gas.data
                            }
                        ]
                    }}
                    width={screen.width * 0.9} // from react-native
                    height={220}
                    // yAxisLabel="$"
                    yAxisSuffix="%"
                    yAxisInterval={6} // optional, defaults to 1
                    chartConfig={{
                        // backgroundColor: "#e26a00",
                        backgroundGradientFrom: '#c3e8fa',
                        backgroundGradientTo: '#c3e8fa',
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: () => sectorColor,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: colors.white
                        },
                        propsForLabels:{
                            fontSize: 22,
                            fontFamily: "Digital-7"
                        },
                        propsForVerticalLabels:{
                            fontSize: 18,
                        }
                        
                    }}
                    getDotColor={(dataPoint) => {
                        if (dataPoint >= 40) {
                            return 'red';
                        }
                        else {
                            return 'black'
                        }
                    }}
                    segments = {3}
                    fromZero = {checkData}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        alignSelf: 'center',
                    }}
                />
            </View>
            {/* <FlashMessage duration={5000} /> */}
            <View style={styles.controller}>
                <FlatList
                    data={Object.values(devices)}
                    renderItem={({item}) => <ControllerCard screen={screen} navigation = {navigation} {...item}/>}
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
        flex: 1.7,
        // backgroundColor: 'red',
    },
    graph: {
        flex: 3.5,
        // backgroundColor: 'black',
    },
    controller: {
        flex: 2.5,
        // backgroundColor: 'black',
        // padding:20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Nunito-Medium',
        fontSize: 18,
        marginLeft: 10
    },
});
