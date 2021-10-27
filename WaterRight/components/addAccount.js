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
import colors from '../components/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export default AddAccount = ({enabled, buttonHandler, setEnable}) => {
    if(enabled)
        return(
            <View style={styles.container}>
                <View style={styles.modal}/>
                <View style={styles.popup}>
                    <ScrollView>
                        <Text style={styles.title}>شرایط استفاده از حساب</Text>
                        <Text style={styles.text}>در این قسمت شرایط و قوانین استفاده از حساب ها را می‌نویسیم. در این قسمت شرایط و قوانین استفاده از حساب ها را می‌نویسیم. در این قسمت شرایط و قوانین استفاده از حساب ها را می‌نویسیم. در این قسمت شرایط و قوانین استفاده از حساب ها را می‌نویسیم.</Text>
                    </ScrollView>
                    <TouchableOpacity onPress={buttonHandler} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>شرایط را می‌پذیرم</Text>
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
        width: '80%',
        height: '40%',
        marginTop: 50,
        backgroundColor: colors.white,
        zIndex: 11,
        marginHorizontal: '10%',
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
});