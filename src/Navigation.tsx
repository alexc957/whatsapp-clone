import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native'

import States from './Screens/States';
import { NavigationContainer } from '@react-navigation/native';
import { Animated, TouchableOpacity } from 'react-native';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import Login from './Screens/Login';
import { FirebaseApp } from 'firebase/app';
import FirebaseContext from './Contexts/FirebaseContext';
import Chats from './Screens/ChatsScree/Chats';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndivualChat from './Screens/IndividualChat/IndivualChat';


const Tab = createMaterialTopTabNavigator();



function MyTabBar({ state, descriptors, navigation, position }: any) {
  return (

    <View style={{flexDirection: 'column'}}>
        <Text>I am a searching top bar</Text>
    <View style={{ flexDirection: 'row', paddingTop: 25 }}>
        
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        
    

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}
            style={{ flex: 2 }}
          >
            <Animated.Text style={{
                borderBottomWidth: isFocused? 1: 0,
                borderBottomColor: isFocused? 'blue' : 'inherit',
                textAlign: 'center'

            }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
    </View>
  );
}


const Stack = createNativeStackNavigator();

function ChatNavigator()  {

  return <Stack.Navigator>
      <Stack.Screen name='Chats' component={Chats} />
      <Stack.Screen name='Chat' component={IndivualChat} />
  </Stack.Navigator>
  
}
export default function Navigation() {
    const [user, setUser] = useState<User | null>(null);
    const app: FirebaseApp | null = useContext(FirebaseContext);

    useEffect(() => {
      const auth = getAuth(app || undefined);
      const unsubcrbe = onAuthStateChanged(auth, (user)=> {
        if(user){
          setUser(user);
        }
      })
      return unsubcrbe;

    }, [])

    if(!user){
      return <Login />
    }
    return (
        <NavigationContainer>
            <Tab.Navigator
            tabBar={props => <MyTabBar {...props} />}
                style={{
                    marginTop: 25 
                }}
            >
                <Tab.Screen  name={"Contactos"} component={ChatNavigator} />
                <Tab.Screen  name="Estados" component={States}  />   
            </Tab.Navigator>
        </NavigationContainer>
    )
}
