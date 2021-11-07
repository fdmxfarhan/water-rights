import React, { useEffect, useState, useRef } from 'react';
import {
    FlatList,
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
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../components/colors';
import Header from '../components/header';
import Input from '../components/input';

const api = require('../config/api');
const {saveData, readData} = require('../config/save');
const {get_year_month_day, convertDate} = require('../config/dateConvert');

const notification = (props) => {
    var [readOnce, setReadOnce] = useState(false);
    var [savedData, setSavedData] = useState();
    var [user, setUser] = useState();
    var [notifications, setNotifications] = useState([]);
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
    var seenNotifs = () => {
        readData().then(data => {
            setSavedData(data);
            if(data != null){
              api.post('/api/seen-notifications', {
                    phone: data.phone,
                    userID: data.user._id,
                }).then(res => {

                }).catch(error => {
                    alert('خطا در برقراری ارتباط. لطفا اتصال اینترنت خود را چک کنید.')
                    console.log(error);
                });
            }
        });
    }
    var readNotifications = () => {
        readData().then(data => {
            setSavedData(data);
            if(data != null){
              api.post('/api/get-notifications', {
                    phone: data.phone,
                    userID: data.user._id,
                }).then(res => {
                    seenNotifs();
                    setNotifications(res.data.reverse());
                }).catch(error => {
                    alert('خطا در برقراری ارتباط. لطفا اتصال اینترنت خود را چک کنید.')
                    console.log(error);
                });
            }
        });
    }
    useEffect(() => {
        if(!readOnce) {
            readUser();
            readNotifications();
        }
        readOnce = true;
        setReadOnce(true);
    });
    return(
        <View style={styles.container}>
            <Header title={'اعلان‌ها'} backID={'Home'} navigation={props.navigation}/>
            <View style={styles.messages}>
            <FlatList 
                inverted={true}
                // horizontal={true}
                data={notifications}
                keyExtractor={item => item._id}
                renderItem={({item}) => {
                    if(item.seen){
                        return(
                            <View style={styles.seenNotification}>
                                <Text style={styles.notificationText}>{item.text}</Text>
                                <Text style={styles.notificationTextDate}>{convertDate(item.date)}</Text>
                            </View>
                        )
                    }
                    else{
                        return(
                            <View style={styles.notification}>
                                <Text style={styles.notificationText}>{item.text}</Text>
                                <Text style={styles.notificationTextDate}>{convertDate(item.date)}</Text>
                            </View>
                        )
                    }
                }} />
            </View>
            <View style={styles.sendArea}>

            </View>
        </View>
    )
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    notification:{
        backgroundColor: colors.blue,
        width: '80%',
        marginRight: '15%',
        marginLeft: '5%',
        marginTop: 10,
        borderRadius: 10,
    },
    notificationText: {
        color: colors.white,
        paddingVertical: 9,
        paddingHorizontal: 9,
        fontFamily: 'iransans',
        fontSize: 15,
    },
    seenNotification: {
        backgroundColor: colors.lightgray,
        width: '80%',
        marginRight: '15%',
        marginLeft: '5%',
        marginTop: 10,
        borderRadius: 10,
    },
    messages: {
        flex: 9,
    },
    sendArea: {
        flex: 1,
    },
    notificationTextDate: {
        color: colors.white,
        fontFamily: 'iransans',
        fontSize: 12,
        padding: 9,
        paddingTop: 0,
    },
});

export default notification;