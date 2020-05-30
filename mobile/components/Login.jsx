import axios from 'axios';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, TouchableOpacity, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { HOST } from 'react-native-dotenv';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleEmail = text => this.setState({ email: text })
  handlePassword = text => this.setState({ password: text })

  login = (email, pass) => {
    axios.post(`${HOST}/api/Customers/login`, {
        email: email,
        password: pass
    })
    .then(res => {
      axios.get(`${HOST}/api/Customers/${res.data.userId}`)
      .then(response => {	
        switch(this.props.referredTo) {	
          case 'displayReview':	
              this.goToDisplayReview(res.data.id, res.data.userId, response.data.name)	
          default:	
              this.goToMap(res.data.id, res.data.userId, response.data.name)	
      }	
      })	
      .catch(err => console.log(err))
    })
    .catch(err => alert('Login attempt failed. Wrong username or password.'));
  }

  loginOwner = (email, pass) => {
    axios.post(`${HOST}/api/Owners/login`, {
        email: email,
        password: pass
    })
    .then(res => {
        axios.get(`${HOST}/api/Owners/${res.data.userId}/businesses`)
        .then(response => this.goToOwnerMap(res.data.id, res.data.userId, response.data.map(business => business.id)))
        .catch(err => alert('You have no businesses associated with your account'));
    })
    .catch(err => alert('Login attempt failed. Wrong username or password.'));
  }

  goToRequestPasswordReset = () => Actions.passwordResetForm();
  goToOwnerMap = (token, userId, businessIds) => Actions.ownerMap({token: token, userId: userId, businessIds: businessIds});
  goToMap = (token, userId, username) => Actions.map({token: token, userId: userId, username: username});
  goToRegister = () => Actions.register({ businessId: this.props.businessId, businessName: this.props.businessName, reviews: this.props.reviews, referredTo: this.props.referredTo });
  goToOwnerRegister = () => Actions.ownerRegister();
  goToDisplayReview = (token, userId, username) => {	
    axios.get(`${HOST}/api/Reviews/getreview?id=${this.props.businessId}`)	
      .then(response => {	
        Actions.displayReview({token: token, reviews: response.data, businessName: this.props.businessName, businessId: this.props.businessId, username: username, userId: userId})	
      });	
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
                onPress={() => {
                  switch(this.props.referredTo) {	
                    case 'displayReview':	
                        this.goToDisplayReview()	
                    default:	
                        this.goToMap()	
                }}}
              />}
          />
        </View>
        <ScrollView scrollEnabled={true}>
          <Image style={styles.logo} source={require('../assets/logo.png')}/>
            <Text style={styles.text}>Email</Text>
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
            <Text style={styles.text}>Password</Text>
            <TextInput 
                placeholderTextColor='black'
                returnKeyType='next'
                style={styles.inputtext}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                keyboardType='default'
                returnKeyType='go'
                secureTextEntry={true}
                onChangeText={this.handlePassword}
            />
          <TouchableOpacity
            testID='login_user'
            style={styles.loginButton}
            onPress={() => this.login(this.state.email, this.state.password)}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID='login_owner'
            style={styles.ownerLoginButton}
            onPress={() => this.loginOwner(this.state.email, this.state.password)}>
            <Text style={styles.loginButtonText}>Owner Login</Text>
          </TouchableOpacity>
          <Text style={styles.resetPassword} onPress={this.goToRequestPasswordReset}>Forgot Password?{'\n'}</Text>
          <Text style={styles.registerButton} onPress={this.goToRegister}>Click Here To Register!</Text>
          <Text style={styles.registerButton} onPress = {this.goToOwnerRegister}>Click Here To Register As Owner</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
export default Login;

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
  ownerLoginButton: {
    backgroundColor: '#980000',
    padding: 10,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 15,
    height: 40,
    borderRadius: 20,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize:17,
  },
  resetPassword: {
    color: 'blue',
    textAlign: 'center',
    fontSize:16,
  },
  registerButton: {
    color: 'blue',
    textAlign: 'center',
    fontSize:16,
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
