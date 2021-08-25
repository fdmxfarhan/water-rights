import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import colors, { gray } from '../components/colors';
import Icon from 'react-native-vector-icons/FontAwesome';


export default AcountView = ({data, title, navigation}) => {
    return(
      <View style={styles.verticalScrolView}>
        <Text style={styles.scrollTitle}>{title}</Text>
        <FlatList 
          inverted={true}
          horizontal={true}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            if(item.type == 'chah'){
                return(
                    <View style={styles.box}>
                        <Text style={styles.label}>ظرفیت کل: 
                            <Text style={styles.blue}> {item.wellCap}</Text>
                        </Text>
                        <Text style={styles.label}>ظرفیت خرید: 
                            <Text style={styles.blue}> {item.buyCap}</Text>
                        </Text>
                        <Text style={styles.label}>ظرفیت فروش: 
                            <Text style={styles.blue}> {item.sellCap}</Text>
                        </Text>
                        <TouchableOpacity style={styles.button} onPress={() => {
                          navigation.navigate('Acount', {item});
                        }}>
                          <Text style={styles.buttonText}>مشاهده</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            else{
                return(
                  <View style={styles.box}>
                    <Text style={styles.label}>آغاز: 
                      <Text style={styles.blue}> {item.startDate.year}/{item.startDate.month}/{item.startDate.day}</Text>
                    </Text>
                    <Text style={styles.label}>پایان: 
                      <Text style={styles.orange}> {item.endDate.year}/{item.endDate.month}/{item.endDate.day}</Text>
                    </Text>
                    <Text style={styles.label}>ظرفیت: 
                      <Text style={styles.green}> {item.charge} </Text>
                      متر مکعب
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={() => {
                      navigation.navigate('Acount', {item});
                    }}>
                      <Text style={styles.buttonText}>مشاهده</Text>
                    </TouchableOpacity>
                  </View>
                )
            }
          }}
          />
      </View>
    )
}

const styles = StyleSheet.create({
    verticalScrolView: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        paddingBottom: 0,
        direction: 'rtl',
    },
    scrollTitle: {
        color: colors.blue,
        fontFamily: 'iransans',
        fontSize: 19,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 0,
        // fontWeight: 'bold',
    },
    box: {
        marginVertical: 10,
        marginHorizontal: 5,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
        width: 230,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.84,
        elevation: 8,
    },
    label: {
        color: colors.gray,
        fontFamily: 'iransans',
        fontSize: 18,
    },
    blue: {
        color: colors.blue,
    },
    orange: {
        color: colors.orange,
    },
    green: {
        color: colors.green,
    },
    button: {
        backgroundColor: colors.blue,
        width: 100,
        borderRadius: 20,
        marginTop: 5,
      },
      buttonText: {
        color: 'white',
        paddingVertical: 2,
        fontSize: 18,
        fontFamily: 'iransans',
        textAlign: 'center',
    }
});