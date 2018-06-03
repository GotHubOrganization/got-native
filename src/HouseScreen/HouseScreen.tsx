import { Body, Button, Card, CardItem, Container, Content, Form, Header, Icon, Input, Item, Label, Left, List, ListItem, Right, Text, Title } from 'native-base';
import React from 'react';
import { StatusBar, View } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { NavigationScreenProp } from 'react-navigation';

export class HouseScreen extends React.Component<{ navigation?: any }, { add: boolean, house: any }> {
    public static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerStyle: {},
            title: navigation.getParam('houseName', 'Neues Haus')
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            add: true,
            house: {
                name: '',
            }
        }
        this.save = this.save.bind(this);
        this.changeName = this.changeName.bind(this);
    }

    public componentDidMount() {
        const house = this.props.navigation.getParam('house');
        if (house) {
            this.setState({
                add: false,
                house,
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
                <View style={{ flex: 1 }} />
                <Button onPress={this.save} transparent full large >
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
}
