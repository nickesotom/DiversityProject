import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity
} from "react-native";
import * as firebase from 'firebase';
import { Header, Container, Title, Content, Icon, Card, CardItem, Fab, Footer } from 'native-base';

class Events extends Component {
  state = {
    currentUser: null
  }
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }
  handleEventButton = () => {
    alert('button pressed')
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
        <Fab
          direction="up"
          style={{ backgroundColor: '#235acf' }}
          position="bottomRight"
          onPress={this.handleEventButton}
        >
          <Icon name="add" />
        </Fab>
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
  },
  addEventButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60/2,
    backgroundColor: '#abcdef',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    bottom: 20,
    right: 20,
  }
});