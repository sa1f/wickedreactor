// @flow
'use strict'

import { Animated } from 'react-native';
import { Component } from 'react';
import { Dimensions } from 'react-native';
import Filter from '../models/Filter';
import House from '../models/House';
import { Icon } from 'react-native-elements';
import { List } from 'immutable';
import MapView from 'react-native-maps';
import React from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT;
const REGION_TIMEOUT_DELAY_MILLISECONDS = 10;

export type Region = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
};

type Props = {
  navigation: any,
  houses: List<House>,
};

type State = {
  houses: List<House>,
}

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
    };
  }

  componentWillMount() {
    this._index = 0;
    this._animation = new Animated.Value(0);
  }

  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this._animation.addListener(({ value }) => {
      // animate 30% away from landing on the next item
      let index = Math.floor(value / CARD_WIDTH + 0.3);

      if (index >= this.state.houses.size) {
        index = this.state.houses.size - 1;
      }

      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this._regionTimeoutID);

      this._regionTimeoutID = setTimeout(
        this._getTimeoutCallback(index),
        REGION_TIMEOUT_DELAY_MILLISECONDS,
      );
    });
  }

  _getTimeoutCallback(index: number): () => void {
    return () => {
      if (this._index !== index) {
        this._index = index;

        const coordinate = {
          latitude: this.state.houses.get(index).getLatitude(),
          longitude: this.state.houses.get(index).getLongitude(),
        };

        if (this._map) {
          this._map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this._vancouverRegion.latitudeDelta,
              longitudeDelta: this._vancouverRegion.longitudeDelta,
            },
            350,
          );
        }
      }
    };
  }

  _getInterpolations(): List<Object> {
    return this.state.houses.map((house, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this._animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this._animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });

      return { scale, opacity };
    });
  }

  _updateHouses(houses: List<House>) {
    this.setState({houses});
  }

  render() {
    const { navigate } = this.props.navigation;
    const interpolations = this._getInterpolations();

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this._map = map}
          initialRegion={this._vancouverRegion}
          style={styles.map}
          onRegionChangeComplete={region => this._updateHouses(
            Filter.getFilter().setRegion(region).genHouses(),
          )}>
          {this.state.houses.map((house, index) => {
            if (interpolations.get(index)) {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations.get(index).scale,
                  },
                ],
              };

              const opacityStyle = {
                opacity: interpolations.get(index).opacity,
              };
            }

            return (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: house.getLatitude(),
                  longitude: house.getLongitude(),
                }}>
                <Icon
                  name='home'
                  type='font-awesome'
                  color='black'
                />
              </MapView.Marker>
            );
          })}
        </MapView>
        <Icon
          name='filter'
          type='font-awesome'
          reverse={true}
          onPress={() => navigate('Filter', {})}
        />
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this._animation,
                  },
                },
              },
            ],
            { useNativeDriver: true },
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}>
          {this.state.houses.map((house, index) => (
            <View
              style={styles.card}
              key={index}>
              <View style={styles.textContent}>
                <Text
                  numberOfLines={1}
                  style={styles.cardtitle}>
                  {"House " + index}
                </Text>
                <Text
                  numberOfLines={1}
                  style={styles.cardDescription}>
                  {"Price: " + house.getPrice()}
                </Text>
                <Text
                  numberOfLines={1}
                  style={styles.cardDescription}>
                  {"Latitude: " + house.getLatitude()}
                </Text>
                <Text
                  numberOfLines={1}
                  style={styles.cardDescription}>
                  {"Longitude: " + house.getLongitude()}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
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
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
});
