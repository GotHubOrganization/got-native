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
                    onPress={params.newBillingUnit}
                >
                    <Icon name="add" />
                </Button>
            )
        };
    };

    private billingUnits;

    constructor(props) {
        super(props);
        this.state = {
            add: true,
            position: {
                name: '',
                billingUnits: []
            }
        };
        this.billingUnits = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.save = this.save.bind(this);
        this.changeName = this.changeName.bind(this);
        this.newBillingUnit = this.newBillingUnit.bind(this);
        this.addBillingUnit = this.addBillingUnit.bind(this);
    }

    public componentWillMount() {
        this.props.navigation.setParams({ newBillingUnit: this.newBillingUnit });
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
                    dataSource={this.billingUnits.cloneWithRows(this.state.position.billingUnits)}
                    renderRow={(billingUnit, secId, rowId, rowMap) =>
                        <ListItem button onPress={(a) => this.editBillingUnit(billingUnit, secId, rowId)}>
                            <Text> {billingUnit.type} </Text>
                        </ListItem>}
                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                        <Button full danger onPress={_ => this.removeBillingUnit(secId, rowId, rowMap)}>
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
                billingUnits: this.state.position.billingUnits
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

    private editBillingUnit(billingUnit, secId, rowId) {
        this.props.navigation.navigate('BillingUnit', {
            billingUnitName: billingUnit.name,
            billingUnit,
            saveBillingUnit: (bu) => this.saveBillingUnit(bu, secId, rowId) });
    }

    private saveBillingUnit(billingUnit, secId, rowId) {
        const newData = [...this.state.position.billingUnits];
        newData[rowId] = billingUnit;
        this.setState({
            ...this.state,
            position: {
                ...this.state.position,
                billingUnits: newData
            }
        });
    }

    private removeBillingUnit(secId, rowId, rowMap) {
        Alert.alert(
            'Abrechnungseinheit löschen',
            'Möchtest du die Abrechnungseinheit wirklich löschen?',
            [
                { text: 'Nein', onPress: () => rowMap[`${secId}${rowId}`].props.closeRow(), style: 'cancel' },
                { text: 'Ja', onPress: () => this.deleteBillingUnit(secId, rowId, rowMap) },
            ],
            { cancelable: false }
        );
    }

    private deleteBillingUnit(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.position.billingUnits];
        newData.splice(rowId, 1);
        this.setState({
            ...this.state,
            position: {
                ...this.state.position,
                billingUnits: newData
            }
        });
    }

    private newBillingUnit() {
        this.props.navigation.navigate('BillingUnit', { addBillingUnit: this.addBillingUnit });
    }

    private addBillingUnit(newBillingUnit) {
        this.setState({
            ...this.state,
            position: {
                ...this.state.position,
                billingUnits: [
                    ...this.state.position.billingUnits,
                    newBillingUnit,
                ]
            }
        });
    }
}
