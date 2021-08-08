import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import colors from '../components/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const home = () => {
  return (
    // <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Main')      return <Icon name={'home'} size={23} color={color}/>;
            if (route.name === 'Settings')  return <Icon name={'gear'} size={23} color={color}/>;
            if (route.name === 'History')   return <Icon name={'book'} size={23} color={color}/>;
          },
          tabBarActiveTintColor: colors.lightblue,
          tabBarInactiveTintColor: 'gray',
        })}
        >
        <Tab.Screen name="Main" component={HomeScreen} options={({route}) => ({
          headerShown: false, 
          title: 'خانه',
          tabBarStyle: styles.tabBar,
          })}/>
        <Tab.Screen name="Settings" component={SettingsScreen} options={({route}) => ({
          headerShown: false, 
          title: 'تنظیمات',
          tabBarStyle: styles.tabBar,
          })} />
        <Tab.Screen name="History" component={SettingsScreen} options={({route}) => ({
          headerShown: false, 
          title: 'تاریخچه',
          tabBarStyle: styles.tabBar,
          })} />
        
      </Tab.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    fontFamily: 'iransans',
    fontSize: 30,
  }
});

export default home;