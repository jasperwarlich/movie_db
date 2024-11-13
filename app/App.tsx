import { StyleSheet, Text, View, ActivityIndicator, FlatList, SafeAreaView, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import TabNavigator from './navigation/TabNavigator.tsx';

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}