import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import colors, { gray } from '../components/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from '../components/header';
import AcountView from '../components/AcountView';
import Setting from '../components/Setting';
const Tab = createBottomTabNavigator();


const HomeScreen = () => {
  var [acounts, setAcounts] = useState({
    abvandi: [
      {type: 'abvandi', startDate: {year: 1400, month: 5, day: 19}, endDate: {year: 1400, month: 6, day: 5}, charge: 1000, id: 0},
      {type: 'abvandi', startDate: {year: 1400, month: 5, day: 19}, endDate: {year: 1400, month: 6, day: 5}, charge: 1000, id: 1},
      {type: 'abvandi', startDate: {year: 1400, month: 5, day: 19}, endDate: {year: 1400, month: 6, day: 5}, charge: 1000, id: 2},
      {type: 'abvandi', startDate: {year: 1400, month: 5, day: 19}, endDate: {year: 1400, month: 6, day: 5}, charge: 1000, id: 3},
      {type: 'abvandi', startDate: {year: 1400, month: 5, day: 19}, endDate: {year: 1400, month: 6, day: 5}, charge: 1000, id: 4},
    ],
    chahvandi: [
      {type: 'chahvandi', startDate: {year: 1400, month: 5, day: 19}, endDate: {year: 1400, month: 6, day: 5}, charge: 2000, id: 0},
      {type: 'chahvandi', startDate: {year: 1400, month: 5, day: 19}, endDate: {year: 1400, month: 6, day: 5}, charge: 2000, id: 1},
      {type: 'chahvandi', startDate: {year: 1400, month: 5, day: 19}, endDate: {year: 1400, month: 6, day: 5}, charge: 2000, id: 2},
      {type: 'chahvandi', startDate: {year: 1400, month: 5, day: 19}, endDate: {year: 1400, month: 6, day: 5}, charge: 2000, id: 3},
      {type: 'chahvandi', startDate: {year: 1400, month: 5, day: 19}, endDate: {year: 1400, month: 6, day: 5}, charge: 2000, id: 4},
    ],
    chah: [
      {type: 'chah', sellCap: 1000, buyCap: 1000, wellCap: 5000, id: 0},
      {type: 'chah', sellCap: 1000, buyCap: 1000, wellCap: 5000, id: 1},
      {type: 'chah', sellCap: 1000, buyCap: 1000, wellCap: 5000, id: 2},
      {type: 'chah', sellCap: 1000, buyCap: 1000, wellCap: 5000, id: 3},
    ],
  })
  return (
    <View style={styles.container}>
      <Header title={'خانه'} />
      <ScrollView style={styles.scrollView}>
        <AcountView data={acounts.abvandi} title={'حساب های آب‌وندی'} />
        <AcountView data={acounts.chahvandi} title={'حساب های چاه‌وندی'} />
        <AcountView data={acounts.chah} title={'حساب های چاه'} />
        
      </ScrollView>
    </View>
  );
}

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Header title={'تنظیمات'} />
      <Setting />
    </View>
  );
}
const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Header title={'تاریخچه'} />
    </View>
  );
}
const home = () => {
  return (
    // <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Main')      return <Icon name={'home'} size={22} color={color}/>;
            if (route.name === 'Settings')  return <Icon name={'gear'} size={22} color={color}/>;
            if (route.name === 'History')   return <Icon name={'history'} size={22} color={color}/>;
          },
          tabBarActiveTintColor: colors.lightblue,
          tabBarInactiveTintColor: 'gray',
        })}
        >
        <Tab.Screen name="Main" component={HomeScreen} options={({route}) => ({
          headerShown: false, 
          title: 'خانه',
          tabBarLabelStyle: styles.tabBar,
          })}/>
        <Tab.Screen name="Settings" component={SettingsScreen} options={({route}) => ({
          headerShown: false, 
          title: 'تنظیمات',
          tabBarLabelStyle: styles.tabBar,
          })} />
        <Tab.Screen name="History" component={HistoryScreen} options={({route}) => ({
          headerShown: false, 
          title: 'تاریخچه',
          tabBarLabelStyle: styles.tabBar,
          })} />
        
      </Tab.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    fontFamily: 'iransans',
    fontSize: 13,
    padding: 0,
  },
  container: {
    flex: 1,
    paddingBottom: 30,
  },
});

export default home;