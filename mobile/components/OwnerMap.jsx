import React from 'react';
import { StyleSheet, Dimensions, View, Text, Image, YellowBox } from "react-native";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import io from 'socket.io-client';
import { Actions } from 'react-native-router-flux';
import { HOST } from 'react-native-dotenv';
import { Header, Icon, Button } from 'react-native-elements';
import axios from 'axios';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            errorMessage: null,
            sideMenuView: false,
            name: null
        };
        this.mounted = false;
        
        this.socket = io.connect(`${HOST}`, { transports: ['websocket'] });
    }

    componentDidMount() {
        this.mounted = true;
        const self = this;

        axios.get(`${HOST}/api/Owners/${this.props.userId}`)
            .then(res => self.setState({ name: res.data.name }));

        navigator.geolocation.getCurrentPosition(
            position => {
                if(this.mounted){
                this.setState({
                    location: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                })};
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, distanceFilter: 10 }
        );

        this.socket.on('mapPositions', locations => {
            if(this.mounted){
            this.setState({ foodTruck: locations });
            }
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    logOut() {
        axios.post(`${HOST}/api/Owners/logout?access_token=${this.props.token}`)
        .then(res => {
          this.socket.emit('disconnectUser');
          this.goToMap();
        })
      }
    
    goToLogin = () => Actions.login();
    goToMap = () => Actions.map();
    goToSettings = (token, userId, businessIds) => Actions.ownerSettings({token: token, userId: userId, businessIds: businessIds});
    goToOwner = (token, userId, businessIds) => Actions.owner({token: token, userId: userId, businessIds: businessIds});
    toggleSideMenu = sideMenuView => this.setState({ sideMenuView: !sideMenuView })
        
    render() {
        let count = 0;
        return (
            <View style={styles.container}>
                <Header
                    containerStyle={{
                        backgroundColor: '#980000',
                        justifyContent: 'space-around',
                    }}
                    leftComponent={<Icon
                        TestID='hamburger'
                        name='menu'
                        onPress={() => this.toggleSideMenu(this.state.sideMenuView)}
                    />}
                    centerComponent={{ style: { color: '#fff', fontSize: 25, fontWeight: 'bold' }, text: this.state.name }}
                    rightComponent={{ icon: 'home', color: '#fff', T: 'hamburger' }}
                    />
                    {this.state.sideMenuView ?
                    <View style={styles.menu}>
                        <Button T='linktobroadcastpage' title="Broadcast" onPress={() => this.goToOwner(this.props.token, this.props.userId, this.props.businessIds, this.props.ownerName)} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white' }} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
                        <Button title="Settings" onPress={() => this.goToSettings(this.props.token, this.props.userId, this.props.businessIds, this.props.ownerName)} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white' }} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
                        <Button title="Logout" onPress={() => this.logOut()} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white' }}  titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}}/>
                    </View>
                    : <View></View>}
                    <View></View>
                    {this.state.location ?
                    <MapView style={styles.mapStyle}
                        initialRegion={{
                            latitude: this.state.location.latitude,
                            longitude: this.state.location.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>
                        {this.state.foodTruck ?
                            this.state.foodTruck.map(location => {
                                { count++ }
                                return (
                                    <Marker
                                        businessId={location.businessId}
                                        key={count}
                                        coordinate={{
                                            latitude: location.latitude,
                                            longitude: location.longitude
                                        }}   
                                    >
                                    </Marker>
                                );
                            })
                            :
                            <View></View>
                        }
                    </MapView>
                    :
                    <Text>Loading...</Text>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    menu: {
        backgroundColor: '#980000',
        alignSelf: 'stretch',
      },
    marker: {
        width: 40,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'blue',
        borderWidth: 2,
    },
});
