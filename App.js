// @flow
'use strict';

import { Component } from 'react';
import { List } from 'immutable';
import FilterScreen from './src/screens/FilterScreen';
import MapScreen from './src/screens/MapScreen';
import HouseListScreen from './src/screens/HouseListScreen';
import HouseDetailScreen from './src/screens/HouseDetailScreen';
import FavouritesScreen from './src/screens/FavouritesScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';

const Navigator = StackNavigator({
  Map: { screen: withMappedNavigationProps(MapScreen) },
  Filter: { screen: withMappedNavigationProps(FilterScreen) },
  HouseListScreen: { screen: withMappedNavigationProps(HouseListScreen) },
  HouseDetailScreen: { screen: withMappedNavigationProps(HouseDetailScreen) },
  FavouritesScreen: { screen: withMappedNavigationProps(FavouritesScreen) },
  LoginScreen: { screen: withMappedNavigationProps(LoginScreen) },
  SignUpScreen: { screen: withMappedNavigationProps(SignUpScreen) }
},
{
  headerMode: 'none',
});

export default class Remaximum extends React.Component<{}> {
  render() {
    return <Navigator screenProps={{houses: List()}}/>;
  }
}
