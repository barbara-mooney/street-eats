import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import { Header, Icon, Rating, Button, AirbnbRating } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import ReviewModal from './ReviewModal';
import LoginRequiredModal from './LoginRequiredModal';
import { HOST } from 'react-native-dotenv';
import axios from 'axios';
import ReviewItem from './ReviewItem';

export default class DisplayReview extends Component{
  constructor(props) {
      super(props);
      this.state={
        sideMenuView: false,
        showLoginRequiredModal: false
      }
  }

  componentDidMount() {
    let averageReview = this.props.reviews.businessReviews.pop().averageReviewRating;
    this.setState({averageBusinessReviews: averageReview});
    if (this.props.submit === true) {
      alert('Your review has been posted')
    }
  }


  displayReviews() {
    const reviews = this.props.reviews.businessReviews;

    return reviews.map((review, i) => {

      return (
        <ReviewItem
          date={review.timeStamp}
          review={review}
          showLoginModal={() => this.showLoginRequiredModal()}
          token={this.props.token}
          businessId = { this.props.businessId }
          businessName = {this.props.businessName}
        />
      )
    })
  }

  logOut() {
    axios.post(`${HOST}/api/Customers/logout?access_token=${this.props.token}`)
      .then(res => this.goToLogin())
  }

  goToLogin = () => Actions.login();
  goToMap = (token, userId) => Actions.map({token: token, userId: userId});
  goToSettings = (token, userId) => Actions.customerSettings({ token: token, userId: userId });

  showLoginRequiredModal = () => this.setState({ showLoginRequiredModal: true});
  hideLoginRequiredModal = () => this.setState({ showLoginRequiredModal: false});
  toggleSideMenu = sideMenuView => this.setState({ sideMenuView: !sideMenuView });

  ratingCompleted(rating) {
      console.log("Rating is: " + rating)
    }

  render() {
    let loginButton = <Button title="Login" onPress={() => this.goToLogin()} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white' }} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}}/>;
    let logoutButton = <Button title="Logout" onPress={() => this.logOut()} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white' }} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}}/>;
    const { businessReviews } = this.props.reviews;
    return (
      <View style={styles.container}>
        <Header
          containerStyle={styles.header}
          leftComponent={ <Icon
            name='menu'
            onPress={() => this.toggleSideMenu(this.state.sideMenuView)}
          />}
          centerComponent={{ style: styles.reviewHeaderText, text: 'Reviews' }}
          rightComponent={<Icon
            name='home'
            onPress={() => this.goToMap(this.props.token, this.props.userId)}/>}
        />
        {this.state.sideMenuView ?
          <View style={styles.menu}>
            <Button title="Settings" onPress={() => this.goToSettings(this.props.token, this.props.userId)} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white' }} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
            {
              this.props.token ? logoutButton : loginButton
            }
          </View>
          : <View></View>
        }
        {
          businessReviews.length > 0 ?
          <View style={styles.averageReviewStyling}>
            {
              this.state.averageBusinessReviews ? 
                <Rating
                  imageSize={20}
                  readonly
                  startingValue={this.state.averageBusinessReviews}
                  fractions={1}
                  tintColor='#980000'
                /> :
                <Text style={{textAlign: 'center', color: 'white'}}> No ratings available for this food truck.</Text>
            }
          </View>
          :
          <Text>No Reviews Available For This Truck</Text>
        }
        <ScrollView scrollEnabled={true}>
          <View style={styles.reviewScroll} >{this.displayReviews()}</View>
        </ScrollView>
        <View>
            <LoginRequiredModal
            isVisible = {this.state.showLoginRequiredModal}
            loginRequiredModal = {() => this.hideLoginRequiredModal()}
            businessId = { this.props.businessId }
            businessName = { this.props.businessName }
            reviews = { this.props.reviews }
            />
            <ReviewModal
            token = {this.props.token}
            loginRequiredModal = {() => this.showLoginRequiredModal()}
            isVisible = { this.state.showLoginRequiredModal }
            businessId = { this.props.businessId }
            businessName = { this.props.businessName }
            username = { this.props.username }
            userId = { this.props.userId }
            reviews = { this.props.reviews }
        />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ffe599',
      flex: 1,
      flexDirection: 'column',
    },
    header: {
      backgroundColor: '#980000',
      justifyContent: 'space-around'
    },
    menu: {
      backgroundColor: '#980000',
      alignSelf: 'stretch'
    },
    reviewScroll: {
      paddingTop: 0,
      flex: 1
    }, 
    reviewHeaderText: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'white'
    },
    averageReviewStyling: {
      backgroundColor: '#980000'
    }
})