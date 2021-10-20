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
import Input from '../components/input';
import Input2 from '../components/input2';
import SubmitButton from '../components/submitButton';
import ConfirmInput from '../components/confirmInput';

const api = require('../config/api');
const {saveData, readData} = require('../config/save');

const phoneLogin = (props) => {
  var [phone, setPhone] = useState('lightgray');
  var [smsCode, setSmsCode] = useState('lightgray');
  var [buttonText, setButtonText] = useState('ارسال رمز یکبار مصرف');
  var [smsSent, setSmsSent] = useState(false);
  var [userExist, setUserExist] = useState(false);

  var phoneInput = useRef(null);
  var codeInput = useRef(null);

  const countries = ["Egypt", "Canada", "Australia", "Ireland"]

  var sendConfirmation = () => {
    api.post('/api/sendsms', {
      phone: phone,
    }).then(function (res) {
      // console.log(res.data);
      if(res.data.smsSent){
        setSmsSent(true);
        setUserExist(res.data.userExist);
        setButtonText('بررسی');
        codeInput.current.focus();
      }
    }).catch(function (error) {
      alert('خطا در برقراری ارتباط. لطفا اتصال اینترنت خود را چک کنید.')
      console.log(error);
    });
  }
  var checkCode = () => {
    api.post('/api/check-code', {
      phone: phone,
      smsCode: smsCode,
    }).then(function (res) {
      if(res.data.correct){
        if(userExist){
          saveData({phone: phone, user: res.data.user}).then(() => {
            props.navigation.navigate('Home');
          })
        }else{
          alert('شماره تلفن همراه یافت نشد.');
          // props.navigation.navigate('Register', {phone: phone});
        }
      }
      else{
        alert('رمز عبور اشتباه است.')
      }
    }).catch(function (error) {
      alert('خطا در برقراری ارتباط. لطفا اتصال اینترنت خود را چک کنید.')
    });
  }

  return(
    <View style={styles.container}>
      <View style={styles.loginArea}>
        <ScrollView>
          <View style={styles.label}>
            <View style={styles.labelIcon}>
              <Icon name="phone" style={styles.icon}/>
            </View>
            <Text style={styles.labelText}> شماره تلفن خود را وارد کنید </Text>
          </View>
          <Input 
            title={'شماره موبایل   09XXXXXXXXX'}
            setFunction={setPhone}
            refrence={phoneInput}
            blurOnSubmit={false}
            onSubmitEditing={sendConfirmation}
            returnKeyType={'next'}
            keyboardType={'number-pad'}
          />
          <ConfirmInput 
            visible={smsSent}
            setFunction={setSmsCode}
            refrence={codeInput}
            blurOnSubmit={true}
            onSubmitEditing={checkCode}
            returnKeyType={'done'}
          />
          <Text style={styles.paragraph}>
            پس از وارد کردن شماره تلفن همراه، رمز عبور یکبار مصرف برای شما ارسال می‌شود.
          </Text>
        </ScrollView>
      </View>
      <View style={styles.submit}>
        <SubmitButton onPressFunc={() => {
          if(smsSent) checkCode()
          else sendConfirmation()
        }} text={buttonText} />
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
    marginTop: 20,
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

export default phoneLogin;