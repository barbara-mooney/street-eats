import React from 'react';
import { StyleSheet, View, ScrollView } from "react-native";
import { Header, Icon, Button, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { HOST } from 'react-native-dotenv';
import axios from 'axios';

export default class OwnerManageReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideMenuView: false,
      reviews: []
    }
  }

  componentDidMount() {
    axios.get(`${HOST}/api/Businesses/${this.props.businessIds[0]}/reviews?access_token=${this.props.token}}`)
        .then(res => {
            this.setState({ reviews: res.data })
        })
        .catch(err => alert('Something went wrong.'))
  }

  logOut = () => {
    axios.post(`${HOST}/api/Owners/logout?access_token=${this.props.token}`)
        .then(res => Actions.map())
        .catch(err => alert('Something went wrong.'))
  }

  render() { 
    const reviews = this.state.reviews
    const displayReviews = reviews.map((review, i) => {
        const date = review.timeStamp.slice(0, 10)
        const bgColor = review.rating == 1 ? 'rgb(225, 93, 68)'
                                : review.rating > 3 ? 'rgb(68, 184, 172)'
                                : 'rgb(239, 192, 80)'
        const reviewChecked = review['response text'] ? true : false
        return (
            <ListItem
                key={i}
                onPress={() => Actions.ownerReviewItem({ review: review, token: this.props.token, userId: this.props.userId, businessIds: this.props.businessIds })}
                title={review.text}
                titleStyle={{ fontSize: 18 }}
                containerStyle={review.isHidden ? {backgroundColor:'#FF0000'} : {backgroundColor:'white'}}
                subtitle={`${review.username} on ${date}`}
                subtitleStyle={{ color: 'gray', fontStyle: 'italic', fontWeight: 'bold', marginTop: 6 }}
                badge={{ value: review.rating, textStyle: { color: 'white', fontSize: 18 }, badgeStyle: { backgroundColor: bgColor, width: 30, height: 30, borderRadius: 15 }, containerStyle: { marginTop: 0 } }}
                checkBox={{ checked: reviewChecked }}
                bottomDivider
                chevron
            />
        )
    })
    return (
    <View style={styles.container}>
        <Header
            containerStyle={{
                backgroundColor: '#980000',
                justifyContent: 'space-around',
            }}
            leftComponent={<Icon
                name='menu'
                onPress={() => this.setState({ sideMenuView: !this.state.sideMenuView })}
            />}
            centerComponent={{ style: { color: '#fff', fontSize: 25, fontWeight: 'bold' }, text: "Manage Reviews" }}
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
        : <View></View>}
        <ScrollView scrollEnabled={true}>
            {displayReviews ? 
                <View styles={styles.menu}>
                    {displayReviews}
                </View>
            : null}
        </ScrollView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe599',
    },
    menu: {
        backgroundColor: '#980000',
        alignSelf: 'stretch',
    },
    listAddItem: {
        justifyContent: 'center',
        color: 'gray',
        textAlign: 'center',
    }
});