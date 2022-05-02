import React, { createContext, useState } from 'react';
import  { firebase } from '@react-native-firebase/database';
import publicIP from 'react-native-public-ip';

export const DatabaseContext = createContext(
    {
        fetchLoginHistory: () => { },
        fetchDeviceLog: () => { },
        updateLoginHistory: () => { },
        addDeviceLog: ()=>{},
        loginHistory: [],
        deviceLog: [],
    }
);

const db = firebase.app().database('https://bk-smart-home-default-rtdb.firebaseio.com/')
export default function DatabaseProvider({children}) {
    const [loginH, setLoginH] = useState([]);
    const [devLog, setDevLog] = useState([]);

    const fetchLoginHistoryHandler = (userId) => {
        if (!userId) return;
        db.ref('/users/'+userId+'/loginLog').once('value', snapshot => {
            const l = Object.entries(snapshot.val());
            l.sort((a,b)=>b[1].time-a[1].time)
            console.log(l)
            setLoginH(l);
        })
    }

    const updateLoginHistoryHandler = (userId) => {
      if (!userId) return;
      publicIP()
        .then(ip => {
          fetch('https://ipinfo.io/'+ip+'?token=c3e8fe3ca36e9e').then(response => response.json())
          .then(data=>{
            db.ref('/users/'+userId+'/loginLog').update(
              { [ip.split('.').join(',')]: 
                { 
                  time :Date.now(), 
                  location : data.city
                }
              }
              ).then(() => {
                console.log('loginLog updated');
            })
          })
          .catch(error => {
            console.log(error);
          });
        })

        fetchLoginHistoryHandler(userId);
    }
    
    const fetchDeviceLogHandler = (userId)=>{
      if (!userId) return;
      db.ref('/users/'+userId+'/devLog').once('value',snapshot=>{
            v=snapshot.val();
            setDevLog(v);
        })
    }

    const addDeviceLogHandler = (userId,device,log)=>{
      if (!userId) return;
      const newReference =db.ref('/users/'+userId+'/devLog').push();
      newReference.set({
        [device]:log
      }).then('deviceLog updated');
    }


    const context = {
        fetchLoginHistory:fetchLoginHistoryHandler,
        fetchDeviceLog:fetchDeviceLogHandler,
        updateLoginHistory:updateLoginHistoryHandler,
        addDeviceLog:addDeviceLogHandler,
        loginHistory:loginH,
        deviceLog:devLog,
    }
    return (
        <DatabaseContext.Provider
            value={context}
        >
            {children}
        </DatabaseContext.Provider>
    );
}

