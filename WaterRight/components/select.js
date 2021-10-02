import React, { useState } from 'react';
import {StyleSheet,View,Text,TextInput} from 'react-native';
import colors, { lightblue } from '../components/colors';
import SelectDropdown from 'react-native-select-dropdown'

export default Select = ({navigation, title, setFunction, refrence, onSubmitEditing, returnKeyType, blurOnSubmit, keyboardType}) => {
  var [userInputColor, setUserInputColor] = useState('lightgray');
  var [displayLabel, setDisplayLabel] = useState('none');

  return(
    <View style={styles.container}>
        <Text style={[styles.label]}>{title}: </Text>
        <View style={[styles.textInput, {borderBottomColor: userInputColor}]}>
            <SelectDropdown
                buttonStyle={styles.selectButton}
                dropdownStyle={styles.select}
                buttonTextStyle={styles.select}
                style={styles.select}
                defaultValueByIndex={0}
                data={["خانم", "آقا"]}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                    setFunction(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
                />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    selectButton: {
        width: '100%',
        display: 'flex',        
    },
    select: {
        fontFamily: 'iransans',
        direction: 'rtl',
        textAlign: 'right',
        position: 'absolute',
        right: 0,
        width: '100%',
        display: 'flex',
    },
    container: {
        flexDirection: 'row-reverse',
        direction: 'rtl',
        marginTop: 20,
    },
    textInput: {
        paddingTop: 20,
        fontFamily: 'iransans',
        borderBottomWidth: 2,
        textAlign: 'right',
        marginTop: 0,
        paddingTop: 0,
        flex: 3,
        backgroundColor: 'lightblue',
        direction: 'rtl',
        position: 'relative',
    },
    label: {
        fontFamily: 'iransans',
        marginTop: 10,
        fontSize: 15,
        color: colors.gray,
        flex: 1,

    },
});