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
import LoginForm from '../components/loginForm';

const api = require('../config/api');
const {saveData, readData} = require('../config/save');

// const STORAGE_KEY = '@store_file'
// const readData = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch (e) {
//     console.log(e)
//   }
// }
const splash = (props) => {
    var [loggedIn, setLoggedIn] = useState(true);
    useEffect(() => {
        readData().then((data) => {
            if(data != null){
                api.post('/api/phone-login', {
                    phone: data.phone,
                }).then(function (res) {
                    // console.log(res.data);
                    if(res.data.correct){
                        props.navigation.navigate('Home');
                    }
                    else{
                        setLoggedIn(false);
                        console.log('not correct')
                    }
                }).catch(function (error) {
                    // setLoggedIn(false);
                    console.log(error);
                    alert('خطا در برقراری ارتباط. لطفا اتصال اینترنت خود را چک کنید.')
                });
            }
            else setLoggedIn(false);
        });
    });
    
    return(
        <View style={styles.container}>
            <View style={styles.blueArea}>
                <Image style={styles.logoImage} source={require('../assets/logo.png')}/>
                <Text style={styles.titleText}>اپلیکیشن میراب</Text>
            </View>
            <View style={styles.bottomArea}>
                <LoginForm loggedIn={loggedIn} navigation={props.navigation}/>
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
        width: 150,
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