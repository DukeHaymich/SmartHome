import React, { useContext, useState, useReducer, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
    SectionList
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DatabaseContext } from '../scripts/DatabaseProvider';
import { AuthContext } from '../scripts/AuthProvider';

import { colors } from '../scripts/colors';

function Log(props) {
    var time = new Date(props.time);
    time = time.getDate() + "/" + time.getMonth() + "/" + time.getFullYear()
        + "  " + time.toLocaleTimeString();
    return (
        <View style={styles.item}>
            <View style={styles.icon}>
                <FontAwesome
                    name={props.os == 'Android' ? 'android' : 'apple'}
                    size={70}
                    color={props.os == 'Android' ? '#99cc33' : '#c4c4c4'}
                />
            </View>
            <View style={props.index === (props.length - 1) ? styles.itemTextLastChild : styles.itemText}>
                <Text style={styles.textHeader}>{props.model}</Text>
                <Text style={styles.text}>Thời gian: {time}</Text>
                <Text style={styles.text}>Địa chỉ IP: {props.ip}</Text>
                <Text style={styles.text}>Địa điểm: {props.location}</Text>
            </View>
        </View>
    );
}

export default function LoginLog() {
    const dbCtx = useContext(DatabaseContext);
    const authCtx = useContext(AuthContext);
    const [isRefreshing, setIsRefreshing] = useState(true);
    useEffect(()=>{
        return ()=>{
            dbCtx.setLoginHistory([]);
        }
    }, [])
    useEffect(()=>{
        if (isRefreshing) dbCtx.fetchLoginHistory(authCtx.user.token.uid,()=>{setIsRefreshing(false);});
    },[isRefreshing]);
    return (
        <SafeAreaView style={styles.screen}>
            <SectionList
                sections={[{title:"Danh sách thiết bị",data:dbCtx.loginHistory}]}
                renderItem={({ item, index }) => <Log {...item} index={index} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.heading}>{title}</Text>
                  )}
                onRefresh={()=>setIsRefreshing(true)}
                refreshing={isRefreshing}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    heading: {
        fontWeight: '900',
        fontSize: 23,
        marginVertical: 10,
        marginLeft: 20,
    },
    item: {
        paddingTop: 10,
        flexDirection: 'row',
    },
    itemTextLastChild: {
        flex: 4,
        paddingBottom: 10,
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
    textHeader: {
        fontSize: 18,
        fontWeight: '700'
    },
    text: {
        fontSize: 16,
        fontWeight: '500'
    }
})