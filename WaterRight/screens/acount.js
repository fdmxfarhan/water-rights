import React, { useEffect, useState } from 'react';
import {
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
import Abvandi from '../components/abvandi';
import Chahvandi from '../components/chahvandi';
import Chah from '../components/chah';

const acount = (props) => {
    var [account, setAccount] = useState(props.route.params.item);
    useEffect(() => {

    });
    if(account.type == "chah"){
        return(
            <View style={styles.container}>
                <Header title={'حساب چاه'} navigation={props.navigation} backID={'Home'}/>
                <Chah account={account} navigation={props.navigation} />
            </View>
        )
    }else if(account.type == "abvandi"){
        return(
            <View style={styles.container}>
                <Header title={'حساب آب‌وندی'} navigation={props.navigation} backID={'Home'}/>
                <Abvandi account={account} navigation={props.navigation} />
            </View>
        )
    }else if(account.type == "chahvandi"){
        return(
            <View style={styles.container}>
                <Header title={'حساب چاه‌وندی'} navigation={props.navigation} backID={'Home'}/>
                <Chahvandi account={account} navigation={props.navigation} />
            </View>
        )
    }
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    
});

export default acount;