import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';


import MqttService from '../core/services/MqttService';

/* Authentication */
export const AuthContext = createContext();

export default function AuthProvider({children}) {
  const [userToken, setUserToken] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user: {
          token: userToken,
          setToken: setUserToken,
        },
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
            return 'OK';
          } catch (e) {
            switch (true) {
              case e.message.includes('invalid-email'):
                return 'invalid-email';
              case e.message.includes('user-not-found'):
              case e.message.includes('wrong-password'):
                return 'bad-identity';
              case e.message.includes('network-request-failed'):
                return 'network-issue';
              default:
                console.log(e)
                return 'unhandled-exception';
            }
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
            if (MqttService && MqttService.isConnected) {
                MqttService.disconnect();
            }
          } catch (e) {
            console.log(e);
          }
        },
        theme: {
          isDarkMode: isDarkMode,
          toggleDarkMode: () => {setIsDarkMode(!isDarkMode)},
        }
      }}>
      {children}
    </AuthContext.Provider>
  );
}
