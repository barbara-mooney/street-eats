import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, Picker, Modal, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default class MenuFilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      checked: false
    }
  }

  openModal() {
    this.setState({ modalVisible: true })
  }

  closeModal() {
    this.setState({ modalVisible: false })
  }

  displayFilter() {
    return this.props.menu.map((item, index) => {
      return (
        <View style={{marginBottom: 45}}>
          <View style={styles.checkBoxPosition}>
            <CheckBox 
              checked={item.selectedCategory}
              onPress={() => this.props.handleFilterSelect(item.itemCategory)}
              size={35}
              checkedColor={'#980000'}
              uncheckedColor={'black'}
              checkedIcon={'check-circle'}
              uncheckedIcon={'circle-thin'}
            />
          </View>
          <Text style={styles.checkBoxLabel}> {item.itemCategory} </Text>
        </View>
      )
    })
  }

  render() {
    return (
      <View>
        <Modal
          visible = {this.state.modalVisible}
          animationType='slide'
        >
          <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={styles.menuFilterText}> Category Filter </Text>
          </View>
          <View style={{position: 'absolute', top: 100, left: 15}}>
            {this.displayFilter()}
          </View>
          <View style={styles.closeModalButton}>
            <Button
              onPress={() => this.closeModal()}
              title='Apply Filters'/>
          </View>
        </Modal>
        <TouchableOpacity
          onPress={() => this.openModal()}
          style={styles.openModalButton}
        > 
          <Text>Filter</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  menuFilterText: {
    fontSize: 28,
    fontWeight: 'bold',
    color:'#980000',
    position: 'absolute',
    top: 120
  },
  checkBoxPosition: {
    position: 'absolute',
    left: 300,
    top: 55
  },
  checkBoxLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    top: 75
  },
  closeModalButton: {
    justifyContent: 'center',
    alignContent: 'center',
    position: 'relative',
    bottom: 20
  },
  openModalButton: {
    backgroundColor: '#ffe599',
    width: 70,
    height: 20,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems:'center',
    position: 'absolute',
    bottom: 2,
    right: 10
  }
})
  