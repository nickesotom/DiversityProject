import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button
} from "react-native";
import { createDrawerNavigator} from 'react-navigation';
import * as firebase from 'firebase';

class Events extends Component {
  state = {
    currentUser: null
  }
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }
  handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    }).catch(error => this.setState({ errorMessage: error.message }))
  }
  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Text>Events</Text>
        <Button title="Sign Out" onPress={this.handleSignOut} />
      </View>
    );
  }
}

export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});