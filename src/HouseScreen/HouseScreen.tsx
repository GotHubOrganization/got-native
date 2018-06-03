import { Body, Button, Card, CardItem, Container, Content, Form, Header, Icon, Input, Item, Label, Left, List, ListItem, Right, Text, Title } from 'native-base';
import React from 'react';
import { StatusBar, View } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { NavigationScreenProp } from 'react-navigation';

export class HouseScreen extends React.Component<{ navigation?: any }, { house: any }> {
    public static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerStyle: {},
            title: 'Neues Haus'
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            house: {
                name: '',
            }
        }
        this.saveHouse = this.saveHouse.bind(this);
        this.changeName = this.changeName.bind(this);
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
                <View style={{ flex: 1 }} />


                <Button onPress={this.saveHouse} transparent full large >
                    <Text>Speichern</Text>
                </Button>
                <KeyboardSpacer />
            </View>
        );
    }

    private changeName(text) {
        this.setState({
            house: {
                name: text
            }
        });
    }

    private saveHouse() {
        const addHouse = this.props.navigation.getParam('addHouse', []);
        addHouse(this.state.house);
        this.props.navigation.navigate('Home');
    }
}
