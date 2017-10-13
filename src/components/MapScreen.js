// @flow
'use strict'

import { Component } from 'react';
import House from '../models/House';
import { Icon } from 'react-native-elements';
import { List } from 'immutable';
import MapView from 'react-native-maps';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';

type Props = {
  navigation: any;
}

type State = {
  houses: List<House>;
}

export default class MapScreen extends React.Component<Props, State> {
  _vancouverRegion = {
    latitude: 49.2827,
    longitude: -123.1207,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      houses: List(),
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <MapView
          region={this._vancouverRegion}
          style={styles.map}>
          {this.state.houses.map((house, index) => (
            <MapView.Marker
              coordinate={{
                latitude: house.getLatitude(),
                longitude: house.getLongitude(),
              }}
              key={index}>
              <MapView.Callout>
                <Text>{house._price}</Text>
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
        <Icon
          name='filter'
          type='font-awesome'
          reverse={true}
          onPress={() => navigate('Filter', {})}/>
      </View>
    );
  }
}

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
});
