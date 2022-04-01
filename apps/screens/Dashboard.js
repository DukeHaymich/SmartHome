import React, { useState, useEffect } from 'react';
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
    const [ state, setState ] = useState({
        isConnected: false,
        message: '',
    });
    
    const onTopic = message => {
        console.info('success');
        console.log(message);
    }

    const onSubscribe = () => {
    }

    const onPublish = () => {
        MqttService.publishMessage('duke_and_co/feeds/action-bctrllockstate', '0');
    }
    
    const mqttSuccessHandler = () => {
        MqttService.subscribe('duke_and_co/feeds/visual_iGas', onTopic);
        MqttService.subscribe('duke_and_co/feeds/action-bctrllockstate', onTopic);
        MqttService.publishMessage('duke_and_co/feeds/visual_iGas/get', 'duke_n_co');
        
    };
    
    const mqttConnectionLostHandler = () => {
        
    };
    
    useEffect(() => {
        if (MqttService && MqttService.isConnected) {
            MqttService.disconnectClient();
        }
        if (MqttService && !MqttService.isConnected) {
            MqttService.connectClient(
                'duke_and_co',
                'aio_ZFsO59HAQ3V4ZGXzsKHyeG0yLZPH',
                mqttSuccessHandler,
                mqttConnectionLostHandler
            );
        }
    }, []);


    const [ listDevices, setListDevices ] = useState([
        {
            id: 1,
            title: 'Khóa cửa',
            content: [
                {
                    icon: 'lock-outline',
                    description: 'Đang đóng'
                }
            ]
        },
        {
            id: 2,
            title: 'Hệ thống chống trộm',
            content: [
                {
                    icon: 'notifications',
                    description: 'Bình thường'
                },
                {
                    icon: 'lock-outline',
                    description: 'Đang hoạt động'
                }
            ]
        },
        {
            id: 3,
            title: 'Nồng độ khí gas',
            content: [
                {
                    icon: 'lock-outline',
                    description: '1.0% (Bình thường)'
                }
            ]
        },
        {
            id: 4,
            title: 'Nhiệt độ và độ ẩm',
            content: [
                {
                    icon: 'notifications',
                    description: '29°C'
                },
                {
                    icon: 'lock-outline',
                    description: '7%'
                }
            ]
        }
    ]);

    return (
        <SafeAreaView style={styles.container}>
            <Header title='Trang nhà'/>
            <View style={styles.listCard}>
                <FlatList
                    data={listDevices}
                    renderItem={({item}) => <Card {...item}/>}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingBottom: 17 }}
                />
            </View>
            <Button
                title='click me'
                onPress={onPublish}
            />
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
