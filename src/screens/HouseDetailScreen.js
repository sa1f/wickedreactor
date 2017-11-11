// @flow
'use strict';

import React, {Component} from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { View } from 'react-native';
import House from '../models/House';
import Filter from '../models/Filter';

type Props = {
  navigation: any,
  house: House,
};

export default class HouseDetailScreen extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  async _goToMapScreen() {
    const houses = await Filter.getFilter().genHouses();
    const { navigate } = this.props.navigation;
    navigate('Map', { houses: houses });
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon style={styles.headericon}
            name='arrow-left'
            type='font-awesome'
            color='white'
            onPress={() => this._goToMapScreen()}
          />
          <Text style={styles.headertext}>
            House Details
          </Text>
        </View>
        <ScrollView>
          <Image
            style={styles.image}
            source={{uri: 'http://via.placeholder.com/200x200'}}
          />

          <Text style={styles.attributeTitle}>
            Address
          </Text>
          <Text style={styles.attributeContent}>
            Insert address here
          </Text>

          <Text style={styles.attributeTitle}>
            Price
          </Text>
          <Text style={styles.attributeContent}>
            {`$ ${this.props.house.getPrice()}`}
          </Text>

          <Text style={styles.attributeTitle}>
            Schools
          </Text>
          <Text style={styles.attributeContent}>
            {this.props.house.getSchools()}
          </Text>

          <Text style={styles.attributeTitle}>
            Libraries
          </Text>
          <Text style={styles.attributeContent}>
            {this.props.house.getLibraries()}
          </Text>

          <Text style={styles.attributeTitle}>
            Cultural Spaces
          </Text>
          <Text style={styles.attributeContent}>
            {this.props.house.getCulturalSpaces()}
          </Text>

          <Text style={styles.attributeTitle}>
            Parks
          </Text>
          <Text style={styles.attributeContent}>
            {this.props.house.getParks()}
          </Text>

          <Text style={styles.attributeTitle}>
            Community Centers
          </Text>
          <Text style={styles.attributeContent}>
            {this.props.house.getRecreationalCenters()}
          </Text>

          <Text style={styles.attributeTitle}>
            Charging Stations
          </Text>
          <Text style={styles.attributeContent}>
            {this.props.house.getChargingStations()}
          </Text>

          <Text style={styles.attributeTitle}>
            Bus Stops
          </Text>
          <Text style={styles.attributeContent}>
            {this.props.house.getBusStops()}
          </Text>
        </ScrollView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f6f6f6',
  },
  header: {
    borderBottomWidth:1,
    backgroundColor:'#263238',
    borderColor:'#c8c7cc',
    flexDirection: 'row',
  },
  headericon: {
    marginLeft:15,
    marginTop:15,
  },
  headertext: {
    color:'white',
    marginTop:15,
    marginBottom:15,
    marginLeft:25,
    fontWeight:'bold',
    fontSize:20,
  },
  image: {
    marginTop: 10,
    marginLeft: 10,
    width: 200,
    height: 200,
  },
  attributeTitle: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  attributeContent: {
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
  }
});
