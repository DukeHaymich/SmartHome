import React, { useContext, useReducer, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { DatabaseContext } from '../scripts/DatabaseProvider';
import { AuthContext } from '../scripts/AuthProvider';

import { colors } from '../scripts/colors';

function Log(props) {
    return <View style={styles.item}>
        <Text style={styles.text}>Thiết bị: {props.device}</Text>
        <Text style={styles.text}>Trạng thái: {props.status}</Text>
        <Text style={styles.text}>Thời gian: {Date(props.time).toString()}</Text>
    </View>
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
                renderItem={({ item }) => <Log {...item} />}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    screen: {

    },
    item: {
        padding: 20,
        borderTopColor: '#c4c4c4',
        borderTopWidth: 1.5
    },
    text: {
        fontSize: 18,
        fontFamily: 'Roboto',
    }
})