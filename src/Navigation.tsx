import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import { View, Text } from 'react-native'
import Chats from './Screens/Chats';
import States from './Screens/States';
import { NavigationContainer } from '@react-navigation/native';
import { Animated, TouchableOpacity } from 'react-native';

const Tab = createMaterialTopTabNavigator();



function MyTabBar({ state, descriptors, navigation, position }) {
  return (

    <View style={{flexDirection: 'column'}}>
        <Text>I am a searching top bar</Text>
    <View style={{ flexDirection: 'row', paddingTop: 25 }}>
        
      {state.routes.map((route, index) => {
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
export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
            tabBar={props => <MyTabBar {...props} />}
                style={{
                    marginTop: 25 
                }}
            >
                <Tab.Screen  name={"Chats"} component={Chats} />
                <Tab.Screen  name="Estados" component={States}  />   
            </Tab.Navigator>
        </NavigationContainer>
    )
}
