import { Body, Button, Card, CardItem, Container, Content, Form, Header, Icon, Input, Item, Label, Left, List, ListItem, Right, Text, Title } from 'native-base';
import React from 'react';
import { Alert, ListView, StatusBar, View } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { NavigationScreenProp } from 'react-navigation';

export class HouseScreen extends React.Component<{ navigation?: any }, { add: boolean, house: any }> {
    public static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerStyle: {},
            title: navigation.getParam('houseName', 'Neues Haus'),
            headerRight: (
                <Button
                    transparent
                    onPress={params.newRoom}
                >
                    <Icon name="add" />
                </Button>
            )
        };
    };

    private rooms;

    constructor(props) {
        super(props);
        this.state = {
            add: true,
            house: {
                name: '',
                rooms: []
            }
        };
        this.rooms = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.save = this.save.bind(this);
        this.changeName = this.changeName.bind(this);
        this.newRoom = this.newRoom.bind(this);
        this.addRoom = this.addRoom.bind(this);
    }

    public componentWillMount() {
        this.props.navigation.setParams({ newRoom: this.newRoom });
    }

    public componentDidMount() {
        const house = this.props.navigation.getParam('house');
        if (house) {
            this.setState({
                add: false,
                house: {
                    ...this.state.house,
                    ...house
                },
            });
        }
    }

    public render() {
        return (
            <View style={{ flex: 1 }}>
                <Form>
                    <Item fixedLabel>
                        <Label>Name</Label>
                        <Input value={this.state.house.name} onChangeText={this.changeName} />
                    </Item>
                </Form>
                <List style={{ flex: 1 }}
                    dataSource={this.rooms.cloneWithRows(this.state.house.rooms)}
                    renderRow={(room, secId, rowId, rowMap) =>
                        <ListItem button onPress={(a) => this.editRoom(room, secId, rowId)}>
                            <Text> {room.name} </Text>
                        </ListItem>}
                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                        <Button full danger onPress={_ => this.removeRoom(secId, rowId, rowMap)}>
                            <Icon active name="trash" />
                        </Button>}
                    disableRightSwipe
                    rightOpenValue={-120}
                />
                <Button onPress={this.save} full large >
                    <Text>Speichern</Text>
                </Button>
                <KeyboardSpacer />
            </View>
        );
    }

    private changeName(text) {
        this.setState({
            ...this.state,
            house: {
                name: text,
                rooms: this.state.house.rooms
            }
        });
    }

    private save() {
        if (this.state.add) {
            const addHouse = this.props.navigation.getParam('addHouse');
            addHouse(this.state.house);
        } else {
            const saveHouse = this.props.navigation.getParam('saveHouse');
            saveHouse(this.state.house);
        }
        this.props.navigation.navigate('Home');
    }

    private editRoom(room, secId, rowId) {
        this.props.navigation.navigate('Room', {
            roomName: room.name,
            room,
            saveRoom: (r) => this.saveRoom(r, secId, rowId)
        });
    }

    private saveRoom(room, secId, rowId) {
        const newData = [...this.state.house.rooms];
        newData[rowId] = room;
        this.setState({
            ...this.state,
            house: {
                ...this.state.house,
                rooms: newData
            }
        });
    }

    private removeRoom(secId, rowId, rowMap) {
        Alert.alert(
            'Raum löschen',
            'Möchtest du den Raum wirklich löschen?',
            [
                { text: 'Nein', onPress: () => rowMap[`${secId}${rowId}`].props.closeRow(), style: 'cancel' },
                { text: 'Ja', onPress: () => this.deleteRoom(secId, rowId, rowMap) },
            ],
            { cancelable: false }
        );
    }

    private deleteRoom(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.house.rooms];
        newData.splice(rowId, 1);
        this.setState({
            ...this.state,
            house: {
                ...this.state.house,
                rooms: newData
            }
        });
    }

    private newRoom() {
        this.props.navigation.navigate('Room', { addRoom: this.addRoom });
    }

    private addRoom(newRoom) {
        this.setState({
            ...this.state,
            house: {
                ...this.state.house,
                rooms: [
                    ...this.state.house.rooms,
                    newRoom,
                ]
            }
        });
    }
}
