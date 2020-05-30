import axios from 'axios';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, TouchableOpacity, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { HOST } from 'react-native-dotenv';

class PasswordResetForm extends Component {
  state = {
    newPassword: '',
    confirmedNewPassword: ''
  }

  goToMap = () => Actions.map();

  handleNewPassword = text => this.setState({ newPassword: text });
  handleConfirmedNewPassword = text => this.setState({ confirmedNewPassword: text });
  handleSubmitNewPassword = (newPassword, confirmedNewPassword) => {
    if(newPassword != confirmedNewPassword) {
      alert('Your passwords do not match');
      return;
      } else {
        axios.post(`${HOST}/api/Customers/reset-password`, {
          password: newPassword
        })
        .then((res) => {
          res.status(200)
        })    
        .catch(errCreate => alert('Oops. Something went wrong.'));
        alert('Check your email for further instructions.')
    }
}

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View>
          <Header
              containerStyle={{
                backgroundColor: '#ffe599',
                justifyContent: 'space-around',
                borderBottomWidth: 0, 
              }}
              rightComponent={<Icon
                name='close'
                color= '#980000'
                onPress={() => {this.goToMap()}}
              />}
          />
        </View>
        <ScrollView scrollEnabled={true}>
            <Image style={styles.logo} source={require('../assets/logo.png')}/>
            <Text style={styles.text}>Enter new password:</Text>
            <TextInput 
                placeholderTextColor='black'
                returnKeyType='next'
                style={styles.inputtext}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                keyboardType='default'
                returnKeyType='next'
                onChangeText={this.handleNewPassword}
            />
            <Text style={styles.text}>Confirm new password:</Text>
            <TextInput 
                placeholderTextColor='black'
                returnKeyType='next'
                style={styles.inputtext}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                keyboardType='default'
                returnKeyType='next'
                onChangeText={this.handleConfirmedNewPassword}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleSubmitNewPassword(this.state.newPassword, this.state.newConfirmedPassword)}>
                <Text style={styles.buttonText}>Submit new password</Text>
            </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      );
    };
  };

export default PasswordResetForm;

const styles = StyleSheet.create({
    container: {
        paddingTop: 23,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#ffe599',
    },
    inputtext: {
        height: 40,
        backgroundColor: '#FFF',
        borderColor: 'black',
        padding: 2,
        borderWidth: 1,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 8,
        color: 'black',
        fontSize: 17,
        paddingHorizontal: 10
        },
    text: {
        color: 'black',
        paddingHorizontal: 10,
        marginLeft: 30,
        marginRight: 30,
        fontSize: 16, 
        marginBottom: 10
        },
    button: {
        backgroundColor: '#980000',
        padding: 10,
        marginTop: 15,
        marginLeft: 100,
        marginRight: 100,
        marginBottom: 0,
        height: 40,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize:17,
    },
    logo: {
        width: 340,
        height: 325,
        marginBottom: 35,
        marginTop: 35,
        marginLeft: 'auto',
        marginRight: 'auto',
        resizeMode: 'contain',
        justifyContent: 'center',
        }
  })
  