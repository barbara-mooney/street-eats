import React from 'react';
import { StyleSheet, View } from "react-native";
import { Header, Icon, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { HOST } from 'react-native-dotenv';
import axios from 'axios';

export default class CustomerSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideMenuView: false,
    }
  }

  toggleSideMenu= sideMenuView => this.setState({ sideMenuView: !sideMenuView });
  goToMap = (token, userId) => Actions.map({ token: token, userId: userId });
  goToLogin = () => Actions.login();

  logOut() {
    axios.post(`${HOST}/api/Customers/logout?access_token=${this.props.token}`)
        .then(res => this.goToMap())
}

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
          centerComponent={{ style: { color: '#fff', fontSize: 25, fontWeight: 'bold' }, text: 'Settings' }}
          rightComponent={<Icon
            name='home'
            onPress={() => this.goToMap(this.props.token, this.props.userId)}
          />}
        />
        {this.state.sideMenuView ?
          <View style={styles.menu}>
            {this.props.token ? logoutButton : loginButton}
          </View>
          : <View></View>}
        <View></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe599',
    alignItems: 'center',
  },
  menu: {
    backgroundColor: '#980000',
    alignSelf: 'stretch',
  },
});
