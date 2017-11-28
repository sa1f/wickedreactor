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
import type { Region } from '../models/Filter';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;

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

  async _updateHouses(region: Region) {
    const houses = await Filter.getFilter().setRegion(region).genHouses();
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
          onRegionChangeComplete={(region) => this._updateHouses(region)}>
          {this.state.houses.map((house, index) => {
            return (
              <HouseMarker
                curHouseNumber={index}
                curHouse={house}
                key={index}
                navigationProp={navigate}>
              </HouseMarker>
            );
          })}
        </MapView>
        <View style={styles.filterIcon}>
          <Icon
            name='filter'
            type='font-awesome'
            reverse={true}
            onPress={() => navigate('Filter', {})}
          />
        </View>

        <View style={styles.houseIcon}>
          <Icon
            name='home'
            type='font-awesome'
            reverse={true}
            onPress={() => navigate('HouseListScreen', {houses: this.state.houses})}
          />
        </View>
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
    <HouseCallout
      style={styles.calloutContainer}
      curHouseNumber={props.curHouseNumber}
      curHouse={props.curHouse}
      navigationProp={props.navigationProp}
    />
  </MapView.Marker>;

const HouseCallout = (props) =>
  <MapView.Callout style={styles.calloutContainer}
    toolTip={true}
    onPress={() => {props.navigationProp('HouseDetailScreen', {house: props.curHouse})}}>
    <Image
      style={styles.image}
      source={{uri: props.curHouse.getPhoto() == '' ? 'http://via.placeholder.com/200x200': props.curHouse.getPhoto()}}>
      <Text style={styles.calloutAddress}>{'Address: \n' + props.curHouse.getAddress()}</Text>
      <Text style={styles.calloutPrice}>{`Price: \n$${props.curHouse.getPrice()}`}</Text>
    </Image>
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
    width: 250,
    borderRadius: 10,
  },
  calloutAddress: {
    fontWeight: 'bold',
    fontSize: 15,
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    color: 'white',
    marginTop: 10,
    marginLeft: 5,
  },
  calloutPrice: {
    fontWeight: 'bold',
    fontSize: 15,
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    color: 'white',
    marginTop: 5,
    marginLeft: 5,
  },
  image: {
    width: 250,
    height: 150,
  },
  filterIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  houseIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  }
});
