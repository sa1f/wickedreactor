// @flow
'use strict'

import { Component } from 'react';
import Filter from '../models/Filter';
import { Icon } from 'react-native-elements';
import { List } from 'immutable';
// fixed by making modifications to prompt.js outlined here:
// https://github.com/jaysoo/react-native-prompt/pull/24
import Prompt from 'react-native-prompt';
import React from 'react';
 // fixed by replacing the index.js in module with code in
 // https://github.com/evetstech/react-native-settings-list/pull/40
import SettingsList from 'react-native-settings-list';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';

const FilterField = {
  minimumPrice: 'minimumPrice',
  maximumPrice: 'maximumPrice',
  schoolRange: 'schoolRange',
  libraryRange: 'libraryRange',
  culturalSpaceRange: 'culturalSpaceRange',
  parkRange: 'parkRange',
  recreationalCenterRange: 'recreationalCenterRange',
  chargingStationRange: 'chargingStationRange',
  busStopRange: 'busStopRange',
};

type FilterFieldType = $Keys<typeof FilterField>

type Props = {
  navigation: any,
};

type State = {
  message: string,
  placeholderMessage: string,
  promptVisible: boolean,
  currentFilterField?: FilterFieldType,
};

export default class FilterScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      message: '',
      placeholderMessage: '',
      promptVisible: false,
    };
  }

  _updateFilter(value: string) {
    this.setState({promptVisible: false});

    switch(this.state.currentFilterField) {
      case FilterField.minimumPrice:
        Filter.getFilter().setMinimumPrice(parseInt(value, 10));
        break;
      case FilterField.maximumPrice:
        Filter.getFilter().setMaximumPrice(parseInt(value, 10));
        break;
      case FilterField.schoolRange:
        Filter.getFilter().setSchoolRange(parseInt(value, 10));
        break;
      case FilterField.libraryRange:
        Filter.getFilter().setLibraryRange(parseInt(value, 10));
        break;
      case FilterField.culturalSpaceRange:
        Filter.getFilter().setCulturalSpaceRange(parseInt(value, 10));
        break;
      case FilterField.parkRange:
        Filter.getFilter().setParkRange(parseInt(value, 10));
        break;
      case FilterField.recreationalCenterRange:
        Filter.getFilter().setRecreationalCenterRange(parseInt(value, 10));
        break;
      case FilterField.chargingStationRange:
        Filter.getFilter().setChargingStationRange(parseInt(value, 10));
        break;
      case FilterField.busStopRange:
        Filter.getFilter().setBusStopRange(parseInt(value, 10));
        break;
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon style={styles.headericon}
            name='arrow-left'
            type='font-awesome'
            color="white"
            onPress={() => navigate(
              'Map',
              { houses: Filter.getFilter().genHouses()},
            )}
          />
          <Text style={styles.headertext}>
            Filters
          </Text>
        </View>
        <View style={styles.body}>
          <SettingsList>
             <SettingsList.Item
               icon={
                 <Icon
                   name='dollar'
                   type='font-awesome'
                   reverse={true}
                 />
               }
               hasNavArrow={false}
               itemWidth={70}
               titleStyle={styles.filteritem}
               title='Minimum Price'
               titleInfo={"$" + String(Filter.getFilter().getMinimumPrice())}
               onPress={() => this.setState({
                 promptVisible: true,
                 message:"Set the Minimum Price",
                 placeholderMessage:"Enter Amount",
                 currentFilterField:"minimumPrice",
               })}
             />
             <SettingsList.Item
               icon={
                 <Icon
                   name='dollar'
                   type='font-awesome'
                   reverse={true}
                 />
               }
               hasNavArrow={false}
               itemWidth={70}
               titleStyle={styles.filteritem}
               title='Maximum Price'
               titleInfo={"$" + String(Filter.getFilter().getMaximumPrice())}
               onPress={() => this.setState({
                 promptVisible: true,
                 message:"Set the Maximum Price",
                 placeholderMessage:"Enter Amount",
                 currentFilterField:"maximumPrice",
               })}
             />
             <SettingsList.Item
               icon={
                 <Icon
                   name='pencil'
                   type="font-awesome"
                   reverse={true}
                 />
               }
               hasNavArrow={false}
               itemWidth={70}
               titleStyle={styles.filteritem}
               title='Range to Schools'
               titleInfo={String(Filter.getFilter().getSchoolRange()) + " km"}
               onPress={() => this.setState({
                 promptVisible: true,
                 message:"Set the Maximum Range to Schools",
                 placeholderMessage:"Enter Range",
                 currentFilterField:"schoolRange",
               })}
             />
             <SettingsList.Item
               icon={
                 <Icon
                   name="book"
                   type="font-awesome"
                   reverse={true}
                 />
               }
               hasNavArrow={false}
               itemWidth={70}
               titleStyle={styles.filteritem}
               title='Range to Libraries'
               titleInfo={String(Filter.getFilter().getLibraryRange()) + " km"}
               onPress={() => this.setState({
                 promptVisible: true,
                 message:"Set the Maximum Range to Libraries",
                 placeholderMessage:"Enter Range",
                 currentFilterField:"libraryRange",
               })}
             />
             <SettingsList.Item
               icon={
                 <Icon
                   name='paint-brush'
                   type='font-awesome'
                   reverse={true}
                 />
               }
               hasNavArrow={false}
               itemWidth={70}
               titleStyle={styles.filteritem}
               title='Range to Cultural Spaces'
               titleInfo={
                 String(Filter.getFilter().getCulturalSpaceRange()) + " km"
               }
               onPress={() => this.setState({
                 promptVisible: true,
                 message:"Set the Maximum Range to Cultural Spaces",
                 placeholderMessage:"Enter Range",
                 currentFilterField:"culturalSpaceRange",
               })}
             />
             <SettingsList.Item
               icon={
                 <Icon
                   name='tree'
                   type='font-awesome'
                   reverse={true}
                 />
               }
               hasNavArrow={false}
               itemWidth={70}
               titleStyle={styles.filteritem}
               title='Range to Parks'
               titleInfo={String(Filter.getFilter().getParkRange()) + " km"}
               onPress={() => this.setState({
                 promptVisible: true,
                 message:"Set the Maximum Range to Parks",
                 placeholderMessage:"Enter Range",
                 currentFilterField:"parkRange",
              })}
             />
             <SettingsList.Item
               icon={
                 <Icon
                   name='futbol-o'
                   type="font-awesome"
                   reverse={true}
                 />
               }
               hasNavArrow={false}
               itemWidth={70}
               titleStyle={styles.filteritem}
               title='Range to Rec Centers'
               titleInfo={
                 String(Filter.getFilter().getRecreationalCenterRange()) + " km"
               }
               onPress={() => this.setState({
                 promptVisible: true,
                 message:"Set the Maximum Range to Rec Centers",
                 placeholderMessage:"Enter Range",
                 currentFilterField:"recreationalCenterRange",
               })}
             />
             <SettingsList.Item
               icon={
                 <Icon
                   name='bolt'
                   type='font-awesome'
                   reverse={true}
                 />
               }
               hasNavArrow={false}
               itemWidth={70}
               titleStyle={styles.filteritem}
               title='Range to Charging Stations'
               titleInfo={String(Filter.getFilter().getChargingStationRange()) + " km"}
               onPress={() => this.setState({
                 promptVisible: true,
                 message:"Set the Maximum Range to Charging Stations",
                 placeholderMessage:"Enter Range",
                 currentFilterField:"chargingStationRange",
               })}
             />
             <SettingsList.Item
               icon={
                 <Icon
                   name='bus'
                   type='font-awesome'
                   reverse={true}
                 />
               }
               hasNavArrow={false}
               itemWidth={70}
               titleStyle={styles.filteritem}
               title='Range to Bus Stops'
               titleInfo={String(Filter.getFilter().getBusStopRange()) + " km"}
               onPress={() => this.setState({
                 promptVisible: true,
                 message:"Set the Maximum Range to Bus Stops",
                 placeholderMessage:"Enter Range",
                 currentFilterField:"busStopRange",
               })}
             />
           </SettingsList>
           <Prompt
              textInputProps={{keyboardType: 'numeric'}}
              title={this.state.message}
              placeholder={this.state.placeholderMessage}
              visible={this.state.promptVisible}
              onCancel={() => this.setState({ promptVisible: false })}
              onSubmit={(value) => this._updateFilter(value)}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f6f6f6',
  },
  header: {
    borderBottomWidth:1,
    backgroundColor:'#263238',
    borderColor:'#c8c7cc',
    flexDirection: 'row',
    marginBottom: -5,
  },
  headericon: {
    marginLeft:15,
    marginTop:15,
  },
  headertext: {
    color:'white',
    marginTop:15,
    marginBottom:15,
    marginLeft:25,
    fontWeight:'bold',
    fontSize:20,
  },
  body: {
    flex:1,
    backgroundColor:'#f6f6f6',
  },
  filteritem: {
    color:'black',
    fontSize: 16
  }
});
