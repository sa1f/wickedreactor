// @flow
'use strict'

import React, { Component } from 'react';
import MapView from 'react-native-maps';

export default class Remaximum extends Component<{}> {
  render() {
    return (
      <MapView
        region={{
          latitude: 49.2827,
          longitude: -123.1207,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    );
  }
}
