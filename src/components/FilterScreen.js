// @flow
'use strict'
import { AppRegistry } from 'react-native';
import { StyleSheet } from 'react-native';
import { Component } from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';
import React from 'react';
import { View } from 'react-native';
import SettingsList from 'react-native-settings-list'; // fixed by replacing the index.js in module with code in https://github.com/evetstech/react-native-settings-list/pull/40
import Prompt from 'react-native-prompt'; // fixed by making modifications to prompt.js outlined here: https://github.com/jaysoo/react-native-prompt/pull/24
import Filter from '../models/Filter';

type Props = {
  navigation: any;
}

type State = {
  message: string,
  placeholderMessage: string,
  promptVisible: boolean,
  curFilter: string,
  curFilterObj: Filter
}

export default class FilterScreen extends React.Component<Props, State> {

  promptRoutine(value: string) {
    this.setState({ promptVisible: false})
    let filterString = this.state.curFilter

    switch(filterString) {
      case "minimumPrice":
        this.state.curFilterObj.setMinimumPrice(parseInt(value))
        break
      case "maximumPrice":
        this.state.curFilterObj.setMaximumPrice(parseInt(value))
        break
      case "schoolRange":
        this.state.curFilterObj.setSchoolRange(parseInt(value))
        break
      case "libraryRange":
        this.state.curFilterObj.setLibraryRange(parseInt(value))
        break
      case "culturalSpaceRange":
        this.state.curFilterObj.setCulturalSpaceRange(parseInt(value))
        break
      case "parkRange":
        this.state.curFilterObj.setParkRange(parseInt(value))
        break
      case "recreationalCenterRange":
        this.state.curFilterObj.setRecreationalCenterRange(parseInt(value))
        break
      case "chargingStationRange":
        this.state.curFilterObj.setChargingStationRange(parseInt(value))
        break
      case "busStopRange":
        this.state.curFilterObj.setBusStopRange(parseInt(value))
        break
    }
  }

 constructor(){
   super();
   this.state = {
     message: '',
     placeholderMessage:'',
     promptVisible: false,
     curFilter: '',
     curFilterObj: new Filter()
   };
 }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{backgroundColor:'#f6f6f6',flex:1}}>
        <View style={{borderBottomWidth:1, backgroundColor:'#263238', borderColor:'#c8c7cc', flexDirection: 'row'}}>
          <Icon style={{marginLeft:15, marginTop:15}}
            name='arrow-left'
            type='font-awesome'
            color="white"
            onPress={() => navigate('Map', {})}
            />
          <Text style={{color:'white',marginTop:15,marginBottom:15, marginLeft:25,fontWeight:'bold',fontSize:20}}>Filters</Text>
        </View>
        <View style={{backgroundColor:'#f6f6f6',flex:1}}>
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
               titleStyle={{color:'black', fontSize: 16}}
               title='Minimum Price'
               titleInfo={this.state.curFilterObj._minimumPrice}
               onPress={() =>
                 this.setState({ promptVisible: true, message:"Set the Minimum Price", placeholderMessage:"Enter Amount", curFilter:"minimumPrice" })
               }
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
               titleStyle={{color:'black', fontSize: 16}}
               title='Maximum Price'
               titleInfo={this.state.curFilterObj._maximumPrice}
               onPress={() =>
                 this.setState({ promptVisible: true, message:"Set the Maximum Price", placeholderMessage:"Enter Amount", curFilter:"maximumPrice" })
               }
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
               titleStyle={{color:'black', fontSize: 16}}
               title='Range to Schools'
               titleInfo={this.state.curFilterObj._schoolRange}
               onPress={() =>
                 this.setState({ promptVisible: true, message:"Set the Maximum Range to Schools", placeholderMessage:"Enter Range", curFilter:"schoolRange" })
               }
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
               titleStyle={{color:'black', fontSize: 16}}
               title='Range to Libraries'
               titleInfo={this.state.curFilterObj._libraryRange}
               onPress={() =>
                 this.setState({ promptVisible: true, message:"Set the Maximum Range to Libraries", placeholderMessage:"Enter Range", curFilter:"libraryRange" })
               }
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
               titleStyle={{color:'black', fontSize: 16}}
               title='Range to Cultural Spaces'
               titleInfo={this.state.curFilterObj._culturalSpaceRange}
               onPress={() =>
                 this.setState({ promptVisible: true, message:"Set the Maximum Range to Cultural Spaces", placeholderMessage:"Enter Range", curFilter:"culturalSpaceRange" })
               }
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
               titleStyle={{color:'black', fontSize: 16}}
               title='Range to Parks'
               titleInfo={this.state.curFilterObj._parkRange}
               onPress={() =>
                 this.setState({ promptVisible: true, message:"Set the Maximum Range to Parks", placeholderMessage:"Enter Range", curFilter:"parkRange" })
               }
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
               titleStyle={{color:'black', fontSize: 16}}
               title='Range to Rec Centers'
               titleInfo={this.state.curFilterObj._recreationalCenterRange}
               onPress={() =>
                 this.setState({ promptVisible: true, message:"Set the Maximum Range to Rec Centers", placeholderMessage:"Enter Range", curFilter:"recreationalCenterRange" })
               }
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
               titleStyle={{color:'black', fontSize: 16}}
               title='Range to Charging Stations'
               titleInfo={this.state.curFilterObj._chargingStationRange}
               onPress={() =>
                 this.setState({ promptVisible: true, message:"Set the Maximum Range to Charging Stations", placeholderMessage:"Enter Range", curFilter:"chargingStationRange" })
               }
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
               titleStyle={{color:'black', fontSize: 16}}
               title='Range to Bus Stops'
               titleInfo={this.state.curFilterObj._busStopRange}
               onPress={() =>
                 this.setState({ promptVisible: true, message:"Set the Maximum Range to Bus Stops", placeholderMessage:"Enter Range", curFilter:"busStopRange" })
               }
             />
           </SettingsList>
           <Prompt
              textInputProps={{keyboardType: 'numeric'}}
              title={this.state.message}
              placeholder={this.state.placeholderMessage}
              visible={this.state.promptVisible}
              onCancel={() => this.setState({ promptVisible: false })}
              onSubmit={ (value) => this.promptRoutine(value) }/>
        </View>
      </View>
);
  }
}
