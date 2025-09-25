import React from 'react';
import { StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import KeyboardScreen from './src/screen/KeyboardScreen';
import {SearchScreen} from './src/screen/SearchScreen';
import AllShowScreen from './src/screen/AllShowScreen';
import DetailScreen from './src/screen/DetailScreen';
import SplashScreen from './src/screen/SplashScreen';

import { RootStackParamList, BottomTabParamList } from './src/types/navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function BottomTabs() {
  return (
    <Tab.Navigator
  screenOptions={({ route }) => ({
    // headerShown: false,
   
    tabBarLabelStyle: { fontSize: 14 },
    tabBarIcon: ({ focused, color, size }) => {
      let icon = '';
      if (route.name === 'Keyboard') icon = '🎹';
      else if (route.name === 'Search') icon = '🔍';
      else if (route.name === 'AllShows') icon = '🎶';

      return (
        <Text style={{ fontSize: 20, color: focused ? '#6200ee' : '#888' }}>
          {icon}
        </Text>
      );
    },
    tabBarActiveTintColor: '#6200ee',
    tabBarInactiveTintColor: '#888',
  })}
>
  <Tab.Screen name="Keyboard" component={KeyboardScreen} />
  <Tab.Screen name="Search" component={SearchScreen} />
  <Tab.Screen name="AllShows" component={AllShowScreen} />
</Tab.Navigator>
  );
}
export default function App() {
  return (
  <GestureHandlerRootView>
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        <Stack.Screen
          name="HomeTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}
