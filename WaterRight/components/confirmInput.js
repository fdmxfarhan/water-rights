import React, { useState } from 'react';
import {StyleSheet,View,Text,TextInput} from 'react-native';
import colors, { lightblue } from '../components/colors';

export default ConfirmInput = ({navigation, visible, setFunction, refrence, onSubmitEditing, returnKeyType, blurOnSubmit}) => {
  var [userInputColor, setUserInputColor] = useState('lightgray');
  if(visible){
    return(
        <View>
            <Text style={styles.label}>رمز یکبار مصرف را وارد کنید</Text>
            <TextInput
                style={[styles.textInput, {borderBottomColor: userInputColor}]}
                placeholder={'-  -  -  -'}
                onChange={(text) => {setFunction(text.nativeEvent.text)}}
                onFocus={() => {setUserInputColor(colors.lightblue)}}
                onBlur={() => {setUserInputColor('lightgray')}}
                blurOnSubmit={blurOnSubmit}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                ref={refrence}
                keyboardType={'number-pad'}
                maxLength={4}
            />
        </View>
    )
  }
  else return(<View></View>)
}

const styles = StyleSheet.create({
    textInput: {
        fontFamily: 'iransans',
        borderBottomWidth: 2,
        textAlign: 'center',
        fontSize: 20,
        width: '50%',
        marginLeft: '25%',
    },
    label: {
        marginTop: 20,
        fontFamily: 'iransans',
        textAlign: 'center',
        fontSize: 10,

    },
});