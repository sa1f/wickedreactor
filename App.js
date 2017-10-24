// @flow
'use strict'

import { Component } from 'react';
import Filter from './src/models/Filter';
import FilterScreen from './src/components/FilterScreen';
import MapScreen from './src/components/MapScreen';
import HouseListScreen from './src/components/HouseListScreen';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';

const Navigator = StackNavigator({
  Map: { screen: withMappedNavigationProps(MapScreen) },
  Filter: { screen: withMappedNavigationProps(FilterScreen) },
  HouseListScreen: { screen: withMappedNavigationProps(HouseListScreen) },
},
{
  headerMode: 'none',
});

export default class Remaximum extends React.Component<{}> {
  render() {
    return <Navigator screenProps={{houses: Filter.getFilter().genHouses()}}/>;
  }
}
