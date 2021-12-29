import React, { useEffect, useState } from 'react';
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

export default SelectAccount = ({enabled, setAccount, setTargetAccounts, setEnable, accountList, setTargetAccount, allAccounts, userID}) => {
    var [text, setText] = useState('');
    var [searching, setSearching] = useState(false);

    if(enabled)
        return(
            <View style={styles.container}>
                <View style={styles.modal}/>
                <View style={styles.popup}>
                    <View style={styles.search}>
                        <TextInput 
                            style={styles.searchInput}
                            placeholder={'جستجو...'}
                            onChange={(text) => {
                                setText(text.nativeEvent.text)
                                if(text.nativeEvent.text != '')
                                    setSearching(true);
                            }}/>
                        <Icon style={styles.searchIcon} name={'search'} />
                    </View>
                        <FlatList 
                            // inverted={true}
                            // horizontal={true}
                            data={accountList}
                            keyExtractor={item => item._id}
                            renderItem={({item}) => {
                                if(!searching && item.ownerID == userID){
                                    return(
                                        <TouchableOpacity style={styles.account} onPress={() => {
                                            setAccount(item);
                                            setEnable(false); 
                                            if(item.type == 'chah'){
                                                accountList.forEach(account => {
                                                    if(account.linkedAccount == item._id.toString()) {
                                                        setTargetAccounts([account]);
                                                        setTargetAccount(account);
                                                    }
                                                });
                                            }
                                            else if(item.type == 'chahvandi'){
                                                var nextList = [];
                                                for(var i=0; i<accountList.length; i++){
                                                    if(accountList[i]._id.toString() == item._id.toString());
                                                    else if(accountList[i].type == 'chah' && item.linkedAccount == accountList[i]._id.toString()){
                                                        nextList.push(accountList[i])
                                                    }
                                                    else nextList.push(accountList[i])
                                                }
                                                setTargetAccounts(nextList);
                                                setTargetAccount('انتخاب حساب مقصد');
                                            }
                                            else if(item.type == 'abvandi'){
                                                var nextList = [];
                                                for(var i=0; i<accountList.length; i++){
                                                    if(accountList[i]._id.toString() == item._id.toString());
                                                    else if(accountList[i].type == 'chah');
                                                    else nextList.push(accountList[i])
                                                }
                                                for(var i=0; i<allAccounts.abvandi.length; i++){
                                                    if(allAccounts.abvandi[i].ownerID != item.ownerID)
                                                        nextList.push(allAccounts.abvandi[i])
                                                }
                                                setTargetAccounts(nextList);
                                                setTargetAccount('انتخاب حساب مقصد');
                                            }
                                            else {
                                                setTargetAccounts(accountList);
                                                setTargetAccount('انتخاب حساب مقصد');
                                            }
                                            }}>
                                            <View style={styles.info}>
                                                <Text style={styles.infoTitle}>{item.type == 'chah' ? item.license : item.accountNumber} ({item.owner})</Text>
                                                <Text style={styles.infoText}>{item.charge} متر مکعب</Text>
                                            </View>
                                            <View style={styles.type}>
                                                {item.type == 'abvandi' ? <Text style={styles.abvandiText}>آب‌وندی</Text> : <View></View>}
                                                {item.type == 'chahvandi' ? <Text style={styles.chahvandiText}>چاه‌ندی</Text> : <View></View>}
                                                {item.type == 'chah' ? <Text style={styles.chahText}>چاه</Text> : <View></View>}
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                                else if(searching && (item.owner.indexOf(text) != -1 || (item.accountNumber && item.accountNumber.toString().indexOf(text) != -1) || (item.license && item.license.toString().indexOf(text) != -1))){
                                    return(
                                        <TouchableOpacity style={styles.account} onPress={() => {
                                            setAccount(item);
                                            setEnable(false); 
                                            if(item.type == 'chah'){
                                                accountList.forEach(account => {
                                                    if(account.linkedAccount == item._id.toString()) {
                                                        setTargetAccounts([account]);
                                                        setTargetAccount(account);
                                                    }
                                                });
                                            }
                                            else if(item.type == 'chahvandi'){
                                                var nextList = [];
                                                for(var i=0; i<accountList.length; i++){
                                                    if(accountList[i]._id.toString() == item._id.toString());
                                                    else if(accountList[i].type == 'chah' && item.linkedAccount == accountList[i]._id.toString()){
                                                        nextList.push(accountList[i])
                                                    }
                                                    else nextList.push(accountList[i])
                                                }
                                                setTargetAccounts(nextList);
                                                setTargetAccount('انتخاب حساب مقصد');
                                            }
                                            else if(item.type == 'abvandi'){
                                                var nextList = [];
                                                for(var i=0; i<accountList.length; i++){
                                                    if(accountList[i]._id.toString() == item._id.toString());
                                                    else if(accountList[i].type == 'chah');
                                                    else nextList.push(accountList[i])
                                                }
                                                for(var i=0; i<allAccounts.abvandi.length; i++){
                                                    if(allAccounts.abvandi[i].ownerID != item.ownerID)
                                                        nextList.push(allAccounts.abvandi[i])
                                                }
                                                setTargetAccounts(nextList);
                                                setTargetAccount('انتخاب حساب مقصد');
                                            }
                                            else {
                                                setTargetAccounts(accountList);
                                                setTargetAccount('انتخاب حساب مقصد');
                                            }
                                            }}>
                                            <View style={styles.info}>
                                                <Text style={styles.infoTitle}>{item.type == 'chah' ? item.license : item.accountNumber} ({item.owner})</Text>
                                                <Text style={styles.infoText}>{item.charge} متر مکعب</Text>
                                            </View>
                                            <View style={styles.type}>
                                                {item.type == 'abvandi' ? <Text style={styles.abvandiText}>آب‌وندی</Text> : <View></View>}
                                                {item.type == 'chahvandi' ? <Text style={styles.chahvandiText}>چاه‌ندی</Text> : <View></View>}
                                                {item.type == 'chah' ? <Text style={styles.chahText}>چاه</Text> : <View></View>}
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            }}/>
                    <TouchableOpacity onPress={() => {setEnable(false)}} style={[styles.submitButton, {backgroundColor: colors.red}]}>
                        <Text style={styles.submitButtonText}>انصراف</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    else {
        // setSearching(false);
        // setText('');
        return(<View></View>)
    }
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