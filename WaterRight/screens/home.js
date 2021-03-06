import React, { useEffect, useState } from 'react';
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
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import colors, { gray } from '../components/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from '../components/header';
import AcountView from '../components/AcountView';
import Setting from '../components/Setting';
import History from '../components/History';
import AddAccount from '../components/addAccount';

const Tab = createBottomTabNavigator();

const api = require('../config/api');
const {saveData, readData} = require('../config/save');

const HomeScreen = (props) => {
  var [activeTab, setActiveTab] = useState('abvandi');
  var [savedData, setSavedData] = useState();
  var [acounts, setAcounts] = useState({abvandi: [], chahvandi: [], chah: []});
  var [readOnce, setReadOnce] = useState(false);
  var [addAccountEnable, setAddAccountEnable] = useState(false);
  var [user, setUser] = useState();
  var [sum, setSum] = useState(0);
  var [notifications, setNotifications] = useState([]);

  var updateSum = (accounts) => {
    if(activeTab == 'abvandi'){
      sum = 0;
      for(var i=0; i<accounts.abvandi.length; i++)
        sum += accounts.abvandi[i].charge;
      setSum(sum);
    } else if(activeTab == 'chahvandi'){
      sum = 0;
      for(var i=0; i<accounts.chahvandi.length; i++)
        sum += accounts.chahvandi[i].charge;
      setSum(sum);
    } else if(activeTab == 'chah'){
      sum = 0;
      for(var i=0; i<accounts.chah.length; i++)
        sum += accounts.chah[i].charge;
      setSum(sum);
    }
  }
  var getAccounts = () => {
    readData().then(data => {
      setSavedData(data);
      if(data != null){
        api.post('/api/get-accounts', {
          phone: data.phone,
        }).then(res => {
          acounts = res.data;
          setAcounts(acounts);
          updateSum(acounts);
        }).catch(error => {
          // alert('?????? ???? ?????????????? ????????????. ???????? ?????????? ?????????????? ?????? ???? ???? ????????.')
          console.log(error);
        });
      }
    });
  }
  var addNewAccount = () => {
    setAddAccountEnable(false);
    if(activeTab == 'abvandi'){
      api.post('/api/add-account', {
        phone: savedData.phone,
      }).then(res => {
        getAccounts();
        api.post('/api/add-notification', {
          text: `?????????? ${savedData.user.fullname} ???? ???????? ??????????????? ???????? (${res.data.newAccount.accountNumber}) ?????????? ??????.`,
          type: 'add-account',
          link: `/dashboard/acount-view?acountID=${res.data.newAccount._id}`,
        });
      }).catch(error => {
        alert('?????? ???? ?????????????? ????????????. ???????? ?????????? ?????????????? ?????? ???? ???? ????????.')
        console.log(error);
      });
    }
    else alert('?????????? ???????? ?????? ?? ????????????????? ???????? ?????????????? ?????????? ???????? ????????.');
  }
  var readUser = () => {
    readData().then(data => {
        setSavedData(data);
        if(data != null){
            api.post('/api/phone-login', {
                phone: data.phone,
            }).then(res => {
                if(res.data.correct){
                    setUser(res.data.user);
                }
            }).catch(error => {
                alert('?????? ???? ?????????????? ????????????. ???????? ?????????? ?????????????? ?????? ???? ???? ????????.')
                console.log(error);
            });
        }
    });
  }
  var readNotifications = () => {
    readData().then(data => {
        setSavedData(data);
        if(data != null){
          api.post('/api/get-notifications', {
                phone: data.phone,
                userID: data.user._id,
            }).then(res => {
                setNotifications(res.data);
            }).catch(error => {
                alert('?????? ???? ?????????????? ????????????. ???????? ?????????? ?????????????? ?????? ???? ???? ????????.')
                console.log(error);
            });
        }
    });
  }

  useEffect(() => {
    if(!readOnce) {
      getAccounts();
      readUser();
      readNotifications();
    }
    readOnce = true;
    setReadOnce(true);
    // setInterval(getAccounts, 60000);
    BackHandler.addEventListener('hardwareBackPress', function () {
      // BackHandler.exitApp();
      return false;
    });
  });
  return (
    <View style={styles.container}>
      {/* <Header title={'????????'} backID={'exit'} navigation={props.navigation}/> */}
      <View style={styles.blueArea}>
        <View style={styles.topHeader}>
          <TouchableOpacity style={styles.buttonIcon} onPress={() => {props.navigation.navigate('Settings')}}>
            <Icon  style={styles.headerIcon} name={'list'}/>  
          </TouchableOpacity>
          <View style={styles.tabButtonsView}>
            <TouchableOpacity 
              onPress={() => {
                setActiveTab('abvandi');
                activeTab = 'abvandi';
                sum = 0;
                for(var i=0; i<acounts.abvandi.length; i++)
                sum += acounts.abvandi[i].charge;
                setSum(sum);
                getAccounts();
                readUser();
                readNotifications();
              }}
              style={[styles.tabButton, {backgroundColor: activeTab == 'abvandi' ? colors.blue : 'transparent'}]}>
              <Text style={styles.tabButtonText}>???????????????</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {
                setActiveTab('chahvandi');
                activeTab = 'chahvandi';
                sum = 0;
                for(var i=0; i<acounts.chahvandi.length; i++)
                sum += acounts.chahvandi[i].charge;
                setSum(sum);
                getAccounts();
                readUser();
                readNotifications();
              }}
              style={[styles.tabButton, {backgroundColor: activeTab == 'chahvandi' ? colors.blue : 'transparent'}]}>
              <Text style={styles.tabButtonText}>?????????????????</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {
                setActiveTab('chah');
                activeTab = 'chah';
                sum = 0;
                for(var i=0; i<acounts.chah.length; i++)
                sum += acounts.chah[i].charge;
                setSum(sum);
                getAccounts();
                readUser();
                readNotifications();
              }}
              style={[styles.tabButton, {backgroundColor: activeTab == 'chah' ? colors.blue : 'transparent'}]}>
              <Text style={styles.tabButtonText}>??????</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buttonIcon} onPress={() =>{
              props.navigation.navigate('Notification')
            }}>
            <Icon style={styles.headerIcon} name={'bell'}/>  
            {notifications.filter(e => e.seen == false).length > 0 ? <View style={styles.notificationAlert} /> : <View></View>}
          </TouchableOpacity>
        </View>
        <Text style={styles.sumText}>{sum}</Text>
        <Text style={styles.sumTextDescription}>?????? ????????</Text>
        <View style={styles.navButtonsView}>
          <TouchableOpacity style={styles.navButton} onPress={() => {
            if(user.confirmed)
              props.navigation.navigate('Transmission');
            else
              alert('???????? ???????????? ?????? ???????? ?????????? ?????????? ????????. ???????? ?????????? ????????????.')
            }} >
            <Icon style={styles.navButtonIcon} name={'arrow-up'}/>  
            <Text style={styles.navButtonText}>????????????</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
              getAccounts();
              readUser();
              readNotifications();
            }} style={styles.navButton}>
            <Icon style={styles.navButtonIcon} name={'refresh'}/>  
            <Text style={styles.navButtonText}>???????? ????????</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            if(user.confirmed)
              setAddAccountEnable(true)
            else
              alert('???????? ???????????? ?????? ???????? ?????????? ?????????? ????????. ???????? ?????????? ????????????.')
            }} style={styles.navButton}>
            <Icon style={styles.navButtonIcon} name={'plus'}/>  
            <Text style={styles.navButtonText}>?????????? ????????</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.scrollView}>
        {activeTab == 'abvandi' ? <AcountView data={acounts.abvandi} title={'???????? ?????? ???????????????'} navigation={props.navigation}/> : null}
        {activeTab == 'chahvandi' ? <AcountView data={acounts.chahvandi} title={'???????? ?????? ?????????????????'} navigation={props.navigation}/> : null}
        {activeTab == 'chah' ? <AcountView data={acounts.chah} title={'???????? ?????? ??????'} navigation={props.navigation}/> : null}
      </View>
      <AddAccount enabled={addAccountEnable} buttonHandler={addNewAccount} setEnable={setAddAccountEnable} />
    </View>
  );
}
const SettingsScreen = (props) => {
  return (
    <View style={styles.container}>
      {/* <Header title={'??????????????'} backID={'Main'} navigation={props.navigation} /> */}
      <Setting navigation={props.navigation}/>
    </View>
  );
}
const HistoryScreen = (props) => {
  return (
    <View style={styles.container}>
      {/* <Header title={'??????????????'}  backID={'Main'} navigation={props.navigation}/> */}
      <History navigation={props.navigation}/>
    </View>
  );
}
const home = (props) => {
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
          title: '????????',
          tabBarLabelStyle: styles.tabBar,
          })}/>
        <Tab.Screen name="History" component={HistoryScreen} options={({route}) => ({
          headerShown: false, 
          title: '??????????????',
          tabBarLabelStyle: styles.tabBar,
        })} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={({route}) => ({
          headerShown: false, 
          title: '??????????????',
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
  blueArea: {
    backgroundColor: colors.blue,
  },
  topHeader: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    paddingVertical: 15,
  },
  buttonIcon: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  tabButtonsView: {
    flex: 5,
    flexDirection: 'row-reverse',
    backgroundColor: colors.darkBlue,
    borderRadius: 14,
    padding: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 3,
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 10,
  },
  tabButtonText: {
    fontFamily: 'iransans',
    fontSize: 13,
    textAlign: 'center',
    color: colors.white,

  },
  headerIcon: {
    color: colors.white,
    fontSize: 19,
    paddingVertical: 5,
    paddingHorizontal: 5,
    position: 'relative',
  },
  notificationAlert: {
    position: 'absolute',
    bottom: 2, 
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: colors.red,
    borderRadius: 8,
  },
  sumText: {
    color: colors.white,
    fontFamily: 'iransans',
    fontSize: 35,
    paddingTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sumTextDescription: {
    color: colors.white,
    fontFamily: 'iransans',
    fontSize: 11,
    textAlign: 'center',
    // paddingBottom: 10,
  },
  navButtonsView: {
    width: '70%',
    marginHorizontal: '15%',
    flexDirection: 'row-reverse',
    marginVertical: 20,
  },
  navButton: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  navButtonIcon: {
    color: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 17,
    borderRadius: 40,
    fontSize: 20,
    backgroundColor: colors.lightblue,
  },
  navButtonText: {
    color: colors.white,
    fontFamily: 'iransans',
    fontSize: 10,
    paddingTop: 7,
  },
  scrollView: {
    flex: 1,
  },
  listView: {

  },
});

export default home;
