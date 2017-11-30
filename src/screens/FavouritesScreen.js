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
import { ToastAndroid } from 'react-native';


const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;

type Props = {
  navigation: any,
  houses: List<House>,
};

type State = {
  random: boolean,
  houses: List<House>,
}

export default class FavouritesScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      random: false,
      houses: props.houses,
    };
  }

  _removeHouse = (index: number) => {
    this.setState({
      houses: this.state.houses.delete(index),
    });
  };

  render () {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon style={styles.headericon}
            name='arrow-left'
            type='font-awesome'
            color='white'
            onPress={() => navigate('Map', { houses: this.state.houses })}
          />
          <Text style={styles.headertext}>
            Favourites
          </Text>
        </View>
        <ScrollView>
          {this.state.houses.map((house, index) => (
              <CardView
                key={index}
                house={house}
                houseNumber={index}
                houses={this.state.houses}
                navigation={navigate}
                onRemoveHouse={() => this._removeHouse(index)}>
              </CardView>
            ))}
        </ScrollView>
      </View>
    );
  }
}

const CardView = (props: {
    house: House,
    houseNumber: number,
    houses: List<House>,
    navigation: Function,
    onRemoveHouse: Function,
}) => {
  return (
    <Card style={styles.card}>
      <CardImage>
        <Image
          style={styles.image}
          source={{uri: props.house.getPhoto() || 'http://via.placeholder.com/200x200'}}>
          <Text style={styles.cardText}>{'Address: ' + props.house.getAddress()}</Text>
          <Text style={styles.cardText}>{`Price: $${props.house.getPrice()}`}</Text>
          <CardAction>
            <Button
              onPress={() =>
                props.navigation('HouseDetailScreen', {house: props.house})}>
              <Text style={styles.detailsButtonText}>{'View Details'}</Text>
            </Button>
            <Button
              onPress={() => _removeFromFavourites(
                props.house,
                props.houses,
                props.onRemoveHouse,
              )}>
              <Text style={styles.removeButtonText}>{'Remove'}</Text>
            </Button>
          </CardAction>
        </Image>
      </CardImage>
  </Card>);
};

const _removeFromFavourites = async (
  house: House,
  houses: List<House>,
  onRemoveHouse: Function,
) => {
  const removeFromFavouritesResp = await fetch(new Request(
    'https://hospitable-vise.glitch.me/deleteFavourite',
    {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "token": global.userToken,
        "mlsid": house.getMlsid(),
      }),
    }));

  const removeFromFavouritesRespJson = await removeFromFavouritesResp._bodyInit;

  if (!removeFromFavouritesRespJson.includes("done")) {
    ToastAndroid.show('Failed to remove :(', ToastAndroid.SHORT);
    return;
  }

  ToastAndroid.show('Removed from Favourites!', ToastAndroid.SHORT);
  console.log(removeFromFavouritesRespJson);
  onRemoveHouse();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  detailsButtonText: {
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 80,
    marginLeft: SCREEN_WIDTH/2 - 100,
  },
  removeButtonText: {
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 80,
  },
});
