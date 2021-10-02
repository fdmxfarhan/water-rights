import React, { useState, useRef } from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import colors, { lightblue } from './colors';

export default DateInput = ({navigation, title, title2, setFunction, setFunction2, refrence, onSubmitEditing, returnKeyType, blurOnSubmit, keyboardType}) => {
  var [userInputColor, setUserInputColor] = useState('lightgray');
  var [userInputColor2, setUserInputColor2] = useState('lightgray');
  var nextInput = useRef(null)
  return(
    <View style={styles.container}>
      <TextInput
        style={[styles.textInput, {borderBottomColor: userInputColor}]}
        placeholder={title}
        onChange={(text) => {setFunction(text.nativeEvent.text)}}
        onFocus={() => {setUserInputColor(colors.lightblue)}}
        onBlur={() => {setUserInputColor('lightgray')}}
        blurOnSubmit={false}
        returnKeyType={'next'}
        onSubmitEditing={() => nextInput.current.focus()}
        ref={refrence}
      />
      <TextInput
        style={[styles.textInput, {borderBottomColor: userInputColor2}]}
        placeholder={title2}
        onChange={(text) => {setFunction2(text.nativeEvent.text)}}
        onFocus={() => {setUserInputColor2(colors.lightblue)}}
        onBlur={() => {setUserInputColor2('lightgray')}}
        blurOnSubmit={blurOnSubmit}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        ref={nextInput}
        keyboardType={keyboardType}
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row-reverse',

    },
    textInput: {
        flex: 1,
        fontFamily: 'iransans',
        borderBottomWidth: 2,
        marginTop: 20,
        textAlign: 'right',
        width: '98%',
        marginHorizontal: '1%',
    },
      
});