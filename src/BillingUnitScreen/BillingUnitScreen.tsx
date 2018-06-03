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
                name: ''
            }
        };
        this.save = this.save.bind(this);
        this.changeName = this.changeName.bind(this);
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
                        <Label>Name</Label>
                        <Input value={this.state.billingUnit.name} onChangeText={this.changeName} />
                    </Item>
                </Form>
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
            billingUnit: {
                name: text
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
