import React from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity } from "react-native";
import { Header, Icon, CheckBox, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { HOST } from 'react-native-dotenv';
import axios from 'axios';

export default class OwnerEditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideMenuView: false,
      item: '',
      price: '',
      category: '',
      image: '',
      desc: '',
      popular: false
    }
  }

  componentDidMount() {
        this.setState({
            item: this.props.menu[this.props.i].item ? this.props.menu[this.props.i].item : '',
            price: this.props.menu[this.props.i].price ? this.props.menu[0].price : '',
            category: this.props.menu[this.props.i].category ? this.props.menu[0].category : '',
            image: this.props.menu[this.props.i].image ? this.props.menu[0].image : '',
            desc: this.props.menu[this.props.i].desc ? this.props.menu[0].desc : '',
            popular: this.props.menu[this.props.i].popular ? this.props.menu[0].popular : false
        })
  }

  submit = () => {
      const saveItem = {
        item: this.state.item,
        price: this.state.price,
        category: this.state.category,
        image: this.state.image,
        desc: this.state.desc,
        popular: this.state.popular
      }
      const menu = this.props.menu
      const updateMenu = menu.map((item, i) => {
          if(i == this.props.i) {
              return saveItem
          } else { return item }
      })
      axios.put(`${HOST}/api/Businesses/${this.props.businessIds[0]}`, {
          ...this.props.businessData,
          menu: updateMenu
      })
        .then(res => Actions.ownerEditMenu({ token: this.props.token, userId: this.props.userId, businessIds: this.props.businessIds }))
        .catch(err => alert('Something went wrong.'))
  }

  logOut = () => {
    axios.post(`${HOST}/api/Owners/logout?access_token=${this.props.token}`)
        .then(res => Actions.map())
        .catch(err => alert('Something went wrong.'))
  }

  render() {
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View>
                <Header
                    containerStyle={{
                        backgroundColor: '#980000',
                        justifyContent: 'space-around',
                    }}
                    leftComponent={<Icon
                        name='menu'
                        onPress={() => this.setState({ sideMenuView: !this.state.sideMenuView })}
                    />}
                    centerComponent={{ style: { color: '#fff', fontSize: 25, fontWeight: 'bold' }, text: "Edit Item" }}
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
                : null}
            </View>
            <ScrollView scrollEnabled={true}>
                <Text style={styles.label}>Item Name</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={item => this.setState({ item: item })}
                    defaultValue={this.props.menu[this.props.i].item}/>
                <Text style={styles.label}>Price</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={price => this.setState({ price: price })}
                    defaultValue={this.props.menu[this.props.i].price}/>
                <Text style={styles.label}>Category</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={category => this.setState({ category: category })}
                    defaultValue={this.props.menu[this.props.i].category}/>
                <Text style={styles.label}>Image</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={image => this.setState({ image: image })}
                    defaultValue={this.props.menu[this.props.i].image}/>
                <Text style={styles.label}>Description</Text> 
                <TextInput
                    style={styles.textarea}
                    onChangeText={desc => this.setState({ desc: desc })}
                    defaultValue={this.props.menu[this.props.i].desc}
                    multiline={true}/>
                <CheckBox
                    containerStyle={styles.checkbox}
                    center
                    title='Mark As Popular Item'
                    checked={this.state.popular}
                    onPress={() => this.setState({popular: !this.state.popular})}/>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => Actions.ownerEditMenu({ token: this.props.token, userId: this.props.userId, businessIds: this.props.businessIds })}>
                    <Text style={styles.buttonText}> Cancel </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.submit(this.props.token, this.props.userId, this.props.businessIds)}>
                    <Text style={styles.buttonText}> Submit </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
      )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe599',
    },
    label: {
        margin: 5,
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        height: 40,
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 18
    },
    textarea: {
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        height: 120,
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 18
    },
    button: {
        backgroundColor: '#980000',
        padding: 10,
        marginTop: 20,
        marginLeft: 100,
        marginRight: 100,
        height: 40,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize:17,
    },
    checkbox: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    }
})