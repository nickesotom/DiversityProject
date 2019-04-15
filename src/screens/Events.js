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
import { Fab } from 'native-base';
import * as firebase from 'firebase';
import { firebaseConfig } from '../config/firebaseAPI'
import { Card, Icon } from 'react-native-elements'
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
    this.removeItem = this.removeItem.bind(this);

  }


  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    firebase
      .database()
      .ref()
      .child("events/")
      .once("value", snapshot => {
        const data = snapshot.val()
        if (data) {
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

    const newEvent = firebase.database().ref().child('events/').push();
    

    //TODO: figure out how to display all the information i need and then see if i can place them in a card viewer

    newEvent.set(this.state.nameOfEvent, () => this.setState({ nameOfEvent: '' }))

    // newDate.set(this.state.date, () => this.setState({ date: '' }))
    // newLocation.set(this.state.location, () => this.setState({ location: '' }))

  }

  removeItem() {
    const base = firebase.database().ref('events')
    
    alert(firebase.database().ref('events/').set(null))
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
            value={this.state.nameOfEvent}
            placeholder='Enter Event Information'
            onChangeText={(name) => this.setState({nameOfEvent: name})}
            style={styles.textInput}/>

          
          <Button title="Sign Out" onPress={this.handleSignOut} />
        </View>
        <FlatList 
          data={this.state.events}
          renderItem={({item}) => 
            <View style={styles.note}>
              <Text style={styles.noteText}>
                {item}
              </Text>
              <TouchableOpacity
                style={styles.noteDelete}
                onPress={this.removeItem}>
                <Text style={styles.noteDeleteText}>D</Text>
              </TouchableOpacity>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />

        <TouchableOpacity 
          style={styles.addButton}
          onPress={this.addItem}>
          <Icon name="create" color={'white'} size={25} />
          
        </TouchableOpacity>

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
    backgroundColor: '#fff'
  },
  msgBox: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 30,
    bottom: 30,
    backgroundColor: '#e91e63',
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
  },
  listItemContainer: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
  },
  listItem: {
    fontSize: 20,
    padding: 10
  },
  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
  },
  noteText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#abcdef',
    fontSize: 20
  },
  noteDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2980b9',
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10
  },
  noteDeleteText: {
    color: 'white',
  }
});