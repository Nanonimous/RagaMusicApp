import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import KeyboardScreen from './src/screen/KeyboardScreen';
import {SearchScreen} from './src/screen/SearchScreen';
import AllShowScreen from './src/screen/AllShowScreen';
import DetailScreen from './src/screen/DetailScreen';

import { RootStackParamList, BottomTabParamList } from './src/types/navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function BottomTabs() {
  return (
    <Tab.Navigator>
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
