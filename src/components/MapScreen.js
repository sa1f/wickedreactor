// @flow
'use strict'
import { Component } from 'react';
import House from '../models/House';
import { Icon } from 'react-native-elements';
import { List } from 'immutable';
import MapView from 'react-native-maps';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import { Animated } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT;

type Props = {
  navigation: any,
};

type State = {
  markers: List<House>,
  region: Object,
};

export default class MapScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      markers: House.createHouses([
        {
          latitude: 49.2694,
          longitude: -123.2589,
          price: 586956,
        },
        {
          latitude: 49.2606,
          longitude: -123.2450,
          price: 659369
        },
      ]),
      region: {
        latitude: 49.2827,
        longitude: -123.1207,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
    };
  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.size) {
        index = this.state.markers.size - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const coordinate = {
            latitude: this.state.markers.get(index).getLatitude(),
            longitude: this.state.markers.get(index).getLongitude(),
          };
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.map}
        >
          {this.state.markers.map((marker, index) => {
            if(interpolations[index] != null) {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };

            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
          }
            return (
              <MapView.Marker key={index} coordinate={{
                latitude: marker.getLatitude(),
                longitude: marker.getLongitude(),
              }}>
                <Icon
                  name='home'
                  type='font-awesome'
                  color='red'
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
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{"House " + index}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>{"Price: " + marker.getPrice()}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>{"Latitude: " + marker.getLatitude()}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>{"Longitude: " + marker.getLongitude()}</Text>
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
