import Expo from 'expo';
import * as React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LucyChat from './src/ChatScreen/LucyChat';
import { HomeScreen } from './src/HomeScreen/HomeScreen';
import Profile from './src/ProfileScreen/Profile';


const RootStack = createStackNavigator({
    Home: HomeScreen,
    Profile,
    Chat: LucyChat,
});

export default class App extends React.Component {
    public render() {
        return <RootStack />;
    }
}
