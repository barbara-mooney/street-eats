import axios from 'axios';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, TouchableOpacity, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { HOST } from 'react-native-dotenv';

// const config = require('../../server/server/config.json');
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class PasswordResetForm extends Component {
  state = {
    email: '',
  }

  handleEmail = text => this.setState({ email: text })
  goToMap = () => Actions.map();
  goToLogin = () => Actions.login();
  
  requestPasswordResetCustomer = (inputedEmail) => {
    axios.get(`${HOST}/api/Customers`)
    .then((response) => {
      let allEmails = [];
      response.data.map(data => {
        allEmails.push(data.email);
      });
    if(allEmails.includes(inputedEmail)){
      axios.post(`${HOST}/request-password-reset-customers`, 
      {email: inputedEmail,
      model: 'Customers'}
        ).catch(error => {
              console.log(error)
          });
          alert('Check your email for further instructions.');
        }else{
          alert('Email does not exist, register to make an account.');
        }
    })
    .catch((error) => 
      console.log(error)
    );
  }; 

  requestPasswordResetOwner = (inputedEmail) => {
    axios.get(`${HOST}/api/Owners`)
    .then((response) => {
      let allEmails = [];
      response.data.map(data => {
        allEmails.push(data.email);
      });
    if(allEmails.includes(inputedEmail)){
      axios.post(`${HOST}/request-password-reset-owners`, 
      {email: inputedEmail,
      model: 'Owners'}
        ).catch(error => {
              console.log(error)
          });
          alert('Check your email for further instructions.');
        }else{
          alert('Email does not exist, register to make an account.');
        }
    })
    .catch((error) => 
      console.log(error)
    );
  }; 

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
            <Text style={styles.text}>To reset your password, enter the email associated with your Street Eats account.</Text>
            <TextInput 
                testID='email'
                placeholderTextColor='black'
                returnKeyType='next'
                style={styles.inputtext}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                keyboardType='email-address'
                returnKeyType='next'
                onChangeText={this.handleEmail}
            />
            <Text style={styles.continue}>Continue as ...</Text>
            <TouchableOpacity
                testID='login_user'
                style={styles.button}
                onPress={() => this.requestPasswordResetCustomer(this.state.email)}>
                <Text style={styles.buttonText}>Customer</Text>
            </TouchableOpacity>
            <TouchableOpacity
                testID='login_user'
                style={styles.button}
                onPress={() => this.requestPasswordResetOwner(this.state.email)}>
                <Text style={styles.buttonText}>Owner</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.cancelButton}
                onPress = {() => this.goToLogin()}
                >
                <Text style={styles.buttonText} >Cancel</Text>
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
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
        width:150,
        marginBottom: 0,
        height: 40,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize:16,
    },
    logo: {
        width: 340,
        height: 300,
        marginBottom: 10,
        marginTop: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        resizeMode: 'contain',
        justifyContent: 'center',
        },
        cancelButton: {
          backgroundColor: '#980000',
          padding: 10,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 15,
          width:150,
          marginBottom: 20,
          height: 40,
          borderRadius: 20,
      },
      continue: {
        color: 'black',
        paddingHorizontal: 10,
        marginLeft: 30,
        marginRight: 30,
        fontSize: 16, 
        marginBottom: 10,
        textAlign: 'center'
        }
  })
  