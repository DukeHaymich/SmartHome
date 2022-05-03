import React, { useContext, useReducer, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DatabaseContext } from '../scripts/DatabaseProvider';
import { AuthContext } from '../scripts/AuthProvider';

import { colors } from '../scripts/colors';

function Log(props) {
    return(
        <View style={styles.item}>
            <View style ={styles.icon}>
                <MaterialCommunityIcons
                    name={props.device.toLowerCase()}
                    size={60}
                />
            </View>
            <View style={props.index === (props.length - 1) ? styles.itemTextLastChild : styles.itemText}>
                <Text style={styles.text}>Thiết bị: {props.device}</Text>
                <Text style={styles.text}>Trạng thái: {props.status}</Text>
                <Text style={styles.text}>Thời gian: {Date(props.time).toString()}</Text>
            </View>
        </View>
    );
}

export default function LoginLog() {
    const dbCtx = useContext(DatabaseContext);
    const authCtx = useContext(AuthContext);
    useEffect(
        () => dbCtx.fetchDeviceLog()
        , []
    )
    return (
        <SafeAreaView styles={styles.screen}>

            <FlatList
                data={dbCtx.deviceLog}
                renderItem={({ item,index}) => <Log {...item} index={index} length = {dbCtx.deviceLog.length} />}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    screen: {

    },
    item: {
        paddingTop: 10,
        flexDirection: 'row',
        // backgroundColor: 'green'
    },
    itemTextLastChild:{
        flex: 4,
        paddingBottom: 10,
        // backgroundColor: 'blue'
    },
    itemText: {
        flex: 4,
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 1,
        paddingBottom: 10,
        // backgroundColor: 'blue',
    },
    icon: {
        flex: 1,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10
    },
    text: {
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: '600'
    }
})