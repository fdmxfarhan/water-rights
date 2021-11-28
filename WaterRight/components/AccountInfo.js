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
  BackHandler
} from 'react-native';
import colors, { lightblue } from '../components/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export default AccountInfo = ({account, navigation}) => {
    if(typeof(account) == 'string'){
        return(
            <View style={styles.container}>
                {/* <Text>nothing</Text> */}
            </View>
        )
    }
    else if(account.type == 'chah'){
        return(
            <View style={styles.container}>
                <View style={styles.infoArea}>
                    <Text style={styles.infoText}>نوع حساب: 
                        <Text style={styles.infoValue}> چاه </Text>
                    </Text>
                    <Text style={styles.infoText}> شارژ سالیانه: 
                        <Text style={styles.infoValue}> {account.permitedUseInYear} </Text>
                    </Text>
                    <Text style={styles.infoText}> صندوق: 
                        <Text style={styles.infoValue}> {account.sandogh} </Text>
                    </Text>
                </View>
                <View style={styles.infoArea}>
                    <Text style={styles.infoText}>مصرف شده: 
                        <Text style={styles.infoValue}> {account.permitedUseInYear - account.charge} </Text>
                    </Text>
                    <Text style={styles.infoText}>قابل انتقال: 
                        <Text style={styles.infoValue}> {account.charge} </Text>
                    </Text>
                    <Text style={styles.infoText}> مالک حساب: 
                        <Text style={styles.infoValue}> {account.owner} </Text>
                    </Text>
                </View>
            </View>
        )
    }
    else if(account.type == 'chahvandi'){
        return(
            <View style={styles.container}>
                <View style={styles.infoArea}>
                    <Text style={styles.infoText}>نوع حساب: 
                        <Text style={styles.infoValue}> چاه‌وندی </Text>
                    </Text>
                    <Text style={styles.infoText}>موجودی: 
                        <Text style={styles.infoValue}> {account.charge} </Text>
                    </Text>
                </View>
                <View style={styles.infoArea}>
                    <Text style={styles.infoText}> تاریخ آغاز اعتبار: 
                        <Text style={styles.infoValue}> {account.startDate.year}/{account.startDate.month}/{account.startDate.day} </Text>
                    </Text>
                    <Text style={styles.infoText}> تاریخ پایان اعتبار: 
                        <Text style={styles.infoValue}> {account.endDate.year}/{account.endDate.month}/{account.endDate.day} </Text>
                    </Text>
                    <Text style={styles.infoText}> مالک حساب: 
                        <Text style={styles.infoValue}> {account.owner} </Text>
                    </Text>
                </View>
            </View>
        )
    }
    else if(account.type == 'abvandi'){
        return(
            <View style={styles.container}>
                <View style={styles.infoArea}>
                    <Text style={styles.infoText}>نوع حساب: 
                        <Text style={styles.infoValue}> آب‌وندی </Text>
                    </Text>
                    <Text style={styles.infoText}>موجودی: 
                        <Text style={styles.infoValue}> {account.charge} </Text>
                    </Text>
                </View>
                <View style={styles.infoArea}>
                    <Text style={styles.infoText}> تاریخ آغاز اعتبار: 
                        <Text style={styles.infoValue}> {account.startDate.year}/{account.startDate.month}/{account.startDate.day} </Text>
                    </Text>
                    <Text style={styles.infoText}> تاریخ پایان اعتبار: 
                        <Text style={styles.infoValue}> {account.endDate.year}/{account.endDate.month}/{account.endDate.day} </Text>
                    </Text>
                    <Text style={styles.infoText}> مالک حساب: 
                        <Text style={styles.infoValue}> {account.owner} </Text>
                    </Text>
                </View>
            </View>
        )
    }
    else{
        return(
            <View style={styles.container}>
                {/* <Text>abvandi</Text> */}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        // flex: 1,
        direction: 'rtl',
        flexDirection: 'row-reverse',
        marginTop: 5,
    },
    infoText:{
        fontFamily: 'iransans',
        color: colors.green,
        textAlign: 'center'
    },
    infoValue:{
        fontFamily: 'iransans',
        color: colors.text,
        paddingHorizontal: 30,
    },
    infoArea: {
        flex: 1,
    },
});