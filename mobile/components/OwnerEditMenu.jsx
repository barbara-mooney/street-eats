import React from 'react';
import { StyleSheet, View, ScrollView } from "react-native";
import { Header, Icon, Button, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { HOST } from 'react-native-dotenv';
import axios from 'axios';

export default class OwnerEditMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      sideMenuView: false,
      businessData: {}
    }
  }

  componentDidMount() {
      axios.get(`${HOST}/api/Businesses/${this.props.businessIds[0]}`)
        .then(res => {  
            this.setState({ menu: res.data.menu, businessData: res.data })
        })
        .catch(err => alert('Something went wrong.'))
  }

  logOut = () => {
    axios.post(`${HOST}/api/Owners/logout?access_token=${this.props.token}`)
        .then(res => Actions.map())
        .catch(err => alert('Something went wrong.'))
  }

  render() {
      const menu = this.state.menu
      const displayMenu = menu.map((item, i) => (
        <ListItem
            key={i}
            onPress={() => Actions.ownerEditItem({ businessData: this.state.businessData, menu: menu, i: i, token: this.props.token, userId: this.props.userId, businessIds: this.props.businessIds })}
            leftAvatar={{ source: { url: item.image } }}
            title={item.item}
            subtitle={item.price}
            bottomDivider
            chevron
        />
      ))
      return (
        <View style={styles.container}>
            <Header
                containerStyle={{
                    backgroundColor: '#980000',
                    justifyContent: 'space-around',
                }}
                leftComponent={<Icon
                    name='menu'
                    onPress={() => this.setState({ sideMenuView: !this.state.sideMenuView })}
                />}
                centerComponent={{ style: { color: '#fff', fontSize: 25, fontWeight: 'bold' }, text: "Edit Menu" }}
                rightComponent={<Icon
                    name='home'
                    onPress={() => Actions.ownerMap({ token: this.props.token, userId: this.props.userId, businessIds: this.props.businessIds })}
                />}
            />
            {this.state.sideMenuView ?
                <View style={styles.menu}>
                    <Button title="Broadcast" onPress={() => Actions.owner({ token: this.props.token, userId: this.props.userId, businessIds: this.props.businessIds })} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white'}} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
                    <Button title="Settings" onPress={() => Actions.ownerSettings({ token: this.props.token, userId: this.props.userId, businessIds: this.props.businessIds })} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white'}} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
                    <Button title="Logout" onPress={() => this.logOut()} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white'}} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
                </View>
            : <View></View>}
            <ScrollView scrollEnabled={true}>
                <ListItem
                    onPress={() => Actions.ownerAddItem({ businessData: this.state.businessData, menu: this.state.menu, token: this.props.token, userId: this.props.userId, businessIds: this.props.businessIds })}
                    leftIcon={<Icon raised name='add' type='material'/>}
                    title="Add A New Menu Item"
                    titleStyle={styles.listAddItem}
                    bottomDivider
                    chevron
                />
                {displayMenu ? 
                    <View styles={styles.menu}>
                        {displayMenu}
                    </View>
                : null}
            </ScrollView>
        </View>
      )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe599',
    },
    menu: {
        backgroundColor: '#980000',
        alignSelf: 'stretch',
    },
    listAddItem: {
        justifyContent: 'center',
        color: 'gray',
        textAlign: 'center',
    }
});