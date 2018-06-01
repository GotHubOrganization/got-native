import { Body, Button, Card, CardItem, Container, Content, Header, Icon, Left, Right, Text, Title } from 'native-base';
import React from 'react';
import { StatusBar } from 'react-native';

export class HomeScreen extends React.Component<{ navigation?: any }> {
    public render() {
        console.log(this.props);
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>HomeScreen</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text>Chat App to talk some awesome people!</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Button full rounded dark
                        style={{ marginTop: 10 }}
                        onPress={() => this.props.navigation.navigate('Chat')}>
                        <Text>Chat With People</Text>
                    </Button>
                    <Button full rounded primary
                        style={{ marginTop: 10 }}
                        onPress={() => this.props.navigation.navigate('Profile')}>
                        <Text>Goto Profiles</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
