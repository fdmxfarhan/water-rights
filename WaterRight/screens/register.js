import React, { useState } from 'react';
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

const register = (props) => {
  var [userInputColor, setUserInputColor] = useState('lightgray');
  var [passInputColor, setPassInputColor] = useState('lightgray');
  var [passConfirmInputColor, setPassConfirmInputColor] = useState('lightgray');
  return(
    <View style={styles.container}>
      <View style={styles.loginArea}>
        <ScrollView>
          <View style={styles.label}>
            <View style={styles.labelIcon}>
              <Icon name="user" style={styles.icon}/>
            </View>
            <Text style={styles.labelText}> ثبت نام </Text>
          </View>

          <Input title={'نام و نام خانوادگی'}/>
          <Input title={'کد ملی'}/>
          <Input title={'شماره شناسنامه'}/>
          <Input title={'تاریخ تولد'}/>
          <Input title={'نام پدر'}/>
          <Input title={'جنسیت'}/>
          <Input title={'آدرس'}/>
          <Input title={'کد پستی'}/>
          <Input title={'تلفن ثابت'}/>
          <Input title={'شغل'}/>
          <Input title={'نام کاربری'}/>
          <Input title={'کلمه عبور'}/>
          <Input title={'تایید کلمه عبور'}/>

          {/* <TextInput 
            style={[styles.textInput, {borderBottomColor: userInputColor}]}
            placeholder={'نام و نام خانوادگی'}
            onChange={(text) => {}}
            onFocus={() => {setUserInputColor(colors.lightblue)}}
            onBlur={() => {setUserInputColor('lightgray')}}
          />
          <TextInput 
            style={[styles.textInput, {borderBottomColor: passInputColor}]}
            placeholder={'کلمه عبور'}
            onChange={(text) => {}}
            onFocus={() => {setPassInputColor(colors.lightblue)}}
            onBlur={() => {setPassInputColor('lightgray')}}
          />
          <TextInput 
            style={[styles.textInput, {borderBottomColor: passConfirmInputColor}]}
            placeholder={'تایید کلمه عبور'}
            onChange={(text) => {}}
            onFocus={() => {setPassConfirmInputColor(colors.lightblue)}}
            onBlur={() => {setPassConfirmInputColor('lightgray')}}
          /> */}
          
          {/* <TouchableOpacity>
            <Text style={styles.forgotPassword}>کلمه عبور خود را فراموش کرده ام.</Text>
          </TouchableOpacity>
          <Text style={styles.paragraph}>
            با ورود به اپلیکیشن میراب می‌توانید حساب های خود را مدیریت کنید و انتقال شارژ انجام دهید.
          </Text> */}
        </ScrollView>
      </View>
      <View style={styles.submit}>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={() => {props.navigation.navigate('Home')}}
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

export default register;