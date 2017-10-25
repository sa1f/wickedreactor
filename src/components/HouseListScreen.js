// @flow
'use strict';

import React, {Component} from 'react';
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
import { CardImage } from 'react-native-card-view';
import { CardTitle } from 'react-native-card-view';
import { CardContent } from 'react-native-card-view';

type Props = {
  navigation: any,
  houses: List<House>,
};

type State = {
  houses: List<House>,
};

export default class HouseListScreen extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			houses: this.props.houses,
		};
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
            onPress={() => navigate(
              'Map',
              { houses: Filter.getFilter().genHouses()},
            )}
          />
          <Text style={styles.headertext}>
            Houses
          </Text>
        </View>
        <ScrollView>
          {this.state.houses.map((house, index) => (
            <CardView
              curHouse={house}
              curHouseNumber={index}
              key={index}>
            </CardView>
          ))}
        </ScrollView>
    </View>
    );
  }
}

const CardView = (props) =>
  <Card styles={{card: {marginTop: 20}}}>
      <CardTitle>
        <Text style={styles.title}>{'House Number: ' + props.curHouseNumber}</Text>
      </CardTitle>
      <CardContent>
    		<Text style={styles.content}>{'House Price: ' + props.curHouse.getPrice()}</Text>
        <Text style={styles.content}>{'Bedrooms: ' + '5' + '     ' + 'Bathrooms: ' + '3'}</Text>
      </CardContent>
      <CardImage>
        <Image
          style={styles.image}
          source={{uri: 'http://via.placeholder.com/200x200'}}
        />
  	</CardImage>
  </Card>;

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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginBottom: -30,
    marginRight: 130
  },
	content: {
		fontSize: 20,
		backgroundColor: 'transparent',
    marginRight: 60,
	},
  image: {
    marginRight: 115,
    width: 200,
    height: 200
  }
});
