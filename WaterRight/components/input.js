import React, { useState } from 'react';
import {StyleSheet,View,Text,TextInput} from 'react-native';
import colors, { lightblue } from '../components/colors';

export default Input = ({navigation, title, setFunction, refrence, onSubmitEditing, returnKeyType, blurOnSubmit, keyboardType}) => {
  var [userInputColor, setUserInputColor] = useState('lightgray');
  var [displayLabel, setDisplayLabel] = useState('none');

  return(
    <View>
      <Text style={[styles.label]}>{title}: </Text>
      <TextInput
        style={[styles.textInput, {borderBottomColor: userInputColor}]}
        placeholder={title}
        onChange={(text) => {
          setFunction(text.nativeEvent.text)
          if(text.nativeEvent.text != '')
            setDisplayLabel('flex');
          else
            setDisplayLabel('none');
        }}
        onFocus={() => {setUserInputColor(colors.lightblue)}}
        onBlur={() => {setUserInputColor('lightgray')}}
        blurOnSubmit={blurOnSubmit}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        ref={refrence}
        keyboardType={keyboardType}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    fontFamily: 'iransans',
    borderBottomWidth: 2,
    textAlign: 'right',
    marginTop: 0,
    paddingTop: 0,
  },
  label: {
    fontFamily: 'iransans',
    marginTop: 20,
    fontSize: 10,
    color: colors.gray,
  },
});