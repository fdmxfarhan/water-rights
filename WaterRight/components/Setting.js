import React, { useState } from 'react';
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
var avatar = require('../assets/10.png');

export default Setting = ({data, title}) => {
    return(
        <View style={styles.settingView}>
            <View style={styles.personalInfo}>
                <View style={styles.avatarView}>
                    <Image style={styles.avatarImage} source={avatar} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>نام نام خانوادگی</Text>
                    <Text style={styles.phone}>09336448037</Text>
                </View>
            </View>
            <View style={styles.scrollView}>
                <TouchableOpacity style={styles.link}>
                    <Icon name={'key'} style={styles.linkIcon} />
                    <Text style={styles.linkText}>تغییر کلمه عبور</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link}>
                    <Icon name={'exchange'} style={styles.linkIcon} />
                    <Text style={styles.linkText}>لیست انتقال شارژ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutLink}>
                    <Icon name={'sign-out'} style={styles.logoutLinkIcon} />
                    <Text style={styles.logout}>خروج از حساب کاربری</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    personalInfo: {
        flexDirection: 'row-reverse',
        paddingTop: 20,
    },
    avatarView:{
        flex: 3,
        alignContent: 'center',
        alignItems: 'center',
        paddingVertical: 10, 
    },
    info: {
        flex: 6,
    },
    avatarImage: {
        width: '72%',
        resizeMode: 'stretch',
        height: 100,
    },
    name: {
        fontFamily: 'iransans',
        fontSize: 25,
        color: colors.lightblue,
        marginTop: 20,
        paddingRight: 5,
    },
    phone: {
        color: colors.lightgray,
        direction: 'rtl',
        textAlign: 'right',
        paddingRight: 5,
        fontSize: 19,
    },
    scrollView: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    link: {
        width: '90%',
        textAlign: 'right',
        flexDirection: 'row-reverse',
        paddingVertical: 20,
        borderBottomColor: colors.lightgray,
        borderBottomWidth: 1,
    },
    linkIcon: {
        fontSize: 20,
        paddingTop: 5,
        color: colors.text,
        width: 40,
        textAlign: 'center',
    },
    logoutLink: {
        width: '90%',
        textAlign: 'right',
        flexDirection: 'row-reverse',
        paddingVertical: 20,
    },
    logoutLinkIcon: {
        fontSize: 20,
        paddingTop: 5,
        color: colors.red,
        width: 40,
        textAlign: 'center',
    },
    linkText: {
        fontSize: 20,
        fontFamily: 'iransans',
        color: colors.text,
    },
    logout: {
        fontSize: 20,
        fontFamily: 'iransans',
        color: colors.red,
    }
});