// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../src/HomeScreen';
import SearchScreen from '../src/SearchScreen'
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconSource: any;

                    if (route.name === 'Discover') {
                        iconSource = focused
                            ? require('../assets/popcorn.png') : require('../assets/popcorn.png')
                    } else if (route.name === 'Search') {
                        iconSource = focused
                            ? require('../assets/search.png') : require('../assets/search.png')
                    }

                    // Render the image as an icon
                    return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
                },
            })}
        >
            <Tab.Screen name="Discover" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
        </Tab.Navigator>
    );
};

export default TabNavigator;
