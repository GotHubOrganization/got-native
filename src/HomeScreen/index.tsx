import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import MainScreenNavigator from '../ChatScreen/index.js';
import Profile from '../ProfileScreen/index.js';
import SideBar from '../SideBar/SideBar.js';
import { HomeScreen } from './HomeScreen.js';
const HomeScreenRouter = DrawerNavigator(
    {
        Home: { screen: HomeScreen },
        Chat: { screen: MainScreenNavigator },
        Profile: { screen: Profile },
    },
    {
        contentComponent: (props) => <SideBar {...props} />,
    },
);
export default HomeScreenRouter;
