import React, { createContext, useReducer } from 'react';
import uuid from 'react-native-uuid';


/* Authorization */
export const AuthContext = createContext();

export default function AuthProvider(props) {
    const [ auth, authDispatch ] = useReducer((state, action) => {
        switch (action.type) {
            case 'LOG-IN':
                return {
                    ...state,
                    userToken: uuid.v4()
                };
            case 'LOG-OUT':
                return {
                    ...state,
                    userToken: null,
                    rememberMe: false
                };
            case 'REMEMBER-ME':
                return {
                    ...state,
                    rememberMe: !state.rememberMe
                }
            default:
                return state;
        }
    },
    {
        userToken: null,
        rememberMe: false
    });

    return (
        <AuthContext.Provider value={{auth, authDispatch}}>
            {props.children}
        </AuthContext.Provider>
    );
}