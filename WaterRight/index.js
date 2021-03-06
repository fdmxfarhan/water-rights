import React, { useEffect, useState } from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import splash from './screens/splash';
import login from './screens/login';
import register from './screens/register';
import password from './screens/password';
import notification from './screens/notification';
import home from './screens/home';
import acount from './screens/acount';
import phoneLogin from './screens/phoneLogin';
import transmission from './screens/transmission';
import colors from './components/colors';

const App = (props) => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Splash" 
                    component={splash} 
                    options={({ route }) => ({ headerShown: false })}
                />
                <Stack.Screen 
                    name="Login" 
                    component={login} 
                    options={({ route }) => ({ 
                        headerShown: false,
                        title: 'ورود',
                        headerStyle: {
                            backgroundColor: colors.background,
                            textAlign: 'right',
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            textAlign: 'right',
                            fontFamily: 'iransans',
                        },
                    })}
                />
                <Stack.Screen 
                    name="Register" 
                    component={register} 
                    options={({ route }) => ({ 
                        headerShown: false,
                        title: 'ورود',
                        headerStyle: {
                            backgroundColor: colors.background,
                            textAlign: 'right',
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            textAlign: 'right',
                            fontFamily: 'iransans',
                        },
                    })}
                />
                <Stack.Screen 
                    name="Home" 
                    component={home} 
                    options={({ route }) => ({ 
                        headerShown: false,
                        title: 'خانه',
                        headerStyle: {
                            backgroundColor: colors.background,
                            textAlign: 'right',
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            textAlign: 'right',
                            fontFamily: 'iransans',
                        },
                    })}
                />
                <Stack.Screen 
                    name="Acount" 
                    component={acount} 
                    options={({ route }) => ({ 
                        headerShown: false,
                        title: 'مشاهده حساب',
                        headerStyle: {
                            backgroundColor: colors.background,
                            textAlign: 'right',
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            textAlign: 'right',
                            fontFamily: 'iransans',
                        },
                    })}
                />
                <Stack.Screen 
                    name="PhoneLogin" 
                    component={phoneLogin} 
                    options={({ route }) => ({ 
                        headerShown: false,
                        title: 'تایید شماره تلفن',
                        headerStyle: {
                            backgroundColor: colors.background,
                            textAlign: 'right',
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            textAlign: 'right',
                            fontFamily: 'iransans',
                        },
                    })}
                />
                <Stack.Screen 
                    name="Transmission" 
                    component={transmission} 
                    options={({ route }) => ({ 
                        headerShown: false,
                        title: 'تایید شماره تلفن',
                        headerStyle: {
                            backgroundColor: colors.background,
                            textAlign: 'right',
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            textAlign: 'right',
                            fontFamily: 'iransans',
                        },
                    })}
                />
                <Stack.Screen 
                    name="Password" 
                    component={password} 
                    options={({ route }) => ({ 
                        headerShown: false,
                        title: 'تغییر رمز عبور',
                        headerStyle: {
                            backgroundColor: colors.background,
                            textAlign: 'right',
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            textAlign: 'right',
                            fontFamily: 'iransans',
                        },
                    })}
                />
                <Stack.Screen 
                    name="Notification" 
                    component={notification} 
                    options={({ route }) => ({ 
                        headerShown: false,
                        title: 'اعلان ها',
                        headerStyle: {
                            backgroundColor: colors.background,
                            textAlign: 'right',
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            textAlign: 'right',
                            fontFamily: 'iransans',
                        },
                    })}
                />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
};
AppRegistry.registerComponent(appName, () => App);
