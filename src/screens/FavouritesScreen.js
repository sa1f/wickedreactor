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
import { List } from 'immutable';
import House from '../models/House';
import Filter from '../models/Filter';
import { Card } from 'react-native-card-view';
import { CardAction } from 'react-native-card-view';
import Button from 'react-native-button';
import { CardImage } from 'react-native-card-view';
import { CardTitle } from 'react-native-card-view';
import { CardContent } from 'react-native-card-view';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;

type Props = {
  navigation: any,
  houses: List<House>,
};

export default class FavouritesScreen extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render () {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon style={styles.headericon}
            name='arrow-left'
            type='font-awesome'
            color='white'
            onPress={() => navigate('Map', { houses: this.props.houses })}
          />
          <Text style={styles.headertext}>
            Favourites
          </Text>
        </View>
        <ScrollView>
          {this.props.houses.map((house, index) => (
            <CardView
              curHouse={house}
              curHouseNumber={index}
              key={index}
              navigationProp={navigate}>
            </CardView>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const CardView = (props) =>
  <Card style={styles.card}>
      <CardImage>
        <Image
          style={styles.image}
          source={{uri: props.curHouse.getPhoto() == '' ? 'http://via.placeholder.com/200x200': props.curHouse.getPhoto()}}>
          <Text style={styles.cardText}>{'Address: ' + props.curHouse.getAddress()}</Text>
          <Text style={styles.cardText}>{`Price: $${props.curHouse.getPrice()}`}</Text>
          <CardAction >
            <Button
              style={styles.cardButton}
              onPress={() =>
                props.navigationProp('HouseDetailScreen', {house: props.curHouse})}>
              <Text style={styles.buttonText}>{'View Details'}</Text>
            </Button>
          </CardAction>
        </Image>
      </CardImage>
  </Card>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  header: {
    borderBottomWidth: 1,
    backgroundColor: '#263238',
    borderColor: '#c8c7cc',
    flexDirection: 'row',
  },
  headericon: {
    marginLeft: 15,
    marginTop: 15,
  },
  headertext: {
    color: 'white',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 25,
    fontWeight: 'bold',
    fontSize: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginBottom: -30,
    marginRight: 130,
  },
	content: {
		fontSize: 20,
		backgroundColor: 'transparent',
    marginRight: 60,
	},
  image: {
    width: SCREEN_WIDTH,
    height: 200,
  },
  card: {
    marginTop: 15,
  },
  cardText: {
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    color: 'white',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardButton: {
    marginTop: 80,
    marginLeft: 130,
  },
  buttonText: {
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 80,
    marginLeft: SCREEN_WIDTH/2 - 60,
  },
});
