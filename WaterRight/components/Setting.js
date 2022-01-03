import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import colors, { gray } from '../components/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from "@react-navigation/native";
import ToastNotif from './ToastNotif';
var avatar = require('../assets/10.png');
const api = require('../config/api');
const {saveData, readData, clearNotif, readNotif} = require('../config/save');

export default Setting = (props) => {
    var {data, title, navigation} = props;
    var [savedData, setSavedData] = useState();
    var [readOnce, setReadOnce] = useState(false);
    var [user, setUser] = useState({phone: '', fullname: ''});
    var [notifEnable, setNotifEnable] = useState(false);
    var [notifText, setNotifText] = useState('');
    const isFocused = useIsFocused();

    var readUser = () => {
        readData().then(data => {
            setSavedData(data);
            if(data != null){
                api.post('/api/phone-login', {
                    phone: data.phone,
                }).then(res => {
                    if(res.data.correct){
                        setUser(res.data.user);
                    }
                }).catch(error => {
                    alert('خطا در برقراری ارتباط. لطفا اتصال اینترنت خود را چک کنید.')
                    console.log(error);
                });
            }
        });
    }
    useEffect(() => {
        readNotif().then(data => {
            if(data != ''){
                setNotifEnable(true);
                setNotifText(data.text);
                setTimeout(() => {
                    setNotifEnable(false);
                }, 3000);
            }
            clearNotif();
        });
        if(!readOnce){
            readUser();
        }
        readOnce = true;
        setReadOnce(true);
        if(isFocused){ 
            // getInitialData();
            setReadOnce(false);
        }
    }, [props, isFocused]);
    return(
        <View style={styles.settingView}>
            <View style={styles.blueArea}>
                <View style={styles.topHeader}>
                    <TouchableOpacity style={styles.buttonIcon}  onPress={() => {navigation.navigate('Main')}}>
                        <Icon  style={styles.headerIcon} name={'home'}/>  
                    </TouchableOpacity>
                    <View style={styles.tabButtonsView}>
                        <TouchableOpacity 
                            onPress={() => {}}
                            style={[styles.tabButton]}>
                            <Text style={styles.tabButtonText}>تنظیمات حساب کاربری</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.buttonIcon}>
                        <Icon style={styles.headerIcon} name={'bell'}/>  
                        {/* <View style={styles.notificationAlert} /> */}
                    </TouchableOpacity>
                </View>
                <View style={styles.avatarView}>
                    <Image style={styles.avatarImage} source={avatar} />
                </View>
                <Text style={styles.name}>{user.fullname}</Text>
                <Text style={styles.phone}>{user.phone}</Text>
            </View>
            <View style={styles.scrollView}>
                <TouchableOpacity style={styles.link} onPress={() => {
                        navigation.navigate('Password');
                    }}>
                    <Icon name={'key'} style={styles.linkIcon} />
                    <Text style={styles.linkText}>تغییر کلمه عبور</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link}>
                    <Icon name={'exchange'} style={styles.linkIcon} />
                    <Text style={styles.linkText}>لیست انتقال شارژ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutLink} onPress={() => {
                    saveData({username: 'undefined', password: 'undefined', phone: 'undefined', user: 'undefined'}).then(() => {
                        navigation.navigate('Splash');
                    });
                    }}>
                    <Icon name={'sign-out'} style={styles.logoutLinkIcon} />
                    <Text style={styles.logout}>خروج از حساب کاربری</Text>
                </TouchableOpacity>
                
            </View>
            <ToastNotif enable={notifEnable} text={notifText} />
        </View>
    )
}

const styles = StyleSheet.create({
    settingView: {
        flex: 1,
    },
    scrollView: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    link: {
        width: '80%',
        textAlign: 'right',
        flexDirection: 'row-reverse',
        paddingVertical: 15,
        borderBottomColor: colors.lightgray,
        borderBottomWidth: 1,
    },
    linkIcon: {
        fontSize: 15,
        paddingTop: 5,
        color: colors.text,
        width: 40,
        textAlign: 'center',
    },
    logoutLink: {
        width: '80%',
        textAlign: 'right',
        flexDirection: 'row-reverse',
        paddingVertical: 20,
    },
    logoutLinkIcon: {
        fontSize: 15,
        paddingTop: 5,
        color: colors.red,
        width: 40,
        textAlign: 'center',
    },
    linkText: {
        fontSize: 15,
        fontFamily: 'iransans',
        color: colors.text,
    },
    logout: {
        fontSize: 15,
        fontFamily: 'iransans',
        color: colors.red,
    },
    blueArea: {
        backgroundColor: colors.blue,
    },
    topHeader: {
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        paddingVertical: 15,
    },
    buttonIcon: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
    },
    tabButtonsView: {
        flex: 5,
        flexDirection: 'row-reverse',
        backgroundColor: colors.darkBlue,
        borderRadius: 14,
        padding: 4,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 3,
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 10,
    },
    tabButtonText: {
        fontFamily: 'iransans',
        fontSize: 13,
        textAlign: 'center',
        color: colors.white,
    },
    headerIcon: {
        color: colors.white,
        fontSize: 19,
        paddingVertical: 5,
        paddingHorizontal: 5,
        position: 'relative',
    },
    notificationAlert: {
        position: 'absolute',
        bottom: 2, 
        right: 10,
        width: 8,
        height: 8,
        backgroundColor: colors.red,
        borderRadius: 8,
    },
    sumText: {
        color: colors.white,
        fontFamily: 'iransans',
        fontSize: 35,
        paddingTop: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    sumTextDescription: {
        color: colors.white,
        fontFamily: 'iransans',
        fontSize: 11,
        textAlign: 'center',
    },
    navButtonsView: {
        width: '70%',
        marginHorizontal: '15%',
        flexDirection: 'row-reverse',
        marginVertical: 20,
    },
    navButton: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
    },
    navButtonIcon: {
        color: colors.white,
        paddingVertical: 16,
        paddingHorizontal: 17,
        borderRadius: 40,
        fontSize: 20,
        backgroundColor: colors.lightblue,
    },
    navButtonText: {
        color: colors.white,
        fontFamily: 'iransans',
        fontSize: 10,
        paddingTop: 7,
    },
    avatarView:{
        alignContent: 'center',
        alignItems: 'center',
        paddingVertical: 10, 
    },
    avatarImage: {
        width: '27%',
        resizeMode: 'stretch',
        height: 110,
        display: 'flex',
    },
    name: {
        fontFamily: 'iransans',
        fontSize: 20,
        color: colors.white,
        marginTop: 5,
        paddingRight: 5,
        textAlign: 'center',
        
    },
    phone: {
        color: colors.lightgray,
        direction: 'rtl',
        textAlign: 'right',
        paddingRight: 5,
        fontSize: 14,
        color: colors.white,
        textAlign: 'center',
        marginBottom: 10, 
    },
});