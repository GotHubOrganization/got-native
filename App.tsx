import Expo from 'expo';
import { Button, Icon } from 'native-base';
import * as React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { HomeScreen } from './src/HomeScreen/HomeScreen';
import { HouseScreen } from './src/HouseScreen/HouseScreen';
import { RoomScreen } from './src/RoomScreen/RoomScreen';

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        House: HouseScreen,
        Room: RoomScreen,
    }, {
        initialRouteName: 'Home'
    }
);

export default class App extends React.Component {
    public render() {
        return <RootStack />;
    }
}
