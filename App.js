// @flow
'use strict'

import { Component } from 'react';
import FilterScreen from './src/components/FilterScreen';
import React from 'react';
import MapScreen from './src/components/MapScreen';
import { StackNavigator } from 'react-navigation';

const Navigator = StackNavigator({
  Map: { screen: MapScreen },
  Filter: { screen: FilterScreen },
},
{
  headerMode: 'none',
});

export default class Remaximum extends React.Component<{}> {
  render() {
    return <Navigator />;
  }
}
