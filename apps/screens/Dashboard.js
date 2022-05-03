import React, { useEffect, useState, useReducer, useContext } from 'react';
import {
    Alert,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Tooltip from 'react-native-walkthrough-tooltip';


// import MqttService from '../core/services/MqttService';
import { NumericCard, ControllerCard } from '../components/Card';
import { colors } from '../scripts/colors';
// import { ControllerContext } from '../routes/DashboardStack';
import { MQTTContext } from '../scripts/MQTTProvider';
import LinearGradient from 'react-native-linear-gradient';


export default function Dashboard({ navigation }) {
    const {
        doorLock,
        fraudDetector,
        temperature,
        humidity,
        gas,
        fetchLatestData,
        connect,
        isConnected,
        disconnect,
    } = useContext(MQTTContext);
    const screen = useWindowDimensions();
    const [sectorColor, setSectorColor] = useState('rgba(0, 0, 0, 1)');
    const [checkData, setCheckData] = useState(false);

    useEffect(() => {
        var set = new Set(gas.data);
        if (set.size === 1) {
            setCheckData(true);
        } else {
            setCheckData(false);
        }
        if (gas.data[gas.data.length - 1] >= 40) {
            setSectorColor('rgba(255, 0, 0, 1)');
        } else {
            setSectorColor('rgba(255, 255, 255, 1)');
        }
    }, [gas]);

    const devices = [
        {
            id: 0,
            title: 'Khóa cửa',
            icon: ['door-open', 'door-closed'],
        },
        {
            id: 1,
            title: 'Chống trộm',
            icon: 'user-shield',
        },
    ]
    useEffect(() => {
        connect();
        return () => {
            disconnect();
        }
    }, []);

    useEffect(() => {
        if (isConnected) {
            fetchLatestData();
        }
    }, [isConnected]);
    // const [openTool, setOpenTool] = useState(false);
    const [dotStroke, setDotStroke] = useState('white');
    const colorController = [colors.neonRed, '#00ab00'];
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={[colors.background, colors.backgroundMedium]}
                style={styles.container}
                useAngle={true}
                angle={180}
                angleCenter={{ x: 0, y: 0.7 }}
            >
                <View style={{ marginVertical: 5, marginHorizontal: 10 }}>
                    <Text style={[styles.headerText, { opacity: 0.5 }]}>Xin chào!</Text>
                    <Text style={[styles.headerText, { fontWeight: '700', fontSize: 23 }]}>
                        Sơn Đại Gia
                    </Text>
                </View>

                <View style={styles.visualNumericData}>
                    <FlatList
                        data={[temperature, humidity]}
                        horizontal={true}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <NumericCard {...item} />}
                    />
                </View>
                <View style={styles.graph}>
                    <Text
                        style={[
                            styles.headerText,
                            { alignSelf: 'center', fontSize: 28, color: colors.BKLightBlue },
                        ]}>
                        Nồng độ khí gas
                    </Text>
                    <LineChart
                        // onDataPointClick={({value, getColor}) => {
                        //     setOpenTool(true);
                        // }}
                        data={{
                            labels: gas.time,
                            datasets: [
                                {
                                    data: gas.data,
                                },
                            ],
                        }}
                        width={screen.width * 0.9} // from react-native
                        height={screen.height * 0.3}
                        // yAxisLabel="$"
                        yAxisSuffix="%"
                        yAxisInterval={6} // optional, defaults to 1
                        chartConfig={{
                            // backgroundColor: "#e26a00",
                            backgroundGradientFrom: '#389FFF',
                            backgroundGradientTo: '#389FFF',
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: () => sectorColor,
                            labelColor: (opacity = 1) => `rgba(11, 65 , 115, ${opacity})`,
                            style: {
                                borderRadius: 16,

                            },
                            propsForDots: {
                                r: '6',
                                strokeWidth: '2',
                                stroke: dotStroke,
                            },
                            propsForLabels: {
                                fontSize: 22,
                                fontFamily: 'Digital-7',

                            },
                            propsForVerticalLabels: {
                                fontSize: 18,
                                // fontWeight: '900'
                            },
                        }}
                        getDotColor={dataPoint => {
                            if (dataPoint >= 40) {
                                setDotStroke('red');
                                return 'red';

                            } else {
                                setDotStroke('white');
                                return 'white';
                            }
                        }}
                        // renderDotContent={(x, y, index, indexData) => {
                        //     return(
                        //         <Tooltip
                        //             content={
                        //                 <View><Text>{indexData}</Text></View>
                        //             }
                        //             placement='center'
                        //             isVisible={openTool}
                        //             onClose={()=>setOpenTool(false)}
                        //         >
                        //         </Tooltip>
                        //     )
                        // }}
                        segments={3}
                        fromZero={checkData}
                        style={{
                            // marginVertical: 8,
                            borderRadius: 16,
                            alignSelf: 'center',
                            marginTop: -25,
                            paddingTop: 25,
                        }}
                    />
                </View>
                <View style={styles.controller}>
                    <FlatList
                        data={devices}
                        renderItem={({ item }) => (
                            //'#6dacc9', '#a6e3ff'#3eadcf#abe9cd #83eaf1#63a4ff #f6ebe6#aee1f9
                            <ControllerCard //#aacaef #fde7f9 #cfd6e6#e7eff9 #b8d3fe#aecad6 #f6ebe6#aee1f9
                                {...item} //#98fcbd#9cdaf8 #66b5f6#bfe299 #b8d3fe#aecad6
                                gradColor={[colors.backgroundMedium, '#e6e6e6']}
                                onPress={() => navigation.navigate(item.title)}
                                // style={{ color: 'black' }}
                                // icon={}

                                icon={item.id ? item.icon : item.icon[doorLock.isOn]}
                                style={{ color: colorController[item.id ? fraudDetector.isOn : doorLock.isOn], fontWeight: '900' }}
                            />
                        )}
                        keyExtractor={item => item.id}
                        key={2}
                        numColumns={2}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        // backgroundColor: colors.background,
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
        // marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Nunito-Medium',
        fontSize: 18,
        marginLeft: 10,
    },
});
