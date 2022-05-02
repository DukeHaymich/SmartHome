import React, { createContext, useState, useEffect } from 'react';
import  database, { firebase } from '@react-native-firebase/database';
import { NetworkInfo } from 'react-native-network-info';
import publicIP from 'react-native-public-ip';
import { getMacAddress } from 'react-native-device-info';
import GetLocation from 'react-native-get-location'

export const DatabaseContext = createContext(
    {
        fetchLoginHistory: () => { },
        fetchDeviceLog: () => { },
        updateLoginHistory: () => { },
        loginHistory: [],
        deviceLog: []
    }
);

const db = firebase.app().database('https://bk-smart-home-default-rtdb.firebaseio.com/')

export default function DatabaseProvider({children}) {
    const [loginH, setLoginH] = useState([]);
    const [devLog, setDevLog] = useState([]);
    const fetchLoginHistoryHandler = () => {
        db.ref('/loginLog').once('value', snapshot => {
            v = snapshot.val();
            // console.log(v)
            // for (x in v) {
                // console.log(x);
            // }
            setLoginH(v);
        })
    }
    const updateLoginHistoryHandler = () => {
        const now = (new Date()).toString();
        
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        })
        .then(location => {
          console.log(location);
        })
        .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
        })
        getMacAddress().then(
          mac=>{
            console.log(mac);
          }
        )
        // publicIP()
        // .then(ip => {
        //   ip = ip.split('.').join(',')
        //   console.log(ip);
        //   db.ref('/loginLog').update({ [ip]: now }).then(() => {
        //       console.log('DataUpdated');
        //   })
        //   // '47.122.71.234'
        // })
        // .catch(error => {
        //   console.log(error);
        //   // 'Unable to get IP address.'
        // });
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

