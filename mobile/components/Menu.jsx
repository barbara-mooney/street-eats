import React from 'react';
import { HOST } from 'react-native-dotenv';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import { Header, Icon, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import ShareFeature from './ShareFeature';
import MenuFilterModal from './MenuFilterModal';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      businessName: '',
      businessNumber: '',
      businessImage: 'There is no image',
      businessUrl: '',
      category: [
        {itemCategory: 'All', selectedCategory: true}
      ]
    }
  }

  componentDidMount() {
    const self = this;
    const businessId = this.props.businessId;
    axios.get(`${HOST}/api/Businesses/${businessId}`)
      .then(res => {
        const sortedItems = [...res.data.menu].map(item => {
          if (item.category == undefined) {
            item.category = 'Miscellaneous';
            return item;
          } else {
            return item;
          }
        })
          .sort((a, b) => a.category.toLowerCase() == "food" ? 1 : b.category.toLowerCase() == "food" ? 1 : a.category > b.category ? 1 : a.category == 'Miscellaneous' ? -1 : b.category == 'Miscellaneous' ? -1 : -1);
        self.setState({
          items: sortedItems.map(item => {
            return {
              item: item.item,
              image: item.image,
              desc: item.desc,
              price: item.price,
              category: item.category
            }
          }),
          businessName: res.data.name,
          businessNumber: res.data.number,
          businessImage: res.data.image,
          businessUrl: res.data.url
        })
      }
      )
      .then(response => {
        self.setState(prevState => ({
          category: [
            ...prevState.category,
            { itemCategory: self.state.items[0].category, selectedCategory: false }
          ]
        }))
        self.state.items.map((item, i) => {
          if (self.state.items[i-1] != undefined && item.category != self.state.items[i-1].category) {
            self.setState(prevState => ({
              category: [
                ...prevState.category,
                { itemCategory: item.category, selectedCategory: false }
              ]
            }))
          }
        })
      })
  }

  handleFilterSelect(category) {
    let list = this.state.category;
    for (let i = 0; i < list.length; i++) {
      //if All is selected(true), when another category is selected(true), All is unselected(false)
      if (list[i].itemCategory === category && list[0].selectedCategory === true) {
        list[i].selectedCategory = !list[i].selectedCategory
        list[0].selectedCategory = false
      } //if All is unselected(false), every other category can be selected(true) 
        else if (list[i].itemCategory === category && list[0].selectedCategory === false) {
        list[i].selectedCategory = !list[i].selectedCategory
      } //if All is unselected(false), it can be selected(true) again
        else if (list[i].itemCategory === category && list[0].selectedCategory === false) {
        list[0].selectedCategory = true
      }
    }
    //if All is selected(true), all other categories are unselected(false)
    if (list[0].selectedCategory === true) {
      for (let i = 1; i < list.length; i++) {
        list[i].selectedCategory = false
      }
    }
    this.setState({category: list})
  }

  displayMenu() {
    let count = 0;
    const menu = this.state.items;
    let filteredItems = []
    for (let i = 1; i < this.state.category.length; i++) {
      if (this.state.category[i].selectedCategory === true) {
        filteredItems.push(this.state.category[i].itemCategory)
      }
    }
    //displaying menu for filtered items
    if (filteredItems.length > 0) {
      return (
        //taking filtered items and creating separate categories
        filteredItems.map(item => {
          return (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={styles.menuLabel}>{item}</Text>
              </View>
              {
                //if categories are equal, the items will display under that category
                menu.map((items) => {
                  count++
                  if (items.category === item) {
                    return (
                      <TouchableOpacity
                        onPress={() => this.goToDescriptionMenu(items.image, items.desc, items.price, items.item, this.props.token, this.props.businessId, items.category)}
                        style={styles.containerFoodItem}
                        key={count}>
                      {
                        items.image ?
                          <View>
                            <Image style={styles.photo} source={{ uri: items.image }}/>
                          </View>
                          :
                          <View></View>
                      }
                        <View style={styles.containerItemInfo}>
                          <Text style={styles.title}>{items.item}</Text>
                          <Text style={styles.desc}>{items.desc && items.desc.length > 55 ? items.desc.slice(0, 55) + '...' : items.desc}</Text>
                          <Text style={styles.price}>${items.price}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  }
                })
              }
            </View>
          )
        })
      )
    } else {
      //displaying menu for all items
      return (
        this.state.category.map(item => {
          return (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={styles.menuLabel}>{item.itemCategory === 'All' ? null : item.itemCategory}</Text>
              </View>
              {
                //if categories are equal, the items will display under that category
                menu.map((items) => {
                  count++
                  if (items.category === item.itemCategory) {
                    return (
                      <TouchableOpacity
                        onPress={() => this.goToDescriptionMenu(items.image, items.desc, items.price, items.item, this.props.token, this.props.businessId, items.category)}
                        style={styles.containerFoodItem}
                        key={count}>
                        {
                          items.image ?
                            <View>
                              <Image style={styles.photo} source={{ uri: items.image }}/>
                            </View>
                            :
                            <View></View>
                        }
                        <View style={styles.containerItemInfo}>
                          <Text style={styles.title}>{items.item}</Text>
                          <Text testID='food_item_desc' style={styles.desc}>{items.desc && items.desc.length > 55 ? items.desc.slice(0, 55) + '...' : items.desc}</Text>
                          <Text style={styles.price}>${items.price}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  }
                })
              }
            </View>
          )
        })
      )
    }
  }

  logOut() {
    axios.post(`${HOST}/api/Customers/logout?access_token=${this.props.token}`)
      .then(res => this.goToLogin())
  }

  goToLogin = () => Actions.login();
  goToSettings = (token) => Actions.customerSettings({ token: token });
  goToDescriptionMenu = (image, desc, price, item, token, businessId, category) => Actions.descriptionMenu({ image: image, desc: desc, price: price, item: item, token: token, businessId: businessId, category: category });
  toggleSideMenu = sideMenuView => this.setState({ sideMenuView: !sideMenuView });
  goToMap = (token) => Actions.map({ token: token });
  goToDisplayReview = (token) => {
    axios.get(`${HOST}/api/Reviews/getreview?id=${this.props.businessId}`)
      .then(response => {
        Actions.displayReview({token: token, reviews: response.data, businessName: this.state.businessName, businessId: this.props.businessId, username: this.props.username, userId: this.props.userId})});
  }

  render() {
    let loginButton = <Button title="Login" onPress={() => this.goToLogin()} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white' }} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />;
    let logoutButton = <Button title="Logout" onPress={() => this.logOut()} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white' }} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{
            backgroundColor: '#980000',
            justifyContent: 'space-around',
          }}
          leftComponent={<Icon
            name='menu'
            onPress={() => this.toggleSideMenu(this.state.sideMenuView)}
          />}
          centerComponent={{ style: { color: '#fff', fontSize: 25, fontWeight: 'bold' }, text: this.state.businessName }}
          rightComponent={<Icon
            name='home'
            onPress={() => this.goToMap(this.props.token, this.props.userId)}
          />}
        />
        {this.state.sideMenuView ?
          <View style={styles.menu}>
            <Button title="Settings" onPress={() => this.goToSettings(this.props.token, this.props.userId)} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white' }} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
            {
              this.props.token ? logoutButton : loginButton
            }
          </View>
          : <View></View>}
        <View style={styles.headerContainer} >
          <Image style={styles.picture} source={{ uri: this.state.businessImage }} />
          <Text style={styles.textPhone}>{this.state.businessNumber}</Text> 
          <Text style={styles.textWebpage} onPress={() => Linking.openURL('http://' + this.state.businessUrl)}>{this.state.businessUrl}</Text>
          <ShareFeature businessName={this.state.businessName} />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.goToDisplayReview(this.props.token)} style={{backgroundColor: '#980000', height: 25, width: 120}}>
              <Text style={{textAlign: 'center', fontSize: 20, color: 'white'}}>Reviews</Text>
            </TouchableOpacity>
          </View>
        </View>
        <MenuFilterModal
          menuCategoryFilter = {this.state.menuCategoryFilter}
          menu = {this.state.category}
          handleFilterSelect = {(category) => this.handleFilterSelect(category)}
        />
        <ScrollView scrollEnabled={true}>
          {this.displayMenu()}
        </ScrollView>
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
  containerFoodItem: {
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
    borderColor: 'darkgrey',
    borderBottomWidth: 1,
    height: 140,
    width: '100%',
    flex: 1
  },
  containerItemInfo: {
    marginLeft: 0,
    flexDirection: 'column',
    paddingLeft: 10,
    width: '75%',
    position: 'relative',
    top: -5 
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    paddingBottom: 5,
  },
  desc: {
    fontSize: 18,
    flexDirection: 'row',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 5,
  },
  photo: {
    width: 100,
    height: 100,
    marginRight: 0,
    marginLeft: 0,
    flex: 0,
  },
  headerContainer: {
    flexDirection: 'column',
    flex: 0,
    height: 335,
    resizeMode: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#980000',
    paddingBottom: 10,
    borderBottomColor: 'white',
    borderWidth: .45
  },
  picture: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
  textPhone: {
    fontSize: 20,
    paddingLeft: 10,
    paddingBottom: 0,
    textAlign: 'center',
    color: 'white',
    paddingTop: 10,
    marginBottom: 0
  },
  textWebpage: {
    fontSize: 20,
    paddingLeft: 10,
    paddingBottom: 0,
    textAlign: 'center',
    color: 'white',
    paddingTop: 0,
    marginBottom: 0
  },
  menuLabel: {
    fontSize: 30,
    fontWeight: 'bold',
    width: '100%',
    backgroundColor: '#980000',
    color: 'white',
    textAlign: 'center'
  },
  firstMenuLabel: {
    fontSize: 30,
    fontWeight: 'bold',
    width: '100%',
    backgroundColor: '#980000',
    color: 'white',
    textAlign: 'center',
    marginBottom: -30
  },
})
