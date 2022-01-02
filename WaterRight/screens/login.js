import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import colors from '../components/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = require('../config/api');
const {saveData, readData} = require('../config/save');


const login = (props) => {
  var [userInputColor, setUserInputColor] = useState('lightgray');
  var [passInputColor, setPassInputColor] = useState('lightgray');
  var [username, setUsername] = useState('');
  var [password, setPassword] = useState('');
  var passwordInput = useRef(null);
  var checkLogin = ()=>{
    api.post('/api/login', {
        username: username,
        password: password,
      }).then(function (res) {
        // console.log(res.data);
        if(res.data.correct){
          saveData({username, password, phone: res.data.user.phone, user: res.data.user}).then(() => {
            if(res.data.user.passwordSet)
              props.navigation.navigate('Home');
            else
              props.navigation.navigate('Password');
          });
        }
        else{
          alert(res.data.msg)
        }
      }).catch(function (error) {
        alert('خطا در برقراری ارتباط. لطفا اتصال اینترنت خود را چک کنید.')
        console.log(error);
      });
  }
  return(
    <View style={styles.container}>
      <View style={styles.loginArea}>
        <View style={styles.label}>
          <View style={styles.labelIcon}>
            <Icon name="sign-in" style={styles.icon}/>
          </View>
          <Text style={styles.labelText}> ورود </Text>
        </View>
        <TextInput 
          style={[styles.textInput, {borderBottomColor: userInputColor}]}
          placeholder={'کد ملی (کد ملی یا شماره تلفن)'}
          onChange={(text) => {setUsername(text.nativeEvent.text)}}
          onFocus={() => {setUserInputColor(colors.lightblue)}}
          onBlur={() => {setUserInputColor('lightgray')}}
          blurOnSubmit={false}
          returnKeyType={'next'}
          onSubmitEditing={()=>passwordInput.current.focus()}
        />
        <TextInput 
          secureTextEntry={true}
          style={[styles.textInput, {borderBottomColor: passInputColor}]}
          placeholder={'کلمه عبور'}
          onChange={(text) => {setPassword(text.nativeEvent.text)}}
          onFocus={() => {setPassInputColor(colors.lightblue)}}
          onBlur={() => {setPassInputColor('lightgray')}}
          ref={passwordInput}
          onSubmitEditing={() => checkLogin()}
        />
        <TouchableOpacity onPress={() => props.navigation.navigate('PhoneLogin')}>
          <Text style={styles.forgotPassword}>کلمه عبور خود را فراموش کرده ام.</Text>
        </TouchableOpacity>
        <Text style={styles.paragraph}>
          با ورود به اپلیکیشن میراب می‌توانید حساب های خود را مدیریت کنید و انتقال شارژ انجام دهید.
        </Text>
      </View>
      <View style={styles.submit}>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={() => {checkLogin()}}
          >
          <Text style={styles.submitText}>ورود</Text>
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
  loginArea: {
    flex: 8,
    paddingHorizontal: 20,
    paddingVertical: 30,
    writingDirection: 'rtl',
    textAlign: 'right',
    direction: 'rtl',
  },
  label: {
    flexDirection: 'row-reverse',
  },
  labelIcon: {
    flex: 1,
    textAlign: 'right',
  },
  labelText: {
    flex: 10,
    fontSize: 25,
    paddingTop: 0,
    color: colors.blue,
    fontFamily: 'iransans',
  },
  icon: {
    fontSize: 25,
    paddingTop: 7,
    color: colors.blue,
    fontFamily: 'iransans',
  },
  textInput: {
    fontFamily: 'iransans',
    borderBottomWidth: 2,
    marginTop: 30,
    textAlign: 'right',
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
  forgotPassword: {
    color: colors.blue,
    marginTop: 30,
    fontFamily: 'iransans',
    fontSize: 18,
  },
  paragraph: {
    color: colors.description,
    marginTop: 30,
    fontFamily: 'iransans',
    fontSize: 16,
  }
});

export default login;