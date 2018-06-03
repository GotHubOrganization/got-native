import { Body, Button, Card, CardItem, Container, Content, Form, Header, Icon, Input, Item, Label, Left, List, ListItem, Right, Text, Title } from 'native-base';
import React from 'react';
import { Alert, ListView, StatusBar, View } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { NavigationScreenProp } from 'react-navigation';

export class PositionScreen extends React.Component<{ navigation?: any }, { add: boolean, position: any }> {
    public static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerStyle: {},
            title: navigation.getParam('positionName', 'Neue Position'),
            headerRight: (
                <Button
                    transparent
                    onPress={params.newCalcUnit}
                >
                    <Icon name="add" />
                </Button>
            )
        };
    };

    private calcUnits;

    constructor(props) {
        super(props);
        this.state = {
            add: true,
            position: {
                name: '',
                calcUnits: []
            }
        };
        this.calcUnits = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.save = this.save.bind(this);
        this.changeName = this.changeName.bind(this);
        this.newCalcUnit = this.newCalcUnit.bind(this);
        this.addCalcUnit = this.addCalcUnit.bind(this);
    }

    public componentWillMount() {
        this.props.navigation.setParams({ newCalcUnit: this.newCalcUnit });
    }

    public componentDidMount() {
        const position = this.props.navigation.getParam('position');
        if (position) {
            this.setState({
                add: false,
                position: {
                    ...this.state.position,
                    ...position
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
                        <Input value={this.state.position.name} onChangeText={this.changeName} />
                    </Item>
                </Form>
                <List style={{ flex: 1 }}
                    dataSource={this.calcUnits.cloneWithRows(this.state.position.calcUnits)}
                    renderRow={(calcUnit, secId, rowId, rowMap) =>
                        <ListItem button onPress={(a) => this.editCalcUnit(calcUnit, secId, rowId)}>
                            <Text> {calcUnit.name} </Text>
                        </ListItem>}
                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                        <Button full danger onPress={_ => this.removeCalcUnit(secId, rowId, rowMap)}>
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
            position: {
                name: text,
                calcUnits: this.state.position.calcUnits
            }
        });
    }

    private save() {
        if (this.state.add) {
            const addPosition = this.props.navigation.getParam('addPosition');
            addPosition(this.state.position);
        } else {
            const savePosition = this.props.navigation.getParam('savePosition');
            savePosition(this.state.position);
        }
        this.props.navigation.navigate('Room');
    }

    private editCalcUnit(calcUnit, secId, rowId) {
        this.props.navigation.navigate('CalcUnit', {
            calcUnitName: calcUnit.name,
            calcUnit,
            saveCalcUnit: (cu) => this.saveCalcUnit(cu, secId, rowId) });
    }

    private saveCalcUnit(calcUnit, secId, rowId) {
        const newData = [...this.state.position.calcUnits];
        newData[rowId] = calcUnit;
        this.setState({
            ...this.state,
            position: {
                ...this.state.position,
                calcUnits: newData
            }
        });
    }

    private removeCalcUnit(secId, rowId, rowMap) {
        Alert.alert(
            'CalcUnit löschen',
            'Möchtest du die CalcUnit wirklich löschen?',
            [
                { text: 'Nein', onPress: () => rowMap[`${secId}${rowId}`].props.closeRow(), style: 'cancel' },
                { text: 'Ja', onPress: () => this.deleteCalcUnit(secId, rowId, rowMap) },
            ],
            { cancelable: false }
        );
    }

    private deleteCalcUnit(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.position.calcUnits];
        newData.splice(rowId, 1);
        this.setState({
            ...this.state,
            position: {
                ...this.state.position,
                calcUnits: newData
            }
        });
    }

    private newCalcUnit() {
        this.props.navigation.navigate('CalcUnit', { addCalcUnit: this.addCalcUnit });
    }

    private addCalcUnit(newCalcUnit) {
        this.setState({
            ...this.state,
            position: {
                ...this.state.position,
                CalcUnits: [
                    ...this.state.position.calcUnits,
                    newCalcUnit,
                ]
            }
        });
    }
}
