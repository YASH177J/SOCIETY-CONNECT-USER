import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../Screens/HomeScreen';
import ViewAnnouncement from '../Screens/ViewAnnouncement'
export const HomeStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: { headerShown: false },
    },
     ViewAnnouncement: {
      screen: ViewAnnouncement,
      navigationOptions: { headerShown: false },
    },
  },
  {
    initialRouteName: 'HomeScreen',
  }
);
