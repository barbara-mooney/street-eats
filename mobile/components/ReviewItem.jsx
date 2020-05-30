import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Icon, Rating } from 'react-native-elements';
import { HOST } from 'react-native-dotenv';
import LoginRequiredModal from './LoginRequiredModal';
import moment from 'moment';
import axios from 'axios';

export default class ReviewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flagged: this.props.review.isHidden,
      showLoginRequiredModal: false
    }
  }

  daysAgo(postDate, today) {
    let days = moment(postDate).from(today)
    return `Posted ${days}`
  }

  handleFlagClick = () => {
    if (this.props.token && this.props.review.isHidden === true) {
      this.setState({ flagged: !this.state.flagged })
      alert('This review has been unflagged')
    } else if (this.props.token && this.props.review.isHidden === false) {
      this.setState({ flagged: !this.state.flagged })
      alert('This review has been flagged')
    } else {
      this.showLoginRequiredModal()
    }
    if (this.props.token) {
      axios.put(`${HOST}/api/Reviews/${this.props.review.id}`, {
        ...this.props.review,
        isHidden: !this.state.flagged
      }) 
    }
      
  }

  hideLoginRequiredModal = () => this.setState({ showLoginRequiredModal: false})
  showLoginRequiredModal = () => this.setState({ showLoginRequiredModal: true})

  render() {
    return (
      <View key={this.props.review.id} style={styles.reviewContainer}>
          <View style={styles.reviewItemContainer}>
            <View style={styles.profileContainer}>
              <View style={styles.profilePictureContainer}>
                <Image style={styles.profilePicture} source={require('../assets/blank-prof-pic.png')}/>
              </View>
              <View style={styles.profileUsernameContainer}>
                <Text style={styles.profileUsername}>
                  {this.props.review.username}
                </Text>
                <Text
                  style={styles.reviewPostDate}>
                  {this.daysAgo(this.props.date, moment().format())}
                </Text>
              </View>
            </View>
            <View style={styles.ratingPosition}>
                <Rating
                  imageSize={25}
                  readonly
                  startingValue={this.props.review.rating}
                  fractions={1}
                  tintColor='#ffe599'
                />
            </View>
          </View>
          <View>
            <LoginRequiredModal
              isVisible = {this.state.showLoginRequiredModal}
              loginRequiredModal = {() => this.hideLoginRequiredModal()}
              businessId = { this.props.businessId }
              businessName = { this.props.businessName }
              reviews = { this.props.review }
            />
            <Text style={styles.reviewText}>{this.props.review.text}</Text>
            <Icon
              name='flag'
              containerStyle={styles.flagIconPosition}
              size={25}
              color={this.props.token && this.state.flagged ? 'red' : 'tan'}
              underlayColor='#ffe599'
              onPress={() => {this.handleFlagClick()}}
            />
            {this.props.review['response text'] ? 
              <React.Fragment>
                <Text style={styles.ownerName}>{this.props.businessName} commented:</Text>
                <Text style={styles.reviewResponse}>{this.props.review['response text']}</Text>
              </React.Fragment>
            : null}
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  reviewItemContainer: {
    flexDirection: 'row',
    height: 50
  },
  profileContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffe599',
    width: '60%',
    padding: 5
  },
  profileUsername: {
    fontSize: 14,
    fontWeight: 'bold',
    height: '50%'
  },
  profileUsernameContainer: {
    width: '80%',
    marginLeft: 5
  },
  profilePicture: {
    width: 34,
    height: 34,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: 30
  },
  profilePictureContainer: {
    backgroundColor: '#ffe599',
    width: '20%'
  },
  reviewPostDate: {
    fontSize: 10.5,
    height: '50%'
  },
  flagIconPosition: {
    position: 'absolute',
    right: 15,
    bottom: 8
  },
  ratingPosition: {
    width: '40%',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  reviewContainer: {
    flex: 1,
    borderBottomColor: 'white',
    borderBottomWidth: .5,
    marginTop: 5
  },
  reviewText: {
    width: '82%',
    marginLeft: '3%',
    marginBottom: '3%'
  },
  ownerName: {
    width: '82%',
    marginLeft: '5%',
    color: '#980000',
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  reviewResponse: {
    width: '82%',
    marginLeft: '5%',
    marginBottom: '3%'
  }
})