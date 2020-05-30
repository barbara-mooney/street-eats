import React, { Component } from 'react';
import { View, Button, StyleSheet, Modal, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity} from 'react-native';
import { Header, Icon, Rating, AirbnbRating } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { HOST } from 'react-native-dotenv';
import axios from 'axios';

export default class ReviewModal extends Component {
  constructor(props) { 
    super(props);
    this.state = {
        modalVisible: false,
        reviewText: '',
        reviewRating: 0,
        username: '',
        submit: false
    }
    
    this.ratingCompleted = this.ratingCompleted.bind(this)
    this.handleReviewText = this.handleReviewText.bind(this)
  }

  handleReviewText(text) {
    this.setState({ reviewText: text })
  }

  ratingCompleted(rating) {
    this.setState({ reviewRating: rating })
  }

  openModal() {
    this.setState({
      modalVisible: true
    })
  }

  closeModal() {
    this.setState({
      modalVisible: false
    })
  }

  submitReview(text, rating, username) {
    let date = new Date()
    axios.post(`${HOST}/api/Reviews`, {
      text: text,
      timeStamp: date,
      username: username,
      rating: rating,
      isHidden: false,
      businessId: this.props.businessId
    })
    .then((response) => {
      this.setState({ submit: true })
      this.goToDisplayReview()
    })
    .catch(error => console.log(error))
  }

  goToDisplayReview = () => {
    axios.get(`${HOST}/api/Reviews/getreview?id=${this.props.businessId}`)
      .then(response => {
        Actions.displayReview({username: this.props.username, userId: this.props.userId, token: this.props.token, reviews: response.data, businessName: this.props.businessName, businessId: this.props.businessId, submit: this.state.submit})
      });
  }

  render() {
    return (
      <View style={ styles.container }>
        <KeyboardAvoidingView style={ styles.container } behavior='padding' enabled>
          <ScrollView scrollEnabled={ true }>
            <Modal 
              style={ styles.modal }
              visible={ this.state.modalVisible }
              onRequestClose={() => this.closeModal()}
              animationType='slide'
              >
                <View
                  style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'}}
                >
                  <AirbnbRating onFinishRating={ this.ratingCompleted }/>
                  <TextInput
                    style={ styles.TextInputStyleClass }
                    underlineColorAndroid='transparent'
                    placeholder={ 'Tell us about your experience!' }
                    placeholderTextColor={ '#9E9E9E' }
                    numberOfLines={ 10 }
                    multiline={ true }
                    onChangeText={ this.handleReviewText }
                  />
                  <Button
                    style={ styles.ButtonStyle }
                    title='Leave a review'
                    color='blue'
                    onPress={() => {
                      this.submitReview(this.state.reviewText, this.state.reviewRating, this.props.username)
                      this.closeModal(this.props.token)
                    }}
                  />
                </View>
                <Button 
                  onPress={() => this.closeModal(this.props.token)}
                  title='Close'
                  color='blue'
                />
            </Modal>
          </ScrollView>
        </KeyboardAvoidingView>
        <TouchableOpacity
          raised
          style={styles.openReviewModal}
          onPress={ this.props.token ? ()=>this.openModal(this.props.token) : ()=>this.props.loginRequiredModal()}>
          <Icon
            name='create'
            color='white'>
          </Icon>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: '#fff'
  },
  TextInputStyleClass: {
    marginTop: 20,
    marginLeft: 0,
    width: 350,
    height: 50,
    borderWidth: 2,
    borderColor: '#9E9E9E',
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    height: 150
  },
  ButtonStyle: {
    backgroundColor: '#fff',
    borderWidth: 3,
    paddingTop: 10
  },
  openReviewModal: {
    backgroundColor: '#980000',
    width: 66,
    height: 66,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems:'center',
    position: 'absolute',
    bottom: 20,
    right: 20
  }
})