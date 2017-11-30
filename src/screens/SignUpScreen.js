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

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

type Props = {
  navigation: any,
};

type State = {
  username: string,
  password1: string,
  password2: string,
}

export default class SignUpScreen extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render () {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headertext}>
            Sign Up
          </Text>
        </View>
        <Image
          style={styles.image}
          source={{uri: 'http://mobilehdwalls.com/wp-content/uploads/2016/09/house-luxury-design-grass-modern.jpg'}}>

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
              onChangeText={(password) => this.setState({"password1": password})}
              placeholderTextColor="white"
              underlineColorAndroid="white"
              style={styles.input}
            />
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry
              onChangeText={(password) => this.setState({"password2": password})}
              placeholderTextColor="white"
              underlineColorAndroid="white"
              style={styles.input}
            />
          </View>
          <TouchableOpacity style={styles.buttonContainer}
            onPress={() => sendSignUpRequest(this.state)}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </Image>
      </View>
    );
  }
}

async function sendSignUpRequest(state) {
  console.log("this is username: " + state["username"]);
  console.log("this is password1: " + state["password1"]);
  console.log("this is password2: " + state["password2"]);

  if(state["password1"] != state["password2"]) {
    ToastAndroid.show('Passwords not matching :(', ToastAndroid.SHORT);
    return;  
  }

  ToastAndroid.show('Signing up', ToastAndroid.SHORT);

  const response = await fetch(new Request(
    'https://childlike-quartz.glitch.me/register',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"username": state["username"], "password": state["password1"]}),
    }))

    const responseJson = await response._bodyInit;
    ToastAndroid.show('Signed up!', ToastAndroid.SHORT);
    global.userToken = responseJson;
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
