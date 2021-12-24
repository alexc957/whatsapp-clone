import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';


const AuthNavigator = createNativeStackNavigator()

export default function AuthNavigation() {
    return (
        <NavigationContainer>
            <AuthNavigator.Navigator initialRouteName='Login' >
                <AuthNavigator.Screen name="Login"  component={Login} options={{
                    headerShown: false
                }}/>
                <AuthNavigator.Screen name="Sign Up" component={SignUp} />
            </AuthNavigator.Navigator>
        </NavigationContainer>
    )
}
