import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";
import Icon from '@expo/vector-icons/Ionicons';

import * as firebase from 'firebase';

// git remote add origin [//your github url]

// //pull those changes

// git pull origin master

// //now, push your work to your new repo

// git push origin master

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: null
  }
  handleLogin = () => {
    const { email, password } = this.state;
    firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => this.props.navigation.navigate('Events'))
    .catch(function (error) {
      // this.setState({ errorMessage: error.message })
      if (error.code == "auth/invalid-email") {
        alert('Please enter a valid email.');
      } else if(error.code == "auth/user-not-found") {
        alert('Invalid email or password.')
      } else {
        alert(error.message);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholderTextColor="#cccccc"
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email} 
        />

        <TextInput
          placeholderTextColor="#cccccc"
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password} 
        />

        <TouchableOpacity 
          onPress={this.handleLogin}
          style={styles.loginButton}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.switchToSignUp}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8d1234'
  },
  textInput: {
    minWidth: 300,
    flexWrap: 'wrap',
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    color: '#fff',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginTop: 100,
    marginBottom: 60,
    width: 240,
    alignItems: 'center'
  },
  loginText: {
    color: '#000',
    fontWeight: 'bold'
  },
  switchToSignUp: {
    color: '#fff',
    fontSize: 18
  }
});
