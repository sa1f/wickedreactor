// @flow
'use strict'

import { Component } from 'react';
import FilterAPI from '../api/FilterAPI';
import { List } from 'immutable';
import { Text } from 'react-native';
import React from 'react';
import { View } from 'react-native';

export default class FilterScreen extends React.Component<{}> {
  _genFilterData(): List<Object> {
    return FilterAPI.genFilteredData();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>This is the filter page</Text>
      </View>
    );
  }
}
