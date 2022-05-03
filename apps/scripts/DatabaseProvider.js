import React, { createContext, useState } from 'react';
import { firebase } from '@react-native-firebase/database';
import publicIP from 'react-native-public-ip';
import DeviceInfo from 'react-native-device-info';

export const DatabaseContext = createContext(
    {
        fetchLoginHistory: () => { },
        fetchDeviceLog: () => { },
        fetchMqttToken: () => { },
        updateLoginHistory: () => { },
        addDeviceLog: () => { },
        loginHistory: [],
        deviceLog: [],
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

    const fetchLoginHistoryHandler = (userId) => {
        if (!userId) return;
        db.ref('/users/' + userId + '/loginLog').once('value', snapshot => {
            const o = snapshot.val();
            if (!o) return;
            const l = Object.keys(o).map(key => {
                return { ip: key.split(',').join('.'), ...o[key] };
            });
            l.sort((a, b) => b.time - a.time)
            // console.log(l)
            setLoginH(l);
        })
    }

    const updateLoginHistoryAsync = async (userId) => {
        try {
            const ip = await publicIP();
            const os = await DeviceInfo.getSystemName();
            const model = await DeviceInfo.getDevice();
            console.log([os, model].join(','))
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
            console.log('loginLog updated')
        }
        catch (error) {
            console.log('loginLog error: ' + error);
        };
    }

    const updateLoginHistoryHandler = (userId) => {
        if (!userId) return;
        new Promise(() => updateLoginHistoryAsync(userId));

        // fetchMqttTokenHandler(userId, (username, password) => console.log("username: " + username + "password: " + password));
        // fetchLoginHistoryHandler(userId);
        // addDeviceLogHandler({ device: "Fan", status: "ON", time: Date.now() })
        // fetchDeviceLogHandler();
    }

    const fetchDeviceLogHandler = () => {
        db.ref('/devices').once('value', snapshot => {
            const o = snapshot.val();
            if (!o) return;
            const v = Object.values(o);
            v.sort((a, b) => b.time - a.time);
            // console.log(v);
            setDevLog(v);
        })
    }

    const addDeviceLogHandler = (log) => {
        const newReference = db.ref('/devices').push();
        newReference.set(log).then(() => console.log('deviceLog updated'));
    }

    const fetchMqttTokenHandler = (userId, fun) => {
        if (!userId) return null;
        db.ref('/users/' + userId + '/mqttToken').once('value', snapshot => {
            const v = snapshot.val();
            // console.log(v);
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

