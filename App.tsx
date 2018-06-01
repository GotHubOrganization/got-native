import Expo from 'expo';
import * as React from 'react';
import { View } from 'react-native';
import { HomeScreen } from './src/HomeScreen/HomeScreen';

export default class App extends React.Component<{}, { isReady: boolean }> {
    constructor(props: {}) {
        super(props);
        // console.log(props);
        this.state = {
            isReady: false
        };
    }
    public async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            Ionicons: require('native-base/Fonts/Ionicons.ttf')
        });
        this.setState({ isReady: true });
    }
    public render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading />;
        }
        return <HomeScreen />;
    }
}
