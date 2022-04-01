import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'


const CustomDrawer = (props) => {
  return (
    <View style = {{flex:1}}>
        <DrawerContentScrollView {...props}>
            <ImageBackground source={require('../assets/images/Background.jpg')} style={{padding: 20, marginTop: -4}}>
                <Image source={require('../assets/images/Avatar.jpg')} 
                    style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
                />
                <Text style={{color: '#fff', fontFamily: 'Nunito-Bold', fontSize: 18}}>Sơn Nguyễn</Text>
            </ImageBackground> 
            <View style={{flex:1, backgroundColor: '#fff', paddingTop: 10}}>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    </View>
  )
}

export default CustomDrawer