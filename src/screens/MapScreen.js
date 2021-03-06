// @flow
'use strict';

import { ActivityIndicator } from 'react-native';
import { Component } from 'react';
import { Dimensions } from 'react-native';
import Filter from '../models/Filter';
import House from '../models/House';
import { Icon } from 'react-native-elements';
import { List } from 'immutable';
import MapView from 'react-native-maps';
import React from 'react';
import type { Region } from '../models/Filter';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { ToastAndroid } from 'react-native';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;

type Props = {
  navigation: any,
  houses: List<House>,
};

type State = {
  houses: List<House>,
  isLoadingHouses: bool,
};

export default class MapScreen extends React.Component<Props, State> {
  _index: number = 0;
  _regionTimeoutID: number = 0;

  _animation: Object = {};
  _map: ?MapView;

  _vancouverRegion: Region = {
    latitude: 49.2827,
    longitude: -123.1207,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      houses: this.props.houses,
      isLoadingHouses: false,
    };

  }

  async _updateHouses(region: Region) {
    this.setState({isLoadingHouses: true});
    const houses = await Filter.getFilter().setRegion(region).genHouses();

    this.setState({
      houses: houses,
      isLoadingHouses: false,
    });

    console.log("user token: " + global.userToken);
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <MapView
          ref={(map) => this._map = map}
          initialRegion={this._vancouverRegion}
          style={styles.map}
          onRegionChangeComplete={(region) => this._updateHouses(region)}>
          {this.state.houses.map((house, index) => {
            return (
              <HouseMarker
                curHouseNumber={index}
                curHouse={house}
                key={index}
                navigationProp={navigate}>
              </HouseMarker>
            );
          })}
        </MapView>
        <View style={styles.filterIcon}>
          <Icon
            name='filter'
            type='font-awesome'
            reverse={true}
            onPress={() => navigate('Filter', {})}
          />
        </View>
        <View style={styles.houseIcon}>
          <Icon
            name='home'
            type='font-awesome'
            reverse={true}
            onPress={() => navigate('HouseListScreen', {houses: this.state.houses})}
          />
        </View>
        <View style={styles.houseIcon}>
          <Icon
            name='star'
            type='font-awesome'
            reverse={true}
            onPress={() => navigateToFavourites(navigate)}
          />
        </View>
        <View style={styles.houseIcon}>
          <Icon
            name='sign-out'
            type='font-awesome'
            reverse={true}
            onPress={() => logOut()}
          />
        </View>
        {this.state.isLoadingHouses &&
          <ActivityIndicator
            animating={true}
            size={'large'}
            style={styles.spinner} />}
      </View>
    );
  }
}

const HouseMarker = (props) =>
  <MapView.Marker
    coordinate={{
      latitude: props.curHouse.getLatitude(),
      longitude: props.curHouse.getLongitude(),
    }}>
    <Icon
      name='home'
      type='font-awesome'
      color='black'
    />
    <HouseCallout
      style={styles.calloutContainer}
      curHouseNumber={props.curHouseNumber}
      curHouse={props.curHouse}
      navigationProp={props.navigationProp}
    />
  </MapView.Marker>;

const HouseCallout = (props) =>
  <MapView.Callout style={styles.calloutContainer}
    toolTip={true}
    onPress={() => {props.navigationProp('HouseDetailScreen', {house: props.curHouse})}}>
    <Image
      style={styles.image}
      source={{uri: props.curHouse.getPhoto() == '' ? 'http://via.placeholder.com/200x200': props.curHouse.getPhoto()}}>
      <Text style={styles.calloutAddress}>{'Address: \n' + props.curHouse.getAddress()}</Text>
      <Text style={styles.calloutPrice}>{`Price: \n$${props.curHouse.getPrice()}`}</Text>
    </Image>
  </MapView.Callout>;

function logOut() {
  if(global.userToken == null) {
    ToastAndroid.show('Not signed in!', ToastAndroid.SHORT);
  } else {
    global.userToken = null;
    ToastAndroid.show('Signed out', ToastAndroid.SHORT);
  }
}

async function navigateToFavourites(navigate) {
  if(global.userToken == null) {
    ToastAndroid.show('Please login first', ToastAndroid.SHORT);
    navigate('LoginScreen', {})
  } else {
    const getFavResponse = await fetch(new Request(
      'https://hospitable-vise.glitch.me/getFavourites',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"token": global.userToken}),
      }));

      const getFavResponseJson = await JSON.parse(getFavResponse._bodyInit);

      var houseArray = [];
      for(var cur_index in getFavResponseJson) {
          houseArray[cur_index] = getFavResponseJson[cur_index].houseJson;
      }
      console.log(houseArray);
      await navigate('FavouritesScreen', {houses: House.createHouses(houseArray)});
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
  calloutContainer: {
    width: 250,
    borderRadius: 10,
  },
  calloutAddress: {
    fontWeight: 'bold',
    fontSize: 15,
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    color: 'white',
    marginTop: 10,
    marginLeft: 5,
  },
  calloutPrice: {
    fontWeight: 'bold',
    fontSize: 15,
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    color: 'white',
    marginTop: 5,
    marginLeft: 5,
  },
  image: {
    width: 250,
    height: 150,
  },
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
