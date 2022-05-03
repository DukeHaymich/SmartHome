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
    return (
        <View style={styles.item}>
            <View styles={styles.icon}><Text>haha</Text>
            </View>
            <View style={styles.itemText}>
                <Text style={styles.text}>Thời gian: {Date(props.time).toString()}</Text>
                <Text style={styles.text}>Địa chỉ IP: {props.ip}</Text>
                <Text style={styles.text}>Địa điểm: {props.location}</Text>
            </View>
        </View>
    );
}

export default function LoginLog() {
    const dbCtx = useContext(DatabaseContext);
    const authCtx = useContext(AuthContext);
    useEffect(
        () => dbCtx.fetchLoginHistory(authCtx.user.token.uid)
        , []
    )
    return (
        <SafeAreaView styles={styles.screen}>
            <Text style={{ fontWeight: '900', fontSize: 23, marginVertical: 10, marginLeft: 20 }}>Danh sách thiết bị</Text>
            <FlatList
                // [{ip:'144,123,222,131',location:...,time:...},....]
                data={dbCtx.loginHistory}
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
        borderTopWidth: 1.5,
        flexDirection: 'row'
    },
    itemText: {
        flex: 3,
        backgroundColor: 'blue'
    },
    icon: {
        flex: 2,
        // width: '100%',
        backgroundColor: 'red'
    },
    text: {
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: '600'
    }
})