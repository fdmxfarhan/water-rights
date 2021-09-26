import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  BackHandler,
  TextInput
} from 'react-native';
import colors, { lightblue } from '../components/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export default SubmitButton = ({navigation, onPressFunc, text}) => {
  var [userInputColor, setUserInputColor] = useState('lightgray');

  return(
    <View>
      <TouchableOpacity 
        style={styles.submitButton}
        onPress={onPressFunc}
        >
        <Text style={styles.submitText}>{text}</Text>
    </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
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
});