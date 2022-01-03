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

export default ToastNotif = (props) => {
    if(props.enable){
        return(
          <View style={styles.container}>
            <Text style={styles.text}>{props.text}</Text>
          </View>
        )
    }
    else return(<View></View>)
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        right: '15%',
        width: '70%',
    },
    text: {
        color: colors.white,
        backgroundColor: colors.green,
        opacity: 0.8,
        fontFamily: 'iransans',
        fontSize: 16,
        paddingVertical: 5,
        borderRadius: 5,
        textAlign: 'center',
        width: '100%',
    }

});