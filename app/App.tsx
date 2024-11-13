import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import TabNavigator from './navigation/TabNavigator.tsx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}