// @flow
'use strict';

import React, {Component} from 'react';
import { Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { View } from 'react-native';
import House from '../models/House';
import Filter from '../models/Filter';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;

type Props = {
  navigation: any,
  house: House,
};

let SECTIONS = [];

export default class HouseDetailScreen extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  async _goToMapScreen() {
    const houses = await Filter.getFilter().genHouses();
    const { navigate } = this.props.navigation;
    navigate('Map', { houses: houses });
  }

  _renderHeader(section) {
    return (
      <View style={styles.accordianHeader}>
        <Icon
          style={styles.icon}
          name={section.iconName}
          type='font-awesome'
        />
        <Text style={styles.accordianText}>{section.title}</Text>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={styles.accordianContent}>
        <Text>{section.content}</Text>
      </View>
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon style={styles.headericon}
            name='arrow-left'
            type='font-awesome'
            color='white'
            onPress={() => this._goToMapScreen()}
          />
          <Text style={styles.headertext}>
            House Details
          </Text>
        </View>
        <Image
          style={styles.image}
          source={{uri: 'http://via.placeholder.com/200x200'}}
        />

        <Accordion
          sections={[
            {
              title: 'Address',
              content: 'Insert address here',
              iconName: 'home',
            },
            {
              title: 'Price',
              content: `$ ${this.props.house.getPrice()}`,
              iconName: 'dollar',
            },
            {
              title: 'Schools',
              content: this.props.house.getSchools(),
              iconName: 'pencil',
            },
            {
              title: 'Libraries',
              content: this.props.house.getLibraries(),
              iconName: 'book',
            },
            {
              title: 'Cultural Spaces',
              content: this.props.house.getCulturalSpaces(),
              iconName: 'paint-brush',
            },
            {
              title: 'Parks',
              content: this.props.house.getParks(),
              iconName: 'tree',
            },
            {
              title: 'Community Centers',
              content: this.props.house.getRecreationalCenters(),
              iconName: 'futbol-o',
            },
            {
              title: 'Charging Stations',
              content: this.props.house.getChargingStations(),
              iconName: 'bolt',
            },
            {
              title: 'Bus Stops',
              content: this.props.house.getBusStops(),
              iconName: 'bus',
            }
          ]}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />
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
  image: {
    marginTop: 10,
    width: SCREEN_WIDTH,
    height: 200,
  },
  attributeTitle: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  attributeContent: {
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
  },
  accordianHeader: {
    height: 30,
    backgroundColor: 'white',
    padding: 10,
  },
  accordianText: {
    position: 'absolute',
    top: 5,
    left: 45,
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  accordianContent: {
    padding: 20,
    backgroundColor: 'white',
  },
  icon: {
    position: 'absolute',
    top: 5,
    left: 5,
  }
});
