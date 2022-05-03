import React, { useContext, useReducer, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DatabaseContext } from '../scripts/DatabaseProvider';
import { AuthContext } from '../scripts/AuthProvider';

import { colors } from '../scripts/colors';

function Log(props) {
    return (
        <View style={styles.item}>
            <View style ={styles.icon}>
                <FontAwesome
                    name={props.os == 'Android' ? 'android' : 'apple'}
                    size={70}
                    color={props.os == 'Android' ? '#99cc33' : '#c4c4c4'}
                />
            </View>
            <View style={props.index === (props.length - 1) ? styles.itemTextLastChild : styles.itemText}>
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
                renderItem={({ item,index }) => <Log {...item} index = {index} length = {dbCtx.loginHistory.length}/>}
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
        // paddingRight: ,
        // backgroundColor: 'blue',
        // padding: 5
    },
    icon: {
        flex: 1,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10
        // padding: 5
        // padding: 5
    },
    text: {
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: '600'
    }
})