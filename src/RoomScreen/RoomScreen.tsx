import { Body, Button, Card, CardItem, Container, Content, Form, Header, Icon, Input, Item, Label, Left, List, ListItem, Right, Text, Title } from 'native-base';
import React from 'react';
import { Alert, ListView, StatusBar, View } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { NavigationScreenProp } from 'react-navigation';

export class RoomScreen extends React.Component<{ navigation?: any }, { add: boolean, room: any }> {
    public static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerStyle: {},
            title: navigation.getParam('roomName', 'Neuer Raum'),
            headerRight: (
                <Button
                    transparent
                    onPress={params.newPosition}
                >
                    <Icon name="add" />
                </Button>
            )
        };
    };

    private positions;

    constructor(props) {
        super(props);
        this.state = {
            add: true,
            room: {
                name: '',
                positions: []
            }
        };
        this.positions = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.save = this.save.bind(this);
        this.changeName = this.changeName.bind(this);
        this.newPosition = this.newPosition.bind(this);
        this.addPosition = this.addPosition.bind(this);
    }

    public componentWillMount() {
        this.props.navigation.setParams({ newPosition: this.newPosition });
    }

    public componentDidMount() {
        const room = this.props.navigation.getParam('room');
        if (room) {
            this.setState({
                add: false,
                room: {
                    ...this.state.room,
                    ...room
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
                        <Input value={this.state.room.name} onChangeText={this.changeName} />
                    </Item>
                </Form>
                <List style={{ flex: 1 }}
                    dataSource={this.positions.cloneWithRows(this.state.room.positions)}
                    renderRow={(position, secId, rowId, rowMap) =>
                        <ListItem button onPress={(a) => this.editPosition(position, secId, rowId)}>
                            <Text> {position.name} </Text>
                        </ListItem>}
                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                        <Button full danger onPress={_ => this.removePosition(secId, rowId, rowMap)}>
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
            room: {
                name: text,
                positions: this.state.room.positions
            }
        });
    }

    private save() {
        if (this.state.add) {
            const addRoom = this.props.navigation.getParam('addRoom');
            addRoom(this.state.room);
        } else {
            const saveRoom = this.props.navigation.getParam('saveRoom');
            saveRoom(this.state.room);
        }
        this.props.navigation.navigate('House');
    }

    private editPosition(position, secId, rowId) {
        this.props.navigation.navigate('Position', {
            positionName: position.name,
            position,
            savePosition: (p) => this.savePosition(p, secId, rowId) });
    }

    private savePosition(position, secId, rowId) {
        const newData = [...this.state.room.positions];
        newData[rowId] = position;
        this.setState({
            ...this.state,
            room: {
                ...this.state.room,
                positions: newData
            }
        });
    }

    private removePosition(secId, rowId, rowMap) {
        Alert.alert(
            'Position löschen',
            'Möchtest du die Position wirklich löschen?',
            [
                { text: 'Nein', onPress: () => rowMap[`${secId}${rowId}`].props.closeRow(), style: 'cancel' },
                { text: 'Ja', onPress: () => this.deletePosition(secId, rowId, rowMap) },
            ],
            { cancelable: false }
        );
    }

    private deletePosition(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.room.positions];
        newData.splice(rowId, 1);
        this.setState({
            ...this.state,
            room: {
                ...this.state.room,
                positions: newData
            }
        });
    }

    private newPosition() {
        this.props.navigation.navigate('Position', { addPosition: this.addPosition });
    }

    private addPosition(newPosition) {
        this.setState({
            ...this.state,
            room: {
                ...this.state.room,
                positions: [
                    ...this.state.room.positions,
                    newPosition,
                ]
            }
        });
    }
}
