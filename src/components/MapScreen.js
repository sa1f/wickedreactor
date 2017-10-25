// @flow
'use strict';

import { Component } from 'react';
import { Dimensions } from 'react-native';
import Filter from '../models/Filter';
import House from '../models/House';
import { Icon } from 'react-native-elements';
import { List } from 'immutable';
import MapView from 'react-native-maps';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';

const { width, height } = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT;

export type Region = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
};

type Props = {
  navigation: any,
  houses: List<House>,
};

type State = {
  houses: List<House>,
};

export default class MapScreen extends React.Component<Props, State> {
  _index: number = 0;
  _regionTimeoutID: number = 0;

  _animation: Object = {};
  _map: ?MapView;

  _vancouverRegion: Region = {
    latitude: 49.2827,
    longitude: -123.1207,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      houses: this.props.houses,
    };
  }

  _updateHouses(houses: List<House>) {
    this.setState({houses});
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <MapView
          ref={(map) => this._map = map}
          initialRegion={this._vancouverRegion}
          style={styles.map}
          onRegionChangeComplete={(region) => this._updateHouses(
            Filter.getFilter().setRegion(region).genHouses(),
          )}>
          {this.state.houses.map((house, index) => {
            return (
              <HouseMarker
                curHouseNumber={index}
                curHouse={house}
                key={index}>
              </HouseMarker>
            );
          })}
        </MapView>
        <Icon
          name='filter'
          type='font-awesome'
          reverse={true}
          onPress={() => navigate('Filter', {})}
        />
        <Icon
          name='home'
          type='font-awesome'
          reverse={true}
          onPress={() => navigate('HouseListScreen', {})}
        />
      </View>
    );
  }
}

const HouseMarker = (props) =>
  <MapView.Marker
    coordinate={{
      latitude: props.curHouse.getLatitude(),
      longitude: props.curHouse.getLongitude(),
    }}>
    <Icon
      name='home'
      type='font-awesome'
      color='black'
    />
    <HouseCallout curHouseNumber={props.curHouseNumber} curHouse={props.curHouse}></HouseCallout>
  </MapView.Marker>;

const HouseCallout = (props) =>
  <MapView.Callout style={styles.calloutContainer}>
    <Text style={styles.calloutTitle}>{'House Number: ' + props.curHouseNumber}</Text>
    <Text>{'Address: '}</Text>
    <Text>{'Price: ' + props.curHouse.getPrice()}</Text>
    <Text>{'Bedrooms:  ' + 'Bathrooms: '}</Text>
    <Image
      style={styles.image}
      source={{uri: 'http://via.placeholder.com/200x200'}}
    />
  </MapView.Callout>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  calloutContainer: {
    width: 200
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 15
  },
  image: {
    height: 100,
    borderRadius: 10,
    marginTop: 10
  }
});
