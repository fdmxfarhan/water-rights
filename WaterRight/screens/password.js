import React, { useEffect, useState, useRef } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../components/colors';
import Header from '../components/header';
import Input from '../components/input';

const api = require('../config/api');
const {saveData, readData} = require('../config/save');

const password = (props) => {
    var [oldPassword, setOldPassword] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConf, setPasswordConf] = useState('');
    var [readOnce, setReadOnce] = useState(false);
    var [savedData, setSavedData] = useState();
    var [user, setUser] = useState({passwordSet: false});
    oldPasswordInput = useRef(null);
    passwordInput = useRef(null);
    passwordConfInput = useRef(null);
    var readUser = () => {
        readData().then(data => {
            setSavedData(data);
            if(data != null){
                api.post('/api/phone-login', {
                    phone: data.phone,
                }).then(res => {
                    if(res.data.correct){
                        setUser(res.data.user);
                    }
                }).catch(error => {
                    alert('خطا در برقراری ارتباط. لطفا اتصال اینترنت خود را چک کنید.')
                    console.log(error);
                });
            }
        });
    }

    var changePassword = () => {
        if(password != passwordConf){
            alert('تایید رمز عبور صحیح نیست.');
            return;
        }
        api.post('/api/change-password', {
            phone: user.phone,
            oldPassword,
            password,
            passwordConf,
        }).then(res => {
            if(res.data.done)   props.navigation.navigate('Home');
            else                alert(res.data.msg);
        }).catch(err => {
            alert('خطا در برقراری ارتباط. لطفا اتصال اینترنت خود را چک کنید.')
            console.log(err);
        })
    }

    useEffect(() => {
        if(!readOnce) {
            readUser();
        }
        readOnce = true;
        setReadOnce(true);
    });
    return(
        <View style={styles.container}>
            <Header title={'تغییر رمز عبور'} backID={'Home'} navigation={props.navigation}/>
            <View style={styles.inputsArea}>
                {user.passwordSet == false ? <View></View> : 
                    <Input 
                        secureTextEntry={true}
                        title={'رمز عبور قبلی'} 
                        setFunction={setOldPassword} 
                        refrence={oldPasswordInput} 
                        blurOnSubmit={false}
                        returnKeyType={'next'}
                        onSubmitEditing={() => passwordInput.current.focus()}/>
                }
                <Input 
                    secureTextEntry={true}
                    title={'رمز عبور جدید'} 
                    setFunction={setPassword} 
                    refrence={passwordInput} 
                    blurOnSubmit={false}
                    returnKeyType={'next'}
                    onSubmitEditing={() => passwordConfInput.current.focus()}/>
                <Input 
                    secureTextEntry={true}
                    title={'تایید رمز عبور'} 
                    setFunction={setPasswordConf} 
                    refrence={passwordConfInput} 
                    blurOnSubmit={false}
                    returnKeyType={'done'}
                    onSubmitEditing={() => {changePassword()}}/>
            </View>
            <View style={styles.submit}>
                <TouchableOpacity 
                    style={styles.submitButton}
                    onPress={() => {
                        changePassword();
                    }}>
                    <Text style={styles.submitText}>ثبت</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    inputsArea: {
        flex: 9,
        width: '90%',
        marginHorizontal: '5%',
    },
    submit: {
        flex: 1,
    },
    submitButton: {
        width: '90%',
        marginHorizontal: '5%',
    },
    submitText: {
        fontFamily: 'iransans',
        fontSize: 22,
        color: 'white',
        backgroundColor: colors.blue,
        paddingVertical: 5,
        borderRadius: 4,
        textAlign: 'center',
    },
});

export default password;