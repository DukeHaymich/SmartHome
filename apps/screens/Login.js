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

import { AuthContext } from '../scripts/AuthProvider';
import { colors } from '../scripts/colors';

export default function Login() {
    const { login } = useContext(AuthContext);
    const [ isFocused, setIsFocused ] = useState({
        username: false,
        password: false
    });
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ warningText, setWarningText ] = useState("");
    const refInputUsername = useRef();
    const refInputPassword = useRef();

    const onRememberMeHandler = () => {
        // authDispatch({type: 'REMEMBER-ME'});
    }

    const onLoginHandler = () => {
        if (username.length == 0) {
            setWarningText('Tên đăng nhập không được để trống!');
        } else if (password.length == 0) {
            setWarningText('Bạn chưa điền mật khẩu!');
        } else {
            login(username, password).then((err) => {
                if (err == 'invalid-email') {
                    setWarningText('Sai định dạng địa chỉ email!');
                } else if (err == 'bad-identity') {
                    setWarningText('Địa chỉ email hoặc mật khẩu của bạn không hợp lệ!');
                } else if (err == 'unhandled-exception') {
                    setWarningText('Lỗi chưa được xử lý! Hãy liên hệ nhà phát hành ứng dụng để xử lý lỗi này.');
                }
            });
        }
    }

    const onUsernameFocus = () => {
        setIsFocused((prev) => ({...prev, username: true}));
    }

    const onUsernameBlur = () => {
        if (username) {
            setWarningText('');
        }
        setIsFocused((prev) => ({...prev, username: false}));
    }
    
    const onPasswordFocus = () => {
        setIsFocused((prev) => ({...prev, password: true}));
    }
    
    const onPasswordBlur = () => {
        if (password) {
            setWarningText('');
        }
        setIsFocused((prev) => ({...prev, password: false}));
    }

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.screen}>
            {/* <Shadow setting={styles.logoShadow}> */}
                <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                />
            {/* </Shadow> */}
            <Text style = {styles.title}>SMART HOME</Text>
            <Text style = {styles.slogan}>Your choice to the future!</Text>
            <View style = {[styles.textContainer, (isFocused.username ? styles.textFocus : {})]}>
                <MaterialIcons
                    name='email'
                    color={isFocused.username ? colors.BKLightBlue : colors.gray}
                    size={30}
                />
                <TextInput
                    editable
                    placeholder='Nhập địa chỉ email...'
                    placeholderTextColor={isFocused.username ? colors.lightGray : colors.lightGray}
                    value={username}
                    returnKeyType='next'
                    autoFocus={true}
                    onSubmitEditing={() => refInputPassword.current.focus()}
                    onFocus={onUsernameFocus}
                    onBlur={onUsernameBlur}
                    onChangeText={(value) => setUsername(value)}
                    blurOnSubmit={false}
                    ref={refInputUsername}
                    style={[styles.textBox,
                        (isFocused.username ? styles.textBoxFocus : {}),
                        (username.length != 0 ? styles.textBoxHoldValue : {})
                    ]}
                />
            </View>
            <View style={[styles.textContainer, (isFocused.password ? styles.textFocus : {})]}>
                <MaterialIcons
                    name='lock'
                    color={isFocused.password ? colors.BKLightBlue : colors.gray}
                    size={30}
                />
                <TextInput
                    editable
                    value={password}
                    placeholder='Nhập mật khẩu...'
                    placeholderTextColor={isFocused.password ? colors.lightGray : colors.lightGray}
                    secureTextEntry={true}
                    returnKeyType='done'
                    ref={refInputPassword}
                    onFocus={onPasswordFocus}
                    onBlur={onPasswordBlur}
                    onChangeText={(value) => setPassword(value)}
                    style={[styles.textBox,
                        (isFocused.password ? styles.textBoxFocus : {}),
                        (password.length != 0 ? styles.textBoxHoldValue : {})
                    ]}
                />
            </View>
            <TouchableOpacity 
                style={styles.checkBoxContainer}
                onPress={onRememberMeHandler}
                activeOpacity={1}>

                <CheckBox
                    disabled={false}
                    value={false}
                    onValueChange={() => {}}
                    style = {styles.checkBox}
                />
                <Text style = {styles.label}>Nhớ mật khẩu</Text>
            </TouchableOpacity>
            <Text style={styles.warning} numberOfLines={2}>
                {warningText}
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
        color: colors.black,
        border: 0,
        radius: 1,
        opacity: 0.2,
        x: 0,
        y: 1,
        style: { marginVertical: 0 }
    },
    screen: {
        flex: 1,
        backgroundColor: colors.background,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        fontFamily: 'Roboto',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    title: {
        marginTop: '1%',
        fontSize: 45,
        color: colors.BKDarkBlue,
        fontFamily: 'PaytoneOne-Regular',
        alignSelf: 'center'
    },
    slogan: {
        color: colors.BKLightBlue,
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
        borderBottomWidth: 3,
        borderBottomColor: colors.lightGray,
        borderRadius: 0,
        alignSelf: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        backgroundColor: colors.background,
    },
    textFocus: {
        borderRadius: 5,
        borderBottomWidth: 3,
        borderBottomColor: colors.primary,
        backgroundColor: colors.white,
        shadowColor: colors.BKLightBlue,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    textBox: {
        flex: 1,
        fontSize: 18,
        paddingLeft: 10,
        fontStyle: 'italic',
        color: colors.gray,
        fontWeight: '400',
    },
    textBoxFocus: {
        color: colors.primary,
    },
    textBoxHoldValue: {
        fontStyle: 'normal',
        fontWeight: '600',
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
    },
    label: {
        marginLeft: 5,
        fontSize: 16,
        color: colors.gray,
        fontWeight: '600',
    },
    warning: {
        color: 'red',
        fontStyle: 'italic',
        fontWeight: '600',
        width: '80%',
        marginHorizontal: 45,
        fontSize: 17,
        marginBottom: '10%',
    },
    button: {
        width: '80%',
        height: 45,
        backgroundColor: colors.neon,
        borderRadius: 7.5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelButton:{
        color: colors.white,
        fontSize: 22,
        fontFamily: 'Nunito-ExtraBold',
        backgroundColor: colors.transparent,
    },
    labelFooter:{
        color: colors.BKDarkBlue,
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
