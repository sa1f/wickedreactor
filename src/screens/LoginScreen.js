// @flow
'use strict';

import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import { ToastAndroid } from 'react-native';
import Filter from '../models/Filter';
import House from '../models/House';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

type Props = {
  navigation: any,
};

type State = {
  username: string,
  password: string,
}

export default class LoginScreen extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render () {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headertext}>
            Login
          </Text>
        </View>
        <Image
          style={styles.image}
          source={{uri: 'http://mobilehdwalls.com/wp-content/uploads/2016/01/luxury-white-house-swimming-pool-flowers.jpg'}}>

          <View style={styles.inputHolder}>
            <TextInput
              placeholder="Username"
              keyboardType="email-address"
              onChangeText={(username) => this.setState({"username": username})}
              placeholderTextColor="white"
              underlineColorAndroid="white"
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              onChangeText={(password) => this.setState({"password": password})}
              placeholderTextColor="white"
              underlineColorAndroid="white"
              style={styles.input}
            />
          </View>
          <TouchableOpacity style={styles.buttonContainer}
            onPress={() => sendLoginRequest(this.state, navigate)}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}
            onPress={() => navigate('SignUpScreen', {})}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </Image>
      </View>
    );
  }
}

async function sendLoginRequest(state, navigate) {
  console.log("this is username: " + state["username"]);
  console.log("this is password: " + state["password"]);

  ToastAndroid.show('Logging In', ToastAndroid.SHORT);

  const loginResponse = await fetch(new Request(
    'https://childlike-quartz.glitch.me/login',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"username": state["username"], "password": state["password"]}),
    }));

    const loginResponseJson = await loginResponse._bodyInit;
    if(loginResponseJson.includes("Username/Password incorrect")) {
      ToastAndroid.show('Incorrect Credentials', ToastAndroid.SHORT);
      return;
    }
    console.log(loginResponseJson)
    global.userToken = loginResponseJson;

    const getFavResponse = await fetch(new Request(
      'https://childlike-quartz.glitch.me/getFavourites',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    marginTop: -5
  },
  image: {
    marginTop: -2,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  header: {
    borderBottomWidth: 1,
    backgroundColor: '#263238',
    borderColor: '#c8c7cc',
    flexDirection: 'row',
  },
  headertext: {
    color: 'white',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 25,
    fontWeight: 'bold',
    fontSize: 20,
  },
  inputHolder: {
    marginTop: 150
  },
  input: {
    height: 40,
    marginTop: 15,
    paddingHorizontal: 10,
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: 15
  },
  buttonContainer: {
    paddingVertical: 15,
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 10,
    width: 150,
    marginLeft: SCREEN_WIDTH/2 - 70
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700'
  },
});
