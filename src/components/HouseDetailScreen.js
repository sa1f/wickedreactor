// @flow
'use strict';

import React, {Component} from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { View } from 'react-native';
import { List } from 'immutable';
import House from '../models/House';
import Filter from '../models/Filter';
import { Card } from 'react-native-card-view';
import { CardImage } from 'react-native-card-view';
import { CardTitle } from 'react-native-card-view';
import { CardContent } from 'react-native-card-view';

type Props = {
  navigation: any,
  houses: List<House>,
  house: House
};

type State = {
  houses: List<House>,
  house: House
};

export default class HouseDetailScreen extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			houses: this.props.houses,
      house: this.props.house
		};
	}

  render () {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon style={styles.headericon}
            name='arrow-left'
            type='font-awesome'
            color='white'
            onPress={() => navigate(
              'Map',
              { houses: Filter.getFilter().genHouses()},
            )}
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
            {"$" + this.state.house.getPrice()}
          </Text>

          <Text style={styles.attributeTitle}>
            Schools
          </Text>
          <Text style={styles.attributeContent}>
            {this.state.house.getSchools()}
          </Text>

          <Text style={styles.attributeTitle}>
            Libraries
          </Text>
          <Text style={styles.attributeContent}>
            {this.state.house.getLibraries()}
          </Text>

          <Text style={styles.attributeTitle}>
            Cultural Spaces
          </Text>
          <Text style={styles.attributeContent}>
            {this.state.house.getCulturalSpaces()}
          </Text>

          <Text style={styles.attributeTitle}>
            Parks
          </Text>
          <Text style={styles.attributeContent}>
            {this.state.house.getParks()}
          </Text>

          <Text style={styles.attributeTitle}>
            Community Centers
          </Text>
          <Text style={styles.attributeContent}>
            {this.state.house.getRecreationalCenters()}
          </Text>

          <Text style={styles.attributeTitle}>
            Charging Stations
          </Text>
          <Text style={styles.attributeContent}>
            {this.state.house.getChargingStations()}
          </Text>

          <Text style={styles.attributeTitle}>
            Bus Stops
          </Text>
          <Text style={styles.attributeContent}>
            {this.state.house.getBusStops()}
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginBottom: -30,
    marginRight: 130
  },
	content: {
		fontSize: 20,
		backgroundColor: 'transparent',
    marginRight: 60,
	},
  image: {
    marginTop: 10,
    marginLeft: 10,
    width: 200,
    height: 200
  },
  attributeTitle: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10
  },
  attributeContent: {
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10
  }
});
