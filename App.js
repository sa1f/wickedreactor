// @flow
'use strict'

import { Component } from 'react';
import React from 'react';
import RealEstateMap from './src/components/RealEstateMap';

export default class Remaximum extends React.Component<{}> {
  _vancouverRegion = {
    latitude: 49.2827,
    longitude: -123.1207,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  render() {
    return <RealEstateMap region={this._vancouverRegion} />;
  }
}
