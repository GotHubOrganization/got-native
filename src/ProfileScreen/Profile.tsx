import { Body, Button, Card, CardItem, Container, Content, Header, Icon, Left, Right, Text, Title } from 'native-base';
import React from 'react';
import { Alert, AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import EditScreenOne from './EditScreenOne.js';
import EditScreenTwo from './EditScreenTwo.js';

export default class Profile extends React.Component<{ navigation: any }> {
    public navigationOptions({ navigation }: any) {
        return {
            header: (
                <Header>
                    <Left>
                        <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                    <Right />
                </Header>
            )
        }
    }

    public componentDidMount() {
        Alert.alert('No Users Found', 'Oops, Looks like you are not signed in');
    }

    public render() {
        return (
            <Container>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Icon active name="paper-plane" />
                            <Text>Show User profiles here</Text>
                            <Right>
                                <Icon name="close" />
                            </Right>
                        </CardItem>
                    </Card>
                    <Button full rounded primary
                        style={{ marginTop: 10 }}
                        onPress={() => this.props.navigation.navigate('EditScreenOne')}>
                        <Text>Goto EditScreen One</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
