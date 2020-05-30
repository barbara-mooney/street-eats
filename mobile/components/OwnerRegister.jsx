import axios from 'axios';
import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { HOST } from 'react-native-dotenv';
import AnimatedInput from 'react-native-animated-input-label';

class OwnerRegister extends Component {
    state = {
        name: '',
        businessName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmedPassword: '',
        value: ''
    }

    handleName = text => this.setState({ name: text });
    handleBusinessName = text => this.setState({ businessName: text })
    handleNumber = text => this.setState({ phoneNumber: text });
    handleEmail = text => this.setState({ email: text });
    handlePassword = text => this.setState({ password: text });
    handleConfirmedPassword = text => this.setState({ confirmedPassword: text });
    handleTextChange = newText => this.setState({ value: newText });

    registerOwner = (name, businessName, phoneNumber, email, password) => {
        if(this.state.password != this.state.confirmedPassword) {
            alert('Your passwords do not match');
            return;
        } else {
        axios.post(`${HOST}/api/Owners`, {
            name: name,
            business: [businessName],  
            number: phoneNumber,
            email: email,
            password: password
        })
        .then((response) =>
            axios.post(`${HOST}/api/Owners/login`, {
                email: email,
                password: password
            })
            .then(res => {
                axios.get(`${HOST}/api/Owners/${res.data.userId}/businesses`)
                .then(response => this.goToOwnerMap(res.data.id, res.data.userId, response.data.map(business => business.id)))
                .catch(err => alert('You have no businesses associated with your account'));
            })
            .catch(errLogin => alert('Please enter a valid username and password.'))
        )
        .catch(errCreate => alert('Oops. Something went wrong.'));
        }
    }

    goToMap = token => Actions.map({token : token});
    goToLogin = () => Actions.login();
    goToOwnerMap = (token, userId, businessIds) => Actions.ownerMap({token: token, userId: userId, businessIds: businessIds});

    render() {    
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <ScrollView scrollEnabled={true}>
                    <Image style={styles.logo} source={require('../assets/logo.png')} />
                    <Text style={styles.text}>Name</Text>
                    <TextInput 
                        placeholderTextColor='black'
                        returnKeyType='next'
                        style={styles.inputtext}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        keyboardType='default'
                        returnKeyType='next'
                        onChangeText={this.handleName}
                    />
                    <Text style={styles.text}>Business Name</Text>
                    <TextInput 
                        placeholderTextColor='black'
                        returnKeyType='next'
                        style={styles.inputtext}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        keyboardType='default'
                        returnKeyType='next'
                        onChangeText={this.handleBusinessName}
                    />  
                    <Text style={styles.text}>Phone Number</Text>
                    <TextInput 
                        placeholderTextColor='black'
                        returnKeyType='next'
                        style={styles.inputtext}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        keyboardType='numeric'
                        returnKeyType='next'
                        onChangeText={this.handleNumber}
                    />
                    <Text style={styles.text}>Email</Text>
                    <TextInput 
                        placeholderTextColor='black'
                        returnKeyType='next'
                        style={styles.inputtext}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        returnKeyType='next'
                        onChangeText={this.handleEmail}
                    />
                    <Text style={styles.text}>Password</Text>
                    <TextInput 
                        placeholderTextColor='black'
                        returnKeyType='next'
                        style={styles.inputtext}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        keyboardType='default'
                        returnKeyType='next'
                        secureTextEntry={true}
                        onChangeText={this.handlePassword}
                    />
                    <Text style={styles.text}>Confirm Password</Text>
                    <TextInput 
                        placeholderTextColor='black'
                        returnKeyType='next'
                        style={styles.inputtext}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        keyboardType='default'
                        returnKeyType='go'
                        secureTextEntry={true}
                        onChangeText={this.handleConfirmedPassword}
                    />
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => this.registerOwner(this.state.name, this.state.businessName, this.state.phoneNumber, this.state.email, this.state.password)}>
                        <Text style={styles.registerButtonText}>Create Account</Text>
                    </TouchableOpacity>
                    <Text style={styles.registerButton} onPress={this.goToLogin} >Return to login page</Text>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
export default OwnerRegister;

const styles = StyleSheet.create({
    container: {
        paddingTop: 23,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#ffe599'
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
        marginLeft: 30
        },
    loginButton: {
        backgroundColor: '#980000',
        padding: 10,
        marginTop: 25,
        marginLeft: 100,
        marginRight: 100,
        marginBottom: 15,
        height: 40,
        borderRadius: 20,
    },
    registerButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    registerButton: {
        color: 'blue',
        textAlign: 'center'
    },
    logo: {
        width: 340,
        height: 325,
        marginBottom: 0,
        marginTop: 35,
        marginLeft: 'auto',
        marginRight: 'auto',
        resizeMode: 'contain',
        justifyContent: 'center',
      }
});
