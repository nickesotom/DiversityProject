import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
  Modal
} from "react-native";
import * as firebase from 'firebase';
import { firebaseConfig } from '../config/firebaseAPI'
import { Card } from 'react-native-elements'
import { Constants } from "expo";
import { TextInput } from "react-native-gesture-handler";

class Events extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      nameOfEvent: '',
      // date: '',
      // location: '',
      events: [],
      currentUser: null,
    };
    this.addItem = this.addItem.bind(this);
  }


  componentDidMount() {
    // const { currentUser } = firebase.auth()
    // this.setState({ currentUser })
    firebase
      .database()
      .ref()
      .child("events")
      .once("value", snapshot => {
        const data = snapshot.val()
        if (snapshot.val()) {
          const initEvents = [];
          Object
            .keys(data)
            .forEach(events => initEvents.push(data[events]));
          this.setState({
            events: initEvents
          })
        }
      });

    firebase
      .database()
      .ref()
      .child("events")
      .on("child_added", snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => ({
            events: [data, ...prevState.events]
          }))
        }
      })
    
  }
  addItem() {
    // firebase function here for sending the data
    if (!this.state.nameOfEvent) return;

    const newEvent = firebase.database().ref().child('events').push();
    

    //TODO: figure out how to display all the information i need and then see if i can place them in a card viewer

    newEvent.set(this.state.nameOfEvent, () => this.setState({ nameOfEvent: '' }))

    // newDate.set(this.state.date, () => this.setState({ date: '' }))
    // newLocation.set(this.state.location, () => this.setState({ location: '' }))

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
    // const { currentUser } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.msgBox}>
          <TextInput 
            placeholder='Name'
            onChangeText={(name) => this.setState({nameOfEvent: name})}
            style={styles.textInput}/>

          <TextInput
            placeholder='DAte'
            onChangeText={(date) => this.setState({ date: date })}
            style={styles.textInput} />

          <TextInput
            placeholder='Location'
            onChangeText={(location) => this.setState({ location: location })}
            style={styles.textInput} />

          

          <Button title='Send' onPress={this.addItem} />
          <Button title="Sign Out" onPress={this.handleSignOut} />
        </View>
        <FlatList 
          data={this.state.events}
          renderItem={({item}) => 
            <View style={styles.listItemContainer}>
              <Text style={styles.listItem}>
                {item}
              </Text>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#eee'
  },
  msgBox: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1
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
  },
  listItemContainer: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
  },
  listItem: {
    fontSize: 20,
    padding: 10
  }
});