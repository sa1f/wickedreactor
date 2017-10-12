// @flow
'use strict'

import { Component } from 'react';
import { Icon } from 'react-native-elements';
import MapView from 'react-native-maps';
import NavigationProps from '../NavigationProps';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

export default class MapScreen extends React.Component<NavigationProps> {
  _vancouverRegion = {
    latitude: 49.2827,
    longitude: -123.1207,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <MapView
          region={this._vancouverRegion}
          style={styles.map} />
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
