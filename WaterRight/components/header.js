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

export default Header = ({title, backID, navigation}) => {
    return(
        <View style={styles.header}>
            <TouchableOpacity style={styles.homeButton} onPress={() => {navigation.navigate('Home')}}>
                <Icon  style={styles.homeButtonIcon} name={'home'}/>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => {
                if(backID == 'exit') BackHandler.exitApp();
                else navigation.navigate(backID)
            }}> 
                <Icon  style={styles.backButtonIcon} name={'chevron-left'}/>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row-reverse',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 0,
    },
    backButton: {
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    homeButton: {
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    backButtonIcon: {
        flex: 2,
        fontSize: 23,
        color: colors.gray,
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingBottom: 0,
    },
    homeButtonIcon: {
        flex: 2,
        fontSize: 25,
        color: colors.gray,
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingBottom: 0,
    },
    title: {
        flex: 5,
        fontFamily: 'iransans',
        fontSize: 22,
        color: colors.gray,
        textAlign: 'center',
        paddingVertical: 10,
        paddingBottom: 0,
    }
});