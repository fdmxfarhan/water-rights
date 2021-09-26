import React, { useState } from 'react';
import {StyleSheet,View,Text,TextInput} from 'react-native';
import colors, { lightblue } from '../components/colors';

export default Input = ({navigation, title, setFunction, refrence, onSubmitEditing, returnKeyType, blurOnSubmit, keyboardType}) => {
  var [userInputColor, setUserInputColor] = useState('lightgray');

  return(
    <View>
      <TextInput
        style={[styles.textInput, {borderBottomColor: userInputColor}]}
        placeholder={title}
        onChange={(text) => {setFunction(text.nativeEvent.text)}}
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
        marginTop: 20,
        textAlign: 'right',
      },
      
});