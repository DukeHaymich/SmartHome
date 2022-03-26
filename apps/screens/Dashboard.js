import React, { useState } from 'react';
import {
    FlatList,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';



import Header from './apps/components/Header';
import Card from './apps/components/Card';


export default function App() {
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
            id: 4,
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
            id: 5,
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
            id: 6,
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
                />
            </View>
            {/* <Text>
                Hello world!
            </Text> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    listCard: {
        flex: 1,
    }
});
