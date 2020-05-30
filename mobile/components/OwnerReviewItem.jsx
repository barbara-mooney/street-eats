import React from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity } from "react-native";
import { Header, Icon, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { HOST } from 'react-native-dotenv';
import axios from 'axios';

export default class OwnerEditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideMenuView: false,
      response: ''
    }
  }

  submit = () => {
      const response = this.state.response
      axios.put(`${HOST}/api/Businesses/${this.props.businessIds[0]}/reviews/${this.props.review.id}?access_token=${this.props.token}`, {
          ...this.props.review,
          ["response text"]: response
      })
        .then(res => Actions.ownerManageReviews({ token: this.props.token, userId: this.props.userId, businessIds: this.props.businessIds }))
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
                    centerComponent={{ style: { color: '#fff', fontSize: 25, fontWeight: 'bold' }, text: "Review" }}
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
                <Text style={styles.label}>Respond</Text> 
                <TextInput
                    style={styles.textarea}
                    onChangeText={response => this.setState({ response: response })}
                    defaultValue={this.props.review['response text'] ? this.props.review['response text'] : null}
                    placeholder={this.props.review['response text'] ? null : "Tell them how you really feel"}
                    multiline={true}/>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => Actions.ownerManageReviews({ token: this.props.token, userId: this.props.userId, businessIds: this.props.businessIds })}>
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