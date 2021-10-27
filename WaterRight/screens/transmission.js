import React, { useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../components/colors';
import Header from '../components/header';
import Abvandi from '../components/abvandi';
import Chah from '../components/chah';
import SelectAccount from '../components/selectAccount';
import ConfirmTransmission from '../components/confirmTransmission';

const api = require('../config/api');
const {saveData, readData} = require('../config/save');


const transmission = (props) => {
    var [sourceAccount, setSourceAccount] = useState('انتخاب حساب مبداء');
    var [targetAccount, setTargetAccount] = useState('انتخاب حساب مقصد');
    var [sourceEnable, setSourceEnable] = useState(false);
    var [targetEnable, setTargetEnable] = useState(false);
    var [confirmEnable, setConfirmEnable] = useState(false);
    var [readOnce, setReadOnce] = useState(false);
    var [savedData, setSavedData] = useState();
    var [myAcounts, setMyAcounts] = useState([]);
    var [targetAccounts, setTargetAccounts] = useState([]);
    var [amount, setAmount] = useState('');

    var getAccounts = () => {
        readData().then(data => {
            setSavedData(data);
            if(data != null){
                api.post('/api/get-accounts', {
                    phone: data.phone,
                }).then(res => {
                    myAcounts = res.data.chah;
                    myAcounts = myAcounts.concat(res.data.chahvandi);
                    myAcounts = myAcounts.concat(res.data.abvandi);
                    setMyAcounts(myAcounts);
                }).catch(error => {
                    console.log(error);
                });
            }
        });
    }
    useEffect(() => {
        if(!readOnce) getAccounts();
        readOnce = true;
        setReadOnce(true);
    });
    return(
        <View style={styles.container}>
            <Header title={'انتقال شارژ'}  backID={'Main'} navigation={props.navigation}/>
            <View style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.label}>حساب مبداء: </Text>
                    <TouchableOpacity style={styles.selectButton} onPress={() => {setSourceEnable(true)}}>
                        <Text style={styles.selectButtonText}>{typeof(sourceAccount) == 'string' ? sourceAccount : sourceAccount.type == 'chah' ? sourceAccount.license : sourceAccount.accountNumber}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>حساب مقصد: </Text>
                    <TouchableOpacity style={styles.selectButton} onPress={() => {setTargetEnable(true)}}>
                        <Text style={styles.selectButtonText}>{typeof(targetAccount) == 'string' ? targetAccount : targetAccount.type == 'chah' ? targetAccount.license : targetAccount.accountNumber}</Text>
                    </TouchableOpacity> 
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>مقدار شارژ (متر مکعب): </Text>
                    <TextInput 
                        keyboardType={'number-pad'}
                        style={styles.textInput}
                        onChange={(text) => {setAmount(text.nativeEvent.text)}}
                        placeholder={'مقدار شارژ'} />
                </View>
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.submitButton} onPress={() => {
                    if(typeof(sourceAccount) == 'string' || typeof(targetAccount) == 'string' || amount == '') alert('لطفا موارد خواسته شده را تکمیل فرمایید.');
                    else if(sourceAccount.charge < parseInt(amount)) alert('مقدار شارژ از حجم موجود در حساب بیشتر است.')
                    else setConfirmEnable(true) 
                    }}>
                    <Text style={styles.submitButtonText}>انتقال</Text>
                </TouchableOpacity>
            </View>
            <SelectAccount enabled={sourceEnable} setAccount={setSourceAccount} setEnable={setSourceEnable} accountList={myAcounts} setTargetAccounts={setTargetAccounts} setTargetAccount={setTargetAccount}/>
            <SelectAccount enabled={targetEnable} setAccount={setTargetAccount} setEnable={setTargetEnable} accountList={targetAccounts} setTargetAccounts={() => {}} setTargetAccount={() => {}} />
            <ConfirmTransmission 
                enabled={confirmEnable} 
                setEnable={setConfirmEnable} 
                navigation={props.navigation} 
                source={sourceAccount} 
                target={targetAccount}
                amount={amount} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    section: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        paddingBottom: 0
    },
    label: {
        color: colors.text,
        fontFamily: 'iransans',
        fontSize: 18,
    },
    selectButton: {
        backgroundColor: colors.white,
        direction: 'rtl',
        borderRadius: 5,
        borderBottomColor: colors.blue,
        borderBottomWidth: 2,
    },
    selectButtonText:{
        color: colors.gray,
        fontFamily: 'iransans',
        fontSize: 15,
        direction: 'rtl',
        textAlign: 'right',
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    textInput: {
        color: colors.gray,
        fontFamily: 'iransans',
        fontSize: 15,
        direction: 'rtl',
        textAlign: 'right',
        paddingHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: colors.white,
        borderRadius: 5,
        borderBottomColor: colors.blue,
        borderBottomWidth: 2,
    },
    submitButton: {
        width: '90%',
        marginHorizontal: '5%',
        backgroundColor: colors.blue,
        borderRadius: 8,
    },
    submitButtonText: {
        fontFamily: 'iransans',
        fontSize: 22,
        color: 'white',
        backgroundColor: colors.blue,
        paddingVertical: 5,
        borderRadius: 4,
        textAlign: 'center',
    },
    content: {
        flex: 6,
    },
    buttonView: {
        flex: 1,
    },
});

export default transmission;