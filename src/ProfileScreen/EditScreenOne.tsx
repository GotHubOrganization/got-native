import { Body, Button, Card, CardItem, Container, Content, Header, Icon, Left, Right, Text, Title } from 'native-base';
import React from 'react';
import { Alert, AppRegistry } from 'react-native';
export default class EditScreenOne extends React.Component<{navigation: any}> {
    public static navigationOptions = ({ navigation }: any) => ({
        header: (
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Title>EditScreenOne</Title>
                </Body>
                <Right />
            </Header>
        ),
    })
    public render() {
        return (
            <Container>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Icon active name="paper-plane" />
                            <Text>Edit Screen 1</Text>
                            <Right>
                                <Icon name="close" />
                            </Right>
                        </CardItem>
                    </Card>
                    <Button full rounded primary
                        style={{ marginTop: 10 }}
                        onPress={() => this.props.navigation.navigate('EditScreenTwo')}>
                        <Text>Goto EditScreenTwo</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
