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
import SelectDropdown from 'react-native-select-dropdown'

const register = (props) => {
  var [userInputColor, setUserInputColor] = useState('lightgray');
  var [passInputColor, setPassInputColor] = useState('lightgray');
  var [passConfirmInputColor, setPassConfirmInputColor] = useState('lightgray');
  const countries = ["Egypt", "Canada", "Australia", "Ireland"]

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
          <SelectDropdown
            data={countries}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
          />
          <Input title={'نام و نام خانوادگی'}/>
          <Input title={'کد ملی'}/>
          <Input title={'شماره شناسنامه'}/>
          <Input title={'تاریخ تولد'}/>
          <Input title={'نام پدر'} />
          <Input title={'جنسیت'} />
          <Input title={'آدرس'}/>
          <Input title={'کد پستی'} />
          <Input title={'تلفن ثابت'} />
          <Input title={'شغل'} />
          <Input title={'نام کاربری'}/>
          <Input title={'کلمه عبور'} />
          <Input title={'تایید کلمه عبور'} />

        </ScrollView>
      </View>
      <View style={styles.submit}>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={() => {props.navigation.navigate('Home')}}
          >
          <Text style={styles.submitText}>ثبت نام</Text>
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