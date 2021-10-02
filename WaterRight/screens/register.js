import React, { useState, useRef, useEffect } from 'react';
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
import Dinput from '../components/Dinput';
import DateInput from '../components/DateInput';
import Select from '../components/select';

const api = require('../config/api');
const {saveData, readData} = require('../config/save');


const register = (props) => {
  var [firstName, setFirstName] = useState('');
  var [lastName, setLastName] = useState('');
  var [idNumber, setIdNumber] = useState('');
  var [cardNumber, setCardNumber] = useState('');
  var [fatherName, setFatherName] = useState('');
  var [job, setJob] = useState('');
  var [sex, setSex] = useState('آقا');
  var [phone, setPhone] = useState('');
  
  firstNameInput = useRef(null);
  lastNameInput = useRef(null);
  idNumberInput = useRef(null);
  cardNumberInput = useRef(null);
  fatherNameInput = useRef(null);
  jobInput = useRef(null);

  useEffect(() => {
    setPhone(props.route.params.phone);
  })

  var submitForm = () => {
    api.post('/api/compelete-reg', {
      firstName,
      lastName,
      idNumber,
      cardNumber,
      fatherName,
      job,
      sex,
      phone
    }).then((res) => {
      if(res.data.correct){
        saveData({phone: phone, user: res.data.user}).then(() => {
          props.navigation.navigate('Home');
        })
      }
    }).catch((error) => {
      alert('خطا در برقراری ارتباط. لطفا اتصال اینترنت خود را چک کنید.')
      console.log(error);
    });
  }

  return(
    <View style={styles.container}>
      <View style={styles.loginArea}>
        <ScrollView>
          <View style={styles.label}>
            <View style={styles.labelIcon}>
              <Icon name="user" style={styles.icon}/>
            </View>
            <Text style={styles.labelText}> اطلاعات حساب کاربری </Text>
          </View>
          
          <Dinput 
            title={'نام'} 
            title2={'نام خانوادگی'} 
            setFunction={setFirstName} 
            setFunction2={setLastName} 
            blurOnSubmit={false}
            returnKeyType={'next'}
            onSubmitEditing={() => idNumberInput.current.focus()}/>
          <Input 
            title={'کد ملی'} 
            setFunction={setIdNumber} 
            refrence={idNumberInput} 
            blurOnSubmit={false}
            returnKeyType={'next'}
            onSubmitEditing={() => cardNumberInput.current.focus()}/>
          <Input 
            title={'شماره شناسنامه'} 
            setFunction={setCardNumber} 
            refrence={cardNumberInput} 
            blurOnSubmit={false}
            returnKeyType={'next'}
            onSubmitEditing={() => fatherNameInput.current.focus()}/>
          <Input 
            title={'نام پدر'} 
            setFunction={setFatherName} 
            refrence={fatherNameInput} 
            blurOnSubmit={false}
            returnKeyType={'next'}
            onSubmitEditing={() => jobInput.current.focus()}/>
          <Input 
            title={'شغل'} 
            setFunction={setJob} 
            blurOnSubmit={true}
            returnKeyType={'done'}
            refrence={jobInput}/>
          <Select 
            title={'جنسیت'}
            setFunction={setSex} />
        </ScrollView>
      </View>
      <View style={styles.submit}>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={submitForm}
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