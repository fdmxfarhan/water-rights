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
        {/* <Text style={styles.scrollTitle}>{title}</Text> */}
        <FlatList 
          // inverted={true}
          // horizontal={true}
          data={data}
          keyExtractor={item => item._id}
          renderItem={({item}) => {
            if(item.type == 'chah'){
              return(
                <TouchableOpacity style={styles.listItem} onPress={() => {
                  navigation.navigate('Acount', {item});
                }}>
                  <View style={styles.iconArea}>
                    <Icon style={[styles.icon, {backgroundColor: colors.blue}]} name="database"/>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.accountNumber}>{item.license}</Text>
                    <Text style={styles.date}></Text>
                  </View>
                  <Text style={styles.capacity}>{item.charge}  
                    <Text style={styles.cm}> متر مکعب </Text>
                  </Text>
                </TouchableOpacity>
              )
            }
            else{
              return(
                <TouchableOpacity style={styles.listItem} onPress={() => {
                  navigation.navigate('Acount', {item});
                }}>
                  <View style={styles.iconArea}>
                    <Icon style={[styles.icon, {backgroundColor: colors.yellow}]} name="database"/>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.accountNumber}>{item.accountNumber}</Text>
                    <Text style={styles.date}>{item.endDate.year}/{item.endDate.month}/{item.endDate.day}</Text>
                  </View>
                  <Text style={styles.capacity}>{item.charge}
                    <Text style={styles.cm}> متر مکعب </Text>
                  </Text>
                </TouchableOpacity>
                // <View style={styles.box}>
                //   <Text style={styles.label}>آغاز: 
                //     <Text style={styles.blue}> {item.startDate.year}/{item.startDate.month}/{item.startDate.day}</Text>
                //   </Text>
                //   <Text style={styles.label}>پایان: 
                //     <Text style={styles.orange}> {item.endDate.year}/{item.endDate.month}/{item.endDate.day}</Text>
                //   </Text>
                //   <Text style={styles.label}>ظرفیت: 
                //     <Text style={styles.green}> {item.charge} </Text>
                //     متر مکعب
                //   </Text>
                //   <TouchableOpacity style={styles.button} onPress={() => {
                //     navigation.navigate('Acount', {item});
                //   }}>
                //     <Text style={styles.buttonText}>مشاهده</Text>
                //   </TouchableOpacity>
                // </View>
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
        // flex: 1,
    },
    listItem: {
      marginBottom: 10,
      marginTop: 10,
      direction: 'rtl',
      flexDirection: 'row-reverse',
    },
    iconArea: {
      flex: 2,
      direction: 'rtl',
      textAlign: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    icon: {
      color: colors.white,
      backgroundColor: colors.yellow,
      textAlignVertical: 'center',
      paddingVertical: 18,
      paddingHorizontal: 20,
      fontSize: 20,
      borderRadius: 50,
    },
    info: {
      flex: 5,
      direction: 'rtl',
    },
    accountNumber: {
      fontFamily: 'iransans',
      fontSize: 15,
      color: colors.text,
      textAlign: 'right',
      fontWeight: 'bold',
      paddingTop: 6,
    },
    date: {
      fontFamily: 'iransans',
      fontSize: 12,
      color: colors.gray,
      textAlign: 'right',
    },
    capacity: {
      flex: 3,
      textAlign: 'center',
      alignContent: 'center',
      alignItems: 'center',
      paddingTop: 11,
      color: colors.green,
      fontFamily: 'iransans',
      fontSize: 20,
      fontWeight: 'bold',
    },
    cm:{
      color: colors.gray,
      fontWeight: 'normal',
      fontSize: 13,
    }
});