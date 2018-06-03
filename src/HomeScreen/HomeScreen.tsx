import { Body, Button, Card, CardItem, Container, Content, Header, Icon, Left, List, ListItem, Right, Text, Title, View } from 'native-base';
import React, { Component } from 'react';
import { Alert, ListView, StatusBar } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

export class HomeScreen extends React.Component<{ navigation?: any }, { houses: any }> {
    public static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerStyle: {},
            title: 'Home',
            headerRight: (
                <Button
                    transparent
                    onPress={params.newHouse}
                >
                    <Icon name="add" />
                </Button>
            )
        };
    };

    private houses;

    constructor(props) {
        super(props);
        this.state = {
            houses: [
                {
                    name: 'Haus 1',
                },
            ]
        };
        this.houses = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.addHouse = this.addHouse.bind(this);
        this.newHouse = this.newHouse.bind(this);
    }

    public componentWillMount() {
        this.props.navigation.setParams({ newHouse: this.newHouse });
    }

    public render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <Container>
                <Content>
                    <List
                        dataSource={this.houses.cloneWithRows(this.state.houses)}
                        renderRow={(house, secId, rowId, rowMap) =>
                            <ListItem button onPress={(a) => this.editHouse(house, secId, rowId)}>
                                <Text> {house.name} </Text>
                            </ListItem>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger onPress={_ => this.removeHouse(secId, rowId, rowMap)}>
                                <Icon active name="trash" />
                            </Button>}
                        disableRightSwipe
                        rightOpenValue={-120}
                    />
                </Content>
            </Container>
        );
    }

    private editHouse(house, secId, rowId) {
        this.props.navigation.navigate('House', {
            houseName: house.name,
            house,
            saveHouse: (h) => this.saveHouse(h, secId, rowId) });
    }

    private saveHouse(house, secId, rowId) {
        const newData = [...this.state.houses];
        newData[rowId] = house;
        this.setState({ houses: newData });
    }

    private removeHouse(secId, rowId, rowMap) {
        Alert.alert(
            'Haus löschen',
            'Möchtest du das Haus wirklich löschen?',
            [
                { text: 'Nein', onPress: () => rowMap[`${secId}${rowId}`].props.closeRow(), style: 'cancel' },
                { text: 'Ja', onPress: () => this.deleteHouse(secId, rowId, rowMap) },
            ],
            { cancelable: false }
        );
    }

    private deleteHouse(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.houses];
        newData.splice(rowId, 1);
        this.setState({ houses: newData });
    }

    private newHouse() {
        this.props.navigation.navigate('House', { addHouse: this.addHouse });
    }

    private addHouse(newHouse) {
        this.setState({
            houses: [
                ...this.state.houses,
                newHouse,
            ]
        });
    }
}
