import React, { createContext, useState } from 'react';
import { firebase } from '@react-native-firebase/database';
import publicIP from 'react-native-public-ip';
import DeviceInfo from 'react-native-device-info';
import { max } from 'react-native-reanimated';

export const DatabaseContext = createContext(
    {
        fetchLoginHistory: () => { },
        fetchDeviceLog: () => { },
        fetchMqttToken: () => { },
        updateLoginHistory: () => { },
        addDeviceLog: () => { },
        loginHistory: [],
        deviceLog: [],
        setDeviceLog: () => { },
        setLoginHistory: () => { },
        mqttToken: {
            username: '',
            password: ''
        }
    }
);

const db = firebase.app().database('https://bk-smart-home-default-rtdb.firebaseio.com/')
export default function DatabaseProvider({ children }) {
    const [loginH, setLoginH] = useState([]);
    const [devLog, setDevLog] = useState([]);
    const [mqttToken, setMqttToken] = useState({ username: "", password: "" });

    const fetchLoginHistoryHandler = (userId, fun = null) => {
        db.ref('/users/' + userId + '/loginLog').once('value', snapshot => {
            if (fun != null) fun();
            const o = snapshot.val();
            if (!o) return;
            const l = Object.keys(o).map(key => {
                return { ip: key.split(',').join('.'), ...o[key] };
            });
            l.sort((a, b) => b.time - a.time)
            setLoginH(l);
        })
    }

    const updateLoginHistoryAsync = async (userId) => {
        try {
            const ip = await publicIP();
            const os = await DeviceInfo.getSystemName();
            const model = await DeviceInfo.getDevice();
            const response = await fetch('https://ipinfo.io/' + ip + '?token=c3e8fe3ca36e9e')
            const data = await response.json()
            await db.ref('/users/' + userId + '/loginLog').update(
                {
                    [ip.split('.').join(',')]:
                    {
                        time: Date.now(),
                        location: data.city,
                        model: model,
                        os: os
                    }
                });
        }
        catch (error) {
            console.log('loginLog error: ' + error);
        };
    }

    const updateLoginHistoryHandler = (userId) => {
        if (!userId) return;
        new Promise(() => updateLoginHistoryAsync(userId));
    }

    const fetchDeviceLogHandler = (addMore = 15, fun = null) => {
        const oldLength = devLog.length;
        const ndevLog = [];
        db.ref('/devices').limitToLast(Math.max(15, oldLength + addMore)).once('value', s => {
            s.forEach((snapshot) => {
                ndevLog.push(snapshot.val());
            })
        }).then(() => {
            if (fun != null) fun();
            if (ndevLog.length == oldLength) {
                return;
            }
            ndevLog.reverse();
            setDevLog(ndevLog);
        })
    }

    const addDeviceLogHandler = (log) => {
        const newReference = db.ref('/devices').push();
        newReference.set(log);
    }

    const fetchMqttTokenHandler = (userId, fun) => {
        if (!userId) return null;
        db.ref('/users/' + userId + '/mqttToken').once('value', snapshot => {
            const v = snapshot.val();
            fun(v.username, v.password);
            setMqttToken(v);
        })
    }

    const context = {
        fetchLoginHistory: fetchLoginHistoryHandler,
        fetchDeviceLog: fetchDeviceLogHandler,
        fetchMqttToken: fetchMqttTokenHandler,
        updateLoginHistory: updateLoginHistoryHandler,
        addDeviceLog: addDeviceLogHandler,
        loginHistory: loginH,
        deviceLog: devLog,
        setDeviceLog: setDevLog,
        setLoginHistory: setLoginH,
        mqttToken: mqttToken
    }
    return (
        <DatabaseContext.Provider
            value={context}
        >
            {children}
        </DatabaseContext.Provider>
    );
}

