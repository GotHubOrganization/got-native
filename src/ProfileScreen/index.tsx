import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import EditScreenOne from './EditScreenOne.js';
import EditScreenTwo from './EditScreenTwo.js';
import Profile from './Profile.js';

export default StackNavigator({
    Profile: { screen: Profile },
    EditScreenOne: { screen: EditScreenOne },
    EditScreenTwo: { screen: EditScreenTwo },
});
