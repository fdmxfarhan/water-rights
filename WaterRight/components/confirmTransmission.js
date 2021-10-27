import React from 'react';
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
  TextInput,
  FlatList
} from 'react-native';
import colors from './colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const api = require('../config/api');
const {saveData, readData} = require('../config/save');

export default ConfirmTransmission = ({enabled, setEnable, navigation, source, target, amount}) => {
    var transmit = () => {
        api.post('/api/add-transmission', {source, target, amount}).then(res => {
            if(res.data.done){
                navigation.navigate('Home');
            }
        }).catch(err => console.log(err));
    }
    if(enabled)
        return(
            <View style={styles.container}>
                <View style={styles.modal} />
                <View style={styles.popup}>
                    <ScrollView>
                        <Text style={styles.title}>انتقال شارژ</Text>
                        <Text style={styles.text}>پس از تایید، درخواست انتقال شارژ به میراب ارسال می‌گردد و در صورت تایید میراب شارژ به حساب مقصد انتقال می‌یابد</Text>
                    </ScrollView>
                    <TouchableOpacity onPress={transmit} style={[styles.submitButton, {backgroundColor: colors.blue}]}>
                        <Text style={styles.submitButtonText}>تایید و ارسال</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setEnable(false)}} style={[styles.submitButton, {backgroundColor: colors.red}]}>
                        <Text style={styles.submitButtonText}>انصراف</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    else return(<View></View>)
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '200%',
        zIndex: 10,
    },
    modal: {
        width: '100%',
        height: '100%',
        backgroundColor: '#00000050',
        zIndex: 10,
    },
    popup: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '90%',
        height: '40%',
        marginTop: 50,
        backgroundColor: colors.white,
        zIndex: 11,
        marginHorizontal: '5%',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    title: {
        marginTop: 10,
        color: colors.blue,
        fontFamily: 'iransans',
        fontSize: 17,
        fontWeight: 'bold',
    },
    text: {
        marginTop: 10,
        color: colors.text,
        fontFamily: 'iransans',
        fontSize: 15,
        direction: 'rtl',
        textAlign: 'justify',
    },
    submitButton: {
        backgroundColor: colors.blue,
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 7,
        marginTop: 5,
    },
    submitButtonText: {
        color: colors.white,
        fontFamily: 'iransans',
        fontSize: 17,
    },
    search: {
        flexDirection: 'row-reverse',
        borderBottomColor: colors.lightgray,
        borderBottomWidth: 1,
    },
    searchInput: {
        flex: 6,
        color: colors.text,
        fontFamily: 'iransans',
        fontSize: 15,
        direction: 'rtl',
        textAlign: 'right',
    },
    searchIcon: {
        flex: 1,
        padding: 10,
        paddingTop: 20,
        color: colors.gray,
    },
    account: {
        direction: 'rtl',
        width: '90%',
        marginVertical: 10,
        marginHorizontal: '5%',
        borderBottomWidth: 0.8,
        borderBottomColor: colors.lightgray,
        paddingVertical: 10,
        flexDirection: 'row-reverse',
    },
    info: {
        flex: 5,
    },
    type: {
        flex: 1
    },
    infoTitle:{
        textAlign: 'right',
        color: colors.text,
        fontFamily: 'iransans',
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoText:{
        textAlign: 'right',
        color: colors.gray,
        fontFamily: 'iransans',
        fontSize: 12,
    },
    abvandiText: {
        backgroundColor: colors.lightgreen,
        color: colors.white,
        fontFamily: 'iransans',
        fontSize: 12,
        borderRadius: 5,
        padding: 3,
        textAlign: 'center',
    },
    chahvandiText: {
        backgroundColor: colors.lightblue,
        color: colors.white,
        fontFamily: 'iransans',
        fontSize: 12,
        borderRadius: 5,
        padding: 3,
        textAlign: 'center',
    },
    chahText: {
        backgroundColor: colors.lightred,
        color: colors.white,
        fontFamily: 'iransans',
        fontSize: 12,
        borderRadius: 5,
        padding: 3,
        textAlign: 'center',
    },
});