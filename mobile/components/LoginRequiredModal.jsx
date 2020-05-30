import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Modal, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Header, Icon, Rating, AirbnbRating, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export default class LoginRequiredModal extends Component{
  constructor(props) {
    super(props);
      this.state = {
        referredTo: '',
        isModalVisible: false
      }
  }

  goToLogin = () => Actions.login({ referredTo: this.state.referredTo, businessId: this.props.businessId, businessName: this.props.businessName, reviews: this.props.reviews });
  

  render() {
    return (
      <View style={ styles.container }>
        <KeyboardAvoidingView behavior='padding'>
          <ScrollView scrollEnabled={ true }>
            <Modal
              raised
              visible={ this.props.isVisible }
              animationType='slide'
              transparent={ true }
              onDismiss={() => this.state.referredTo ? this.goToLogin() : this.props.LoginRequiredModal}
            >
              <View style={ styles.container }>
                <View style={ styles.ModalView }>
                  <Text style={ styles.text }>
                    Please log in to write a review
                  </Text>
                  <Button
                    buttonStyle={styles.LoginStyle}
                    onPress={() => {
                      this.setState({ referredTo: 'displayReview' })
                      this.props.loginRequiredModal()
                    }}
                    title='Log in/Register'
                  />
                  <Button
                    title="outline button"
                    type="outline"
                    buttonStyle={styles.CloseStyle}
                    titleStyle={{color:'#980000'}}
                    onPress={() => {this.props.loginRequiredModal()}}
                    title='Close'
                  />
                </View>
              </View>
            </Modal>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  text:{
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    paddingTop: 20,
    width: 275,
    height: 100,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 10,
    textAlignVertical: 'auto',
  },
  LoginStyle: {
    width: 200,
    position: 'relative',
    top: -10,
    backgroundColor: '#980000'
  },
  CloseStyle: {
    width: 200,
    borderColor: '#980000'
  },
  ModalView: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
})