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
import Chah from '../components/chah';

const acount = (props) => {
    const item = props.route.params.item;
    useEffect(() => {
        console.log(item)
    });
    if(item.type == "chah"){
        var title = 'حساب چاه';
        return(
            <View style={styles.container}>
                <Header title={title} navigation={props.navigation} backID={'Home'}/>
                <Chah item={item} navigation={props.navigation} />
            </View>
        )
    }else{
        var title;
        if(item.type == 'abvandi') title = 'حساب آب‌وندی';
        else if(item.type == 'chahvandi') title = 'حساب چاه‌وندی';
        return(
            <View style={styles.container}>
                <Header title={title} navigation={props.navigation} backID={'Home'}/>
                <Abvandi item={item} navigation={props.navigation} />
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