import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import LoginStack from './LoginStack';
import Drawer from './MenuDrawer';
import {AuthContext} from '../scripts/AuthProvider';
import {DatabaseContext} from '../scripts/DatabaseProvider'

export default function Routes() {
  const {user} = useContext(AuthContext);
  const dbContext = useContext(DatabaseContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = token => {
    user.setToken(prev=>{
      if (token!=prev){
        if (token) dbContext.updateLoginHistory();
      }
      token=prev
    });
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user.token == null ? <LoginStack /> :<Drawer /> }
    </NavigationContainer>
  );
}
