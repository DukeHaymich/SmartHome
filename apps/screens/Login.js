import React, {
    useContext,
    useRef,
    useState
} from 'react';
import {
    Image,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CheckBox from '@react-native-community/checkbox'

import { AuthContext } from '../scripts/context';
import { transform } from '@babel/core';

export default function Login() {
    const { auth, authDispatch } = useContext(AuthContext);
    const [ isFocused, setIsFocused ] = useState({
        username: false,
        password: false
    });
    const refInputUsername = useRef();
    const refInputPassword = useRef();

    const onRememberMeHandler = () => {
        authDispatch({type: 'REMEMBER-ME'});
    }

    const onLoginHandler = () => {
        authDispatch({type: 'LOG-IN'});
    }

    const onTextFocus = () => {
        
    }

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.screen}>
            {/* <BoxShadow setting={styles.logoShadow}> */}
                <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                />
            {/* </BoxShadow> */}
            <Text style = {styles.title}>SMART HOME</Text>
            <Text style = {styles.slogan}>Your choice to the future!</Text>
            <View style = {[styles.textContainer, (isFocused.username ? styles.textFocus : {})]}>
                <MaterialIcons
                    name='account-circle'
                    color={isFocused.username ? '#1488DB' : '#757575'}
                    size={30}
                />
                <TextInput
                    editable
                    placeholder='Nhập tên người dùng...'
                    returnKeyType='next'
                    autoFocus={true}
                    onSubmitEditing={() => refInputPassword.current.focus()}
                    onFocus={() => setIsFocused((prev) => ({...prev, username: true}))}
                    onBlur={() => setIsFocused((prev) => ({...prev, username: false}))}
                    blurOnSubmit={false}
                    ref={refInputUsername}
                    style={[styles.textBox, (isFocused.username ? styles.textBoxFocus : {})]}
                />
            </View>
            <View style={[styles.textContainer, (isFocused.password ? styles.textFocus : {})]}>
                <MaterialIcons
                    name='lock'
                    color={isFocused.password ? '#1488DB' : '#757575'}
                    size={30}
                />
                <TextInput
                    editable
                    placeholder='Nhập mật khẩu...'
                    returnKeyType='done'
                    ref={refInputPassword}
                    onFocus={() => setIsFocused((prev) => ({...prev, password: true}))}
                    onBlur={() => setIsFocused((prev) => ({...prev, password: false}))}
                    style={[styles.textBox, (isFocused.password ? styles.textBoxFocus : {})]}
                />
            </View>
            {/* <CheckBox
                disabled = {false}
            /> */}
            <TouchableOpacity 
                style={styles.checkBoxContainer}
                onPress={onRememberMeHandler}
                activeOpacity={1}>

                <CheckBox
                    disabled={false}
                    value={auth.rememberMe}
                    onValueChange={() => authDispatch({type: 'REMEMBER-ME'})}
                    style = {styles.checkBox}
                />
                <Text style = {styles.label}>Nhớ mật khẩu</Text>
            </TouchableOpacity>
            <Text style={styles.warning} numberOfLines={2}>
                Tên đăng nhập hoặc mật khẩu của bạn không hợp lệ
            </Text>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.6}
                onPress={onLoginHandler}>

                <Text style = {styles.labelButton}>
                    ĐĂNG NHẬP
                </Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <Text style={styles.forgotPass}> Quên mật khẩu? </Text>
                <TouchableHighlight>
                    <Text style={styles.labelFooter}>
                        Lấy lại ở đây   
                    </Text>
                </TouchableHighlight>
            </View>

        </SafeAreaView>
    </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: '33%',
        height: undefined,
        aspectRatio: 1,
        alignSelf: 'center',
        marginTop: '7.5%',
    },
    logoShadow: {
        width: 160,
        height: 170,
        color: "#000",
        border: 2,
        radius: 3,
        opacity: 0.2,
        x: 0,
        y: 3,
        style: { marginVertical: 5 }
    },
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        fontFamily: 'Roboto',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    title: {
        marginTop: '1%',
        fontSize: 45,
        color: '#003CD7',
        fontFamily: 'PaytoneOne-Regular',
        alignSelf: 'center'
    },
    slogan: {
        color: '#1488DB',
        fontSize: 16,
        fontStyle: 'italic',
        fontWeight: '500',
        marginBottom: '10%',
        alignSelf: 'center'
    },
    textContainer: {
        flexDirection: 'row',
        width: '80%',
        marginTop: 20,
        borderWidth: 3,
        borderBottomWidth: 3,
        borderBottomColor: '#A4A4A4',
        borderColor: '#fff',
        borderRadius: 0,
        alignSelf: 'center',
        alignItems: 'center',
        paddingLeft: 10,
    },
    textFocus: {
        borderColor: '#1488DB',
        borderRadius: 5,
        borderWidth: 3,
        borderBottomColor: '#1488DB',
    },
    textBox: {
        flex: 1,
        fontSize: 18,
        paddingLeft: 10,
        fontStyle: 'italic',
        color: '#757575',
        fontWeight: '500',
    },
    textBoxFocus: {
        color: '#1488DB',
    },
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        marginHorizontal: 50,
        marginBottom: '5%',
    },
    checkBox: {
        alignSelf: 'center',
        fontWeight: '600',
    },
    label: {
        marginLeft: 5,
        fontSize: 16,
        color: '#757575'
    },
    warning: {
        color: '#f000',
        fontStyle: 'italic',
        fontWeight: '700',
        width: '80%',
        marginHorizontal: 45,
        fontSize: 17,
        marginBottom: '10%',
    },
    button: {
        width: '80%',
        height: 45,
        backgroundColor: '#1DFF1D',
        borderRadius: 7.5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelButton:{
        color: "#FFFFFF",
        fontSize: 22,
        fontFamily: 'Nunito-ExtraBold',
        backgroundColor: '#0000',
    },
    labelFooter:{
        color: '#003CD7',
        fontSize: 17,
        fontFamily: 'Nunito-Regular'
    },
    forgotPass: {
        fontSize: 17,
        fontFamily: 'Nunito-Regular'

    },
    footer: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 20,
        fontStyle: 'italic',
    }
});
