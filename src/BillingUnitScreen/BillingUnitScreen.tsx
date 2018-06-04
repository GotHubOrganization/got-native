import { Body, Button, Card, CardItem, Container, Content, Form, Header, Icon, Input, Item, Label, Left, List, ListItem, Right, Text, Title } from 'native-base';
import React from 'react';
import { Alert, ListView, StatusBar, View } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { NavigationScreenProp } from 'react-navigation';

export class BillingUnitScreen extends React.Component<{ navigation?: any }, { add: boolean, billingUnit: any }> {
    public static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerStyle: {},
            title: navigation.getParam('billingUnitName', 'Neue Abr.-Einh.')
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            add: true,
            billingUnit: {
                type: 'SQU',
                length: '0',
                height: '0',
                count: '0',
            }
        };
        this.save = this.save.bind(this);
        this.changeType = this.changeType.bind(this);
        this.changeLength = this.changeLength.bind(this);
        this.changeHeight = this.changeHeight.bind(this);
        this.changeCount = this.changeCount.bind(this);
    }

    public componentDidMount() {
        const billingUnit = this.props.navigation.getParam('billingUnit');
        if (billingUnit) {
            this.setState({
                add: false,
                billingUnit: {
                    ...this.state.billingUnit,
                    ...billingUnit
                },
            });
        }
    }

    public render() {
        return (
            <View style={{ flex: 1 }}>
                <Form>
                    <Item fixedLabel>
                        <Label>Typ:</Label>
                        <Input value={this.state.billingUnit.type} onChangeText={this.changeType} />
                    </Item>
                    <Item fixedLabel>
                        <Label>Länge:</Label>
                        <Input value={this.state.billingUnit.length} onChangeText={this.changeLength} />
                    </Item>
                    <Item fixedLabel>
                        <Label>Höhe:</Label>
                        <Input value={this.state.billingUnit.height} onChangeText={this.changeHeight} />
                    </Item>
                    <Item fixedLabel>
                        <Label>Stück:</Label>
                        <Input value={this.state.billingUnit.count} onChangeText={this.changeCount} />
                    </Item>
                </Form>
                <View style={{ flex: 1 }} />
                <Button onPress={this.save} full large >
                    <Text>Speichern</Text>
                </Button>
                <KeyboardSpacer />
            </View>
        );
    }

    private changeType(text) {
        this.setState({
            ...this.state,
            billingUnit: {
                ...this.state.billingUnit,
                type: text
            }
        });
    }

    private changeLength(text) {
        this.setState({
            ...this.state,
            billingUnit: {
                ...this.state.billingUnit,
                length: text
            }
        });
    }

    private changeHeight(text) {
        this.setState({
            ...this.state,
            billingUnit: {
                ...this.state.billingUnit,
                height: text
            }
        });
    }

    private changeCount(text) {
        this.setState({
            ...this.state,
            billingUnit: {
                ...this.state.billingUnit,
                count: text
            }
        });
    }

    private save() {
        if (this.state.add) {
            const addBillingUnit = this.props.navigation.getParam('addBillingUnit');
            addBillingUnit(this.state.billingUnit);
        } else {
            const saveBillingUnit = this.props.navigation.getParam('saveBillingUnit');
            saveBillingUnit(this.state.billingUnit);
        }
        this.props.navigation.navigate('Position');
    }
}
