import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Platform
} from "react-native";
import Icon from '@expo/vector-icons/Ionicons';
import * as firebase from 'firebase';
class SignUp extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    errorMessage: null
  }
  handleSignUp = () => {
    if (this.state.password !== this.state.confirmPassword) {
      alert('Sorry! Passwords must be identical.');
    } else {
      firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Events'))
        .catch(function (error) {
          // this.setState({ errorMessage: error.message })
          if (error.code == "auth/invalid-email") {
            alert('Please enter a valid email.');
          } else {
            alert(error.message);
          }
        });
      }
    }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholderTextColor="#cccccc"
          keyboardType="email-address"
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email} />

        <TextInput
          placeholderTextColor="#cccccc"
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password} />

        <TextInput
          placeholderTextColor="#cccccc"
          secureTextEntry={true}
          placeholder="Confirm Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={confirmPassword => this.setState({ confirmPassword })}
          value={this.state.confirmPassword} />

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={this.handleSignUp}> 
          <Text style={styles.signUpText}>CREATE AN ACCOUNT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.switchToLoginButton}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default SignUp;

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
  signUpButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginTop: 50,
    marginBottom: 60,
    width: 240,
    alignItems: 'center'
  },
  signUpText: {
    color:'#000',
    fontWeight: 'bold'
  },
  switchToLoginButton: {
    color: '#fff',
    fontSize: 18
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
  }
});