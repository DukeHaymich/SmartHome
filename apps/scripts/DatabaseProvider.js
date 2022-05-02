import React, { createContext, useState, useEffect } from 'react';
import  database, { firebase } from '@react-native-firebase/database';
import { NetworkInfo } from 'react-native-network-info';

export const DatabaseContext = createContext(
    {
        fetchLoginHistory: ()=>{},
        fetchDeviceLog: ()=>{},
        updateLoginHistory:()=>{},
        loginHistory:[],
        deviceLog:[]
    }
);

const db = firebase.app().database('https://bk-smart-home-default-rtdb.firebaseio.com/')

export default function DatabaseProvider({children}) {
    const [loginH, setLoginH] = useState([]);
    const [devLog, setDevLog] = useState([]);
    const fetchLoginHistoryHandler = ()=>{
        db.ref('/loginLog').once('value',snapshot=>{
            v=snapshot.val();
            console.log(v)
            for (x in v){
            console.log(x);
            }
            setLoginH(v);
        })
    }
    const updateLoginHistoryHandler = ()=>{
        const now=(new Date()).toString();
        NetworkInfo.getIPV4Address().then(ipv4Address => {
        ipv4Address=ipv4Address.split('.').join(',')
        console.log(ipv4Address);
        db.ref('/loginLog').update({[ipv4Address]:now}).then(()=>{
            console.log('DataUpdated');
        })
        });
    }
    
    const fetchDeviceLogHandler = ()=>{
        db.ref('/users').once('value',snapshot=>{
            v=snapshot.val();
            console.log(v)
            for (x in v){
            console.log(x);
            }
            setDevLog(v);
        })
    }

    const context = {
        fetchLoginHistory:fetchLoginHistoryHandler,
        fetchDeviceLog:fetchDeviceLogHandler,
        updateLoginHistory:updateLoginHistoryHandler,
        loginHistory:loginH,
        deviceLog:devLog
    }
    return (
        <DatabaseContext.Provider
            value={context}
        >
            {children}
        </DatabaseContext.Provider>
    );
}

