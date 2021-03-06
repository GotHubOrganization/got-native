import Expo, { Font } from 'expo';
import { Button, Icon } from 'native-base';
import * as React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { BillingUnitScreen } from './src/BillingUnitScreen/BillingUnitScreen';
import { HomeScreen } from './src/HomeScreen/HomeScreen';
import { HouseScreen } from './src/HouseScreen/HouseScreen';
import { PositionScreen } from './src/PositionScreen/PositionScreen';
import { RoomScreen } from './src/RoomScreen/RoomScreen';

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        House: HouseScreen,
        Room: RoomScreen,
        Position: PositionScreen,
        BillingUnit: BillingUnitScreen,
    }, {
        initialRouteName: 'Home'
    }
);

export default class App extends React.Component {
    public async componentWillMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
        });
        this.setState({ loading: false });
    }

    public render() {
        return (
            <RootStack />
        );
    }
}
