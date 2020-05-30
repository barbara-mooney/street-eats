import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Header, Icon, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { HOST } from 'react-native-dotenv';
import axios from 'axios';

export default class OwnerSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideMenuView: false,
    }
  }

  logOut() {
    axios.post(`${HOST}/api/Owners/logout?access_token=${this.props.token}`)
        .then(res => {
          this.goToMap()
        })
        .catch(err => alert('Something went wrong.'))
  }

  goToLogin = () => Actions.login();
  goToMap = () => Actions.map();
  toggleSideMenu = sideMenuView =>  this.setState({ sideMenuView: !sideMenuView });
  goToOwner = (token, userId, businessIds) => Actions.owner({ token: token, userId: userId, businessIds: businessIds });
  goToOwnerMap = (token, userId, businessIds) => Actions.ownerMap({ token: token, userId: userId, businessIds: businessIds });

  render() {
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
          centerComponent={{ style: { color: '#fff', fontSize: 25, fontWeight: 'bold' }, text: "Settings" }}
          rightComponent={<Icon
            name='home'
            onPress={() => this.goToOwnerMap(this.props.token, this.props.userId, this.props.businessIds)}
          />}
        />
        {this.state.sideMenuView ?
          <View style={styles.menu}>
            <Button title="Broadcast" onPress={() => this.goToOwner(this.props.token, this.props.userId, this.props.businessIds)} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white'}} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
            <Button title="Logout" onPress={() => this.logOut()} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white'}} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
          </View>
          : <View></View>}
        <View></View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => Actions.ownerEditMenu({ token: this.props.token, userId: this.props.userId, businessIds: this.props.businessIds })}>
          <Text style={styles.settingsButtonText}> Edit Menu </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => Actions.ownerManageReviews({ token: this.props.token, userId: this.props.userId, businessIds: this.props.businessIds })}>
          <Text style={styles.settingsButtonText}> Manage Reviews </Text>
        </TouchableOpacity>
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
  settingsButton: {
    backgroundColor: '#980000',
    width: 300,
    padding: 10,
    marginTop: 15,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 10,
    height: 40,
    borderRadius: 20,
  },
  settingsButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize:17,
  }
});
