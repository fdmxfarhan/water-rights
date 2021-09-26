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

export default Input = ({navigation, title}) => {
    var [userInputColor, setUserInputColor] = useState('lightgray');

    return(
        <View>
          <TextInput
            style={[styles.textInput, {borderBottomColor: userInputColor}]}
            placeholder={title}
            onChange={(text) => {}}
            onFocus={() => {setUserInputColor(colors.lightblue)}}
            onBlur={() => {setUserInputColor('lightgray')}}
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