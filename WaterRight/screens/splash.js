import React, { useEffect, useState } from 'react';
import {
    Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import colors from '../components/colors';


const splash = (props) => {
    
    return(
        <View style={styles.container}>
            <View style={styles.blueArea}>
                <Image style={styles.logoImage} source={require('../assets/water.png')}/>
                <Text style={styles.titleText}>اپلیکیشن میراب</Text>
            </View>
            <View style={styles.bottomArea}>
                <View style={styles.buttonsArea}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {props.navigation.navigate('Register')}}>
                        <Text style={[styles.buttonText, styles.blueButton]}>ثبت نام</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {props.navigation.navigate('Login')}}>
                        <Text style={styles.buttonText}>ورود</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    blueArea: {
        flex: 8,
        backgroundColor: colors.blue,
        alignContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 100,
        height: 150,
        marginTop: 150,
    },
    titleText: {
        fontFamily: 'iransans',
        fontSize: 30,
        color: 'white',
        marginTop: 25,
        fontWeight: 'bold',
    },
    bottomArea: {
        flex: 1,
        paddingTop: 50,
    },
    buttonsArea: {
        flexDirection: 'row',
        direction: 'rtl',
    },
    button: {
        width: '40%',
        marginLeft: '5%',
        marginRight: '5%',
        borderColor: colors.blue,
        borderWidth: 2,
        borderRadius: 3,
    },
    buttonText: {
        color: colors.blue,
        fontFamily: 'iransans',
        fontSize: 20,
        paddingHorizontal: 3,
        paddingVertical: 5,
        width: '100%',
        textAlign: 'center',
    },
    blueButton: {
        backgroundColor: colors.blue,
        color: 'white',
    },
});

export default splash;