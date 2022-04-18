import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';


/* Authentication */
export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [ userToken, setUserToken ] = useState(null);

    return (
        <AuthContext.Provider value={{
            user: {
                token: userToken,
                setToken: setUserToken,
            },
            login: async (email, password) => {
                try {
                    await auth().signInWithEmailAndPassword(email, password);
                    return 0;
                } catch (e) {
                    console.log(e);
                    return 1;
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
                } catch (e) {
                    console.log(e);
                }
            }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}