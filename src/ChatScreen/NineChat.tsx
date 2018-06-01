import { Body, Button, Container, Content, Header, Icon, Input, Item, Label, Left, Right, Text, Title } from 'native-base';
import React from 'react';
import { AppRegistry, StatusBar, View } from 'react-native';
import HomeScreen from '../HomeScreen';
export default class NineChat extends React.Component<{ navigation: any }> {
    public render() {
        const { navigate } = this.props.navigation;
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
                        <Title>Nine Chat</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Item floatingLabel style={{ marginTop: 20 }}>
                        <Label>Nine Chat</Label>
                        <Input />
                    </Item>
                    <Button
                        rounded
                        danger
                        style={{ marginTop: 20, alignSelf: 'center' }}
                        onPress={() => navigate('Profile')}>
                        <Text>Goto Nine Profile</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
