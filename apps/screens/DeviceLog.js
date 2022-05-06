import React, { useState, useContext, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    SectionList
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { DatabaseContext } from '../scripts/DatabaseProvider';
import { colors } from '../scripts/colors';
import { set } from 'react-native-reanimated';

function Log(props) {
    var time = new Date(props.time);
    time = time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear()
        + "  " + time.toLocaleTimeString();
    return (
        <View style={styles.item} >
            <View style={styles.icon}>
                <MaterialCommunityIcons
                    name={props.icon}
                    size={60}
                    color={colors.black}
                />
            </View>
            <View style={props.index === (props.length - 1) ? styles.itemTextLastChild : styles.itemText}>
                <Text style={styles.textHeader}>{props.status}</Text>
                <Text style={styles.text}>Thời gian: {time}</Text>
            </View>
        </View>
    );
}

export default function DeviceLog() {
    const dbCtx = useContext(DatabaseContext);
    const [isRefreshing, setIsRefreshing] = useState(true);
    
    useEffect(() => {
        return () => {
            dbCtx.setDeviceLog([]);
        }
    }, [])

    useEffect(()=>{
        if (isRefreshing) dbCtx.fetchDeviceLog(0,()=>setIsRefreshing(false));
    },[isRefreshing]);
    
    const allLogs = dbCtx.deviceLog;
    
    const data = [];
    for (let i = 0; i < allLogs.length;) {
        let j = i;
        const sess = [];
        while (j < allLogs.length) {
            if (new Date(allLogs[j].time).toDateString() == new Date(allLogs[i].time).toDateString()) {
                sess.push(allLogs[j]);
                ++j;
            }
            else break;
        }
        data.push({
            title:new Date(allLogs[i].time).toDateString(),
            data:sess
        });
        i = j;
    }
    return (
        <SafeAreaView style={styles.screen}>
            <SectionList
                sections={data}
                renderItem={({ item, index }) => <Log {...item} index={index} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.heading}>{title}</Text>
                  )}
                onEndReachedThreshold={0.3}
                onEndReached={()=>{
                    setIsRefreshing(true);
                    dbCtx.fetchDeviceLog(15,()=>setIsRefreshing(false))
                }}
                onRefresh={()=>{
                    setIsRefreshing(true);
                }}
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
    item: {
        paddingTop: 10,
        flexDirection: 'row',
        // backgroundColor: 'green'
    },
    itemTextLastChild: {
        flex: 4,
        paddingBottom: 10,
        // backgroundColor: 'blue'
    },
    itemText: {
        flex: 4,
        borderBottomColor: colors.lightGray,
        borderBottomWidth: 1,
        paddingBottom: 10,
        // backgroundColor: 'blue',
    },
    icon: {
        flex: 1,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    textHeader: {
        fontSize: 20,
        fontWeight: '700',
    },
    text: {
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: '600'
    },
    heading: {
        fontWeight: '900',
        fontSize: 23,
        marginVertical: 10,
        marginLeft: 20,
        color: colors.BKDarkBlue
    }
})