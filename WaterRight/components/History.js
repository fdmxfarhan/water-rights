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
var avatar = require('../assets/10.png');
const {get_year_month_day, convertDate} = require('../config/dateConvert');
const api = require('../config/api');
const {saveData, readData} = require('../config/save');

export default History = ({data, title, navigation}) => {
    var [savedData, setSavedData] = useState();
    var [readOnce, setReadOnce] = useState(false);
    var [transmissions, setTransmissions] = useState([]);
    useEffect(() => {
        if(!readOnce){
            readData().then(data => {
                setSavedData(data);
                if(data != null){
                    api.post('/api/get-transmissions', {
                        phone: data.phone,
                    }).then(res => {
                        if(res.data.done){
                            setTransmissions(res.data.transmissions);
                            console.log(res.data.transmissions);
                        }
                    }).catch(error => {
                        alert('خطا در برقراری ارتباط. لطفا اتصال اینترنت خود را چک کنید.')
                        console.log(error);
                    });
                }
            });
        }
        readOnce = true;
        setReadOnce(true);
    });
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
                            <Text style={styles.tabButtonText}>تاریخچه</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.buttonIcon}>
                        <Icon style={styles.headerIcon} name={'bell'}/>  
                        <View style={styles.notificationAlert} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.scrollView}>
                <FlatList 
                    // inverted={true}
                    // horizontal={true}
                    data={transmissions}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => {
                        return(
                            <View style={styles.item}>
                                <View style={styles.flexRow}>
                                    <Text style={styles.accountNumber}>
                                        {item.source.type == 'chah' ? item.source.license : item.source.accountNumber}
                                    </Text>
                                    <Text style={styles.ownerText}>{item.source.owner}</Text>
                                </View>
                                <View style={styles.flexRow}>
                                    <Icon name={'arrow-left'} style={styles.arrow} />
                                </View>
                                <View style={styles.flexRow}>
                                    <Text style={styles.accountNumber}>
                                        {item.target.type == 'chah' ? item.target.license : item.target.accountNumber}
                                    </Text>
                                    <Text style={styles.ownerText}>{item.target.owner}</Text>
                                </View>
                                <View style={styles.flexRow}>
                                    <Text style={styles.amount}>{item.amount}</Text>
                                    <Text style={styles.cm}>متر مکعب</Text>
                                </View>
                                <View style={styles.flexRow}>
                                    <Text>{get_year_month_day(new Date(item.date))[0]}/{get_year_month_day(new Date(item.date))[1]}/{get_year_month_day(new Date(item.date))[2]}</Text>
                                </View>
                                
                            </View>
                        )
                    }} 
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    item: {
        flexDirection: 'row-reverse',
        marginTop: 10,
        alignContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors.lightblue,
        borderBottomColor: colors.lightgray,
        borderBottomWidth: 3,
    },
    flexRow: {
        direction: 'rtl',
        minWidth: 70,
        alignContent: 'center',
        alignItems: 'center',
        // flex: 10,
    },
    accountNumber: {
        fontFamily: 'iransans',
        fontSize: 15, 
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'right',
        direction: 'rtl',
    },
    ownerText: {
        fontFamily: 'iransans',
        fontSize: 14, 
        color: colors.text,
        textAlign: 'right',
        direction: 'rtl',
    },
    arrow: {
        color: colors.blue,
        fontSize: 20,
    },
    amount: {
        color: colors.green,
        fontFamily: 'iransans',
        fontSize: 17,
        fontWeight: 'bold',
    },
    cm: {
        fontFamily: 'iransans',
        fontSize: 13,
    },
}); 