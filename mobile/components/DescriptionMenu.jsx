import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { Header, Icon, Button } from 'react-native-elements';
import { HOST } from 'react-native-dotenv';
import { Actions } from 'react-native-router-flux';
import axios from 'axios'

export default class DescriptionMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideMenuView: false
        }
    }

    logOut() {
        axios.post(`${HOST}/api/Customers/logout?access_token=${this.props.token}`)
            .then(res => this.goToMap())
    }

    toggleSideMenu = sideMenuView => this.setState({ sideMenuView: !sideMenuView });
    goToLogin = () => Actions.login();
    goToSettings = (token) => Actions.customerSettings({ token: token });
    goToMenu = (token, businessId) => Actions.menu({ businessId: businessId, token: token });
    goToMap = token => Actions.map({ token: token });

    render() {
        let loginButton = <Button title="Login" onPress={() => this.goToLogin()} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white' }} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />;
        let logoutButton = <Button title="Logout" onPress={() => this.logOut()} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white' }} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
        return (
            <View style={styles.container}>
                <Header
                    containerStyle={{
                        backgroundColor: '#980000',
                        justifyContent: 'space-around',
                    }}
                    leftComponent={<Icon
                        name='menu'
                        onPress={() => this.toggleSideMenu(this.state.sideMenuView)}
                    />}
                    centerComponent={{ style: { color: '#fff', fontSize: 25, fontWeight: 'bold' }, text: this.props.item }}
                    rightComponent={<Icon
                        name='home'
                        onPress={() => this.goToMap(this.props.token)}
                    />}
                />
                {this.state.sideMenuView ?
                    <View style={styles.menu}>
                        <Button title="Settings" onPress={() => this.goToSettings(this.props.token)} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white' }} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}}/>
                        {
                            this.props.token ? logoutButton : loginButton
                        }
                    </View>
                    : <View></View>}
                <View>
                    <Image
                        style={styles.photo}
                        source={{ uri: this.props.image }}
                    />
                </View>
                    <View style={styles.evenSpaced}>
                        <Text style={styles.desc}>{this.props.desc}</Text>
                        <Text style={styles.price}>${this.props.price}</Text>
                        <Button testID='gobacktomenu_btn' style={styles.backButton} title='Go Back to Menu' buttonStyle={{ backgroundColor: '#980000' }} onPress={() => this.goToMenu(this.props.token, this.props.businessId)} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}}>Back to Menu</Button>
                    </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffe599',
        flex: 1,
        flexDirection: 'column',
    },
    photo: {
        height: 350,
        alignItems: 'stretch',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
    },
    desc: {
        textAlign: 'center',
        paddingLeft: 10,
        fontSize: 40,
        color: 'black',
    },
    price: {
        fontWeight: 'bold',
        fontSize: 30,
        paddingTop: 5,
        alignSelf: 'center',
    },
    backButton: {
        display: 'flex',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },
    evenSpaced: {
        justifyContent: 'space-evenly',
        flex: 1,
        flexDirection: 'column'
    }
})
