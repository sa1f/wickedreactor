// @flow
'use strict'

import { Component } from 'react';
import { Icon } from 'react-native-elements';
import MapView from 'react-native-maps';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

type Region = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
}

type Props = {
  region: Region
}

export default class RealEstateMap extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          region={this.props.region}
          style={styles.map} />
          <Icon
            name='filter'
            type='font-awesome'
            reverse={true} />
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
