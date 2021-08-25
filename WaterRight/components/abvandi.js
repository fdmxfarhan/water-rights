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

export default Abvandi = ({item, navigation}) => {
    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.infoView}>
                    <View style={styles.iconView}>
                        <Icon style={styles.icon} name={'cloud'} />
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.infoText}>
                            آغاز: 
                            <Text style={styles.dateText}> {item.startDate.year}/{item.startDate.month}/{item.startDate.day}</Text> 
                        </Text>
                        <Text style={styles.infoText}>
                            پایان: 
                            <Text style={styles.dateText}> {item.endDate.year}/{item.endDate.month}/{item.endDate.day}</Text> 
                        </Text>
                    </View>
                </View>
                <View style={styles.capView}>
                    <Text style={styles.capTitle}>ظرفیت:</Text>
                    <Text style={styles.charge}> {item.charge} </Text>
                    <Text style={styles.squareMeter}>متر مکعب</Text>
                </View>
                <View style={styles.historyTitle}>
                    <Text style={styles.historyTitleText}>تاریخچه انتقالات</Text>
                    <Icon style={styles.historyTitleIcon} name={'history'}/>
                </View>
                <View style={styles.historyView}>
                    <View style={styles.transfer}>
                        <Icon style={styles.transferIconP} name={'plus'}/>
                        <Text style={styles.transferCap}>100 متر مکعب</Text>
                        <Text style={styles.transferDate}>1400/3/2</Text>
                    </View>
                    <View style={styles.transfer}>
                        <Icon style={styles.transferIconM} name={'minus'}/>
                        <Text style={styles.transferCap}>100 متر مکعب</Text>
                        <Text style={styles.transferDate}>1400/3/2</Text>
                    </View>
                    <View style={styles.transfer}>
                        <Icon style={styles.transferIconP} name={'plus'}/>
                        <Text style={styles.transferCap}>100 متر مکعب</Text>
                        <Text style={styles.transferDate}>1400/3/2</Text>
                    </View>
                    <View style={styles.transfer}>
                        <Icon style={styles.transferIconM} name={'minus'}/>
                        <Text style={styles.transferCap}>100 متر مکعب</Text>
                        <Text style={styles.transferDate}>1400/3/2</Text>
                    </View>
                    <View style={styles.transfer}>
                        <Icon style={styles.transferIconM} name={'minus'}/>
                        <Text style={styles.transferCap}>100 متر مکعب</Text>
                        <Text style={styles.transferDate}>1400/3/2</Text>
                    </View>
                    <View style={styles.transfer}>
                        <Icon style={styles.transferIconM} name={'minus'}/>
                        <Text style={styles.transferCap}>100 متر مکعب</Text>
                        <Text style={styles.transferDate}>1400/3/2</Text>
                    </View>
                    
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.transferButton} onPress={() => {}}>
                <Icon style={styles.transferButtonIcon} name={'share'} />
                <Text style={styles.transferButtonText}>انتقال شارژ</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        direction: 'rtl',
    },
    infoView: {
        // backgroundColor: 'lightblue',
        flexDirection: 'row-reverse',
        paddingTop: 20,
    },
    iconView: {
        flex: 3,
    },
    info: {
        flex: 7,
        paddingTop: 20,
        // paddingRight: 20,
    },
    icon: {
        color: colors.lightblue,
        backgroundColor: 'white',
        textAlign: 'center',
        fontSize: 40,
        paddingVertical: 27,
        width: '80%',
        marginLeft: '10%',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 20,
    },
    infoText: {
        fontFamily: 'iransans',
        fontSize: 18,
        color: colors.text,
        paddingRight: 10,
    },
    capView: {
        flexDirection: 'row-reverse',
        marginTop: 10,
    },
    capTitle: {
        fontFamily: 'iransans',
        fontSize: 20,
        paddingRight: 50,
        paddingTop: 30,
        color: colors.text,
    },
    charge: {
        fontFamily: 'iransans',
        fontSize: 50,
        color: colors.lightblue,
    },
    squareMeter: {
        fontFamily: 'iransans',
        fontSize: 20,
        paddingTop: 30,
        color: colors.lightblue,
    },
    transferButton: {
        backgroundColor: colors.blue,
        flexDirection: 'row-reverse',
        position: 'absolute',
        bottom: 20,
        left: 20,
        paddingHorizontal: 50,
        paddingVertical: 5,
        borderRadius: 20,
    },
    transferButtonIcon:{
        color: 'white',
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 7,
    },
    transferButtonText:{
        fontFamily: 'iransans',
        fontSize: 20,
        color: 'white',
    },
    historyTitle: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        width: '80%',
        marginHorizontal: '10%',
    },
    historyTitleText: {
        color: colors.lightgray,
        flex: 1,
        fontFamily: 'iransans',
        fontSize: 14,
    },
    historyTitleIcon: {
        color: colors.lightgray,
        flex: 1,
        fontSize: 16,
        paddingVertical: 8,
    },
    historyView: {
        backgroundColor: 'white',
        width: '90%',
        marginHorizontal: '5%',
        marginBottom: 30,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 10,
    },
    transfer: {
        flexDirection: 'row-reverse',
        marginBottom: 5,
    },
    transferCap: {
        flex: 1,
        fontFamily: 'iransans',
        fontSize: 15,
    },
    transferDate: {
        flex: 1,
        fontFamily: 'iransans',
        fontSize: 15,
    },
    transferIconM: {
        paddingTop: 5,
        paddingLeft: 10,
        color: colors.red,
    },
    transferIconP: {
        paddingTop: 5,
        paddingLeft: 10,
        color: colors.green,
    },
});