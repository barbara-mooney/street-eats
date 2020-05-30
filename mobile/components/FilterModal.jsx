import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, Picker, Modal} from 'react-native';

export default class FilterModal extends Component{
    constructor(props) {
        super(props);
        this.state={
            modalVisible: false,
        }
    }
    openModal(){
        this.setState({ 
            modalVisible: true
        })}
    
    closeModal(){
        this.setState({ 
            modalVisible: false
        })
    }
    
    render(){  
        return (
            <View style={styles.container}>
                <Modal 
                    style={styles.modal}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.closeModal()}
                    animationType={'slide'}
                >
                    <View style={{ 
                        flex: 1, 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center'}}
                    >
                        <Text style={styles.priceText}>Price Filter</Text>
                        <Picker
                            selectedValue={this.props.priceFilter}
                            itemStyle={{marginTop:-30}}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => {
                                this.props.updatePriceFilter(itemValue);
                            }}
                        >
                            <Picker.Item label="None" value="" />
                            <Picker.Item label="$" value="$" />
                            <Picker.Item label="$$" value="$$" />
                            <Picker.Item label="$$$" value="$$$" />
                        </Picker>
                    </View>

                    <View style={{ 
                        flex: 1, 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center'}}
                    >
                        <Text style={styles.distanceText}>Distance in Miles</Text>
                        <Picker
                            selectedValue={this.props.distanceFilter}
                            itemStyle={{marginTop:-30}}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => {
                                this.props.updateDistanceFilter(itemValue);
                            }}
                        >
                            <Picker.Item label="None" value="" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="10" value="10" />
                            <Picker.Item label="15" value="15" />
                        </Picker>
                    </View>

                    <View style={{ 
                        flex: 1, 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center'}}
                    >
                        <Text style={styles.foodText}>Types of Food</Text>
                        <Picker
                            selectedValue={this.props.foodStyleFilter}
                            itemStyle={{marginTop:-30}}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => {
                                this.props.updateFoodStyleFilter(itemValue);
                            }}
                        >
                            <Picker.Item label="None" value="" />
                            <Picker.Item label="Mexican" value="Mexican" />
                            <Picker.Item label="American" value="American" />
                            <Picker.Item label="Chinese" value="Chinese" />
                            <Picker.Item label="Vietnamese" value="Vietnamese" />
                        </Picker> 
                    </View>
                    <Button onPress={() => this.closeModal()} title='Apply Filters'/>
                </Modal>
                <Button 
                    onPress ={()=>this.openModal()}
                    title='Filter'
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        paddingTop: 0,
        paddingBottom: 0,
        opacity: 15,
    },
    priceText:{
        marginTop:0,
        fontSize:25,
        fontWeight:'bold',
        color:'#980000'
    },
    distanceText:{
        marginTop: -100,
        fontSize:25,
        fontWeight:'bold',
        color:'#980000'
    },
    foodText:{
        marginTop: -175,
        fontSize:25,
        fontWeight:'bold',
        color:'#980000',
    }
});
